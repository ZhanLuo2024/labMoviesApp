import React, { useState, useCallback } from "react";
import { BaseMovieProps, Review } from "../types/interfaces";

interface MovieContextInterface {
  favourites: number[];
  mustWatch: number[]; // ✅ NEW
  addToFavourites: (movie: BaseMovieProps) => void;
  removeFromFavourites: (movie: BaseMovieProps) => void;
  addToMustWatch: (movie: BaseMovieProps) => void; // ✅ NEW
  addReview: (movie: BaseMovieProps, review: Review) => void;
}

const initialContextState: MovieContextInterface = {
  favourites: [],
  mustWatch: [], // ✅
  addToFavourites: () => {},
  removeFromFavourites: () => {},
  addToMustWatch: () => {}, // ✅
  addReview: () => {},
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [favourites, setFavourites] = useState<number[]>([]);
  const [mustWatch, setMustWatch] = useState<number[]>([]); // ✅
  const [myReviews, setMyReviews] = useState<Review[]>([]);

  const addToFavourites = useCallback((movie: BaseMovieProps) => {
    setFavourites((prevFavourites) => {
      if (!prevFavourites.includes(movie.id)) {
        return [...prevFavourites, movie.id];
      }
      return prevFavourites;
    });
  }, []);

  const removeFromFavourites = useCallback((movie: BaseMovieProps) => {
    setFavourites((prevFavourites) =>
      prevFavourites.filter((mId) => mId !== movie.id)
    );
  }, []);

  const addToMustWatch = useCallback((movie: BaseMovieProps) => {
    setMustWatch((prev) => {
      if (!prev.includes(movie.id)) {
        const updated = [...prev, movie.id];
        console.log("🎯 Must Watch list:", updated); // ✅ Debug console
        return updated;
      }
      return prev;
    });
  }, []);

  const addReview = (movie: BaseMovieProps, review: Review) => {
    setMyReviews({ ...myReviews, [movie.id]: review } as any); // you may define better typing
  };

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        mustWatch, // ✅
        addToFavourites,
        removeFromFavourites,
        addToMustWatch, // ✅
        addReview,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
