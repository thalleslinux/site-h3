import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Instagram, Facebook, Youtube } from 'lucide-react';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: 'Início', href: '#home' },
  { label: 'Serviços', href: '#services' },
  { label: 'Sistema', href: '#system' },
  { label: 'Fale Conosco', href: 'https://wa.me/556530254922', isButton: true },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const iconClass = `transition-colors hover:text-brand-500 cursor-pointer ${isScrolled ? 'text-slate-600' : 'text-white/80 hover:text-white'}`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer select-none group">
          <div className="relative">
            <div className="absolute inset-0 bg-brand-500 rounded-lg blur opacity-40 animate-pulse"></div>
            <div className="relative bg-brand-700 text-white font-display font-bold text-xl p-1.5 rounded-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg shadow-brand-500/20">
              H3
            </div>
          </div>
          <span className={`font-display font-semibold text-lg tracking-tight transition-colors ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
            Centro de Serviços
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          
          {/* Social Icons - Integrated near Início */}
          <div className="flex items-center gap-3 mr-2">
             <a href="#" className={iconClass} aria-label="Youtube">
              <Youtube size={20} />
            </a>
            <a href="#" className={iconClass} aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="#" className={iconClass} aria-label="Facebook">
              <Facebook size={18} />
            </a>
          </div>

          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`font-medium text-sm transition-colors ${
                item.isButton
                  ? 'bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full shadow-lg hover:shadow-xl flex items-center gap-2'
                  : isScrolled
                  ? 'text-slate-600 hover:text-brand-600'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              {item.isButton && <Phone size={16} />}
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-slate-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="text-slate-800" />
          ) : (
            <Menu className={isScrolled ? 'text-slate-800' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl">
          <div className="flex flex-col p-4 gap-4">
            {/* Mobile Socials */}
            <div className="flex items-center gap-4 px-4 pb-2 border-b border-slate-100">
                <a href="#" className="text-slate-500 hover:text-brand-600"><Youtube size={22}/></a>
                <a href="#" className="text-slate-500 hover:text-brand-600"><Instagram size={20}/></a>
                <a href="#" className="text-slate-500 hover:text-brand-600"><Facebook size={20}/></a>
            </div>
            
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg font-medium px-4 py-2 rounded-md ${
                  item.isButton
                    ? 'bg-green-500 text-white text-center'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;