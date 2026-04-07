import { Check, X, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ScopeSection() {
  const includes = [
    'Implementación e instalación del sistema',
    'Activación de licencia por periodo contratado',
    'Soporte básico de activación/licenciamiento',
    'Modo Premium opcional para funciones avanzadas',
  ];

  const excludes = [
    'Desarrollo a medida',
    'Integraciones externas no contempladas',
    'Soporte 24/7',
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <Card className="rounded-sm border">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg font-heading">
            <Package className="w-5 h-5 text-primary" />
            Alcance del Servicio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Includes */}
            <div>
              <h4 className="font-semibold text-sm mb-3 text-primary uppercase tracking-wide">
                Incluye:
              </h4>
              <ul className="space-y-2.5">
                {includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Excludes */}
            <div>
              <h4 className="font-semibold text-sm mb-3 text-muted-foreground/60 uppercase tracking-wide">
                No incluye (salvo acuerdo):
              </h4>
              <ul className="space-y-2.5">
                {excludes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground/60">
                    <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
