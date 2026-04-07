import { useState } from 'react';
import { Send, CheckCircle, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

function formatPrice(n) {
  return '$' + n.toLocaleString('es-MX');
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export default function EmailModal({
  isOpen,
  onClose,
  summary,
  total,
  contactEmail,
  licenseLabel,
  premiumLabel,
  promoApplied,
}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate email
    if (!validateEmail(email)) {
      setEmailError('Por favor ingresa un correo válido');
      return;
    }
    setEmailError('');

    // Build mailto body
    let body = `Solicitud de Licencia Venta\n\n`;
    body += `Nombre/Empresa: ${name || 'No especificado'}\n`;
    body += `Correo del cliente: ${email}\n\n`;
    body += `--- Detalle del Plan ---\n`;
    
    summary.forEach((item) => {
      body += `${item.label}: ${formatPrice(item.price)}`;
      if (item.note) body += ` (${item.note})`;
      body += `\n`;
    });
    
    body += `\nTotal primer pago: ${formatPrice(total)} MXN\n`;

    const subject = encodeURIComponent(`Solicitud de Licencia Venta — ${name || email}`);
    const encodedBody = encodeURIComponent(body);
    const ccParam = encodeURIComponent(email);
    
    const mailtoLink = `mailto:${contactEmail}?subject=${subject}&body=${encodedBody}&cc=${ccParam}`;
    
    // Open mailto
    window.open(mailtoLink, '_blank');
    
    // Show success state
    setShowSuccess(true);
    toast.success('¡Correo preparado! Revisa tu cliente de correo.');
  };

  const handleClose = () => {
    setShowSuccess(false);
    setEmail('');
    setName('');
    setEmailError('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md rounded-sm">
        <DialogHeader>
          <DialogTitle className="font-heading">Solicitar Licencia</DialogTitle>
          <DialogDescription>
            Completa tus datos para enviar la solicitud
          </DialogDescription>
        </DialogHeader>

        {!showSuccess ? (
          <>
            {/* Summary Preview */}
            <div className="rounded-sm p-4 border bg-muted/30 text-sm space-y-1.5">
              {summary.map((item, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium">{formatPrice(item.price)}</span>
                </div>
              ))}
              <div className="flex justify-between pt-2 mt-2 border-t font-bold">
                <span>Total</span>
                <span className="text-primary">{formatPrice(total)} MXN</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userEmail">Tu correo electrónico *</Label>
                <Input
                  id="userEmail"
                  data-testid="user-email-input"
                  type="email"
                  placeholder="tucorreo@ejemplo.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  required
                  className={`rounded-sm ${emailError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                />
                {emailError && (
                  <p className="text-xs text-red-500">{emailError}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="userName">Tu nombre (opcional)</Label>
                <Input
                  id="userName"
                  data-testid="user-name-input"
                  type="text"
                  placeholder="Nombre o empresa"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-sm"
                />
              </div>

              <Button
                type="submit"
                data-testid="submit-request-btn"
                className="w-full rounded-sm"
                size="lg"
              >
                <Send className="w-4 h-4 mr-2" />
                Enviar Solicitud
              </Button>
            </form>
          </>
        ) : (
          /* Success State */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-green-100 dark:bg-green-900/30">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-500" />
            </div>
            <h4 className="font-heading font-bold text-lg mb-2">¡Solicitud preparada!</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Tu cliente de correo se ha abierto con los detalles de tu solicitud. 
              Envíalo para completar el proceso.
            </p>
            <Button
              onClick={handleClose}
              variant="outline"
              className="rounded-sm"
              data-testid="close-success-btn"
            >
              Cerrar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
