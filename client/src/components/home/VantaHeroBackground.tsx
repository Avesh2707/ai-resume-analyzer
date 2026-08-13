import { useEffect, useRef, useState } from 'react';

// Declare global Vanta types for TypeScript
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    VANTA: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    THREE: any;
  }
}

interface VantaHeroBackgroundProps {
  isExploring?: boolean;
}

export function VantaHeroBackground({ isExploring = false }: VantaHeroBackgroundProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let effect: any = null;

    const initVanta = () => {
      if (!window.VANTA || !window.VANTA.NET) return;
      if (!effect && vantaRef.current) {
        try {
          console.log("Initializing Vanta");
          const isMobile = window.innerWidth < 768;
          const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
          const points = isMobile ? 6 : isTablet ? 10 : 12;
          const maxDistance = isMobile ? 15 : 20;
          
          effect = window.VANTA.NET({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0x4f7cff, 
            backgroundColor: 0x050816,
            points: points,
            maxDistance: maxDistance,
            spacing: 15,
            showDots: true,
          });
          setVantaEffect(effect);
          console.log("Vanta initialized");
        } catch (err) {
          console.error("Vanta NET initialization failed", err);
        }
      }
    };

    const loadVantaScript = () => {
      let vantaScript = document.getElementById('vanta-net') as HTMLScriptElement | null;
      if (vantaScript) {
        if (window.VANTA && window.VANTA.NET) {
          initVanta();
        } else {
          vantaScript.addEventListener('load', initVanta);
        }
      } else {
        console.log("Loading Vanta NET");
        vantaScript = document.createElement('script');
        vantaScript.id = 'vanta-net';
        vantaScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.net.min.js';
        vantaScript.async = true;
        document.head.appendChild(vantaScript);
        vantaScript.onload = () => {
          console.log("Vanta NET ready");
          initVanta();
        };
      }
    };

    if (window.THREE && window.VANTA && window.VANTA.NET) {
      initVanta();
    } else {
      let threeScript = document.getElementById('three-vanta') as HTMLScriptElement | null;
      if (threeScript) {
        if (window.THREE) {
          loadVantaScript();
        } else {
          threeScript.addEventListener('load', loadVantaScript);
        }
      } else {
        console.log("Loading Three.js for Vanta");
        threeScript = document.createElement('script');
        threeScript.id = 'three-vanta';
        threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
        threeScript.async = true;
        document.head.appendChild(threeScript);
        threeScript.onload = () => {
          console.log("Three.js ready");
          loadVantaScript();
        };
      }
    }

    return () => {
      if (effect) {
        effect.destroy();
      }
    };
  }, []);

  // Handle interaction state
  useEffect(() => {
    if (vantaEffect) {
      if (isExploring) {
        vantaEffect.setOptions({
          color: 0x8b5cf6, // slightly brighter/violet network
          points: 14.0, // slightly increased points
          maxDistance: 24.0, // slightly increased maxDistance
        });
      } else {
        const isMobile = window.innerWidth < 768;
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
        const points = isMobile ? 6 : isTablet ? 10 : 12;
        const maxDistance = isMobile ? 15 : 20;
        vantaEffect.setOptions({
          color: 0x4f7cff,
          points: points,
          maxDistance: maxDistance,
        });
      }
    }
  }, [isExploring, vantaEffect]);

  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  return (
    <div 
      ref={vantaRef} 
      className="absolute inset-0 z-0 pointer-events-none"
      {...(prefersReducedMotion ? { style: { background: 'linear-gradient(to bottom right, #050816, #0a0f25)' } } : {})}
    />
  );
}
