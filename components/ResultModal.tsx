import React from 'react';
import { WheelItem, ItemType } from '../types';
import { X, Heart, Zap } from 'lucide-react';

interface ResultModalProps {
  item: WheelItem | null;
  onClose: () => void;
  isOpen: boolean;
  isDarkMode?: boolean;
}

const ResultModal: React.FC<ResultModalProps> = ({ item, onClose, isOpen, isDarkMode = false }) => {
  if (!isOpen || !item) return null;

  const isReward = item.type === ItemType.Reward;
  
  // Theme-based Classes
  const modalBg = isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-white';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-800';
  const subTextColor = isDarkMode ? 'text-gray-300' : 'text-gray-500';
  const closeBtnBg = isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose} 
      />
      
      {/* Modal Content */}
      <div className={`relative rounded-[2rem] p-8 max-w-sm w-full shadow-2xl transform transition-all scale-100 animate-[bounce-slow_1s_ease-out] border-4 ${modalBg}`}>
        
        {/* Header Decoration */}
        <div className="absolute top-0 left-0 w-full h-32 rounded-t-[1.8rem] opacity-100 overflow-hidden">
           <div className={`w-full h-full bg-gradient-to-br ${isReward ? 'from-pink-400 to-rose-500' : 'from-purple-500 to-indigo-600'}`}></div>
           <div className={`absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t ${isDarkMode ? 'from-gray-900' : 'from-white'} to-transparent`}></div>
        </div>
        
        <button 
          onClick={onClose}
          className={`absolute top-4 right-4 text-white z-20 backdrop-blur-sm rounded-full p-2 transition-colors ${closeBtnBg}`}
        >
          <X size={20} />
        </button>

        <div className="relative flex flex-col items-center text-center mt-6 z-10">
          {/* Icon Circle */}
          <div className={`
            w-24 h-24 rounded-full flex items-center justify-center mb-5 shadow-xl text-white border-4 ${isDarkMode ? 'border-gray-800' : 'border-white'}
            ${isReward ? 'bg-gradient-to-tr from-pink-500 to-rose-600' : 'bg-gradient-to-tr from-purple-600 to-indigo-700'}
          `}>
             {isReward ? <Heart size={44} fill="currentColor" /> : <Zap size={44} fill="currentColor" />}
          </div>

          <span className={`text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-500'}`}>
            {isReward ? 'SWEET REWARD' : 'FUN PUNISHMENT'}
          </span>
          
          <h2 className={`text-2xl font-black mb-4 px-2 leading-tight ${textColor}`}>
            {item.text}
          </h2>

          <div className={`w-full rounded-2xl p-4 mb-6 text-left shadow-inner border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
            <p className={`text-sm leading-relaxed ${subTextColor}`}>
              {isReward 
                ? "💖 恭喜！这是属于你的甜蜜时刻，对方必须无条件配合完成哦。" 
                : "⚡ 愿赌服输！这是增进感情的小挑战，请立刻执行不要耍赖哦。"}
            </p>
          </div>

          <button
            onClick={onClose}
            className={`
              w-full py-3.5 rounded-xl text-white font-bold text-lg shadow-lg transform transition active:scale-95
              ${isReward 
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-pink-500/30' 
                : 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 shadow-purple-500/30'}
            `}
          >
            {isReward ? '开心收下' : '立刻执行'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;