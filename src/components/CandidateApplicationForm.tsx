import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload, CheckCircle, Loader2, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const latinAmericanCountries = [
  { id: "argentina", key: "candidates.form.country.argentina" },
  { id: "bolivia", key: "candidates.form.country.bolivia" },
  { id: "brazil", key: "candidates.form.country.brazil" },
  { id: "chile", key: "candidates.form.country.chile" },
  { id: "colombia", key: "candidates.form.country.colombia" },
  { id: "costa_rica", key: "candidates.form.country.costa_rica" },
  { id: "cuba", key: "candidates.form.country.cuba" },
  { id: "ecuador", key: "candidates.form.country.ecuador" },
  { id: "el_salvador", key: "candidates.form.country.el_salvador" },
  { id: "guatemala", key: "candidates.form.country.guatemala" },
  { id: "haiti", key: "candidates.form.country.haiti" },
  { id: "honduras", key: "candidates.form.country.honduras" },
  { id: "mexico", key: "candidates.form.country.mexico" },
  { id: "nicaragua", key: "candidates.form.country.nicaragua" },
  { id: "panama", key: "candidates.form.country.panama" },
  { id: "paraguay", key: "candidates.form.country.paraguay" },
  { id: "peru", key: "candidates.form.country.peru" },
  { id: "dominican_republic", key: "candidates.form.country.dominican_republic" },
  { id: "uruguay", key: "candidates.form.country.uruguay" },
  { id: "venezuela", key: "candidates.form.country.venezuela" },
  { id: "other", key: "candidates.form.country.other" }
];

