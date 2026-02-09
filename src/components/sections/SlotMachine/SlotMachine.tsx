'use client';

import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/primitives';
import { useScrollTrigger } from '@/lib/hooks';
import { prefersReducedMotion } from '@/lib/utils/animation.utils';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import type { SlotMachineProps, SlotSymbol } from './SlotMachine.types';

const CODE_SYMBOLS: SlotSymbol[] = [
  { icon: '{}', label: 'Curly Braces', color: 'text-primary' },
  { icon: '[]', label: 'Square Brackets', color: 'text-secondary' },
  { icon: '()', label: 'Parentheses', color: 'text-[#FF6B6B]' },
  { icon: '</>', label: 'JSX Tag', color: 'text-[#61DAFB]' },
  { icon: '""', label: 'Double Quotes', color: 'text-[#4CAF50]' },
  { icon: "''", label: 'Single Quotes', color: 'text-[#FF9800]' },
  { icon: '===', label: 'Strict Equal', color: 'text-[#9C27B0]' },
  { icon: '=>', label: 'Arrow Function', color: 'text-[#2196F3]' },
  { icon: '//', label: 'Comment', color: 'text-[#607D8B]' },
  { icon: '&&', label: 'Logical AND', color: 'text-[#E91E63]' },
];

const WIN_MESSAGES = [
  "PERFECT_SYNTAX! Senior Dev Level Unlocked!",
  "TRIPLE_MATCH! Code Compiles Flawlessly!",
  "JACKPOT! Production Ready Code!",
  "LEGENDARY! Tech Lead Status Achieved!",
];

const LOSE_MESSAGES = [
  "Syntax Error... Refactor and Try Again!",
  "No Match... Keep Debugging!",
  "Type Mismatch... One More Spin?",
  "Compilation Failed... Retry!",
];

// Create extended symbol array for infinite scroll effect
const createReelSymbols = () => {
  const repeats = 15; // Repeat symbols many times for long spins
  return Array(repeats).fill(CODE_SYMBOLS).flat();
};

/**
 * SlotMachine Component
 * Real slot machine with spinning reels and code symbols
 */
