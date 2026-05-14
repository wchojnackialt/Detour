import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import ExploreScreen from './screens/ExploreScreen';
import PlanScreen from './screens/PlanScreen';
import WhatNowScreen from './screens/WhatNowScreen';
import SearchOverlay from './screens/SearchOverlay';
import MenuOverlay from './screens/MenuOverlay';
import CityDetailsScreen from './screens/CityDetailsScreen';
import PlaceDetailsScreen from './components/PlaceDetailsScreen';
import { CityEditorial, Place } from './types';
import { EXPLORE_CITIES } from './constants';
import { TabType } from './components/BottomNav';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('explore');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchCityContext, setSearchCityContext] = useState<string | undefined>();
  const [searchDayIndex, setSearchDayIndex] = useState<number | undefined>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<CityEditorial | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [savedPlaces, setSavedPlaces] = useState<Record<string, Place[][]>>({});
  const [activePlanningCity, setActivePlanningCity] = useState<string>('Rzym');

  useEffect(() => {
    if (isSearchOpen || isMenuOpen || selectedCity || selectedPlace) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen, isMenuOpen, selectedCity, selectedPlace]);

  const toggleSavePlace = (place: Place) => {
    const cityId = place.location;
    setSavedPlaces(prev => {
      const cityDays = prev[cityId] || [[]];
      const isSaved = cityDays.flat().some(p => p.id === place.id);
      
      if (isSaved) {
        return {
          ...prev,
          [cityId]: cityDays.map(day => day.filter(p => p.id !== place.id))
        };
      } else {
        const newCityDays = [...cityDays];
        if (newCityDays.length === 0) newCityDays.push([]);
        newCityDays[0] = [...newCityDays[0], place];
        return {
          ...prev,
          [cityId]: newCityDays
        };
      }
    });
  };

  const handleUpdatePlan = (cityName: string, newDays: Place[][]) => {
    setSavedPlaces(prev => ({
      ...prev,
      [cityName]: newDays
    }));
  };

  const handleAddDay = (cityName: string) => {
    setSavedPlaces(prev => {
      const cityDays = prev[cityName] || [[]];
      return {
        ...prev,
        [cityName]: [...cityDays, []]
      };
    });
  };

  const handleCityClick = (city: CityEditorial) => {
    setSelectedCity(city);
    setActivePlanningCity(city.name);
  };

  const handlePlaceClick = (place: Place) => {
    setSelectedPlace(place);
  };

  const handleAddPlaceFromSearch = (place: Place) => {
    if (activePlanningCity && searchDayIndex !== undefined) {
      const newDays = [...(savedPlaces[activePlanningCity] || [[]])];
      if (!newDays[searchDayIndex]) newDays[searchDayIndex] = [];
      
      // Prevent duplicates in the same day
      if (!newDays[searchDayIndex].find(p => p.id === place.id)) {
        newDays[searchDayIndex] = [...newDays[searchDayIndex], place];
        handleUpdatePlan(activePlanningCity, newDays);
      }
      setIsSearchOpen(false);
      setSearchCityContext(undefined);
      setSearchDayIndex(undefined);
    }
  };

  const handleAddPlaceFromWhatNow = (place: Place) => {
    if (activePlanningCity) {
      const newDays = [...(savedPlaces[activePlanningCity] || [[]])];
      if (newDays.length === 0) newDays.push([]);
      
      // Add to the first day for simplicity in What Now
      if (!newDays[0].find(p => p.id === place.id)) {
        newDays[0] = [...newDays[0], place];
        handleUpdatePlan(activePlanningCity, newDays);
      }
    }
  };

  const openSearch = (city?: string, dayIndex?: number) => {
    setSearchCityContext(city);
    setSearchDayIndex(dayIndex);
    setIsSearchOpen(true);
  };

  return (
    <div className="mobile-container">
      {!selectedCity && !selectedPlace && (
        <Header 
          onMenuClick={() => setIsMenuOpen(true)}
          onSearchClick={() => setIsSearchOpen(true)}
          title={
            activeTab === 'profile' ? 'Profil' : 
            activeTab === 'whatnow' ? 'Co Teraz?' :
            (activeTab === 'plan' ? activePlanningCity : 'Detour')
          }
        />
      )}

      <main className="mobile-content pt-0">
        <AnimatePresence mode="wait">
          {activeTab === 'explore' && (
            <ExploreScreen key="explore" onCityClick={handleCityClick} />
          )}
          {activeTab === 'whatnow' && (
            <WhatNowScreen 
              key="whatnow" 
              currentCity={activePlanningCity}
              onAddPlace={handleAddPlaceFromWhatNow}
              onPlaceClick={handlePlaceClick}
            />
          )}
          {activeTab === 'plan' && (
            <PlanScreen 
              key="plan" 
              cityName={activePlanningCity} 
              days={savedPlaces[activePlanningCity] || [[]]} 
              onUpdatePlan={(newDays) => handleUpdatePlan(activePlanningCity, newDays)}
              onAddDay={() => handleAddDay(activePlanningCity)}
              onPlaceClick={handlePlaceClick}
              onOpenSearch={(dayIndex) => openSearch(activePlanningCity, dayIndex)}
            />
          )}
          {activeTab === 'profile' && (
            <div key="profile" className="px-6 flex items-center justify-center h-[70vh]">
               <div className="text-center">
                 <h2 className="font-serif text-3xl mb-4 italic">Profil</h2>
                 <p className="text-outline">Zaloguj się, aby zsynchronizować swoje podróże.</p>
               </div>
            </div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {isSearchOpen && (
          <SearchOverlay 
            key="search-overlay" 
            onClose={() => {
              setIsSearchOpen(false);
              setSearchCityContext(undefined);
              setSearchDayIndex(undefined);
            }} 
            cityContext={searchCityContext}
            onAddPlace={searchDayIndex !== undefined ? handleAddPlaceFromSearch : undefined}
            onPlaceClick={handlePlaceClick}
          />
        )}
        {isMenuOpen && (
          <MenuOverlay 
            key="menu-overlay" 
            onClose={() => setIsMenuOpen(false)} 
            onCityClick={(city) => {
              handleCityClick(city);
              setIsMenuOpen(false);
            }}
          />
        )}
        {selectedCity && (
          <CityDetailsScreen 
            key={`city-details-${selectedCity.id}`}
            city={selectedCity} 
            onBack={() => setSelectedCity(null)} 
            onPlaceClick={handlePlaceClick}
            isSaved={(id) => (savedPlaces[selectedCity.name] || []).flat().some(p => p.id === id)}
            onToggleSave={toggleSavePlace}
          />
        )}
        {selectedPlace && (
          <PlaceDetailsScreen 
            key={`place-details-${selectedPlace.id}`}
            place={selectedPlace} 
            onBack={() => setSelectedPlace(null)} 
            isSaved={(savedPlaces[selectedPlace.location] || []).flat().some(p => p.id === selectedPlace.id)}
            onToggleSave={() => toggleSavePlace(selectedPlace)}
          />
        )}
      </AnimatePresence>

      <BottomNav 
        activeTab={activeTab} 
        onTabChange={(tab) => {
          if (tab === 'explore' && activePlanningCity) {
            const city = EXPLORE_CITIES.find(c => c.name === activePlanningCity);
            if (city) {
              setSelectedCity(city);
            }
          } else {
            setSelectedCity(null);
          }
          setActiveTab(tab);
          setSelectedPlace(null);
        }} 
      />
    </div>
  );
}

