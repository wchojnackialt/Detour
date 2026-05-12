import { motion } from 'motion/react';
import { ArrowLeft, MapPin, X, Plus } from 'lucide-react';
import { EDITORIAL_RECOMMENDATIONS, EXPLORE_CITIES } from '../constants';
import { useState, useMemo } from 'react';
import { Place } from '../types';

interface SearchOverlayProps {
  onClose: () => void;
  cityContext?: string;
  onAddPlace?: (place: Place) => void;
  onPlaceClick: (place: Place) => void;
  key?: string;
}

const STATIC_GMAPS_RESULTS = [
  { id: 'g1', name: 'Atelier September', desc: 'Kawiarnia • Gothersgade 30, Kopenhaga', type: 'Kawiarnia', location: 'Kopenhaga' },
  { id: 'g2', name: 'Antico Forno Roscioli', desc: 'Piekarnia • Via dei Chiavari 34, Rzym', type: 'Podstawowe', location: 'Rzym' },
  { id: 'g3', name: 'Arakel', desc: 'Restauracja • Rue de l\'Ancien-Port 15, Genewa', type: 'Restauracja', location: 'Genewa' },
  { id: 'g4', name: 'Atlas Coffee Embassy', desc: 'Kawiarnia • Thong Lo, Bangkok', type: 'Kawiarnia', location: 'Bangkok' }
];

export default function SearchOverlay({ onClose, cityContext, onAddPlace, onPlaceClick }: SearchOverlayProps) {
  const [query, setQuery] = useState('');

  const editorialResults = useMemo(() => {
    const allPlaces: (Place & { imageUrl?: string })[] = [];
    
    if (cityContext) {
      const city = EXPLORE_CITIES.find(c => c.name === cityContext);
      if (city) {
        city.curatedPlaces.forEach(p => {
          allPlaces.push({ ...p, imageUrl: p.imageUrl });
        });
      }
    } else {
      EXPLORE_CITIES.forEach(city => {
        if (city.curatedPlaces) {
          city.curatedPlaces.forEach(p => {
            allPlaces.push({ ...p, imageUrl: p.imageUrl });
          });
        }
      });
    }

    if (!query) {
      return cityContext ? allPlaces : EDITORIAL_RECOMMENDATIONS;
    }

    return allPlaces.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.location.toLowerCase().includes(query.toLowerCase()) ||
      (p.type && p.type.toLowerCase().includes(query.toLowerCase()))
    ).slice(0, 5);
  }, [query, cityContext]);

  const gmapsResults = useMemo(() => {
    if (!query) return cityContext ? STATIC_GMAPS_RESULTS.filter(r => r.location === cityContext) : STATIC_GMAPS_RESULTS;
    return STATIC_GMAPS_RESULTS.filter(r => 
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.location.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, cityContext]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[85] bg-background flex flex-col pt-4 overflow-hidden"
    >
      <div className="px-6 pb-4 border-b border-primary/10">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={onClose} className="p-1 hover:opacity-70">
            <ArrowLeft className="w-6 h-6 text-primary" />
          </button>
          <h2 className="font-serif text-3xl text-primary leading-none">
            {cityContext ? `Szukaj w ${cityContext}` : 'Szukaj'}
          </h2>
        </div>

        <div className="relative flex items-center group">
          <MapPin className="absolute left-0 w-5 h-5 text-primary" />
          <input 
            autoFocus
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-3 bg-transparent border-b-2 border-primary outline-none text-xl font-sans placeholder:text-outline-variant"
            placeholder="Gdzie chcesz się udać?"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="absolute right-0 p-1 text-outline hover:text-primary"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-10 pb-32">
        <section className="mb-12">
          <h3 className="text-[10px] uppercase tracking-widest text-outline mb-8">Rekomendacje redakcji</h3>
          <div className="space-y-6">
            {editorialResults.map((rec) => (
              <div key={rec.id} className="flex gap-4 items-center group cursor-pointer">
                <div className="w-16 h-16 bg-surface-container-highest flex-shrink-0">
                  <img src={rec.imageUrl} alt={rec.name} className="w-full h-full object-cover" />
                </div>
                <div className="border-b border-outline/10 flex-1 h-16 flex items-center justify-between pb-4">
                  <button 
                    onClick={() => onPlaceClick(rec)}
                    className="text-left flex-1"
                  >
                    <h4 className="font-semibold text-primary hover:text-primary/70 transition-colors">{rec.name}</h4>
                    <p className="text-xs text-outline italic mt-0.5">{rec.location} • {rec.type}</p>
                  </button>
                  {onAddPlace && (
                    <button 
                      onClick={() => onAddPlace(rec as any)}
                      className="p-2 bg-primary/5 text-primary rounded-full hover:bg-primary hover:text-white transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {editorialResults.length === 0 && (
              <p className="text-sm text-outline italic">Brak rekomendacji dopasowanych do zapytania.</p>
            )}
          </div>
        </section>

        <section>
          <h3 className="text-[10px] uppercase tracking-widest text-outline mb-8">Wyniki z Google Maps</h3>
          <div className="space-y-6">
            {gmapsResults.map((item) => (
              <div key={item.id} className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-outline group-hover:bg-primary group-hover:text-white transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1 border-b border-outline/5 pb-4 flex items-center justify-between">
                  <button 
                    onClick={() => onPlaceClick({
                      id: item.id,
                      name: item.name,
                      type: item.type as any,
                      location: item.location,
                      description: item.desc
                    })}
                    className="text-left flex-1"
                  >
                    <h4 className="font-semibold text-primary hover:text-primary/70 transition-colors">{item.name}</h4>
                    <p className="text-xs text-outline italic mt-0.5">{item.desc}</p>
                  </button>
                  {onAddPlace && (
                    <button 
                      onClick={() => onAddPlace({
                        id: item.id,
                        name: item.name,
                        type: item.type as any,
                        location: item.location,
                        description: item.desc
                      })}
                      className="p-2 bg-primary/5 text-primary rounded-full hover:bg-primary hover:text-white transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {gmapsResults.length === 0 && (
              <p className="text-sm text-outline italic">Brak wyników z Google Maps.</p>
            )}
          </div>
        </section>
      </div>
    </motion.div>
  );
}
