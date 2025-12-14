import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative w-full min-h-[480px] flex items-center overflow-hidden bg-slate-900 pt-24 pb-12">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Office Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-900/95 to-brand-800/80"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Text Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-200 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              Soluções em Cuiabá e Região
            </div>
            
            <h1 className="text-xl md:text-3xl lg:text-4xl font-display font-bold text-white leading-snug text-justify tracking-wider">
              Soluções Completas em Materiais Promocionais.
            </h1>
            
            <p className="text-base md:text-lg text-slate-300 max-w-xl leading-relaxed text-justify">
              Transforme a imagem do seu negócio com crachás, cartões, copos e muito mais. 
              Qualidade premium e agilidade que sua empresa merece.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#services" className="bg-brand-600 hover:bg-brand-500 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-brand-900/20 flex items-center gap-2 group">
                Ver Nossos Serviços
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#system" className="px-6 py-3 rounded-xl font-semibold text-white border border-white/20 hover:bg-white/10 transition-colors backdrop-blur-sm">
                Área do Cliente
              </a>
            </div>

            <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                "Entrega Ágil",
                "Design Exclusivo",
                "Alta Durabilidade"
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-slate-300 text-sm">
                  <CheckCircle2 className="text-brand-400" size={16} />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Image Area */}
          <div className="relative w-full h-full mt-8 lg:mt-0">
            {/* Background Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-600/20 blur-3xl rounded-full -z-10"></div>
            
            {/* Image Container */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group bg-slate-800">
                <img 
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" 
                    alt="H3 Centro de Serviços - Materiais Promocionais" 
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
                 {/* Overlay Gradient for Text Readability if needed, though mostly visual here */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;