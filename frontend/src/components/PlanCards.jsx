import { Check, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const plans = [
  {
    id: 'esencial',
    name: 'Plan Esencial',
    description: 'Para comenzar',
    price: 'Desde $4,400',
    features: [
      { text: 'Instalación única', included: true },
      { text: 'Licencia a elegir', included: true },
      { text: 'Premium no incluido', included: false },
    ],
    recommended: false,
  },
  {
    id: 'operativo',
    name: 'Plan Operativo',
    description: 'Operación continua',
    price: 'Desde $5,000',
    features: [
      { text: 'Instalación única', included: true },
      { text: 'Licencia a elegir', included: true },
      { text: 'Premium mensual/bimestral', included: true },
    ],
    recommended: true,
  },
  {
    id: 'empresarial',
    name: 'Plan Empresarial',
    description: 'Máximo ahorro',
    price: 'Desde $17,100',
    features: [
      { text: 'Instalación (desc. posible)', included: true },
      { text: 'Licencia semestral/anual', included: true },
      { text: 'Premium semestral/anual', included: true },
    ],
    recommended: false,
  },
];

export default function PlanCards({ onSelectPackage }) {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h2 className="font-heading text-2xl font-bold mb-6 text-center tracking-tight">
        Paquetes Comerciales
      </h2>
      
      <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`rounded-sm plan-card cursor-pointer transition-all ${
              plan.recommended 
                ? 'border-2 border-primary relative' 
                : 'border hover:border-primary/50'
            }`}
            onClick={() => onSelectPackage(plan.id)}
            data-testid={`plan-card-${plan.id}`}
          >
            {plan.recommended && (
              <Badge 
                className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground rounded-sm"
              >
                <Star className="w-3 h-3 mr-1" />
                RECOMENDADO
              </Badge>
            )}
            
            <CardHeader className="pb-3 pt-5">
              <CardTitle className="font-heading text-lg">{plan.name}</CardTitle>
              <CardDescription className="text-xs">{plan.description}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-2 mb-4">
                {plan.features.map((feature, i) => (
                  <li 
                    key={i} 
                    className={`flex items-start gap-2 text-sm ${
                      feature.included 
                        ? 'text-muted-foreground' 
                        : 'text-muted-foreground/40 line-through'
                    }`}
                  >
                    <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                      feature.included ? 'text-green-600 dark:text-green-500' : 'text-muted-foreground/30'
                    }`} />
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
              
              <p className="text-xs font-semibold text-primary">
                {plan.price} MXN
              </p>
              
              <Button
                variant={plan.recommended ? 'default' : 'outline'}
                className="w-full mt-4 rounded-sm"
                data-testid={`select-plan-${plan.id}`}
              >
                Seleccionar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Payment Examples */}
      <div className="mt-8 grid grid-cols-3 gap-4 text-center">
        <div className="p-4 border rounded-sm">
          <p className="text-2xl font-bold font-heading text-primary">$5,100</p>
          <p className="text-xs text-muted-foreground">Ejemplo base</p>
        </div>
        <div className="p-4 border rounded-sm">
          <p className="text-2xl font-bold font-heading text-primary">$5,500</p>
          <p className="text-xs text-muted-foreground">Con promo</p>
        </div>
        <div className="p-4 border rounded-sm">
          <p className="text-2xl font-bold font-heading text-primary">$17,100</p>
          <p className="text-xs text-muted-foreground">Empresarial</p>
        </div>
      </div>
    </section>
  );
}
