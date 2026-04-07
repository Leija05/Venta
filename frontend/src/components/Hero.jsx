import { CalendarDays, BadgeDollarSign } from 'lucide-react';

const HERO_IMAGE = 'https://static.prod-images.emergentagent.com/jobs/de54c356-b2d1-416c-b995-08c63c9e8e19/images/b3d88b5df2eb823891c4701cc63b0f348f097068798ac295016cc7b207252f08.png';

export default function Hero() {
  return (
    <section className="relative min-h-[320px] sm:min-h-[400px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      />
      
      {/* Overlay */}
      <div className="hero-overlay absolute inset-0" />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-white">
        <p className="uppercase text-xs tracking-[0.2em] mb-4 text-white/70 font-medium">
          Quimbar Logistics
        </p>
        
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-balance">
          Sistema Quimbar
        </h1>
        
        <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-xl">
          Gestión Logística y de Transportes — Solución profesional para control logístico
        </p>
        
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/10 backdrop-blur-sm border border-white/20">
            <CalendarDays className="w-4 h-4" />
            <span>7 de abril de 2026</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/10 backdrop-blur-sm border border-white/20">
            <BadgeDollarSign className="w-4 h-4" />
            <span>Precios en MXN</span>
          </div>
        </div>
      </div>
    </section>
  );
}
