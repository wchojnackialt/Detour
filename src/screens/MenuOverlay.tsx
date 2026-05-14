import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { CityEditorial } from '../types';
import { EXPLORE_CITIES } from '../constants';

interface MenuOverlayProps {
  onClose: () => void;
  onCityClick: (city: CityEditorial) => void;
  key?: string;
}

export default function MenuOverlay({ onClose, onCityClick }: MenuOverlayProps) {
  return (
    <motion.div 
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 z-[110] flex"
    >
      <div className="w-[85%] max-w-sm bg-background h-full shadow-2xl flex flex-col px-8 pt-6 pb-12 overflow-hidden">
        <div className="flex justify-end mb-16">
          <button onClick={onClose} className="p-1 hover:opacity-70">
            <X className="w-6 h-6 text-primary" />
          </button>
        </div>

        <nav className="mobile-content">
          <span className="text-[10px] uppercase tracking-widest text-outline mb-12 block">
            The Detour Ethos
          </span>
          
          <ul className="space-y-8">
            {EXPLORE_CITIES.map((city) => (
              <li key={city.id}>
                <button 
                  onClick={() => onCityClick(city)}
                  className="font-serif text-4xl text-primary hover:italic transition-all"
                >
                  {city.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto border-t border-primary/5 pt-12">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-12 h-12 rounded-md overflow-hidden bg-surface-container">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-serif text-2xl text-primary">Mój profil</h4>
              <p className="text-[10px] uppercase tracking-widest text-outline">TRAVEL CURATIONS</p>
            </div>
          </div>
          
          <span className="block mt-12 text-[10px] uppercase tracking-widest text-outline/30">
            EDITION Nº 04 — MMXXIV
          </span>
        </div>
      </div>
      
      <div 
        className="flex-1 bg-black/20 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />
    </motion.div>
  );
}
