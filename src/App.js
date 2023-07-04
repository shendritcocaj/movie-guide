import React, { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";
const API_URL = "http://www.omdbapi.com?apikey=28f33e7b";
const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingSpinner = (
    <PulseLoader margin={20} color={"#138A95"} size={30} />
  );
  useEffect(() => {
    searchMovies("Fury");
  }, []);
  const searchMovies = async (title) => {
    setLoading(true);
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search || []);
    setLoading(false);
  };
  const handleSearch = () => {
    if (loading) {
      return loadingSpinner;
    } else {
      searchMovies(searchTerm);
    }
  };
  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img src={SearchIcon} alt="search" onClick={handleSearch} />
      </div>
      {loading ? (
        <div className="container">{loadingSpinner}</div>
      ) : (
        <>
          {movies.length > 0 ? (
            <div className="container">
              {movies.map((movie, index) => (
                <div key={index}>
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p style={{ color: "red" }}>No results found!</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default App;
