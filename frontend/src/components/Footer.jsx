import { Truck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t py-8 mt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Truck className="w-4 h-4 text-primary" />
          <span className="font-heading font-semibold text-sm">VENTA</span>
        </div>
        <p className="text-xs text-muted-foreground">
          © 2026 Venta — Gestión Logística y de Transportes
        </p>
      </div>
    </footer>
  );
}
