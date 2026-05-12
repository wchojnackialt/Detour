import { Menu, Search } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
  title?: string;
  isTransparent?: boolean;
}

export default function Header({ onMenuClick, onSearchClick, title = 'Detour', isTransparent = false }: HeaderProps) {
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 transition-colors duration-300 ${isTransparent ? 'bg-transparent' : 'bg-background border-b border-primary/5'}`}>
      <button onClick={onMenuClick} className="p-1 hover:opacity-70 transition-opacity">
        <Menu className="w-6 h-6 text-primary" />
      </button>
      
      <h1 className="font-serif italic text-2xl text-primary tracking-widest uppercase">
        {title}
      </h1>
      
      <button onClick={onSearchClick} className="p-1 hover:opacity-70 transition-opacity">
        <Search className="w-6 h-6 text-primary" />
      </button>
    </header>
  );
}
