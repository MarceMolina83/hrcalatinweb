import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Rocket, Heart, Globe, Handshake, Sprout, Briefcase, Users } from "lucide-react";
import heroImage from "@/assets/hero-collaboration.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/logo.jpeg";

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/50"></div>
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in text-foreground">
              {t("home.hero.title1")}<br />{t("home.hero.title2")}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-foreground/80 animate-fade-in">
              {t("home.hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button size="lg" variant="gold" className="text-lg shadow-xl" asChild>
                <Link to="/employers">
                  {t("home.hero.employers")} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="accent" className="text-lg shadow-xl" asChild>
                <Link to="/candidates">
                  {t("home.hero.candidates")} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <img src={logo} alt="HR-CALATIN Logo" className="h-20 object-contain mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              {t("home.mission.title")} <span className="text-accent">{t("home.mission.titleHighlight")}</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t("home.mission.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-primary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              {t("home.why.title")} <span className="text-gold">{t("home.why.titleHighlight")}</span>?
            </h2>
            <p className="text-xl text-muted-foreground">{t("home.why.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 hover:shadow-elegant transition-smooth group">
              <CardHeader className="text-center">
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-smooth shadow-lg">
                  <Sparkles className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl">{t("home.why.expertise.title")}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  {t("home.why.expertise.description")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-elegant transition-smooth group">
              <CardHeader className="text-center">
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-gold to-gold/60 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-smooth shadow-lg">
                  <Heart className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl">{t("home.why.quality.title")}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  {t("home.why.quality.description")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-elegant transition-smooth group">
              <CardHeader className="text-center">
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-smooth shadow-lg">
                  <Rocket className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl">{t("home.why.support.title")}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  {t("home.why.support.description")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Legal Pathways Section - Moved to appear after Why Choose */}
      <section className="py-20 bg-gradient-to-br from-primary/15 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
              <span className="text-accent">{t("home.pathways.title")}</span>{t("home.pathways.titleHighlight")}
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
              {t("home.pathways.subtitle")}
            </p>

            <div className="space-y-8">
              {/* Working Holiday Programs */}
              <Card className="border-2 border-gold/30 hover:border-gold transition-smooth group">
                <CardContent className="pt-8">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-gold to-gold/60 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-smooth">
                      <Globe className="h-10 w-10 text-white" />
                    </div>
                    <div className="text-center md:text-left">
                      <h3 className="text-2xl font-bold mb-3 text-gold">{t("home.pathways.holiday.title")}</h3>
                      <p className="text-muted-foreground">
                        {t("home.pathways.holiday.description")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Free Trade Agreements */}
              <Card className="border-2 border-accent/30 hover:border-accent transition-smooth group">
                <CardContent className="pt-8">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-smooth">
                      <Handshake className="h-10 w-10 text-white" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl font-bold mb-3 text-accent">{t("home.pathways.fta.title")}</h3>
                      <p className="text-muted-foreground mb-4">
                        {t("home.pathways.fta.description")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* SAWP */}
              <Card className="border-2 border-primary/30 hover:border-primary transition-smooth group">
                <CardContent className="pt-8">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-smooth">
                      <Sprout className="h-10 w-10 text-white" />
                    </div>
                    <div className="text-center md:text-left">
                      <h3 className="text-2xl font-bold mb-3 text-primary">{t("home.pathways.sawp.title")}</h3>
                      <p className="text-muted-foreground">
                        {t("home.pathways.sawp.description")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>



      <section id="get-started" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">{t("getStarted.hero.title")}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("getStarted.hero.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Employer Card */}
            <Card className="border-2 border-primary/20 hover:border-primary hover:shadow-elegant transition-smooth overflow-hidden group">
              <div className="h-48 bg-primary/10 relative overflow-hidden">
                <div className="absolute inset-0 gradient-hero opacity-80 group-hover:opacity-90 transition-smooth"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Briefcase className="h-20 w-20 text-primary-foreground" />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-3xl">{t("getStarted.employer.title")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  {t("getStarted.employer.subtitle")}
                </p>
                <div className="space-y-3 text-muted-foreground">
                  <p className="flex items-start gap-2">
                    <span className="text-gold mt-1">✓</span>
                    {t("getStarted.employer.item1")}
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-gold mt-1">✓</span>
                    {t("getStarted.employer.item2")}
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-gold mt-1">✓</span>
                    {t("getStarted.employer.item3")}
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-gold mt-1">✓</span>
                    {t("getStarted.employer.item4")}
                  </p>
                </div>
                <Button className="w-full" variant="gold" size="lg" asChild>
                  <Link to="/employers">
                    {t("getStarted.employer.button")} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Candidate Card */}
            <Card className="border-2 border-accent/20 hover:border-accent hover:shadow-elegant transition-smooth overflow-hidden group">
              <div className="h-48 bg-accent/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent-light opacity-80 group-hover:opacity-90 transition-smooth"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Users className="h-20 w-20 text-accent-foreground" />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-3xl">{t("getStarted.candidate.title")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  {t("getStarted.candidate.subtitle")}
                </p>
                <div className="space-y-3 text-muted-foreground">
                  <p className="flex items-start gap-2">
                    <span className="text-gold mt-1">✓</span>
                    {t("getStarted.candidate.item1")}
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-gold mt-1">✓</span>
                    {t("getStarted.candidate.item2")}
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-gold mt-1">✓</span>
                    {t("getStarted.candidate.item3")}
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-gold mt-1">✓</span>
                    {t("getStarted.candidate.item4")}
                  </p>
                </div>
                <Button className="w-full" variant="accent" size="lg" asChild>
                  <Link to="/candidates">
                    {t("getStarted.candidate.button")} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-gold/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("getStarted.help.title1")} <span className="text-accent">{t("getStarted.help.title2")}</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t("getStarted.help.subtitle")}
            </p>
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-accent hover:text-white transition-smooth shadow-lg" asChild>
              <Link to="/contact">{t("getStarted.help.button")}</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;