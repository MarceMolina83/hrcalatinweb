import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">{t("contact.hero.title")}</h1>
              <p className="text-xl text-muted-foreground">
                {t("contact.hero.subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <Card className="border-2 hover:shadow-elegant transition-smooth group">
                <CardHeader className="text-center">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-smooth shadow-lg">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle>{t("contact.location.title")}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    New Brunswick<br />
                    Canada
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-elegant transition-smooth group">
                <CardHeader className="text-center">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-smooth shadow-lg">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle>{t("contact.email.title")}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <a href="mailto:info@hrcalatin.com" className="text-primary hover:underline">
                    info@hrcalatin.com
                  </a>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-elegant transition-smooth group">
                <CardHeader className="text-center">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-gold to-gold/60 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-smooth shadow-lg">
                    <Phone className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle>{t("contact.phone.title")}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <a href="tel:+14165550101" className="text-primary hover:underline">
                    +1 (416) 555-0101
                  </a>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-elegant transition-smooth group">
                <CardHeader className="text-center">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-smooth shadow-lg">
                    <Clock className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle>{t("contact.hours.title")}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    {t("contact.hours.weekdays")}<br />
                    {t("contact.hours.weekend")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="py-20 bg-gradient-to-br from-accent/10 to-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("contact.connect.title")}</h2>
                <p className="text-xl text-muted-foreground">
                  {t("contact.connect.subtitle")}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-2xl">{t("contact.connect.employers.title")}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      {t("contact.connect.employers.description")}
                    </p>
                    <div className="space-y-2">
                      <p className="font-medium">Email:</p>
                      <a href="mailto:employers@hrcalatin.com" className="text-primary hover:underline">
                        employers@hrcalatin.com
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-2xl">{t("contact.connect.candidates.title")}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      {t("contact.connect.candidates.description")}
                    </p>
                    <div className="space-y-2">
                      <p className="font-medium">Email:</p>
                      <a href="mailto:candidates@hrcalatin.com" className="text-primary hover:underline">
                        candidates@hrcalatin.com
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;