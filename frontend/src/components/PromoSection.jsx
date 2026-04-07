import { Sparkles, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function PromoSection({ onApplyPromo, promoApplied }) {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <div className="rounded-sm p-5 sm:p-6 border-2 border-primary/30 bg-primary/5 dark:bg-primary/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <Badge 
              className="mb-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm promo-pulse"
              data-testid="promo-badge"
            >
              <Sparkles className="w-3 h-3 mr-1" />
              ¡Promo de Arranque!
            </Badge>
            <h3 className="font-heading text-lg sm:text-xl font-bold">
              Instalación + 1er mes Premium:{' '}
              <span className="text-primary">$4,000 MXN</span>
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Precio normal: $4,200 — Ahorro inmediato de <strong>$200</strong>
            </p>
          </div>
          
          <Button
            data-testid="apply-promo-btn"
            onClick={onApplyPromo}
            disabled={promoApplied}
            className="flex-shrink-0 rounded-sm"
            size="lg"
          >
            {promoApplied ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Aplicada
              </>
            ) : (
              'Aplicar Promo'
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}
