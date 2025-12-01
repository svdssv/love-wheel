import React, { useState, useEffect, useRef } from 'react';
import Wheel from './components/Wheel';
import ResultModal from './components/ResultModal';
import { IntimacyLevel, GameState } from './types';
import { getRandomSelection, LEVEL_CONFIG } from './constants';
import { generateNewItems } from './services/geminiService';
import { Sparkles, RefreshCw, Wand2, Shuffle, Heart } from 'lucide-react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    isSpinning: false,
    rotation: 0,
    selectedItem: null,
    level: IntimacyLevel.Sweet,
    items: getRandomSelection(IntimacyLevel.Sweet)
  });
  
  const [showResult, setShowResult] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse Parallax Effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position from -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSpin = () => {
    if (gameState.isSpinning) return;

    const items = gameState.items;
    const winningIndex = Math.floor(Math.random() * items.length);
    const selectedItem = items[winningIndex];

    const sectorSize = 360 / items.length;
    const itemCenterAngle = (winningIndex * sectorSize) + (sectorSize / 2);
    const jitter = (Math.random() - 0.5) * (sectorSize * 0.8);
    
    const currentRotation = gameState.rotation;
    const minSpins = 5;
    const baseTarget = (Math.floor(currentRotation / 360) + minSpins) * 360;
    
    const targetRotationInOneCircle = 360 - itemCenterAngle;
    const finalRotation = baseTarget + targetRotationInOneCircle + jitter;

    setGameState(prev => ({
      ...prev,
      isSpinning: true,
      rotation: finalRotation,
      selectedItem: selectedItem 
    }));
  };

  const handleSpinEnd = () => {
    setGameState(prev => ({ ...prev, isSpinning: false }));
    setShowResult(true);
  };

  const changeLevel = (newLevel: IntimacyLevel) => {
    if (gameState.isSpinning) return;
    setGameState(prev => ({
      ...prev,
      level: newLevel,
      items: getRandomSelection(newLevel),
      rotation: 0 
    }));
  };

  const handleShuffle = () => {
    if (gameState.isSpinning || isGenerating) return;
    setGameState(prev => ({
      ...prev,
      items: getRandomSelection(prev.level),
      rotation: 0
    }));
  };

  const handleGenerateAI = async () => {
    if (isGenerating || gameState.isSpinning) return;
    setIsGenerating(true);
    const newItems = await generateNewItems(gameState.level);
    if (newItems.length > 0) {
      setGameState(prev => ({ ...prev, items: newItems, rotation: 0 }));
    } else {
      alert("AI生成失败，请检查网络或API Key");
    }
    setIsGenerating(false);
  };

  const config = LEVEL_CONFIG[gameState.level];

  return (
    <div className={`min-h-screen w-full transition-colors duration-1000 ease-in-out relative overflow-hidden flex flex-col font-sans ${config.bgGradient}`}>
      
      {/* --- Interactive Background --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Blob 1 */}
        <div 
          className={`absolute top-0 -left-20 w-72 h-72 md:w-96 md:h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob transition-colors duration-1000 ${config.blobColors[0]}`}
          style={{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` }}
        />
        {/* Blob 2 */}
        <div 
          className={`absolute top-0 -right-20 w-72 h-72 md:w-96 md:h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000 transition-colors duration-1000 ${config.blobColors[1]}`}
          style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * -20}px)` }}
        />
        {/* Blob 3 */}
        <div 
          className={`absolute -bottom-32 left-20 w-80 h-80 md:w-[30rem] md:h-[30rem] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000 transition-colors duration-1000 ${config.blobColors[2]}`}
          style={{ transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)` }}
        />
      </div>

      {/* --- Main Content --- */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 md:p-8 gap-6 md:gap-10">
        
        {/* Header */}
        <header className="text-center space-y-2 mt-4 md:mt-0">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border shadow-sm backdrop-blur-md transition-all duration-500 ${gameState.level === IntimacyLevel.Hot ? 'bg-black/30 border-white/10 text-white' : 'bg-white/40 border-white/50 text-gray-700'}`}>
             <span className="text-lg animate-pulse">{config.icon}</span>
             <span className="text-xs font-bold tracking-widest uppercase">{config.label} MODE</span>
          </div>
          
          <h1 className={`text-4xl md:text-6xl font-black tracking-tight drop-shadow-sm flex items-center justify-center gap-3 transition-colors duration-500 ${config.textColor}`}>
             LoveWheel <Heart className={`w-8 h-8 md:w-10 md:h-10 fill-current animate-bounce-slow ${config.accentColor}`} />
          </h1>
          
          <p className={`text-sm md:text-base font-medium max-w-xs mx-auto transition-colors duration-500 ${config.subTextColor}`}>
             {config.description}
          </p>
        </header>

        {/* Wheel Container */}
        <div className="relative flex-shrink-0 transform transition-transform duration-500 hover:scale-[1.01]">
           <Wheel 
             items={gameState.items} 
             rotation={gameState.rotation} 
             isSpinning={gameState.isSpinning} 
             onSpinEnd={handleSpinEnd}
             themeMode={gameState.level === IntimacyLevel.Hot ? 'dark' : 'light'}
           />
        </div>

        {/* Control Panel */}
        <div className={`w-full max-w-lg rounded-3xl p-6 shadow-2xl transition-all duration-500 ${config.panelClass}`}>
           
           {/* Level Tabs */}
           <div className={`grid grid-cols-3 gap-1 p-1 rounded-2xl mb-6 ${gameState.level === IntimacyLevel.Hot ? 'bg-black/40' : 'bg-gray-100/50'}`}>
              {Object.values(IntimacyLevel).map((lvl) => {
                const lvlConfig = LEVEL_CONFIG[lvl];
                const isActive = gameState.level === lvl;
                return (
                  <button
                    key={lvl}
                    onClick={() => changeLevel(lvl)}
                    disabled={gameState.isSpinning}
                    className={`
                      relative py-2.5 rounded-xl text-sm font-bold transition-all duration-300
                      ${isActive ? config.tabActive : config.tabInactive}
                    `}
                  >
                    {lvlConfig.label}
                  </button>
                );
              })}
           </div>

           {/* Actions Grid */}
           <div className="grid grid-cols-5 gap-3 md:gap-4">
              
              {/* Shuffle */}
              <button
                onClick={handleShuffle}
                disabled={gameState.isSpinning || isGenerating}
                className={`col-span-1 rounded-2xl flex items-center justify-center aspect-square shadow-sm transition-transform active:scale-90 border border-white/10 ${config.actionBtn}`}
                title="换一批内容"
              >
                <Shuffle className={`w-5 h-5 md:w-6 md:h-6 ${gameState.isSpinning ? '' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
              </button>

              {/* SPIN BUTTON */}
              <button
                onClick={handleSpin}
                disabled={gameState.isSpinning}
                className={`
                  col-span-3 py-3 md:py-4 rounded-2xl text-lg md:text-xl font-black text-white shadow-xl flex items-center justify-center gap-2 transform transition-all active:scale-95
                  ${gameState.isSpinning 
                    ? 'bg-gray-400 cursor-not-allowed opacity-80' 
                    : `${config.mainBtn} hover:brightness-110`
                  }
                `}
                style={{ backgroundSize: '200% auto' }}
              >
                 {gameState.isSpinning ? '好运流转...' : '开始转动'}
              </button>

              {/* AI Generate */}
              <button
                onClick={handleGenerateAI}
                disabled={isGenerating || gameState.isSpinning}
                className={`col-span-1 rounded-2xl flex items-center justify-center aspect-square shadow-sm transition-transform active:scale-90 border border-white/10 ${config.actionBtn}`}
                title="AI 生成新玩法"
              >
                {isGenerating 
                  ? <RefreshCw className="w-5 h-5 md:w-6 md:h-6 animate-spin" /> 
                  : <Wand2 className="w-5 h-5 md:w-6 md:h-6" />
                }
              </button>
           </div>
        </div>
      </main>

      <ResultModal 
        isOpen={showResult} 
        onClose={() => setShowResult(false)} 
        item={gameState.selectedItem}
        isDarkMode={gameState.level === IntimacyLevel.Hot}
      />
    </div>
  );
};

export default App;