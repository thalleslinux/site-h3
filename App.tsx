import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import SystemSection from './components/SystemSection';
import AICreativeAssistant from './components/AICreativeAssistant';
import { MapPin, Phone, Mail } from 'lucide-react';

function App() {
  const mapLink = "https://www.google.com/maps/search/?api=1&query=Av.+XV+de+Novembro,+497+-+Porto+Cuiabá+-+MT";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main>
        <Hero />
        <Services />
        <SystemSection />
        
        {/* Location / Footer Info Section */}
        <section className="bg-white py-16 border-t border-slate-100">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="grid md:grid-cols-2 gap-12">
                <div>
                   <h3 className="text-2xl font-display font-bold text-slate-900 mb-6">Onde Estamos</h3>
                   <div className="space-y-6">
                      
                      <a href={mapLink} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group hover:bg-slate-50 p-4 rounded-xl transition-colors -mx-4">
                         <div className="bg-brand-50 p-3 rounded-lg text-brand-600 group-hover:bg-brand-100 transition-colors">
                            <MapPin size={24} />
                         </div>
                         <div>
                            <p className="font-semibold text-slate-900">Endereço Principal</p>
                            <p className="text-slate-500 group-hover:text-slate-700">Av. XV de Novembro, 497 - Porto<br/>Cuiabá - MT</p>
                         </div>
                      </a>

                      <a href="https://wa.me/556530254922" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group hover:bg-slate-50 p-4 rounded-xl transition-colors -mx-4">
                         <div className="bg-brand-50 p-3 rounded-lg text-brand-600 group-hover:bg-brand-100 transition-colors">
                            <Phone size={24} />
                         </div>
                         <div>
                            <p className="font-semibold text-slate-900">Atendimento</p>
                            <p className="text-slate-500 text-lg group-hover:text-slate-700">(65) 3025-4922</p>
                            <p className="text-slate-400 text-sm">Seg a Sex: 08h às 18h</p>
                         </div>
                      </a>

                      <a href="mailto:contato@h3servicos.com.br" className="flex items-start gap-4 group hover:bg-slate-50 p-4 rounded-xl transition-colors -mx-4">
                         <div className="bg-brand-50 p-3 rounded-lg text-brand-600 group-hover:bg-brand-100 transition-colors">
                            <Mail size={24} />
                         </div>
                         <div>
                            <p className="font-semibold text-slate-900">Email</p>
                            <p className="text-slate-500 group-hover:text-slate-700">contato@h3servicos.com.br</p>
                         </div>
                      </a>

                   </div>
                </div>

                {/* Visual Map Placeholder */}
                <a 
                  href={mapLink}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-full min-h-[300px] bg-slate-100 rounded-2xl overflow-hidden relative border border-slate-200 group cursor-pointer block"
                >
                  {/* We use an image to simulate a map for this demo */}
                  <img 
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1774&q=80" 
                    alt="Map Location"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <div className="bg-brand-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
                        <MapPin size={16} />
                        <span className="font-bold text-sm">H3 Cuiabá</span>
                     </div>
                  </div>
                </a>
             </div>
           </div>
        </section>
      </main>

      <footer className="bg-slate-950 text-slate-400 py-8 text-sm text-center border-t border-slate-900">
        <p>&copy; {new Date().getFullYear()} H3 Centro de Serviços. Todos os direitos reservados.</p>
      </footer>

      {/* AI Assistant Component */}
      <AICreativeAssistant />
    </div>
  );
}

export default App;