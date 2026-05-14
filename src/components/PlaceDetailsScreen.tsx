import { motion } from 'motion/react';
import { ArrowLeft, Search, Bookmark, Map, ExternalLink } from 'lucide-react';
import { Place } from '../types';

interface PlaceDetailsScreenProps {
  place: Place;
  onBack: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
  key?: string;
}

export default function PlaceDetailsScreen({ place, onBack, isSaved, onToggleSave }: PlaceDetailsScreenProps) {
  // Hardcoded for "Roscioli Salumeria" for now to match exactly the screenshot logic,
  // but we can make it dynamic based on the `place` prop.
  
  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="absolute inset-0 z-30 bg-background flex flex-col"
    >
      <header className="absolute top-0 left-0 right-0 z-40 flex justify-between items-center px-6 py-4 bg-background/80 backdrop-blur-md border-b border-primary/5">
        <button onClick={onBack} className="p-1">
          <ArrowLeft className="w-6 h-6 text-primary" />
        </button>
        <h1 className="font-serif italic text-2xl text-primary tracking-widest uppercase">
          {place.location}
        </h1>
        <button className="p-1">
          <Search className="w-6 h-6 text-primary" />
        </button>
      </header>

      <div className="mobile-content pb-32">
        <div className="relative w-full h-[60vh] md:h-[70vh]">
          <img 
            src={place.imageUrl || "https://images.unsplash.com/photo-1555992336-fb0d2919326f?w=1200&h=800&fit=crop"} 
            alt={place.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-12 left-6 right-6">
            <span className="bg-primary/20 backdrop-blur-sm text-white px-3 py-1 text-[10px] uppercase tracking-widest rounded-sm">
              {place.category || place.type.toUpperCase()}
            </span>
            <h2 className="font-serif text-5xl md:text-7xl text-white mt-4 mb-2 leading-tight">
              {place.name}
            </h2>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <span className="flex items-center gap-1"><Map className="w-4 h-4" /> {place.type}</span>
              <span>{place.location}, Włochy</span>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-16">
          <blockquote className="font-serif text-3xl md:text-4xl italic text-primary leading-tight border-l-4 border-primary/10 pl-8 mb-16">
            "Miejsce pielgrzymek dla tych, którzy rozumieją, że najprostsze składniki, traktowane z szacunkiem, dają najgłębsze rezultaty."
          </blockquote>

        <div className="space-y-8 text-lg leading-relaxed text-on-surface-variant font-sans">
          <p>
            <span className="font-serif text-6xl float-left mr-3 mt-1 leading-none text-primary">R</span>
            oscioli to nie tylko restauracja; to rzymska instytucja, która wypełnia lukę między tradycyjną salumerią a nowoczesną świątynią kulinarną. Od dziesięcioleci rodzina Roscioli selekcjonuje najlepsze włoskie sery, wędliny i wina, tworząc sensoryczne archiwum dziedzictwa gastronomicznego kraju.
          </p>
          <p>
            Legendarny status ich carbonary — często uznawanej za najlepszą w Wiecznym Mieście — opiera się na fundamencie makaronu Spinosi, rzemieślniczego guanciale z Monte Conero oraz skrupulatnej mieszanki Pecorino Romano i czarnego pieprzu Sarawak. Każdy kęs jest świadectwem zaangażowania rodziny w pozyskiwanie surowców i precyzję.
          </p>
        </div>

        <div className="my-16 flex flex-col gap-8">
          <div className="aspect-[4/5] overflow-hidden rounded-md">
            <img 
              src="https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&h=1000&fit=crop" 
              alt="Signature Dish" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-serif text-3xl text-primary mb-4">Danie Popisowe</h3>
            <p className="text-on-surface-variant leading-relaxed">
              Oprócz carbonary warto zapoznać się z wyselekcjonowaną ofertą ponad 300 rodzajów serów i 150 odmian wędlin, serwowanych z ich słynnym, domowym chlebem.
            </p>
          </div>
        </div>

        <div className="bg-surface-container rounded-md p-8 my-16 space-y-8">
          <div>
            <h3 className="font-serif text-3xl text-primary mb-4">Poznaj {place.name}</h3>
            <p className="text-on-surface-variant leading-relaxed">
              Rezerwacja jest niezbędna na wieczorny serwis. Lada delikatesowa pozostaje otwarta przez cały dzień na nieformalne degustacje i zakupy.
            </p>
          </div>

          <div className="flex flex-col gap-4">
             <button 
               onClick={onToggleSave}
               className={`flex items-center justify-center gap-3 w-full py-4 rounded-sm font-semibold text-sm tracking-widest uppercase transition-colors ${
                 isSaved 
                 ? 'bg-secondary text-on-secondary hover:bg-secondary/90' 
                 : 'bg-primary text-on-primary hover:bg-black'
               }`}
             >
               <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
               {isSaved ? 'Zapisano' : 'Zapisz w ulubionych'}
             </button>
             <button className="flex items-center justify-center gap-3 w-full border border-primary text-primary py-4 rounded-sm font-semibold text-sm tracking-widest uppercase hover:bg-primary/5 transition-colors">
               <Map className="w-5 h-5" />
               Zobacz na mapie
             </button>
          </div>

          <div className="border-t border-primary/5 pt-8 text-sm">
            <h4 className="text-[10px] tracking-widest uppercase text-outline mb-4">KONTAKT</h4>
            <div className="space-y-1 text-primary">
              <p>+39 06 687 5287</p>
              <a href="https://salumeriaroscioli.com" className="flex items-center gap-2 hover:underline">
                salumeriaroscioli.com <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
  );
}