export function SlotMachine({ className }: SlotMachineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reel1Ref = useRef<HTMLDivElement>(null);
  const reel2Ref = useRef<HTMLDivElement>(null);
  const reel3Ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const machineRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const { ref: triggerRef, isInView } = useScrollTrigger({
    start: 'top 70%',
  });

  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string>('');
  const [reelSymbols] = useState(createReelSymbols());
  const [symbolHeight, setSymbolHeight] = useState(120);

  // Responsive symbol height
  useEffect(() => {
    const updateSymbolHeight = () => {
      if (window.innerWidth < 640) setSymbolHeight(80);
      else if (window.innerWidth < 768) setSymbolHeight(100);
      else setSymbolHeight(120);
    };
    updateSymbolHeight();
    window.addEventListener('resize', updateSymbolHeight);
    return () => window.removeEventListener('resize', updateSymbolHeight);
  }, []);

  // Entrance animation
  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion()) {
      return;
    }

    gsap.set(containerRef.current, {
      opacity: 0,
      y: 60,
      scale: 0.95,
    });
  }, []);

  useEffect(() => {
    if (!isInView || hasAnimated.current || !containerRef.current || prefersReducedMotion()) {
      return;
    }

    gsap.to(containerRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.0,
      ease: 'back.out(1.5)',
      onComplete: () => {
        hasAnimated.current = true;
      },
    });
  }, [isInView]);

  const spinReels = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult('');

    const reels = [reel1Ref.current, reel2Ref.current, reel3Ref.current];
    const finalValues: number[] = [];

    // Machine shake animation
    if (machineRef.current) {
      gsap.to(machineRef.current, {
        x: -2,
        duration: 0.05,
        repeat: 5,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }

    // Animate each reel with proper spinning effect
    reels.forEach((reel, index) => {
      if (!reel) return;

      const finalValue = Math.floor(Math.random() * CODE_SYMBOLS.length);
      finalValues.push(finalValue);

      // Calculate spins - more spins for dramatic effect
      const baseSpins = 3;
      const extraSpins = index; // Later reels spin more
      const totalSpins = baseSpins + extraSpins;

      // Calculate final position - land within first set of symbols (offset by symbolHeight to center in window)
      const symbolsPerSpin = CODE_SYMBOLS.length;
      const finalPosition = -(symbolHeight + finalValue * symbolHeight);

      // Total spinning distance
      const fullSpinsDistance = totalSpins * symbolsPerSpin * symbolHeight;
      const totalDistance = fullSpinsDistance + Math.abs(finalPosition);

      // Reset to start position (offset to show middle window)
      gsap.set(reel, { y: -symbolHeight });

      // Create timeline for this reel
      const tl = gsap.timeline();

      // Fast spin with blur
      tl.to(reel, {
        y: -totalDistance,
        duration: 2 + index * 0.5, // Stagger stop times
        ease: 'power2.inOut',
        onStart: () => {
          if (reel) {
            reel.style.filter = 'blur(3px)';
          }
        },
      })
      // Remove blur
      .to(reel, {
        filter: 'blur(0px)',
        duration: 0.1,
      }, '-=0.3')
      // Bounce overshoot
      .to(reel, {
        y: finalPosition + symbolHeight * 0.15,
        duration: 0.15,
        ease: 'power1.out',
      })
      // Settle to final position with bounce
      .to(reel, {
        y: finalPosition,
        duration: 0.25,
        ease: 'bounce.out',
        onComplete: () => {
          if (index === 2) {
            checkWin(finalValues);
            setIsSpinning(false);
          }
        },
      });
    });

    // Lever/button animation
    gsap.to(buttonRef.current, {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut',
    });
  };

  const checkWin = (values: number[]) => {
    // Check for matches
    if (values[0] === values[1] && values[1] === values[2]) {
      // All three match - JACKPOT
      const message = WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)];
      setResult(message);

      // Epic celebration animation
      if (machineRef.current && containerRef.current) {
        // Flash effect
        gsap.to(machineRef.current, {
          backgroundColor: '#FFD700',
          duration: 0.1,
          yoyo: true,
          repeat: 5,
        });

        // Container pulse
        gsap.to(containerRef.current, {
          scale: 1.03,
          duration: 0.3,
          yoyo: true,
          repeat: 3,
          ease: 'power2.inOut',
        });
      }
    } else if (values[0] === values[1] || values[1] === values[2] || values[0] === values[2]) {
      // Two match
      setResult("TWO_MATCH! Almost There!");
    } else {
      // No match
      const message = LOSE_MESSAGES[Math.floor(Math.random() * LOSE_MESSAGES.length)];
      setResult(message);
    }
  };

  return (
    <section ref={triggerRef} className={className}>
      <div ref={containerRef} className="border-[4px] border-foreground bg-bg-elevated shadow-[12px_12px_0px_0px] shadow-foreground p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase mb-3 leading-tight">
              Code_Slot_Machine
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-foreground/80 font-mono">
              &gt; Match three symbols to win developer achievements_
            </p>
          </div>

          {/* Slot Machine Body */}
          <div
            ref={machineRef}
            className="bg-gradient-to-b from-primary to-primary/80 border-[4px] border-foreground shadow-[8px_8px_0px_0px] shadow-foreground p-4 sm:p-6 md:p-8 lg:p-12 transition-colors duration-100"
          >
            {/* Reels Container */}
            <div className="bg-black/20 border-[3px] border-foreground p-4 mb-8">
              <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
                {/* Reel 1 */}
                <div className="relative">
                  {/* Reel Window - shows 3 symbols */}
                  <div className="relative w-20 h-[240px] sm:w-24 sm:h-[300px] md:w-32 md:h-[360px] lg:w-36 lg:h-[360px] bg-white border-[4px] border-foreground shadow-[6px_6px_0px_0px] shadow-foreground overflow-hidden">
                    {/* Win line indicators */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-1/2 left-0 right-0 h-[80px] sm:h-[100px] md:h-[120px] -translate-y-1/2 border-y-[3px] border-secondary/30" />
                    </div>

                    {/* Scrolling symbols */}
                    <div ref={reel1Ref} className="absolute top-0 left-0 right-0">
                      {reelSymbols.map((symbol, idx) => (
                        <div
                          key={idx}
                          className="h-[80px] sm:h-[100px] md:h-[120px] flex items-center justify-center border-b-[2px] border-foreground/10"
                        >
                          <span className={cn('text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono font-bold', symbol.color)}>
                            {symbol.icon}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Reel 2 */}
                <div className="relative">
                  <div className="relative w-20 h-[240px] sm:w-24 sm:h-[300px] md:w-32 md:h-[360px] lg:w-36 lg:h-[360px] bg-white border-[4px] border-foreground shadow-[6px_6px_0px_0px] shadow-foreground overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-1/2 left-0 right-0 h-[80px] sm:h-[100px] md:h-[120px] -translate-y-1/2 border-y-[3px] border-secondary/30" />
                    </div>

                    <div ref={reel2Ref} className="absolute top-0 left-0 right-0">
                      {reelSymbols.map((symbol, idx) => (
                        <div
                          key={idx}
                          className="h-[80px] sm:h-[100px] md:h-[120px] flex items-center justify-center border-b-[2px] border-foreground/10"
                        >
                          <span className={cn('text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono font-bold', symbol.color)}>
                            {symbol.icon}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Reel 3 */}
                <div className="relative">
                  <div className="relative w-20 h-[240px] sm:w-24 sm:h-[300px] md:w-32 md:h-[360px] lg:w-36 lg:h-[360px] bg-white border-[4px] border-foreground shadow-[6px_6px_0px_0px] shadow-foreground overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-1/2 left-0 right-0 h-[80px] sm:h-[100px] md:h-[120px] -translate-y-1/2 border-y-[3px] border-secondary/30" />
                    </div>

                    <div ref={reel3Ref} className="absolute top-0 left-0 right-0">
                      {reelSymbols.map((symbol, idx) => (
                        <div
                          key={idx}
                          className="h-[80px] sm:h-[100px] md:h-[120px] flex items-center justify-center border-b-[2px] border-foreground/10"
                        >
                          <span className={cn('text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono font-bold', symbol.color)}>
                            {symbol.icon}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Spin Button */}
            <div className="text-center">
              <Button
                ref={buttonRef}
                variant="secondary"
                size="lg"
                onClick={spinReels}
                disabled={isSpinning}
                className={cn(
                  'text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 font-mono',
                  isSpinning && 'opacity-60 cursor-not-allowed'
                )}
              >
                {isSpinning ? 'SPINNING...' : '▶ SPIN'}
              </Button>
            </div>
          </div>

          {/* Result Message */}
          {result && (
            <div
              className={cn(
                'mt-8 border-[4px] border-foreground p-4 sm:p-6 md:p-8 text-lg sm:text-xl md:text-2xl font-bold uppercase text-center font-mono shadow-[6px_6px_0px_0px] shadow-foreground',
                result.includes('PERFECT') || result.includes('TRIPLE') || result.includes('JACKPOT') || result.includes('LEGENDARY')
                  ? 'bg-secondary text-secondary-text animate-pulse'
                  : result.includes('TWO_MATCH')
                  ? 'bg-primary text-white'
                  : 'bg-white text-foreground'
              )}
            >
              {result}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
