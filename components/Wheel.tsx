import React, { useMemo } from 'react';
import { WheelItem, ItemType } from '../types';
import { Gift, Zap, Heart, Sparkles } from 'lucide-react';

interface WheelProps {
  items: WheelItem[];
  rotation: number;
  onSpinEnd: () => void;
  isSpinning: boolean;
  themeMode?: 'light' | 'dark';
}

const Wheel: React.FC<WheelProps> = ({ items, rotation, onSpinEnd, isSpinning, themeMode = 'light' }) => {
  const radius = 180; 
  const diameter = radius * 2;
  const center = radius;
  const isDark = themeMode === 'dark';

  // Calculate sector paths
  const sectors = useMemo(() => {
    const totalSectors = items.length;
    const anglePerSector = 360 / totalSectors;
    const toRad = (deg: number) => (deg * Math.PI) / 180;

    return items.map((item, index) => {
      const startAngle = index * anglePerSector;
      const endAngle = (index + 1) * anglePerSector;

      // Coordinate calculations
      const x1 = center + radius * Math.cos(toRad(startAngle));
      const y1 = center + radius * Math.sin(toRad(startAngle));
      const x2 = center + radius * Math.cos(toRad(endAngle));
      const y2 = center + radius * Math.sin(toRad(endAngle));

      // SVG Path
      const d = `M${center},${center} L${x1},${y1} A${radius},${radius} 0 0,1 ${x2},${y2} Z`;

      // Text rotation
      const textAngle = startAngle + anglePerSector / 2;
      const textRadius = radius * 0.76; 
      const tx = center + textRadius * Math.cos(toRad(textAngle));
      const ty = center + textRadius * Math.sin(toRad(textAngle));

      return {
        path: d,
        color: item.color,
        text: item.text,
        type: item.type,
        tx,
        ty,
        angle: textAngle
      };
    });
  }, [items, radius, center]);

  const lights = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      angle: (i * 360) / 24,
      delay: i * 0.1
    }));
  }, []);

  // Theme styling configurations
  const rimGradient = isDark 
    ? "from-yellow-600 via-yellow-400 to-yellow-800" // Gold for dark mode
    : "from-yellow-200 via-yellow-400 to-yellow-600"; // Light gold for light mode
    
  const rimBorder = isDark ? "border-yellow-900" : "border-yellow-700";
  const pointerColor = isDark ? "fill-red-600" : "fill-red-500";

  return (
    <div className="relative w-[340px] h-[340px] md:w-[460px] md:h-[460px] mx-auto perspective select-none">
      
      {/* Outer Rim & Lights */}
      <div className={`absolute inset-[-16px] md:inset-[-18px] rounded-full bg-gradient-to-b ${rimGradient} shadow-2xl flex items-center justify-center z-0 border ${rimBorder}`}>
        <div className="absolute inset-1 rounded-full bg-black/10 border-2 border-black/5"></div>
        
        {lights.map((light, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 md:w-3 md:h-3 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] z-10"
            style={{
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${light.angle}deg) translate(185px) rotate(-${light.angle}deg)`, // Adjusted for responsiveness roughly
              animation: `twinkle 1.5s infinite ${light.delay}s`
            }}
          />
        ))}
      </div>

      {/* Pointer */}
      <div className="absolute -top-8 md:-top-10 left-1/2 -translate-x-1/2 z-40 filter drop-shadow-xl">
        <div className="relative w-12 h-14 md:w-14 md:h-16 animate-bounce-slow">
           <svg viewBox="0 0 50 60" className="w-full h-full">
            <path d="M25 60 L5 25 C5 15 15 0 25 0 C35 0 45 15 45 25 L25 60 Z" className={pointerColor} stroke="white" strokeWidth="3" />
            <circle cx="25" cy="20" r="8" fill="white" className="shadow-inner" />
            <circle cx="25" cy="20" r="4" className={isDark ? "fill-red-800" : "fill-red-500"} />
          </svg>
        </div>
      </div>

      {/* The Wheel */}
      <div 
        className="w-full h-full relative z-10 rounded-full overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,0.3)] border-[8px] border-white"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning ? 'transform 5s cubic-bezier(0.15, 0, 0.10, 1)' : 'none'
        }}
        onTransitionEnd={onSpinEnd}
      >
        <svg 
          viewBox={`0 0 ${diameter} ${diameter}`} 
          className="w-full h-full transform -rotate-90 bg-white"
        >
          {sectors.map((sector, i) => (
            <g key={i}>
              <path d={sector.path} fill={sector.color} stroke="white" strokeWidth="2" />
              <g 
                transform={`translate(${sector.tx}, ${sector.ty}) rotate(${sector.angle + 90})`} 
                className="pointer-events-none"
              >
                 <foreignObject x="-10" y="-30" width="20" height="20">
                    <div className="flex justify-center items-center h-full opacity-90 drop-shadow-sm">
                      {sector.type === ItemType.Reward 
                        ? <Heart size={14} className="text-white fill-white" /> 
                        : <Zap size={14} className="text-white fill-white" />}
                    </div>
                 </foreignObject>
                <text 
                  x="0" y="4" 
                  fill="white" 
                  fontSize="11" 
                  fontWeight="900" 
                  textAnchor="middle" 
                  dominantBaseline="middle"
                  style={{ 
                    textShadow: '0px 1px 3px rgba(0,0,0,0.4)', 
                    fontFamily: '"Noto Sans SC", sans-serif',
                    letterSpacing: '0.02em'
                  }}
                >
                  {sector.text.length > 5 ? sector.text.substring(0, 5) + '..' : sector.text}
                </text>
              </g>
            </g>
          ))}
        </svg>

        {/* Center Cap */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 rounded-full shadow-2xl flex items-center justify-center z-30">
           <div className={`absolute inset-0 rounded-full shadow-lg bg-gradient-to-br ${rimGradient}`}></div>
           <div className="absolute inset-1.5 bg-white rounded-full flex items-center justify-center shadow-inner">
             <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white shadow-md border-2 border-white/40 bg-gradient-to-tr ${isDark ? 'from-red-800 to-black' : 'from-primary to-rose-500'}`}>
                <Sparkles size={24} className="animate-pulse-fast" />
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Wheel;