import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";


const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex flex-col gap-0.5 bg-muted rounded-lg p-0.5">
      <Button
        variant={language === "en" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("en")}
        className="h-6 px-1.5 text-[10px] font-bold"
      >
        EN
      </Button>
      <Button
        variant={language === "es" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("es")}
        className="h-6 px-1.5 text-[10px] font-bold"
      >
        ES
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
