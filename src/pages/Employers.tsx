import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Users, CheckCircle, Award, BarChart, Globe, UserCheck, TrendingUp } from "lucide-react";
import employersImage from "@/assets/employers-section.jpg";
import logo from "@/assets/logo.jpeg";
import { useLanguage } from "@/contexts/LanguageContext";

const Employers = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${employersImage})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/50"></div>
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in text-foreground">
              {t("employers.hero.title1")}<br />{t("employers.hero.title2")}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-foreground/80">
              {t("employers.hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg shadow-xl bg-secondary text-secondary-foreground hover:bg-accent hover:text-white transition-smooth" asChild>
                <a href="/#get-started">{t("employers.cta.register")}</a>
              </Button>
              <Button size="lg" className="text-lg shadow-xl bg-secondary text-secondary-foreground hover:bg-accent hover:text-white transition-smooth" asChild>
                <Link to="/contact">{t("employers.cta.consultation")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <img src={logo} alt="HR-CALATIN Logo" className="h-24 w-24 object-contain mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              {t("employers.why.title")}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t("employers.why.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:shadow-elegant transition-smooth group">
              <CardHeader>
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-smooth">
                  <UserCheck className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-extrabold">{t("employers.why.talent.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-semibold">
                  {t("employers.why.talent.description")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-elegant transition-smooth group">
              <CardHeader>
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-smooth">
                  <BarChart className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-extrabold">{t("employers.why.cost.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-semibold">
                  {t("employers.why.cost.description")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-elegant transition-smooth group">
              <CardHeader>
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-gold to-gold/60 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-smooth">
                  <Award className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-extrabold">{t("employers.why.partnership.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-semibold">
                  {t("employers.why.partnership.description")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              {t("employers.services.title")}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t("employers.services.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 shadow-md">
                    <Users className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl mb-2 font-extrabold text-secondary tracking-tight">
                      {t("employers.services.training.title")}
                    </CardTitle>
                    <CardDescription className="font-semibold text-muted-foreground leading-relaxed">
                      {t("employers.services.training.description")}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 shadow-md">
                    <CheckCircle className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl mb-2 font-extrabold text-secondary tracking-tight">
                      {t("employers.services.onboarding.title")}
                    </CardTitle>
                    <CardDescription className="font-semibold text-muted-foreground leading-relaxed">
                      {t("employers.services.onboarding.description")}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Business Collaborations & Services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              {t("employers.collaborations.title")} <span className="text-primary">{t("employers.collaborations.titleHighlight")}</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              {t("employers.collaborations.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 border-primary/30 hover:border-primary transition-smooth">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <BarChart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl mb-2">{t("employers.collaborations.powerbi.title")}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("employers.collaborations.powerbi.description")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/30 hover:border-accent transition-smooth">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Globe className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-xl mb-2">{t("employers.collaborations.web.title")}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("employers.collaborations.web.description")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gold/30 hover:border-gold transition-smooth">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <Award className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <CardTitle className="text-xl mb-2">{t("employers.collaborations.microsoft.title")}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("employers.collaborations.microsoft.description")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/30 hover:border-primary transition-smooth">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl mb-2">{t("employers.collaborations.webapp.title")}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("employers.collaborations.webapp.description")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default Employers;