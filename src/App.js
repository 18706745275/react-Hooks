import React,{ useState,useEffect } from 'react';
import Header from './components/Header'
import Movie from './components/Movie'
import Search from './components/Search'
import './App.css';

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";
function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  // 类似componentDidMount和componentDidUpdate
  useEffect(()=>{
    fetch(MOVIE_API_URL)
      .then(res=>res.json())
      .then(jsonResponse=>{
        console.log(jsonResponse)
        setMovies(jsonResponse.Search);
        setLoading(false);
      })
  },[])
  // 搜索
  const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          setMovies(jsonResponse.Search);
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
  };
  return (
    <div className="App">
      <Header text="ReactHooKs"/>
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
         <span>loading...</span>
         ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
