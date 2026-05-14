import { motion } from 'motion/react';
import { MapPin, Plus, Trash2, GripVertical } from 'lucide-react';
import { Place } from '../types';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

interface PlanScreenProps {
  cityName: string;
  days: Place[][];
  onUpdatePlan: (newDays: Place[][]) => void;
  onAddDay: () => void;
  onPlaceClick: (place: Place) => void;
  onOpenSearch: (dayIndex: number) => void;
  key?: string;
}

export default function PlanScreen({ cityName, days, onUpdatePlan, onAddDay, onPlaceClick, onOpenSearch }: PlanScreenProps) {
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(days[sInd], source.index, destination.index);
      const newDays = [...days];
      newDays[sInd] = items;
      onUpdatePlan(newDays);
    } else {
      const result = move(days[sInd], days[dInd], source, destination);
      const newDays = [...days];
      newDays[sInd] = result[sInd];
      newDays[dInd] = result[dInd];
      onUpdatePlan(newDays);
    }
  };

  const reorder = (list: Place[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const move = (source: Place[], destination: Place[], droppableSource: any, droppableDestination: any) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result: any = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  const removePlace = (dayIndex: number, placeId: string) => {
    const newDays = [...days];
    newDays[dayIndex] = newDays[dayIndex].filter(p => p.id !== placeId);
    onUpdatePlan(newDays);
  };

  const removeDay = (dayIndex: number) => {
    const newDays = [...days];
    newDays.splice(dayIndex, 1);
    onUpdatePlan(newDays);
  };

  const totalPlaces = days.flat().length;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      className="pt-24 pb-32 max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop"
    >
      <section className="mb-lg">
        <h2 className="font-serif text-5xl text-primary mb-4 leading-tight">{cityName}</h2>
        <p className="text-lg text-on-surface-variant max-w-xl">
          Twoja selekcja miejsc w {cityName}. Zorganizuj swój plan podróży przeciągając miejsca między dniami.
        </p>
      </section>

      <DragDropContext onDragEnd={onDragEnd}>
        <section className="space-y-16">
          {days.map((dayPlaces, dayIndex) => (
            <div key={`day-${dayIndex}`} className="border-t border-primary/5 pt-8">
              <div className="mb-8">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif text-4xl text-primary leading-none">Dzień {dayIndex + 1}</h3>
                  {dayPlaces.length === 0 && (
                    <button 
                      onClick={() => removeDay(dayIndex)}
                      className="text-outline hover:text-red-500 transition-colors p-1"
                      title="Usuń pusty dzień"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <p className="text-[10px] text-outline uppercase tracking-widest mb-6">
                  {dayPlaces.length} MIEJSCA
                </p>
                
                <div className="relative group max-w-full">
                  <MapPin className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
                  <button 
                    onClick={() => onOpenSearch(dayIndex)}
                    className="w-full pl-7 py-2 bg-transparent border-b border-outline/20 group-hover:border-primary transition-colors text-left text-sm text-outline-variant"
                  >
                    Dodaj miejsce
                  </button>
                </div>
              </div>

              <div className="w-full">
                <Droppable droppableId={`${dayIndex}`}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`space-y-4 min-h-[100px] rounded-sm transition-colors ${snapshot.isDraggingOver ? 'bg-primary/5' : ''}`}
                    >
                      {dayPlaces.length === 0 ? (
                        <div className="py-12 text-center border-2 border-dashed border-primary/5 rounded-sm">
                          <p className="font-serif text-xl italic text-outline">Pusty dzień</p>
                          <p className="text-sm text-outline-variant mt-2">Przeciągnij tutaj miejsce z innego dnia.</p>
                        </div>
                      ) : (
                        dayPlaces.map((place, index) => (
                          // @ts-ignore - key is required by React but some dnd-types might not explicitly include it in DraggableProps
                          <Draggable key={place.id} draggableId={place.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className={`flex justify-between items-center group bg-background border border-primary/5 p-4 rounded-sm shadow-sm transition-shadow ${snapshot.isDragging ? 'shadow-lg border-primary/20 scale-[1.02] z-50' : ''}`}
                              >
                                <div className="flex items-center gap-4">
                                  <div {...provided.dragHandleProps} className="text-outline-variant hover:text-primary transition-colors">
                                    <GripVertical className="w-5 h-5" />
                                  </div>
                                  <button 
                                    onClick={() => onPlaceClick(place)}
                                    className="text-left hover:opacity-70 transition-opacity"
                                  >
                                    <h4 className="font-serif text-xl text-primary leading-tight mb-1">{place.name}</h4>
                                    <p className="text-on-surface-variant italic text-xs line-clamp-1 mb-2">{place.description}</p>
                                    {place.category && (
                                      <span className="inline-block px-2 py-0.5 bg-primary/5 text-primary text-[10px] font-bold tracking-widest uppercase rounded">
                                        {place.category}
                                      </span>
                                    )}
                                  </button>
                                </div>
                                <button 
                                  onClick={() => removePlace(dayIndex, place.id)}
                                  className="text-outline hover:text-red-500 p-1 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            )}
                          </Draggable>
                        ))
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          ))}

          {totalPlaces > 0 && (
            <div className="pt-8 flex justify-center">
              <button 
                onClick={onAddDay}
                className="group flex items-center gap-2 px-8 py-4 bg-primary/5 hover:bg-primary/10 transition-all duration-300 rounded-sm border border-primary/10"
              >
                <Plus className="w-5 h-5 text-primary" />
                <span className="font-serif text-xl text-primary">Dodaj kolejny dzień</span>
              </button>
            </div>
          )}

          {totalPlaces === 0 && (
            <div className="py-24 text-center">
               <p className="font-serif text-3xl italic text-outline mb-4">Twój plan jest jeszcze pusty</p>
               <p className="text-on-surface-variant mb-8">Wróć do odkrywania i zapisz kilka miejsc, które chcesz odwiedzić.</p>
            </div>
          )}
        </section>
      </DragDropContext>
    </motion.div>
  );
}
