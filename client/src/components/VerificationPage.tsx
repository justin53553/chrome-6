import { useState, useEffect } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import backgroundImage from '@assets/enhanced_chrome-hearts-club-be0b195uxic2r0b4_1762456118665.png';

interface VerificationPageProps {
  token?: string;
}

export default function VerificationPage({ token }: VerificationPageProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    if (isVerified && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isVerified && countdown === 0) {
      window.location.href = 'https://discord.com';
    }
  }, [isVerified, countdown]);

  const handleVerify = async () => {
    setIsVerifying(true);
    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || 'No se pudo verificar');
      }
      // opcionalmente usar datos devueltos
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsVerified(true);
    } catch (e) {
      console.error('Error verificando:', e);
      alert('No se pudo verificar. Vuelve a abrir el enlace del DM o contacta a un admin.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(15px) brightness(0.8)',
        }}
      />
      
      <div className="absolute inset-0 bg-black/40 z-[1]" />
      
      <div className="floating-symbols">
        {Array.from({ length: 20 }).map((_, i) => (
          <span 
            key={i} 
            className="symbol"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
              fontSize: `${20 + Math.random() * 40}px`,
              opacity: 0.1 + Math.random() * 0.15,
            }}
          >
            ♱
          </span>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center space-y-8 px-4 max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-300 tracking-wider shiny-text">
          CHROME HEARTS
        </h1>

        {!isVerified ? (
          <>
            <div className={`w-40 h-40 rounded-full bg-pink-600/30 backdrop-blur-md flex items-center justify-center border-4 border-pink-500/40 transition-all duration-700 ease-out ${isVerifying ? 'scale-125 border-pink-400/60 shadow-[0_0_40px_rgba(236,72,153,0.6)] animate-pulse' : 'hover:scale-105'}`}>
              {isVerifying ? (
                <div className="relative">
                  <Loader2 className="w-20 h-20 text-pink-400 animate-spin" />
                  <div className="absolute inset-0 blur-xl bg-pink-400/50 animate-pulse"></div>
                </div>
              ) : (
                <div className="text-8xl text-pink-400 animate-float">♱</div>
              )}
            </div>

            <div className="space-y-4">
              <p className="text-gray-300 text-base tracking-widest uppercase animate-fade-in">
                Haz clic para verificar
              </p>
            </div>

            <Button
              data-testid="button-verify"
              size="lg"
              onClick={handleVerify}
              disabled={isVerifying}
              className="px-16 py-7 text-xl font-bold bg-black/80 hover:bg-black/90 backdrop-blur-md border-2 border-white/20 hover:border-white/40 text-white transition-all duration-500 ease-out hover:scale-110 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-95"
            >
              {isVerifying ? (
                <span className="animate-pulse">Verificando...</span>
              ) : (
                'Verificar'
              )}
            </Button>
          </>
        ) : (
          <>
            <div className="w-40 h-40 rounded-full bg-pink-600/40 backdrop-blur-md flex items-center justify-center border-4 border-pink-500/50 animate-scale-in shadow-[0_0_50px_rgba(236,72,153,0.6)]">
              <Check className="w-20 h-20 text-pink-400 stroke-[3] animate-check-draw" />
            </div>

            <div className="space-y-4 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-wide">
                VERIFICADO
              </h2>
              <p className="text-gray-200 text-lg">
                Bienvenido a Chrome Hearts
              </p>
              <p className="text-gray-400 text-xs tracking-widest uppercase">
                Discord Verified
              </p>
            </div>

            <div className="pt-8 space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <p className="text-gray-300 text-sm tracking-widest uppercase font-semibold">
                CREATORS
              </p>
              <div className="flex items-center justify-center gap-6 text-gray-300 text-base font-medium">
                <span>ALMIRI</span>
                <span className="text-gray-500">•</span>
                <span>cookingwithLAJA</span>
                <span className="text-gray-500">•</span>
                <span>bighomie</span>
              </div>
            </div>

            <p className="text-gray-400 text-base pt-4 animate-pulse">
              Redirigiendo en {countdown}s...
            </p>
          </>
        )}
      </div>

      <style>{`
        .floating-symbols {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          overflow: hidden;
        }

        .symbol {
          position: absolute;
          color: white;
          animation: float-up linear infinite;
          font-weight: 300;
          bottom: -50px;
        }

        .shiny-text {
          background: linear-gradient(
            120deg,
            #9ca3af 0%,
            #d1d5db 20%,
            #f9fafb 40%,
            #ffffff 50%,
            #f9fafb 60%,
            #d1d5db 80%,
            #9ca3af 100%
          );
          background-size: 300% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 2.5s ease-in-out infinite;
          text-shadow: 0 0 40px rgba(255, 255, 255, 0.3);
        }

        @keyframes shine {
          0%, 100% {
            background-position: 0% center;
          }
          50% {
            background-position: 100% center;
          }
        }

        @keyframes float-up {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          3% {
            opacity: 0.2;
          }
          97% {
            opacity: 0.2;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        @keyframes scale-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes check-draw {
          0% {
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-check-draw {
          animation: check-draw 0.8s cubic-bezier(0.65, 0, 0.35, 1) 0.3s forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
