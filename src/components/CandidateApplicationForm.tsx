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

const latinAmericanCountries = [
  "Argentina", "Bolivia", "Brasil", "Chile", "Colombia", "Costa Rica", 
  "Cuba", "Ecuador", "El Salvador", "Guatemala", "Honduras", "México", 
  "Nicaragua", "Panamá", "Paraguay", "Perú", "República Dominicana", 
  "Uruguay", "Venezuela"
];

const sectors = [
  "Tecnología / IT", "Ingeniería", "Salud / Healthcare", "Educación",
  "Agricultura", "Finanzas", "Manufactura", "Construcción", 
  "Hotelería / Turismo", "Transporte / Logística", "Otro"
];

const educationLevels = [
  "Secundaria / High School", "Técnico / Technical", "Licenciatura / Bachelor's",
  "Maestría / Master's", "Doctorado / PhD"
];

const languageLevels = ["Básico", "Intermedio", "Avanzado", "Nativo / Fluido"];

const CandidateApplicationForm = () => {
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
          title: "Archivo muy grande",
          description: "El archivo debe ser menor a 5MB",
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
          title: "Tipo de archivo no válido",
          description: "Solo se permiten archivos PDF o Word (.doc, .docx)",
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
        title: "CAPTCHA incorrecto",
        description: "Por favor resuelve correctamente el problema matemático.",
        variant: "destructive"
      });
      return false;
    }

    // Check rate limit
    if (!checkRateLimit()) {
      toast({
        title: "Límite de envíos alcanzado",
        description: "Solo puedes enviar 3 aplicaciones por día. Inténtalo mañana.",
        variant: "destructive"
      });
      return false;
    }

    // Validate email format
    if (!validateEmail(formData.email)) {
      toast({
        title: "Email inválido",
        description: "Por favor ingresa un email válido.",
        variant: "destructive"
      });
      return false;
    }

    // Check required fields
    if (!formData.full_name.trim() || !formData.email.trim() || !formData.country || !formData.profession.trim()) {
      toast({
        title: "Campos requeridos faltantes",
        description: "Por favor completa todos los campos requeridos.",
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
            throw new Error("Error de configuración: El almacenamiento de currículums no está configurado. Por favor contacta al administrador.");
          }

          throw new Error("Error al subir el currículum. Por favor intenta de nuevo.");
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
        title: "¡Aplicación enviada!",
        description: "Hemos recibido tu información. Te contactaremos pronto.",
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
        title: "Error",
        description: error instanceof Error ? error.message : "Error al enviar la aplicación",
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
          <h3 className="text-3xl font-bold text-foreground mb-4">¡Gracias por tu aplicación!</h3>
          <p className="text-lg text-muted-foreground mb-6">
            Hemos recibido tu información correctamente. Nuestro equipo revisará tu perfil y te contactará pronto.
          </p>
          <Button onClick={() => setIsSuccess(false)} variant="outline">
            Enviar otra aplicación
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-primary/30 max-w-3xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl text-primary">Aplica para Oportunidades en Canadá</CardTitle>
        <CardDescription className="text-lg">
          Completa el formulario y sube tu currículum para ser considerado por empleadores canadienses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground border-b pb-2">Información Personal</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Nombre Completo *</Label>
                <Input
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  required
                  placeholder="Juan Pérez"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="juan@ejemplo.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+52 55 1234 5678"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="country">País de Residencia *</Label>
                <Select onValueChange={(value) => handleSelectChange("country", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu país" />
                  </SelectTrigger>
                  <SelectContent>
                    {latinAmericanCountries.map((country) => (
                      <SelectItem key={country} value={country}>{country}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">Ciudad</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Ciudad de México"
              />
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground border-b pb-2">Información Profesional</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="profession">Profesión / Área de Trabajo *</Label>
                <Input
                  id="profession"
                  name="profession"
                  value={formData.profession}
                  onChange={handleInputChange}
                  required
                  placeholder="Ingeniero de Software"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="years_experience">Años de Experiencia</Label>
                <Input
                  id="years_experience"
                  name="years_experience"
                  type="number"
                  min="0"
                  max="50"
                  value={formData.years_experience}
                  onChange={handleInputChange}
                  placeholder="5"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nivel de Educación</Label>
                <Select onValueChange={(value) => handleSelectChange("education_level", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    {educationLevels.map((level) => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Sector de Interés</Label>
                <Select onValueChange={(value) => handleSelectChange("preferred_sector", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un sector" />
                  </SelectTrigger>
                  <SelectContent>
                    {sectors.map((sector) => (
                      <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin_url">LinkedIn URL</Label>
              <Input
                id="linkedin_url"
                name="linkedin_url"
                type="url"
                value={formData.linkedin_url}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/in/tu-perfil"
              />
            </div>
          </div>

          {/* Languages */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground border-b pb-2">Idiomas</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nivel de Inglés</Label>
                <Select onValueChange={(value) => handleSelectChange("english_level", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    {languageLevels.map((level) => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Nivel de Francés</Label>
                <Select onValueChange={(value) => handleSelectChange("french_level", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    {languageLevels.map((level) => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Resume Upload */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground border-b pb-2">Currículum</h3>
            
            <div className="space-y-2">
              <Label htmlFor="resume">Sube tu CV (PDF, DOC, DOCX - Max 5MB)</Label>
              <div className="flex items-center gap-4">
                <label 
                  htmlFor="resume" 
                  className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg cursor-pointer transition-colors border border-primary/30"
                >
                  <Upload className="h-5 w-5 text-primary" />
                  <span className="text-primary font-medium">Seleccionar archivo</span>
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
            <h3 className="text-xl font-semibold text-foreground border-b pb-2">Información Adicional</h3>
            
            <div className="space-y-2">
              <Label>Estado de Permiso de Trabajo</Label>
              <Select onValueChange={(value) => handleSelectChange("work_permit_status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tu situación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No tengo permiso de trabajo</SelectItem>
                  <SelectItem value="working_holiday">Working Holiday Visa</SelectItem>
                  <SelectItem value="work_permit">Permiso de trabajo activo</SelectItem>
                  <SelectItem value="permanent_resident">Residente permanente</SelectItem>
                  <SelectItem value="citizen">Ciudadano canadiense</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cover_letter">Carta de Presentación / Mensaje</Label>
              <Textarea
                id="cover_letter"
                name="cover_letter"
                value={formData.cover_letter}
                onChange={handleInputChange}
                placeholder="Cuéntanos sobre ti, tu experiencia y por qué te gustaría trabajar en Canadá..."
                rows={5}
              />
            </div>
          </div>

          {/* Security Section */}
          <div className="space-y-4 border-t pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">Verificación de Seguridad</h3>
            </div>

            {/* CAPTCHA */}
            <div className="space-y-2">
              <Label htmlFor="captcha">Verificación: ¿Cuánto es {captchaNum1} + {captchaNum2}? *</Label>
              <Input
                id="captcha"
                type="text"
                value={captchaAnswer}
                onChange={(e) => setCaptchaAnswer(e.target.value)}
                placeholder="Ingresa el resultado"
                required
                className="max-w-xs"
              />
              <p className="text-sm text-muted-foreground">
                Esta verificación nos ayuda a prevenir envíos automáticos.
              </p>
            </div>

            {/* Honeypot field (hidden from users but visible to bots) */}
            <div className="hidden">
              <Label htmlFor="website">Website (leave blank)</Label>
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
                Enviando...
              </>
            ) : (
              "Enviar Aplicación"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CandidateApplicationForm;
