import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.jpeg";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 transition-smooth hover:opacity-80">
            <img src={logo} alt="HR-CALATIN Logo" className="h-20 w-40 md:h-22 md:w-44 object-contain" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground hover:text-primary transition-smooth font-medium">
              {t("nav.home")}
            </Link>
            <Link to="/employers" className="text-foreground hover:text-primary transition-smooth font-medium">
              {t("nav.employers")}
            </Link>
            <Link to="/candidates" className="text-foreground hover:text-primary transition-smooth font-medium">
              {t("nav.candidates")}
            </Link>
          </div>

          {/* CTA Buttons & Language Switcher */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">{t("nav.contact")}</Link>
            </Button>
            <Button size="lg" className="gradient-hero" asChild>
              <Link to="/get-started">{t("nav.getStarted")}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-smooth"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                className="text-foreground hover:text-primary transition-smooth font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.home")}
              </Link>
              <Link
                to="/employers"
                className="text-foreground hover:text-primary transition-smooth font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.employers")}
              </Link>
              <Link
                to="/candidates"
                className="text-foreground hover:text-primary transition-smooth font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.candidates")}
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <div className="flex justify-center mb-2">
                  <LanguageSwitcher />
                </div>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/contact">{t("nav.contact")}</Link>
                </Button>
                <Button size="lg" className="gradient-hero" asChild>
                  <Link to="/get-started">{t("nav.getStarted")}</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
