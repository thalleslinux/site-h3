import React, { useState } from 'react';
import { ShieldCheck, Database, History, Lock, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const SystemSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setStatus('loading');

    // Simulate API call
    setTimeout(() => {
      if (email.includes('@')) {
        setStatus('success');
        // Reset after 3 seconds for demo purposes
        setTimeout(() => {
             setStatus('idle');
             setEmail('');
             setPassword('');
        }, 3000);
      } else {
        setStatus('error');
      }
    }, 1500);
  };

  return (
    <section id="system" className="py-12 md:py-16 bg-slate-900 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-end">
          
          {/* Content */}
          <div className="space-y-6 mb-4 lg:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-brand-300 text-xs font-bold uppercase tracking-wider">
              <Lock size={12} />
              Área Restrita
            </div>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight">
              Sistema de Gestão de <br />
              <span className="text-brand-400">Arquivos e Documentos</span>
            </h2>
            
            <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
              Concentre suas informações em um ambiente seguro e organizado. 
              Acesse documentos, acompanhe atualizações e mantenha o histórico 
              completo da sua operação. Tudo com a segurança que você espera da H3.
            </p>

            <div className="space-y-4 pt-2">
                {[
                    { title: "Segurança Avançada", desc: "Criptografia de ponta a ponta", icon: ShieldCheck },
                    { title: "Histórico Completo", desc: "Rastreie todas as alterações", icon: History },
                    { title: "Acesso Centralizado", desc: "Todos documentos em um só lugar", icon: Database },
                ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-800/50 border border-slate-700 hover:bg-slate-800 transition-colors">
                        <div className="bg-brand-500/20 p-3 rounded-xl text-brand-400">
                            <item.icon size={24} />
                        </div>
                        <div>
                            <h4 className="text-white font-semibold text-base">{item.title}</h4>
                            <p className="text-slate-400 text-sm mt-0.5">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
          </div>

          {/* Login Card Mockup */}
          <div className="relative group w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-slate-950 border border-slate-800 rounded-2xl p-10 lg:p-12 shadow-2xl">
                <div className="text-center mb-10">
                    <div className="inline-block p-4 rounded-full bg-slate-900 border border-slate-800 mb-5 text-brand-500">
                        {status === 'success' ? <CheckCircle size={36} className="text-green-500" /> : <Database size={36} />}
                    </div>
                    <h3 className="text-3xl font-bold text-white">
                        {status === 'success' ? 'Bem-vindo!' : 'Acesse o Sistema'}
                    </h3>
                    <p className="text-slate-400 text-base mt-3">
                        {status === 'success' ? 'Redirecionando para seu painel...' : 'Utilize suas credenciais para continuar'}
                    </p>
                </div>

                {status === 'success' ? (
                   <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
                      <p className="text-green-400 font-medium">Login efetuado com sucesso.</p>
                   </div>
                ) : (
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Email Corporativo</label>
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-5 py-4 text-base text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all placeholder:text-slate-600 disabled:opacity-50" 
                                placeholder="seu@email.com" 
                                disabled={status === 'loading'}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Senha</label>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-5 py-4 text-base text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all placeholder:text-slate-600 disabled:opacity-50" 
                                placeholder="••••••••" 
                                disabled={status === 'loading'}
                            />
                        </div>
                        
                        {status === 'error' && (
                            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                                <AlertCircle size={16} />
                                <span>Email ou senha incorretos.</span>
                            </div>
                        )}

                        <button 
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-5 rounded-xl transition-all shadow-lg shadow-brand-900/50 mt-4 text-base tracking-wide uppercase flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {status === 'loading' ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Processando...
                                </>
                            ) : (
                                'Entrar no Sistema'
                            )}
                        </button>
                    </form>
                )}

                <div className="mt-8 text-center">
                    <a href="#" className="text-slate-500 hover:text-brand-400 text-sm transition-colors font-medium">Esqueceu sua senha?</a>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SystemSection;