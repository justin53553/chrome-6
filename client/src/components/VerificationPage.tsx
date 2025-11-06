import { useState, useEffect } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
    console.log('Verificando usuario con token:', token);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsVerifying(false);
    setIsVerified(true);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(20px)',
        }}
      />
      
      <div className="absolute inset-0 bg-black/60 z-[1]" />
      
      <div className="floating-symbols">
        {Array.from({ length: 15 }).map((_, i) => (
          <span 
            key={i} 
            className="symbol"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
              fontSize: `${20 + Math.random() * 30}px`,
              opacity: 0.15 + Math.random() * 0.15,
            }}
          >
            ♱
          </span>
        ))}
      </div>

      <Card className="relative z-10 max-w-md w-full mx-4 bg-background/80 backdrop-blur-xl border-border shadow-2xl p-8 md:p-12">
        <div className="flex flex-col items-center text-center space-y-6">
          {!isVerified ? (
            <>
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <svg
                  viewBox="0 0 71 55"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12"
                >
                  <path
                    d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"
                    fill="hsl(var(--primary))"
                  />
                </svg>
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Verificación de Discord
                </h1>
                <p className="text-base md:text-lg text-muted-foreground">
                  Haz clic en verificar para confirmar tu identidad
                </p>
              </div>

              <Button
                data-testid="button-verify"
                size="lg"
                onClick={handleVerify}
                disabled={isVerifying}
                className="w-full py-6 text-lg font-semibold"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Verificando...
                  </>
                ) : (
                  'Verificar'
                )}
              </Button>
            </>
          ) : (
            <>
              <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  ¡Verificación Exitosa!
                </h1>
                <p className="text-base md:text-lg text-muted-foreground">
                  Redirigiendo a Discord en {countdown} segundos...
                </p>
              </div>

              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-1000 ease-linear"
                  style={{ width: `${((4 - countdown) / 4) * 100}%` }}
                />
              </div>
            </>
          )}
        </div>
      </Card>

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
          opacity: 0.2;
          font-weight: 300;
        }

        @keyframes float-up {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.2;
          }
          90% {
            opacity: 0.2;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