const CandidateApplicationForm = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  // Security state
  const [captchaNum1, setCaptchaNum1] = useState(0);
  const [captchaNum2, setCaptchaNum2] = useState(0);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [honeypot, setHoneypot] = useState(""); // Hidden field for bots
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    profession: "",
    years_experience: "",
    english_level: "",
    french_level: "",
    education_level: "",
    linkedin_url: "",
    cover_letter: "",
    preferred_sector: "",
    work_permit_status: ""
  });

  // Initialize CAPTCHA and load submission tracking
  useEffect(() => {
    // Generate random numbers for CAPTCHA
    setCaptchaNum1(Math.floor(Math.random() * 10) + 1);
    setCaptchaNum2(Math.floor(Math.random() * 10) + 1);

    // Load submission tracking from localStorage
    const storedCount = localStorage.getItem('candidate_submission_count');
    const storedTime = localStorage.getItem('candidate_last_submission');

    if (storedCount) setSubmissionCount(parseInt(storedCount));
    if (storedTime) setLastSubmissionTime(parseInt(storedTime));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: t("candidates.form.error.fileSize"),
          description: t("candidates.form.error.fileSizeDesc"),
          variant: "destructive"
        });
        e.target.value = '';
        return;
      }

      // Check file type using MIME type (more secure than extension)
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];

      if (!allowedTypes.includes(file.type)) {
        toast({
          title: t("candidates.form.error.fileType"),
          description: t("candidates.form.error.fileTypeDesc"),
          variant: "destructive"
        });
        e.target.value = '';
        return;
      }

      setResumeFile(file);
    }
  };

  // Security validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkRateLimit = () => {
    const now = Date.now();
    const timeWindow = 24 * 60 * 60 * 1000; // 24 hours
    const maxSubmissions = 3; // Max 3 submissions per day

    // Reset counter if time window has passed
    if (now - lastSubmissionTime > timeWindow) {
      setSubmissionCount(0);
      setLastSubmissionTime(now);
      localStorage.setItem('candidate_submission_count', '0');
      localStorage.setItem('candidate_last_submission', now.toString());
      return true;
    }

    // Check if under limit
    if (submissionCount >= maxSubmissions) {
      return false;
    }

    return true;
  };

  const validateCaptcha = () => {
    const expectedAnswer = (captchaNum1 + captchaNum2).toString();
    return captchaAnswer.trim() === expectedAnswer;
  };

  const isValidSubmission = () => {
    // Check honeypot (should be empty for humans)
    if (honeypot.trim() !== "") {
      return false;
    }

    // Validate CAPTCHA
    if (!validateCaptcha()) {
      toast({
        title: t("candidates.form.error.captcha"),
        description: t("candidates.form.error.captchaDesc"),
        variant: "destructive"
      });
      return false;
    }

    // Check rate limit
    if (!checkRateLimit()) {
      toast({
        title: t("candidates.form.error.rateLimit"),
        description: t("candidates.form.error.rateLimitDesc"),
        variant: "destructive"
      });
      return false;
    }

    // Validate email format
    if (!validateEmail(formData.email)) {
      toast({
        title: t("candidates.form.error.invalidEmail"),
        description: t("candidates.form.error.invalidEmailDesc"),
        variant: "destructive"
      });
      return false;
    }

    // Check required fields
    if (!formData.full_name.trim() || !formData.email.trim() || !formData.country || !formData.profession.trim()) {
      toast({
        title: t("candidates.form.error.missingFields"),
        description: t("candidates.form.error.missingFieldsDesc"),
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Security validation
    if (!isValidSubmission()) {
      return;
    }

    setIsSubmitting(true);

    try {
      let resumeUrl = null;

      // Upload resume if provided
      if (resumeFile) {
        const fileExt = resumeFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(fileName, resumeFile);

        if (uploadError) {
          console.error("Upload error:", uploadError);

          // Check if the error is due to bucket not existing
          if (uploadError.message?.includes('not found') || uploadError.message?.includes('does not exist')) {
            throw new Error(t("candidates.form.error.config"));
          }

          throw new Error(t("candidates.form.error.upload"));
        }

        // Store only the file path - signed URLs should be generated when admin needs to view
        resumeUrl = fileName;
      }

      // Insert application
      const { error: insertError } = await supabase
        .from('candidate_applications')
        .insert({
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone || null,
          country: formData.country,
          city: formData.city || null,
          profession: formData.profession,
          years_experience: formData.years_experience ? parseInt(formData.years_experience) : null,
          english_level: formData.english_level || null,
          french_level: formData.french_level || null,
          education_level: formData.education_level || null,
          linkedin_url: formData.linkedin_url || null,
          resume_url: resumeUrl,
          cover_letter: formData.cover_letter || null,
          preferred_sector: formData.preferred_sector || null,
          work_permit_status: formData.work_permit_status || null
        });

      if (insertError) {
        console.error("Insert error:", insertError);
        throw new Error("Error al enviar la aplicación");
      }

      setIsSuccess(true);
      toast({
        title: t("candidates.form.submit.success.title"),
        description: t("candidates.form.submit.success.desc"),
      });

      // Update rate limiting counters
      const newCount = submissionCount + 1;
      const now = Date.now();
      setSubmissionCount(newCount);
      setLastSubmissionTime(now);
      localStorage.setItem('candidate_submission_count', newCount.toString());
      localStorage.setItem('candidate_last_submission', now.toString());

      // Reset CAPTCHA for next submission
      setCaptchaNum1(Math.floor(Math.random() * 10) + 1);
      setCaptchaNum2(Math.floor(Math.random() * 10) + 1);
      setCaptchaAnswer("");
      setHoneypot("");

    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: t("candidates.form.error.title"),
        description: error instanceof Error ? error.message : t("candidates.form.error.generic"),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="border-2 border-primary/30 max-w-3xl mx-auto">
        <CardContent className="pt-12 pb-12 text-center">
          <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-3xl font-bold text-foreground mb-4">{t("candidates.form.submit.success.cardTitle")}</h3>
          <p className="text-lg text-muted-foreground mb-6">
            {t("candidates.form.submit.success.cardDesc")}
          </p>
          <Button onClick={() => setIsSuccess(false)} variant="outline">
            {t("candidates.form.submit.success.again")}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-primary/30 max-w-3xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl text-primary">{t("candidates.apply.title")}</CardTitle>
        <CardDescription className="text-lg">
          {t("candidates.apply.subtitle")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground border-b pb-2">{t("candidates.form.personal.title")}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">{t("candidates.form.personal.name")}</Label>
                <Input
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  required
                  placeholder={t("candidates.form.personal.namePlaceholder")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t("candidates.form.personal.email")}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder={t("candidates.form.personal.emailPlaceholder")}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">{t("candidates.form.personal.phone")}</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder={t("candidates.form.personal.phonePlaceholder")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">{t("candidates.form.personal.country")}</Label>
                <Select onValueChange={(value) => handleSelectChange("country", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder={t("candidates.form.personal.countryPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    {latinAmericanCountries.map((country) => (
                      <SelectItem key={country.id} value={country.id}>{t(country.key)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">{t("candidates.form.personal.city")}</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder={t("candidates.form.personal.cityPlaceholder")}
              />
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground border-b pb-2">{t("candidates.form.professional.title")}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="profession">{t("candidates.form.professional.profession")}</Label>
                <Input
                  id="profession"
                  name="profession"
                  value={formData.profession}
                  onChange={handleInputChange}
                  required
                  placeholder={t("candidates.form.professional.professionPlaceholder")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="years_experience">{t("candidates.form.professional.experience")}</Label>
                <Input
                  id="years_experience"
                  name="years_experience"
                  type="number"
                  min="0"
                  max="50"
                  value={formData.years_experience}
                  onChange={handleInputChange}
                  placeholder={t("candidates.form.professional.experiencePlaceholder")}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("candidates.form.professional.education")}</Label>
                <Select onValueChange={(value) => handleSelectChange("education_level", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("candidates.form.professional.educationPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="secondary">{t("candidates.form.education.secondary")}</SelectItem>
                    <SelectItem value="technical">{t("candidates.form.education.technical")}</SelectItem>
                    <SelectItem value="bachelors">{t("candidates.form.education.bachelors")}</SelectItem>
                    <SelectItem value="masters">{t("candidates.form.education.masters")}</SelectItem>
                    <SelectItem value="phd">{t("candidates.form.education.phd")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t("candidates.form.professional.sector")}</Label>
                <Select onValueChange={(value) => handleSelectChange("preferred_sector", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("candidates.form.professional.sectorPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">{t("candidates.form.sector.tech")}</SelectItem>
                    <SelectItem value="engineering">{t("candidates.form.sector.engineering")}</SelectItem>
                    <SelectItem value="healthcare">{t("candidates.form.sector.healthcare")}</SelectItem>
                    <SelectItem value="education">{t("candidates.form.sector.education")}</SelectItem>
                    <SelectItem value="agriculture">{t("candidates.form.sector.agriculture")}</SelectItem>
                    <SelectItem value="finance">{t("candidates.form.sector.finance")}</SelectItem>
                    <SelectItem value="manufacturing">{t("candidates.form.sector.manufacturing")}</SelectItem>
                    <SelectItem value="construction">{t("candidates.form.sector.construction")}</SelectItem>
                    <SelectItem value="hospitality">{t("candidates.form.sector.hospitality")}</SelectItem>
                    <SelectItem value="logistics">{t("candidates.form.sector.logistics")}</SelectItem>
                    <SelectItem value="other">{t("candidates.form.sector.other")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin_url">{t("candidates.form.professional.linkedin")}</Label>
              <Input
                id="linkedin_url"
                name="linkedin_url"
                type="url"
                value={formData.linkedin_url}
                onChange={handleInputChange}
                placeholder="https://www.linkedin.com/company/hr-calatin/"
              />
            </div>
          </div>

          {/* Languages */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground border-b pb-2">{t("candidates.form.languages.title")}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("candidates.form.languages.english")}</Label>
                <Select onValueChange={(value) => handleSelectChange("english_level", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("candidates.form.languages.placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">{t("candidates.form.language.basic")}</SelectItem>
                    <SelectItem value="intermediate">{t("candidates.form.language.intermediate")}</SelectItem>
                    <SelectItem value="advanced">{t("candidates.form.language.advanced")}</SelectItem>
                    <SelectItem value="native">{t("candidates.form.language.native")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t("candidates.form.languages.french")}</Label>
                <Select onValueChange={(value) => handleSelectChange("french_level", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("candidates.form.languages.placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">{t("candidates.form.language.basic")}</SelectItem>
                    <SelectItem value="intermediate">{t("candidates.form.language.intermediate")}</SelectItem>
                    <SelectItem value="advanced">{t("candidates.form.language.advanced")}</SelectItem>
                    <SelectItem value="native">{t("candidates.form.language.native")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Resume Upload */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground border-b pb-2">{t("candidates.form.resume.title")}</h3>

            <div className="space-y-2">
              <Label htmlFor="resume">{t("candidates.form.resume.label")}</Label>
              <div className="flex items-center gap-4">
                <label
                  htmlFor="resume"
                  className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg cursor-pointer transition-colors border border-primary/30"
                >
                  <Upload className="h-5 w-5 text-primary" />
                  <span className="text-primary font-medium">{t("candidates.form.resume.button")}</span>
                </label>
                <Input
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {resumeFile && (
                  <span className="text-sm text-muted-foreground">{resumeFile.name}</span>
                )}
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground border-b pb-2">{t("candidates.form.additional.title")}</h3>

            <div className="space-y-2">
              <Label>{t("candidates.form.additional.permit")}</Label>
              <Select onValueChange={(value) => handleSelectChange("work_permit_status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder={t("candidates.form.additional.permitPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">{t("candidates.form.permit.none")}</SelectItem>
                  <SelectItem value="working_holiday">{t("candidates.form.permit.holiday")}</SelectItem>
                  <SelectItem value="work_permit">{t("candidates.form.permit.active")}</SelectItem>
                  <SelectItem value="permanent_resident">{t("candidates.form.permit.resident")}</SelectItem>
                  <SelectItem value="citizen">{t("candidates.form.permit.citizen")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cover_letter">{t("candidates.form.additional.coverLetter")}</Label>
              <Textarea
                id="cover_letter"
                name="cover_letter"
                value={formData.cover_letter}
                onChange={handleInputChange}
                placeholder={t("candidates.form.additional.coverLetterPlaceholder")}
                rows={5}
              />
            </div>
          </div>

          {/* Security Section */}
          <div className="space-y-4 border-t pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">{t("candidates.form.security.title")}</h3>
            </div>

            {/* CAPTCHA */}
            <div className="space-y-2">
              <Label htmlFor="captcha">{t("candidates.form.security.captcha").replace("{num1}", captchaNum1.toString()).replace("{num2}", captchaNum2.toString())}</Label>
              <Input
                id="captcha"
                type="text"
                value={captchaAnswer}
                onChange={(e) => setCaptchaAnswer(e.target.value)}
                placeholder={t("candidates.form.security.captchaPlaceholder")}
                required
                className="max-w-xs"
              />
              <p className="text-sm text-muted-foreground">
                {t("candidates.form.security.disclaimer")}
              </p>
            </div>

            {/* Honeypot field (hidden from users but visible to bots) */}
            <div className="hidden">
              <Label htmlFor="website">{t("candidates.form.security.honeypot")}</Label>
              <Input
                id="website"
                name="website"
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {t("candidates.form.submit.submitting")}
              </>
            ) : (
              t("candidates.form.submit.idle")
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CandidateApplicationForm;
