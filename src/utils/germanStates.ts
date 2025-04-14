// German state constants matching the backend GERMAN_STATE_CODES
export interface GermanState {
    id: number;
    name: string;
    key: string;
  }
  
  export const GERMAN_STATES: GermanState[] = [
    { id: 0, name: 'Baden-Württemberg', key: 'baden_wuerttemberg' },
    { id: 1, name: 'Bavaria', key: 'bavaria' },
    { id: 2, name: 'Berlin', key: 'berlin' },
    { id: 3, name: 'Brandenburg', key: 'brandenburg' },
    { id: 4, name: 'Bremen', key: 'bremen' },
    { id: 5, name: 'Hamburg', key: 'hamburg' },
    { id: 6, name: 'Hesse', key: 'hesse' },
    { id: 7, name: 'Lower Saxony', key: 'lower_saxony' },
    { id: 8, name: 'Mecklenburg-Vorpommern', key: 'mecklenburg_vorpommern' },
    { id: 9, name: 'North Rhine-Westphalia', key: 'north_rhine_westphalia' },
    { id: 10, name: 'Rhineland-Palatinate', key: 'rhineland_palatinate' },
    { id: 11, name: 'Saarland', key: 'saarland' },
    { id: 12, name: 'Saxony', key: 'saxony' },
    { id: 13, name: 'Saxony-Anhalt', key: 'saxony_anhalt' },
    { id: 14, name: 'Schleswig-Holstein', key: 'schleswig_holstein' },
    { id: 15, name: 'Thuringia', key: 'thuringia' }
  ];
  
  // Get a state by its ID
  export const getStateById = (id: number): GermanState | null => {
    return GERMAN_STATES.find(state => state.id === id) || null;
  };
  
  // Get a state by its key
  export const getStateByKey = (key: string): GermanState | null => {
    return GERMAN_STATES.find(state => state.key === key) || null;
  };