import { Compass, Bookmark, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'explore' | 'plan' | 'profile';
  onTabChange: (tab: 'explore' | 'plan' | 'profile') => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[90] bg-background border-t border-primary/5 shadow-[0_-4px_20px_rgba(0,0,0,0.02)] flex justify-around items-center h-16 px-4">
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
