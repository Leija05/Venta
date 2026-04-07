import "@/App.css";
import { useState, useEffect, useCallback } from "react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

// Components
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ScopeSection from "@/components/ScopeSection";
import PricingCalculator from "@/components/PricingCalculator";
import PlanCards from "@/components/PlanCards";
import PromoSection from "@/components/PromoSection";
import ConditionsSection from "@/components/ConditionsSection";
import Footer from "@/components/Footer";
import EmailModal from "@/components/EmailModal";

// Pricing Data
const LICENSE_OPTIONS = [
  { label: 'Mensual', price: 800, period: 'mes' },
  { label: 'Bimestral', price: 1500, period: '2 meses' },
  { label: 'Trimestral', price: 2200, period: '3 meses' },
  { label: 'Semestral', price: 4200, period: '6 meses' },
  { label: 'Anual', price: 7800, period: '12 meses' },
];

const PREMIUM_OPTIONS = [
  { label: 'Mensual', price: 600, period: 'mes' },
  { label: 'Bimestral', price: 1150, period: '2 meses' },
  { label: 'Trimestral', price: 1650, period: '3 meses' },
  { label: 'Semestral', price: 3150, period: '6 meses' },
  { label: 'Anual', price: 5700, period: '12 meses' },
];

const BASE_INSTALL_PRICE = 3600;
const CONTACT_EMAIL = 'leijahector5@gmail.com';
const WHATSAPP_NUMBER = '528674718298';
const PROMO_STORAGE_KEY = 'ventaPromoUsed';

