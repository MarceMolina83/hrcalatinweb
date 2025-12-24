import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Briefcase, Users, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const GetStarted = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-24 gradient-hero text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">{t("getStarted.hero.title")}</h1>
              <p className="text-xl text-primary-foreground/90">
                {t("getStarted.hero.subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Selection Cards */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Employer Card */}
              <Card className="border-2 border-primary/20 hover:border-primary hover:shadow-elegant transition-smooth group">
                <CardHeader className="text-center pb-8">
                  <div className="h-24 w-24 rounded-full gradient-hero flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-smooth">
                    <Briefcase className="h-12 w-12 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-3xl mb-2">{t("getStarted.employer.title")}</CardTitle>
                  <CardDescription className="text-base">
                    {t("getStarted.employer.subtitle")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
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
              <Card className="border-2 border-accent/20 hover:border-accent hover:shadow-elegant transition-smooth group">
                <CardHeader className="text-center pb-8">
                  <div className="h-24 w-24 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-smooth">
                    <Users className="h-12 w-12 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-3xl mb-2">{t("getStarted.candidate.title")}</CardTitle>
                  <CardDescription className="text-base">
                    {t("getStarted.candidate.subtitle")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
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

        {/* Additional Info */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t("getStarted.help.title1")} <span className="text-accent">{t("getStarted.help.title2")}</span>?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                {t("getStarted.help.subtitle")}
              </p>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">{t("getStarted.help.button")}</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default GetStarted;
