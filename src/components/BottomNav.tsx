import { Compass, Bookmark, User, MapPin } from 'lucide-react';

export type TabType = 'explore' | 'whatnow' | 'plan' | 'profile';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="absolute bottom-0 left-0 right-0 z-[90] bg-background border-t border-primary/5 shadow-[0_-4px_20px_rgba(0,0,0,0.02)] flex justify-around items-center h-16 px-4">
      <button 
        onClick={() => onTabChange('explore')}
        className={`flex flex-col items-center justify-center transition-all duration-200 ${
          activeTab === 'explore' ? 'text-primary scale-110 font-semibold' : 'text-outline hover:opacity-80'
        }`}
      >
        <Compass className={`w-5 h-5 ${activeTab === 'explore' ? 'fill-primary' : ''}`} />
        <span className="text-[10px] tracking-tighter uppercase mt-1">Odkryj</span>
      </button>

      <button 
        onClick={() => onTabChange('whatnow')}
        className={`flex flex-col items-center justify-center transition-all duration-200 ${
          activeTab === 'whatnow' ? 'text-secondary scale-110 font-semibold' : 'text-outline hover:opacity-80'
        }`}
      >
        <MapPin className={`w-5 h-5 ${activeTab === 'whatnow' ? 'fill-secondary' : ''}`} />
        <span className="text-[10px] tracking-tighter uppercase mt-1">Co teraz?</span>
      </button>

      <button 
        onClick={() => onTabChange('plan')}
        className={`flex flex-col items-center justify-center transition-all duration-200 ${
          activeTab === 'plan' ? 'text-primary scale-110 font-semibold' : 'text-outline hover:opacity-80'
        }`}
      >
        <Bookmark className={`w-5 h-5 ${activeTab === 'plan' ? 'fill-primary' : ''}`} />
        <span className="text-[10px] tracking-tighter uppercase mt-1 text-center">Zaplanuj</span>
      </button>

      <button 
        onClick={() => onTabChange('profile')}
        className={`flex flex-col items-center justify-center transition-all duration-200 ${
          activeTab === 'profile' ? 'text-primary scale-110 font-semibold' : 'text-outline hover:opacity-80'
        }`}
      >
        <User className={`w-5 h-5 ${activeTab === 'profile' ? 'fill-primary' : ''}`} />
        <span className="text-[10px] tracking-tighter uppercase mt-1">Profil</span>
      </button>
    </nav>
  );
}
