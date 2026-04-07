import { 
  Shield, 
  Calendar, 
  CreditCard, 
  RefreshCw, 
  AlertTriangle, 
  FileText,
  BadgeDollarSign,
  MessageSquare
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const conditions = [
  { icon: Calendar, text: 'Vigencia: 15 días naturales' },
  { icon: CreditCard, text: 'Pago: Transferencia / depósito / SPEI' },
  { icon: RefreshCw, text: 'Renovación: automática o manual' },
  { icon: AlertTriangle, text: 'Suspensión por impago al vencimiento' },
  { icon: FileText, text: 'Facturación disponible (+IVA si aplica)' },
  { icon: BadgeDollarSign, text: 'Moneda: Pesos mexicanos (MXN)' },
];

export default function ConditionsSection() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <Card className="rounded-sm border">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg font-heading">
            <Shield className="w-5 h-5 text-primary" />
            Condiciones Comerciales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-3">
            {conditions.map((condition, i) => (
              <div 
                key={i}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <condition.icon className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>{condition.text}</span>
              </div>
            ))}
          </div>
          
          {/* Contact CTA */}
          <div className="mt-6 pt-6 border-t flex items-center gap-3 p-4 rounded-sm bg-muted/50">
            <MessageSquare className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">¿Tienes dudas?</strong>{' '}
              Contáctanos y te ayudamos a elegir el mejor plan según tu operación.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
