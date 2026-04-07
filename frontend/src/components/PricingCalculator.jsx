import { Download, Key, Crown, Receipt, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

function formatPrice(n) {
  return '$' + n.toLocaleString('es-MX');
}

function PriceOption({ options, selected, onChange, name, disabled = false }) {
  return (
    <RadioGroup
      value={selected.toString()}
      onValueChange={(val) => onChange(parseInt(val))}
      disabled={disabled}
      className="space-y-2"
    >
      {options.map((opt, i) => (
        <div
          key={i}
          className={`flex items-center gap-3 p-3 rounded-sm border transition-all cursor-pointer ${
            selected === i 
              ? 'border-primary bg-primary/5 dark:bg-primary/10' 
              : 'border-border hover:border-primary/50'
          } ${disabled ? 'opacity-40 pointer-events-none' : ''}`}
          onClick={() => !disabled && onChange(i)}
        >
          <RadioGroupItem 
            value={i.toString()} 
            id={`${name}-${i}`}
            data-testid={`${name}-option-${i}`}
          />
          <Label 
            htmlFor={`${name}-${i}`} 
            className="flex-1 cursor-pointer"
          >
            <span className="block text-sm font-semibold">
              {opt.label} — {formatPrice(opt.price)}
            </span>
            <span className="block text-xs text-muted-foreground">
              {opt.period}
            </span>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}

export default function PricingCalculator({
  includeInstall,
  setIncludeInstall,
  selectedLicense,
  onLicenseChange,
  includePremium,
  onPremiumToggle,
  selectedPremium,
  onPremiumChange,
  licenseOptions,
  premiumOptions,
  prices,
  promoApplied,
  onOpenModal,
  summary,
}) {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <h2 className="font-heading text-2xl font-bold mb-6 text-center tracking-tight">
        Configura tu Plan
      </h2>
      
      <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {/* Installation */}
        <Card className="rounded-sm border">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-sm bg-primary/10 flex items-center justify-center">
                <Download className="w-4 h-4 text-primary" />
              </div>
              <CardTitle className="text-base font-heading">Instalación</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-3">
              Pago único — Implementación completa
            </p>
            <div className="text-3xl font-bold font-heading text-primary price-display price-change">
              {formatPrice(prices.installPrice || prices.originalInstall)}
            </div>
            {prices.discount > 0 && (
              <p className="text-xs text-green-600 dark:text-green-500 mt-1">
                -10% descuento aplicado
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1">MXN · Pago único</p>
            
            <div className="mt-4 flex items-center gap-2">
              <Checkbox
                id="install-check"
                data-testid="install-checkbox"
                checked={includeInstall}
                onCheckedChange={setIncludeInstall}
              />
              <Label htmlFor="install-check" className="text-sm cursor-pointer">
                Incluir instalación
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* License */}
        <Card className="rounded-sm border">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-sm bg-blue-500/10 flex items-center justify-center">
                <Key className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-base font-heading">Licencia</CardTitle>
              <Badge variant="destructive" className="text-[10px] rounded-sm">
                OBLIGATORIA
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <PriceOption
              options={licenseOptions}
              selected={selectedLicense}
              onChange={onLicenseChange}
              name="license"
            />
          </CardContent>
        </Card>

        {/* Premium */}
        <Card className="rounded-sm border">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-sm bg-yellow-500/10 flex items-center justify-center">
                <Crown className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
              </div>
              <CardTitle className="text-base font-heading">Premium</CardTitle>
              <Badge variant="outline" className="text-[10px] rounded-sm text-yellow-600 dark:text-yellow-400 border-yellow-500/30">
                OPCIONAL
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-3 flex items-center gap-2">
              <Switch
                id="premium-toggle"
                data-testid="premium-toggle"
                checked={includePremium}
                onCheckedChange={onPremiumToggle}
              />
              <Label htmlFor="premium-toggle" className="text-sm cursor-pointer">
                Agregar Premium
              </Label>
            </div>
            <PriceOption
              options={premiumOptions}
              selected={selectedPremium}
              onChange={onPremiumChange}
              name="premium"
              disabled={!includePremium}
            />
          </CardContent>
        </Card>
      </div>

      {/* Summary */}
      <Card className="rounded-sm border-2 border-primary/30">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg font-heading">
            <Receipt className="w-5 h-5 text-primary" />
            Resumen de tu Selección
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 mb-6">
            {summary.map((item, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {item.label}
                  {item.note && (
                    <span className="text-primary text-xs ml-2">{item.note}</span>
                  )}
                </span>
                <span className="font-semibold text-sm price-display">
                  {formatPrice(item.price)}
                </span>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total primer pago</p>
              <p 
                data-testid="total-price"
                className="text-3xl font-bold font-heading text-primary price-display price-change"
              >
                {formatPrice(prices.total)}
              </p>
              <p className="text-xs text-muted-foreground">MXN · Precios antes de IVA</p>
            </div>
            
            <Button
              data-testid="request-license-btn"
              onClick={onOpenModal}
              size="lg"
              className="rounded-sm w-full sm:w-auto"
            >
              <Mail className="w-4 h-4 mr-2" />
              Solicitar Licencia
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
