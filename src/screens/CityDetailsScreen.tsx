import { motion } from 'motion/react';
import { ArrowLeft, Search, Bookmark } from 'lucide-react';
import { CityEditorial, Place } from '../types';
import { useState, useMemo } from 'react';

interface CityDetailsScreenProps {
  city: CityEditorial;
  onBack: () => void;
  onPlaceClick?: (place: Place) => void;
  isSaved: (id: string) => boolean;
  onToggleSave: (place: Place) => void;
  key?: string;
}

export default function CityDetailsScreen({ city, onBack, onPlaceClick, isSaved, onToggleSave }: CityDetailsScreenProps) {
  const [activeCategory, setActiveCategory] = useState<string>('WSZYSTKIE');

  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add('WSZYSTKIE');
    city.curatedPlaces.forEach(place => {
      if (place.category) cats.add(place.category);
    });
    return Array.from(cats);
  }, [city.curatedPlaces]);

  const filteredPlaces = useMemo(() => {
    if (activeCategory === 'WSZYSTKIE') return city.curatedPlaces;
    return city.curatedPlaces.filter(place => place.category === activeCategory);
  }, [city.curatedPlaces, activeCategory]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-10 bg-background overflow-y-auto"
    >
      <header className="fixed top-0 left-0 right-0 z-20 flex justify-between items-center px-6 py-4 bg-background/80 backdrop-blur-md border-b border-primary/5">
        <button onClick={onBack} className="p-1">
          <ArrowLeft className="w-6 h-6 text-primary" />
        </button>
        <h1 className="font-serif italic text-2xl text-primary tracking-widest uppercase">
          {city.name}
        </h1>
        <button className="p-1">
          <Search className="w-6 h-6 text-primary" />
        </button>
      </header>

      <div className="pt-24 pb-32 max-w-3xl mx-auto px-6">
        <section className="mb-12">
          <span className="text-[10px] uppercase tracking-widest text-outline mb-2 block">MIEJSCE</span>
          <h2 className="font-serif text-6xl text-primary mb-6">{city.name}</h2>
          <p className="font-serif text-2xl italic text-on-surface-variant leading-relaxed">
            {city.description || "Odkryj duszę tego niezwykłego miasta przez starannie wyselekcjonowane miejsca, które definiują jego charakter."}
          </p>
        </section>

        <section className="flex gap-4 overflow-x-auto pb-6 mb-8 no-scrollbar scroll-smooth -mx-6 px-6">
          {categories.map((category) => (
            <button 
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                activeCategory === category 
                ? 'bg-primary text-on-primary' 
                : 'border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </section>

        <section className="space-y-16">
          {filteredPlaces.map((place) => (
            <article 
              key={place.id} 
              className="group cursor-pointer"
              onClick={() => onPlaceClick?.(place)}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-md mb-6 bg-surface-container-highest">
                <img 
                  src={place.imageUrl} 
                  alt={place.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSave(place);
                  }}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-primary shadow-sm hover:scale-110 transition-transform"
                >
                  <Bookmark className={`w-5 h-5 ${isSaved(place.id) ? 'fill-primary' : ''}`} />
                </button>
                {place.category && (
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-black/80 backdrop-blur-sm text-white px-3 py-1 text-[10px] uppercase tracking-widest rounded-sm">
                      {place.category}
                    </span>
                  </div>
                )}
              </div>
              
              <h3 className="font-serif text-3xl text-primary mb-2">{place.name}</h3>
              <p className="text-on-surface-variant leading-relaxed text-lg">
                {place.description}
              </p>
            </article>
          ))}
          {filteredPlaces.length === 0 && (
            <div className="py-20 text-center">
              <p className="font-serif text-2xl italic text-outline">Brak miejsc w tej kategorii</p>
            </div>
          )}
        </section>
      </div>
    </motion.div>
  );
}
