import React, { createContext, useContext, useState, ReactNode } from "react";

export interface FantasyMovie {
  title: string;
  overview: string;
  genres: string[];
  releaseDate: string;
  runtime: number;
  productionCompanies: string;
}

interface FantasyContextType {
  movies: FantasyMovie[];
  addMovie: (movie: FantasyMovie) => void;
}

interface FantasyProviderProps {
  children: ReactNode;
}

// context 
export const FantasyContext = createContext<FantasyContextType>({
  movies: [],
  addMovie: () => {},
});

// Provider
export const FantasyProvider = ({ children }: FantasyProviderProps) => {
  const [movies, setMovies] = useState<FantasyMovie[]>([]);

  const addMovie = (movie: FantasyMovie) => {
    setMovies((prev) => [...prev, movie]);
  };

  return (
    <FantasyContext.Provider value={{ movies, addMovie }}>
      {children}
    </FantasyContext.Provider>
  );
};

export const useFantasy = () => useContext(FantasyContext);
