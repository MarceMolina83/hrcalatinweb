import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Users2, Building2, Sparkles, CheckCircle2, Rocket, Heart, Zap } from "lucide-react";
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
            <img src={logo} alt="HR-CALATIN Logo" className="h-29 w-29 object-contain mx-auto mb-6" />
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
            <Card className="border-2 hover:shadow-elegant transition-smooth">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg gradient-hero flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>{t("home.why.expertise.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("home.why.expertise.description")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-elegant transition-smooth">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg gradient-hero flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>{t("home.why.quality.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("home.why.quality.description")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-elegant transition-smooth">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg gradient-hero flex items-center justify-center mb-4">
                  <Rocket className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>{t("home.why.support.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("home.why.support.description")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Portal CTAs */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Employers Portal */}
            <Card className="border-2 border-primary/20 hover:border-primary transition-smooth overflow-hidden group">
              <div className="h-48 bg-primary/10 relative overflow-hidden">
                <div className="absolute inset-0 gradient-hero opacity-80 group-hover:opacity-90 transition-smooth"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Building2 className="h-20 w-20 text-primary-foreground" />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-3xl">{t("home.portal.employers.title")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  {t("home.portal.employers.description")}
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                    <span>{t("home.portal.employers.item1")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                    <span>{t("home.portal.employers.item2")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                    <span>{t("home.portal.employers.item3")}</span>
                  </li>
                </ul>
                <Button className="w-full" variant="gold" size="lg" asChild>
                  <Link to="/employers">
                    {t("home.portal.employers.button")} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Candidates Portal */}
            <Card className="border-2 border-accent/20 hover:border-accent transition-smooth overflow-hidden group">
              <div className="h-48 bg-accent/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent-light opacity-80 group-hover:opacity-90 transition-smooth"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Users2 className="h-20 w-20 text-accent-foreground" />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-3xl">{t("home.portal.candidates.title")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  {t("home.portal.candidates.description")}
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                    <span>{t("home.portal.candidates.item1")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                    <span>{t("home.portal.candidates.item2")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                    <span>{t("home.portal.candidates.item3")}</span>
                  </li>
                </ul>
                <Button className="w-full" variant="accent" size="lg" asChild>
                  <Link to="/candidates">
                    {t("home.portal.candidates.button")} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Legal Pathways Section */}
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
              <Card className="border-2 border-gold/30 hover:border-gold transition-smooth">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🌍</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3 text-gold">{t("home.pathways.holiday.title")}</h3>
                      <p className="text-muted-foreground">
                        {t("home.pathways.holiday.description")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Free Trade Agreements */}
              <Card className="border-2 border-accent/30 hover:border-accent transition-smooth">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🤝</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3 text-accent">{t("home.pathways.fta.title")}</h3>
                      <p className="text-muted-foreground mb-4">
                        {t("home.pathways.fta.description")}
                      </p>
                      <div className="bg-accent/10 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          {t("home.pathways.fta.engineering")}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* SAWP */}
              <Card className="border-2 border-primary/30 hover:border-primary transition-smooth">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🌾</span>
                    </div>
                    <div>
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

      {/* Stats Section */}
      <section className="py-20 bg-primary/10">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-8">
            <img src={logo} alt="HR-CALATIN Logo" className="h-24 w-24 object-contain" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto text-center">
            <div className="space-y-2">
              <div className="text-5xl font-bold text-primary">500+</div>
              <div className="text-foreground/70">{t("home.stats.placements")}</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold text-primary">150+</div>
              <div className="text-foreground/70">{t("home.stats.companies")}</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold text-primary">95%</div>
              <div className="text-foreground/70">{t("home.stats.satisfaction")}</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold text-primary">10+</div>
              <div className="text-foreground/70">{t("home.stats.experience")}</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;