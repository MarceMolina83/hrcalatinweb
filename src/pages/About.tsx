import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">{t("about.hero.title")}</h1>
              <p className="text-xl text-muted-foreground">
                {t("about.hero.subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="border-2 hover:shadow-elegant transition-smooth">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-lg gradient-hero flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{t("about.mission.title")}</h3>
                  <p className="text-muted-foreground">
                    {t("about.mission.description")}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-elegant transition-smooth">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-lg gradient-hero flex items-center justify-center mb-4">
                    <Eye className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{t("about.vision.title")}</h3>
                  <p className="text-muted-foreground">
                    {t("about.vision.description")}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-elegant transition-smooth">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-lg gradient-hero flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{t("about.values.title")}</h3>
                  <p className="text-muted-foreground">
                    {t("about.values.description")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">{t("about.story.title")}</h2>
              <div className="space-y-6 text-lg text-muted-foreground">
                <p>{t("about.story.p1")}</p>
                <p>{t("about.story.p2")}</p>
                <p>{t("about.story.p3")}</p>
                <p>{t("about.story.p4")}</p>
              </div>
            </div>
          </div>
        </section>


        {/* Why We're Different */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-gold/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">{t("about.different.title")}</h2>
              <div className="space-y-8">
                <Card className="border-l-4 border-l-primary">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-3">{t("about.different.cultural.title")}</h3>
                    <p className="text-muted-foreground">
                      {t("about.different.cultural.description")}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-accent">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-3">{t("about.different.support.title")}</h3>
                    <p className="text-muted-foreground">
                      {t("about.different.support.description")}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-gold">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-3">{t("about.different.quality.title")}</h3>
                    <p className="text-muted-foreground">
                      {t("about.different.quality.description")}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-primary">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-3">{t("about.different.partnership.title")}</h3>
                    <p className="text-muted-foreground">
                      {t("about.different.partnership.description")}
                    </p>
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

export default About;
