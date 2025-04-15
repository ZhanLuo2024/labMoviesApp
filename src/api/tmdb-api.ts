export const getMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
  ).then((response) => {
    if (!response.ok)
      throw new Error(`Unable to fetch movies. Response status: ${response.status}`);
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

  
export const getMovie = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to get movie data. Response status: ${response.status}`);
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};

  
  export const getGenres = () => {
    return fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" + import.meta.env.VITE_TMDB_KEY + "&language=en-US"
    ).then( (response) => {
      if (!response.ok)
        throw new Error(`Unable to fetch genres. Response status: ${response.status}`);
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };
  
  
  export const getMovieImages = (id: string | number) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error("failed to fetch images");
      }
      return response.json();
    }).then((json) => json.posters)
      .catch((error) => {
        throw error
      });
  };
  

  export const getMovieReviews = (id: string | number) => { //movie id can be string or number
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        // console.log(json.results);
        return json.results;
      });
  };

  // src/api/tmdb-api.ts
  export const getUpcomingMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
    );
    const json = await response.json();
    return json.results;
  };

  export const getPopularMovies = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
    );
    const json = await res.json();
    return json.results;
  };
  
  export const getPopularActors = async (): Promise<any> => {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/popular?api_key=${import.meta.env.VITE_TMDB_KEY}`
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  };

  export const getActorDetail = async (id: string | undefined) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${id}?language=en-US&append_to_response=combined_credits&api_key=${import.meta.env.VITE_TMDB_KEY}`
    );
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response.json();
  };
  
  
  
  
  
  



