import { motion } from 'motion/react';
import { CityEditorial } from '../types';
import { EXPLORE_CITIES } from '../constants';
import { ArrowRight } from 'lucide-react';

interface ExploreScreenProps {
  onCityClick: (city: CityEditorial) => void;
  key?: string;
}

export default function ExploreScreen({ onCityClick }: ExploreScreenProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="pt-24 pb-32 max-w-screen-xl mx-auto px-6 md:px-margin-desktop"
    >
      <section className="mb-xl">
        <h1 className="font-serif text-[40px] text-primary mb-8 leading-tight">
          Dokąd następnym razem?
        </h1>
        
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
          <button className="bg-primary text-on-primary px-6 py-2 rounded-full text-xs font-semibold whitespace-nowrap">
            Wszystkie kierunki
          </button>
          <button className="border border-outline-variant text-on-surface-variant px-6 py-2 rounded-full text-xs font-semibold whitespace-nowrap hover:bg-surface-container transition-colors">
            Wybrzeże
          </button>
          <button className="border border-outline-variant text-on-surface-variant px-6 py-2 rounded-full text-xs font-semibold whitespace-nowrap hover:bg-surface-container transition-colors">
            Góry
          </button>
          <button className="border border-outline-variant text-on-surface-variant px-6 py-2 rounded-full text-xs font-semibold whitespace-nowrap hover:bg-surface-container transition-colors">
            Metropolie
          </button>
        </div>
      </section>

      <section className="flex flex-col gap-12 md:gap-xl">
        {EXPLORE_CITIES.map((city, index) => (
          <article 
            key={city.id}
            className="group cursor-pointer"
            onClick={() => onCityClick(city)}
          >
            <div className="relative aspect-[16/9] overflow-hidden rounded-md mb-4 bg-surface-container-highest">
              <img 
                src={city.imageUrl} 
                alt={city.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
            </div>
            
            <div className="flex justify-between items-end">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-outline mb-1 block">
                  {city.country}
                </span>
                <h2 className="font-serif text-3xl text-primary">{city.name}</h2>
              </div>
              <div className="pb-1">
                <ArrowRight className="w-5 h-5 text-outline group-hover:text-primary transition-colors" />
              </div>
            </div>
          </article>
        ))}

        <div className="py-16 border-y border-outline/10 my-8">
          <p className="font-serif text-2xl md:text-3xl italic text-center text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            "Podróżowanie to odkrywanie, że wszyscy mylą się co do innych krajów."
          </p>
          <span className="block text-center text-[10px] tracking-widest uppercase mt-4 text-outline">
            — Aldous Huxley
          </span>
        </div>
      </section>
    </motion.div>
  );
}
