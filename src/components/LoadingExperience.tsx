import { useEffect, useRef, useState } from "react";
import "./LoadingExperience.css";

// Type declarations for Vanta
interface VantaEffect {
  destroy: () => void;
}

// Allow extra options to tune the dark theme without TS friction
interface VantaCloudOptions {
  el: HTMLElement;
  mouseControls: boolean;
  touchControls: boolean;
  gyroControls: boolean;
  minHeight: number;
  minWidth: number;
  backgroundColor: number;
  [key: string]: unknown;
}

declare global {
  interface Window {
    VANTA: {
      CLOUDS: (options: VantaCloudOptions) => VantaEffect;
    };
    THREE: unknown;
  }
}

interface LoadingExperienceProps {
  onLoadingComplete: () => void;
}

export default function LoadingExperience({
  onLoadingComplete,
}: LoadingExperienceProps) {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<VantaEffect | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const DISPLAY_DURATION_MS = 8000; 

  useEffect(() => {
    // Initialize Vanta Clouds effect
    if (vantaRef.current && window.VANTA && !vantaEffect.current) {
      // Dark theme tuning for Vanta Clouds
      vantaEffect.current = window.VANTA.CLOUDS({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        backgroundColor: 0x00111f,
        skyColor: 0x002b36,
        cloudColor: 0x004f63,
        cloudShadowColor: 0x001f2b,
        sunColor: 0x005f7a,
        sunGlareColor: 0x0088a9,
        sunlightColor: 0x00bcd4,
        speed: 0.5,
      } as VantaCloudOptions);
    }

    // Cleanup function
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // Simple timed display, then fade out and complete
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onLoadingComplete, 500);
    }, DISPLAY_DURATION_MS);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div className={`loading-experience ${!isVisible ? "fade-out" : ""}`}>
      <div ref={vantaRef} className="loading-vanta-bg" />

      <div className="loading-content" role="status" aria-live="polite">
        <div className="spinner" aria-hidden="true" />
        <p className="loading-text">Loading portfolio...</p>
      </div>
    </div>
  );
}
