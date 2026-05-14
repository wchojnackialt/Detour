import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  Users, 
  MessageSquare, 
  CheckCircle2, 
  Navigation, 
  Plus, 
  CloudRain, 
  Sun, 
  Moon, 
  Filter
} from 'lucide-react';
import { Place } from '../types';
import { EXPLORE_CITIES } from '../constants';

interface WhatNowScreenProps {
  currentCity?: string;
  onAddPlace: (place: Place) => void;
  onPlaceClick: (place: Place) => void;
  key?: string;
}

type Mode = 'Relaks' | 'Spacer' | 'JEDZENIE' | 'KULTURA' | 'Koneser';

export default function WhatNowScreen({ currentCity = 'Rzym', onAddPlace, onPlaceClick }: WhatNowScreenProps) {
  const [mode, setMode] = useState<Mode>('Relaks');
  
  // Simulate context
  const hour = new Date().getHours();
  const timeContext = useMemo(() => {
    if (hour < 12) return 'Dzień';
    if (hour < 18) return 'Popołudnie';
    return 'Wieczór';
  }, [hour]);

  const weather = 'Słonecznie'; // Mocked

  const recommendations = useMemo(() => {
    const city = EXPLORE_CITIES.find(c => c.name === currentCity);
    if (!city || !city.curatedPlaces) return [];

    // Filter by mode and proximity/time logic
    return city.curatedPlaces
      .filter(p => {
        const matchesMode = p.suitabilityTags?.includes(mode as string) || p.category === mode;
        const matchesTime = p.suitabilityTags?.includes(timeContext);
        return matchesMode || matchesTime;
      })
      .slice(0, 3);
  }, [currentCity, mode, timeContext]);

  return (
    <div className="px-6 pb-32">
      <header className="mb-12">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-outline mb-2">
          <MapPin className="w-3 h-3" />
          <span>Twoja lokalizacja: {currentCity}</span>
        </div>
        <h2 className="font-serif text-4xl text-primary mb-4 italic">Co teraz?</h2>
        
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-secondary/10 px-3 py-1.5 rounded-full border border-secondary/20">
            {timeContext === 'Wieczór' ? <Moon className="w-4 h-4 text-secondary" /> : <Sun className="w-4 h-4 text-secondary" />}
            <span className="text-xs font-medium text-secondary">{timeContext}</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20">
            <Sun className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-medium text-blue-500">{weather}</span>
          </div>
        </div>
      </header>

      <div className="space-y-4 mb-12">
        <span className="text-[10px] uppercase tracking-widest text-outline">Twój tryb</span>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {(['Relaks', 'Spacer', 'JEDZENIE', 'KULTURA', 'Koneser'] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-4 py-2 rounded-sm text-xs whitespace-nowrap transition-all duration-300 border ${
                mode === m 
                ? 'bg-primary text-background border-primary' 
                : 'bg-transparent text-primary/60 border-primary/10 hover:border-primary/30'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-12">
        {recommendations.map((place, index) => (
          <motion.div
            key={place.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <div className="relative aspect-[4/5] mb-6 overflow-hidden rounded-sm cursor-pointer" onClick={() => onPlaceClick(place)}>
              <img 
                src={place.imageUrl} 
                alt={place.name} 
                className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
              
              <div className="absolute top-4 left-4 flex gap-2">
                {place.isAuthenticVerified && (
                  <div className="flex items-center gap-1.5 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-sm border border-primary/5">
                    <CheckCircle2 className="w-3 h-3 text-secondary" />
                    <span className="text-[8px] uppercase tracking-wider font-bold">Weryfikacja autentyczności</span>
                  </div>
                )}
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] text-white/70 uppercase tracking-widest mb-2 block">{place.type}</span>
                <h3 className="font-serif text-3xl text-white mb-2 leading-none">{place.name}</h3>
                <div className="flex items-center gap-3 text-white/80 text-[10px] uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {place.openingHours}</span>
                  <span>•</span>
                  <span>{place.priceLevel ? '€'.repeat(place.priceLevel) : 'Free'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6 px-2">
              <div className="grid grid-cols-2 gap-4 border-b border-primary/5 pb-6">
                <div className="space-y-1">
                  <span className="text-[9px] text-outline uppercase tracking-widest block">Lokalność</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-serif text-primary italic">{place.localReviewPercent || 0}%</span>
                    <span className="text-[8px] text-outline uppercase tracking-tighter">recenzji lokalnych</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-[9px] text-outline uppercase tracking-widest block">Sygnały</span>
                  <div className="space-y-1">
                    {place.regularsPresent && (
                      <div className="flex items-center gap-1.5 text-[10px] text-primary/80">
                        <Users className="w-3 h-3" />
                        <span>Stali bywalcy</span>
                      </div>
                    )}
                    {place.hasOwnerResponse && (
                      <div className="flex items-center gap-1.5 text-[10px] text-primary/80">
                        <MessageSquare className="w-3 h-3" />
                        <span>Właściciel odpowiada</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-primary/60 hover:text-primary transition-colors">
                    <Navigation className="w-4 h-4" />
                    <span>Nawiguj</span>
                  </button>
                  <button 
                    onClick={() => onAddPlace(place)}
                    className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-primary/60 hover:text-primary transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Do planu</span>
                  </button>
                </div>
                <div className="text-[10px] uppercase tracking-widest text-outline italic">
                  ~1.2 km stąd
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
