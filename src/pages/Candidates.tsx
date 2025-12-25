import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FileText, Target, Briefcase, MapPin } from "lucide-react";
import candidatesImage from "@/assets/candidates-section.jpg";
import logo from "@/assets/logo.jpeg";
import CandidateApplicationForm from "@/components/CandidateApplicationForm";
import { useLanguage } from "@/contexts/LanguageContext";

const Candidates = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${candidatesImage})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/50"></div>
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in text-foreground">
              {t("candidates.hero.title1")}<br />{t("candidates.hero.title2")}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-foreground/80">
              {t("candidates.hero.subtitle")}
            </p>
            <Button size="lg" variant="gold" className="text-lg font-bold hover:bg-accent hover:text-white transition-smooth shadow-lg" asChild>
              <a href="#apply-form">{t("candidates.hero.button")}</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <img src={logo} alt="HR-CALATIN Logo" className="h-24 w-24 object-contain mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              {t("candidates.why.title")}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t("candidates.why.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 hover:shadow-elegant transition-smooth group">
              <CardHeader>
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-smooth">
                  <Briefcase className="h-10 w-10 text-white" />
                </div>
                <CardTitle>{t("candidates.why.jobs.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("candidates.why.jobs.description")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-elegant transition-smooth group">
              <CardHeader>
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-smooth">
                  <FileText className="h-10 w-10 text-white" />
                </div>
                <CardTitle>{t("candidates.why.resume.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("candidates.why.resume.description")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-elegant transition-smooth group">
              <CardHeader>
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-gold to-gold/60 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-smooth">
                  <Target className="h-10 w-10 text-white" />
                </div>
                <CardTitle>{t("candidates.why.legal.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("candidates.why.legal.description")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Training & Integration Support */}
      <section className="py-20 bg-gradient-to-br from-accent/10 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              {t("candidates.training.title")} <span className="text-accent">{t("candidates.training.titleHighlight")}</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("candidates.training.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="border-2 border-secondary/30 hover:border-secondary hover:shadow-elegant transition-smooth group flex flex-col h-full">
              <CardContent className="pt-6 text-center flex-grow flex flex-col">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-secondary to-secondary/60 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-smooth">
                  <span className="text-3xl">💬</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-secondary">{t("candidates.training.language.title")}</h3>
                <p className="text-muted-foreground text-sm mb-6 flex-grow">
                  {t("candidates.training.language.description")}
                </p>
                <Button variant="outline" className="w-full mt-auto text-secondary border-secondary/50 hover:bg-secondary hover:text-white">
                  {t("candidates.training.button")}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/30 hover:border-primary hover:shadow-elegant transition-smooth group flex flex-col h-full">
              <CardContent className="pt-6 text-center flex-grow flex flex-col">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-smooth">
                  <span className="text-3xl">📄</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary">{t("candidates.training.resume.title")}</h3>
                <p className="text-muted-foreground text-sm mb-6 flex-grow">
                  {t("candidates.training.resume.description")}
                </p>
                <Button variant="outline" className="w-full mt-auto text-primary border-primary/50 hover:bg-primary hover:text-white">
                  {t("candidates.training.button")}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/30 hover:border-accent hover:shadow-elegant transition-smooth group flex flex-col h-full">
              <CardContent className="pt-6 text-center flex-grow flex flex-col">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-smooth">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-accent">{t("candidates.training.arrival.title")}</h3>
                <p className="text-muted-foreground text-sm mb-6 flex-grow">
                  {t("candidates.training.arrival.description")}
                </p>
                <Button variant="outline" className="w-full mt-auto text-accent border-accent/50 hover:bg-accent hover:text-white">
                  {t("candidates.training.button")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>



      {/* Application Form Section */}
      <section id="apply-form" className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              {t("candidates.apply.title")}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t("candidates.apply.subtitle")}
            </p>
          </div>
          <CandidateApplicationForm />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto border-2 border-accent/20 overflow-hidden">
            <div className="bg-accent/10 p-12 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                {t("candidates.cta.title")}
              </h2>
              <p className="text-xl mb-8 text-foreground/80">
                {t("candidates.cta.subtitle")}
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">{t("candidates.cta.button")}</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Candidates;