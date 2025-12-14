import React, { useState } from 'react';
import { CreditCard, UserSquare2, Sticker, BadgeCheck, Coffee, QrCode, ChevronRight, ExternalLink, X } from 'lucide-react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    id: '1',
    title: 'Cartões Personalizados',
    description: 'Produção completa de cartões para eventos e ações promocionais com impressão de alta qualidade e acabamento resistente.',
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    icon: CreditCard
  },
  {
    id: '2',
    title: 'Copos Personalizados',
    description: 'Copos exclusivos para aniversários, confraternizações e campanhas promocionais com personalização total.',
    imageUrl: 'https://images.unsplash.com/photo-1576504677634-06b2130bd1f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    icon: Coffee
  },
  {
    id: '3',
    title: 'Bottons Personalizados',
    description: 'Bottons e identificadores para eventos, congressos e campanhas internas com acabamento profissional.',
    imageUrl: 'https://images.unsplash.com/photo-1629905678898-88e34c90e646?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    icon: BadgeCheck
  },
  {
    id: '4',
    title: 'Cordões Personalizados',
    description: 'Cordões profissionais com impressão durável e opções de personalização para equipes e eventos corporativos.',
    imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80',
    icon: UserSquare2
  },
  {
    id: '5',
    title: 'Crachás Personalizados',
    description: 'Crachás de identificação seguros e duráveis. Diversas tecnologias e formatos disponíveis.',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80',
    icon: QrCode
  },
  {
    id: '6',
    title: 'Adesivos e Agradecimentos',
    description: 'Etiquetas e cartões de agradecimento personalizados para valorizar o relacionamento com seus clientes.',
    imageUrl: 'https://images.unsplash.com/photo-1624621869851-1e9671d18f57?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    icon: Sticker
  },
];

const Services: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ServiceItem | null>(null);

  return (
    <section id="services" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-600 font-semibold tracking-wide uppercase text-sm mb-2">O que fazemos de melhor</h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-6">
            Serviços sob medida para o seu negócio
          </h3>
          <p className="text-slate-600 text-lg">
            Nossa dedicação e empenho garantem resultados concretos. Confira as soluções que preparamos para você.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:-translate-y-1">
              {/* Image Container */}
              <div 
                className="relative h-48 overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(service)}
              >
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                  src={service.imageUrl} 
                  alt={service.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-sm">
                   {service.icon && <service.icon className="text-brand-600" size={24} />}
                </div>
              </div>

              <div className="p-6">
                <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors">
                  {service.title}
                </h4>
                <p className="text-slate-500 mb-6 line-clamp-3 text-sm leading-relaxed">
                  {service.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                  <button 
                    onClick={() => setSelectedImage(service)}
                    className="text-slate-500 text-sm font-medium hover:text-brand-600 flex items-center gap-1 transition-colors"
                  >
                    Ver Galeria <ExternalLink size={14} />
                  </button>
                  <a 
                    href="https://wa.me/556530254922" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-900 hover:bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    Orçar Agora
                    <ChevronRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-transparent outline-none flex flex-col" 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 md:-right-8 lg:-right-12 text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full"
            >
              <X size={28} />
            </button>
            <div className="rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-slate-900">
              <img 
                src={selectedImage.imageUrl} 
                alt={selectedImage.title}
                className="w-full h-auto max-h-[70vh] object-contain bg-black" 
              />
              <div className="p-6 bg-white">
                 <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    {selectedImage.icon && <selectedImage.icon size={20} className="text-brand-600" />}
                    {selectedImage.title}
                 </h3>
                 <p className="text-slate-600 mt-2">{selectedImage.description}</p>
                 <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end">
                    <a 
                      href="https://wa.me/556530254922" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      Solicitar Orçamento Deste Item
                    </a>
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;