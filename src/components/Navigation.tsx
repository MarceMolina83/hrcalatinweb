import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.jpeg";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/") return t("nav.home");
    if (path === "/employers") return t("nav.employers");
    if (path === "/candidates") return t("nav.candidates");
    if (path === "/contact") return t("nav.contact");
    if (path === "/about") return t("nav.about");
    return "";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-20 relative px-4">
          {/* Left side: Page Title */}
          <div className="flex-1 hidden md:flex items-center relative h-full">
            <div className="absolute inset-y-0 -left-[50vw] right-0 bg-gradient-to-r from-primary/60 via-primary/30 to-transparent z-0" />
            <span className="relative z-10 text-2xl font-sans font-bold tracking-tight text-secondary transition-all duration-500 animate-fade-in whitespace-nowrap pl-6 uppercase">
              {getPageTitle()}
            </span>
          </div>

          {/* Logo (Centered) */}
          <Link
            to="/"
            className="md:absolute md:left-1/2 md:-translate-x-1/2 flex items-center gap-3 transition-smooth hover:opacity-80 z-50"
          >
            <img src={logo} alt="HR-CALATIN Logo" className="h-16 w-32 md:h-20 md:w-40 object-contain" />
          </Link>

          {/* Right Side: Desktop Menu + Language */}
          <div className="flex-1 flex items-center justify-end gap-2 md:gap-4 relative h-full">
            <div className="hidden md:block absolute inset-y-0 left-0 -right-[50vw] bg-gradient-to-l from-primary/60 via-primary/30 to-transparent z-0" />

            {/* Desktop Hover Menu */}
            <div className="hidden md:block relative group z-10">
              <button className="p-2 hover:bg-muted rounded-lg transition-smooth flex items-center gap-2">
                <Menu className="h-6 w-6" />
              </button>

              {/* Dropdown Content */}
              <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-smooth scale-95 group-hover:scale-100 origin-top-right z-50">
                <div className="bg-background border border-border rounded-xl shadow-xl p-3 min-w-[220px] space-y-1">
                  <Button size="sm" className="w-full justify-start gradient-hero hover:bg-accent hover:text-white transition-smooth" asChild>
                    <Link to="/">{t("nav.home")}</Link>
                  </Button>
                  <Button size="sm" className="w-full justify-start gradient-hero hover:bg-accent hover:text-white transition-smooth" asChild>
                    <Link to="/employers">{t("nav.employers")}</Link>
                  </Button>
                  <Button size="sm" className="w-full justify-start gradient-hero hover:bg-accent hover:text-white transition-smooth" asChild>
                    <Link to="/candidates">{t("nav.candidates")}</Link>
                  </Button>
                  <div className="h-px bg-border my-1"></div>
                  <Button size="sm" className="w-full justify-start gradient-hero hover:bg-accent hover:text-white transition-smooth" asChild>
                    <Link to="/contact">{t("nav.contact")}</Link>
                  </Button>
                  <Button size="sm" className="w-full justify-start gradient-hero hover:bg-accent hover:text-white transition-smooth" asChild>
                    <a href="/#get-started">{t("nav.getStarted")}</a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Language Switcher always visible on desktop */}
            <div className="hidden md:block relative z-10 transition-smooth hover:scale-105">
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-smooth relative z-10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Button variant="default" size="sm" className="w-full" asChild>
                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                  {t("nav.home")}
                </Link>
              </Button>
              <Button variant="gold" size="sm" className="w-full" asChild>
                <Link to="/employers" onClick={() => setIsMenuOpen(false)}>
                  {t("nav.employers")}
                </Link>
              </Button>
              <Button variant="accent" size="sm" className="w-full" asChild>
                <Link to="/candidates" onClick={() => setIsMenuOpen(false)}>
                  {t("nav.candidates")}
                </Link>
              </Button>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <div className="flex justify-center mb-2">
                  <LanguageSwitcher />
                </div>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/contact" onClick={() => setIsMenuOpen(false)}>{t("nav.contact")}</Link>
                </Button>
                <Button size="lg" className="gradient-hero" asChild>
                  <a href="/#get-started" onClick={() => setIsMenuOpen(false)}>{t("nav.getStarted")}</a>
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
