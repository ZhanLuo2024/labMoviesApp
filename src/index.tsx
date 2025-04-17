import React from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage"; 
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import PopularMoviesPage from "./pages/popularMoviesPage";
import PopularActorsPage from "./pages/popularActorsPage";
import ActorDetailPage from "./pages/actorDetailPage";
import LoginPage from "./pages/loginPage";
import CreateFantasyMoviePage from "./pages/fantasyMoviePage";
import FantasyMovieListPage from "./pages/fantasyMovieListPage";
import { FantasyProvider } from "./contexts/fantasyContext"; 
import MyReviewsPage from "./pages/myReviewsPage";
import SearchPage from "./pages/searchPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <FantasyProvider> {/* 移進來這裡 */}
        <MoviesContextProvider>
          <SiteHeader />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/reviews/:id" element={<MovieReviewPage/>} />
            <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
            <Route path="/reviews/form" element={<AddMovieReviewPage/>} />
            <Route path="/movies/popular" element={<PopularMoviesPage />} />
            <Route path="/people/popular" element={<PopularActorsPage />} />
            <Route path="/people/:id" element={<ActorDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/fantasy/new" element={<CreateFantasyMoviePage />} />
            <Route path="/fantasy/list" element={<FantasyMovieListPage />} />
            <Route path="/reviews/mine" element={<MyReviewsPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </MoviesContextProvider>
      </FantasyProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

