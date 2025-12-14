import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, X, Send, Bot, Loader2, Download, Image as ImageIcon } from 'lucide-react';
import { ChatMessage, ChatRole } from '../types';

const AICreativeAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: ChatRole.MODEL, text: "Olá! Eu sou o assistente criativo da H3. Posso criar frases ou até gerar ideias visuais para seus produtos (copos, crachás, etc). Como posso ajudar?" }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const downloadImage = (base64Data: string) => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${base64Data}`;
    link.download = `h3-design-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = inputText;
    setInputText('');
    setMessages(prev => [...prev, { role: ChatRole.USER, text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Simple keyword detection to switch between text and image generation
      const isImageRequest = /imagem|desenhe|crie uma arte|logo|design|ilustração|foto/i.test(userMessage);
      
      if (isImageRequest) {
        // Image Generation Logic
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: userMessage,
        });

        let imageFound = false;
        
        // Iterate through parts to find the image
        if (response.candidates?.[0]?.content?.parts) {
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
              const base64Image = part.inlineData.data;
              setMessages(prev => [...prev, { 
                role: ChatRole.MODEL, 
                image: base64Image,
                text: "Aqui está uma ideia visual baseada no seu pedido:" 
              }]);
              imageFound = true;
            } else if (part.text && !imageFound) {
               // Only show text if no image or strictly along with it
               // For now, if we have text but no image yet, we might append it differently, 
               // but usually the model returns text then image or vice versa.
            }
          }
        }

        if (!imageFound) {
           setMessages(prev => [...prev, { role: ChatRole.MODEL, text: "Desculpe, não consegui gerar a imagem desta vez. Tente detalhar mais o pedido." }]);
        }

      } else {
        // Text Generation Logic
        const model = "gemini-2.5-flash";
        const systemInstruction = `
          Você é um assistente de marketing criativo para a empresa 'H3 Centro de Serviços'. 
          A empresa vende: Cartões, Copos, Bottons, Cordões, Crachás e Adesivos.
          
          Seu objetivo é ajudar o cliente a criar frases curtas, slogans ou textos para colocar NESSES produtos.
          Exemplo: Se o cliente pede uma frase para um copo de formatura, sugira algo divertido e curto.
          
          Mantenha o tom profissional, mas criativo. Seja conciso. 
          Responda em português do Brasil.
        `;

        const chat = ai.chats.create({
          model: model,
          config: {
              systemInstruction: systemInstruction,
          }
        });

        const result = await chat.sendMessage({
          message: userMessage
        });

        setMessages(prev => [...prev, { role: ChatRole.MODEL, text: result.text || "Desculpe, não consegui gerar uma resposta." }]);
      }

    } catch (error) {
      console.error("Erro na IA:", error);
      setMessages(prev => [...prev, { role: ChatRole.MODEL, text: "Ops! Tive um problema ao conectar com minha criatividade. Tente novamente mais tarde." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-gradient-to-r from-brand-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Abrir Assistente Criativo"
      >
        <Sparkles className="animate-pulse" size={24} />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 z-50 w-[90vw] sm:w-96 bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 origin-bottom-right overflow-hidden border border-slate-200 ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10 pointer-events-none'}`} style={{ height: '550px', maxHeight: '80vh' }}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-700 to-brand-900 p-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-white">
            <div className="bg-white/20 p-1.5 rounded-lg">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="font-bold text-sm">Assistente Criativo</h3>
              <p className="text-xs text-brand-200">Texto & Imagem (Gemini)</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white/70 hover:text-white hover:bg-white/10 p-1 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex flex-col ${msg.role === ChatRole.USER ? 'items-end' : 'items-start'}`}>
              
              {/* Text Bubble */}
              {msg.text && (
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm mb-1 ${
                  msg.role === ChatRole.USER 
                    ? 'bg-brand-600 text-white rounded-tr-none' 
                    : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              )}

              {/* Image Bubble */}
              {msg.image && (
                <div className="max-w-[85%] bg-white p-2 rounded-2xl rounded-tl-none shadow-sm border border-slate-200 mt-1">
                  <img 
                    src={`data:image/png;base64,${msg.image}`} 
                    alt="Generated by AI" 
                    className="w-full h-auto rounded-lg"
                  />
                  <button 
                    onClick={() => msg.image && downloadImage(msg.image)}
                    className="mt-2 w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg text-xs font-medium transition-colors"
                  >
                    <Download size={14} />
                    Baixar PNG
                  </button>
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
             <div className="flex justify-start">
               <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-2">
                 <Loader2 className="animate-spin text-brand-500" size={16} />
                 <span className="text-xs text-slate-400">Criando...</span>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ex: Crie uma imagem de um crachá..."
              className="flex-1 bg-slate-100 border-0 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
            />
            <button 
              onClick={handleSendMessage}
              disabled={isLoading || !inputText.trim()}
              className="bg-brand-600 hover:bg-brand-700 text-white p-2.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
            </button>
          </div>
          <p className="text-[10px] text-slate-400 text-center mt-2">
            Peça textos ou imagens ("Crie uma imagem de...")
          </p>
        </div>
      </div>
    </>
  );
};

export default AICreativeAssistant;