function App() {
  // Theme state
  const [isDark, setIsDark] = useState(false);
  
  // Pricing state
  const [includeInstall, setIncludeInstall] = useState(true);
  const [selectedLicense, setSelectedLicense] = useState(1); // Bimestral default
  const [includePremium, setIncludePremium] = useState(false);
  const [selectedPremium, setSelectedPremium] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoUsed, setPromoUsed] = useState(false);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Theme toggle effect
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    const savedPromoStatus = localStorage.getItem(PROMO_STORAGE_KEY);
    if (savedPromoStatus === 'true') {
      setPromoUsed(true);
    }
  }, []);

  // Calculate prices
  const calculatePrices = useCallback(() => {
    let installPrice = includeInstall ? BASE_INSTALL_PRICE : 0;
    const licensePrice = LICENSE_OPTIONS[selectedLicense].price;
    let premiumPrice = includePremium ? PREMIUM_OPTIONS[selectedPremium].price : 0;
    let discount = 0;
    let promoSavings = 0;

    // Promo: Install + 1st month Premium = $4,000
    if (promoApplied && includeInstall && includePremium && selectedPremium === 0) {
      const normalPrice = BASE_INSTALL_PRICE + PREMIUM_OPTIONS[0].price; // 3600 + 600 = 4200
      promoSavings = normalPrice - 4000; // 200
      installPrice = 4000;
      premiumPrice = 0;
    }

    // 10% discount on install if Annual License + Annual Premium
    if (!promoApplied && includeInstall && selectedLicense === 4 && includePremium && selectedPremium === 4) {
      discount = Math.round(installPrice * 0.1);
      installPrice = installPrice - discount;
    }

    const total = installPrice + licensePrice + premiumPrice;

    return {
      installPrice,
      licensePrice,
      premiumPrice,
      discount,
      promoSavings,
      total,
      originalInstall: BASE_INSTALL_PRICE,
    };
  }, [includeInstall, selectedLicense, includePremium, selectedPremium, promoApplied]);

  const prices = calculatePrices();

  // Apply promo
  const applyPromo = () => {
    if (promoUsed) {
      toast.error("Esta promo ya fue utilizada en este dispositivo.");
      return;
    }

    setIncludeInstall(true);
    setIncludePremium(true);
    setSelectedPremium(0);
    setPromoApplied(true);
    setPromoUsed(true);
    localStorage.setItem(PROMO_STORAGE_KEY, 'true');
    toast.success("¡Promo de arranque aplicada!");
  };

  // Select package
  const selectPackage = (pkg) => {
    setPromoApplied(false);
    setIncludeInstall(true);
    
    switch(pkg) {
      case 'esencial':
        setIncludePremium(false);
        setSelectedLicense(1);
        toast.success("Plan Esencial seleccionado");
        break;
      case 'operativo':
        setIncludePremium(true);
        setSelectedLicense(1);
        setSelectedPremium(0);
        toast.success("Plan Operativo seleccionado");
        break;
      case 'empresarial':
        setIncludePremium(true);
        setSelectedLicense(4);
        setSelectedPremium(4);
        toast.success("Plan Empresarial seleccionado");
        break;
      default:
        break;
    }
  };

  // Handle license/premium change (reset promo if changed)
  const handleLicenseChange = (index) => {
    setSelectedLicense(index);
    if (promoApplied) setPromoApplied(false);
  };

  const handlePremiumChange = (index) => {
    setSelectedPremium(index);
    if (promoApplied && index !== 0) setPromoApplied(false);
  };

  const handlePremiumToggle = (checked) => {
    setIncludePremium(checked);
    if (!checked) setPromoApplied(false);
  };

  // Build summary for email
  const buildSummary = () => {
    const items = [];
    
    if (promoApplied && includeInstall && includePremium && selectedPremium === 0) {
      items.push({ label: 'Promo: Instalación + 1er mes Premium', price: 4000, note: 'Ahorro $200' });
    } else {
      if (includeInstall) {
        const note = prices.discount > 0 ? `-10% desc. ($${prices.discount.toLocaleString('es-MX')})` : '';
        items.push({ label: 'Instalación (pago único)', price: prices.installPrice, note });
      }
      if (includePremium) {
        items.push({ label: `Premium ${PREMIUM_OPTIONS[selectedPremium].label}`, price: prices.premiumPrice });
      }
    }
    
    items.push({ label: `Licencia ${LICENSE_OPTIONS[selectedLicense].label}`, price: prices.licensePrice });
    
    return items;
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header isDark={isDark} setIsDark={setIsDark} />
      
      <main>
        <Hero />
        
        <PromoSection onApplyPromo={applyPromo} promoApplied={promoApplied || promoUsed} />
        
        <ScopeSection />
        
        <PricingCalculator
          includeInstall={includeInstall}
          setIncludeInstall={setIncludeInstall}
          selectedLicense={selectedLicense}
          onLicenseChange={handleLicenseChange}
          includePremium={includePremium}
          onPremiumToggle={handlePremiumToggle}
          selectedPremium={selectedPremium}
          onPremiumChange={handlePremiumChange}
          licenseOptions={LICENSE_OPTIONS}
          premiumOptions={PREMIUM_OPTIONS}
          prices={prices}
          promoApplied={promoApplied}
          onOpenModal={() => setIsModalOpen(true)}
          summary={buildSummary()}
        />
        
        <PlanCards onSelectPackage={selectPackage} />
        
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="rounded-sm p-4 sm:p-5 text-center border border-primary/20 bg-primary/5">
            <p className="text-sm text-muted-foreground">
              <strong className="text-primary">Promo adicional:</strong> Contrata Licencia anual + Premium anual al inicio y obtén{' '}
              <span className="font-bold text-primary">10% de descuento en instalación</span>{' '}
              ($3,240 en vez de $3,600)
            </p>
          </div>
        </section>
        
        <ConditionsSection />
      </main>
      
      <Footer />
      
      <EmailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        summary={buildSummary()}
        total={prices.total}
        contactEmail={CONTACT_EMAIL}
        whatsappNumber={WHATSAPP_NUMBER}
        licenseLabel={LICENSE_OPTIONS[selectedLicense].label}
        premiumLabel={includePremium ? PREMIUM_OPTIONS[selectedPremium].label : null}
        promoApplied={promoApplied}
      />
      
      <Toaster position="bottom-center" />
    </div>
  );
}

export default App;
