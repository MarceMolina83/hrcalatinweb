import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2, Send } from "lucide-react";

const contactFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(5, "Subject must be at least 5 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
    const { t } = useLanguage();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        try {
            await emailjs.send(
                "service_9ydzq89",
                "template_0b7bypg",
                {
                    name: data.name,
                    emailfrom: data.email,
                    email_from: data.email,
                    user_email: data.email,
                    email: data.email,
                    reply_to: data.email,
                    subject: data.subject,
                    email_subject: data.subject,
                    message: `(Sent by: ${data.email})\n\n${data.message}`,
                    time: new Date().toLocaleString(),
                },
                "R4cLIajWE60QUQOoX"
            );

            toast({
                title: t("contact.form.success.title"),
                description: t("contact.form.success.message"),
            });
            reset();
        } catch (error) {
            console.error("EmailJS Error:", error);
            toast({
                title: t("contact.form.error.title"),
                description: t("contact.form.error.message"),
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="border-2 shadow-elegant">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                    {t("contact.form.title")}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
                    <div className="space-y-2">
                        <Label htmlFor="name">{t("contact.form.name")}</Label>
                        <Input
                            id="name"
                            {...register("name")}
                            placeholder={t("contact.form.name")}
                            className={errors.name ? "border-destructive" : ""}
                        />
                        {errors.name && (
                            <p className="text-sm text-destructive">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">{t("contact.form.email")}</Label>
                        <Input
                            id="email"
                            type="email"
                            {...register("email")}
                            placeholder={t("contact.form.email")}
                            className={errors.email ? "border-destructive" : ""}
                        />
                        {errors.email && (
                            <p className="text-sm text-destructive">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="subject">{t("contact.form.subject")}</Label>
                        <Input
                            id="subject"
                            {...register("subject")}
                            placeholder={t("contact.form.subject")}
                            className={errors.subject ? "border-destructive" : ""}
                        />
                        {errors.subject && (
                            <p className="text-sm text-destructive">{errors.subject.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message">{t("contact.form.message")}</Label>
                        <Textarea
                            id="message"
                            {...register("message")}
                            placeholder={t("contact.form.message")}
                            rows={5}
                            className={errors.message ? "border-destructive" : ""}
                        />
                        {errors.message && (
                            <p className="text-sm text-destructive">{errors.message.message}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-12 text-lg font-bold transition-smooth"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                {t("contact.form.submitting")}
                            </>
                        ) : (
                            <>
                                {t("contact.form.submit")}
                                <Send className="ml-2 h-5 w-5" />
                            </>
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default ContactForm;
