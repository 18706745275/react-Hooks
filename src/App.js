import React,{ useEffect,useState } from 'react';
import Header from './components/Header'
// import Example from './components/Example'
import Movie from './components/Movie'
import Search from './components/Search'
import './App.css';

// 自定义hooks
function useReducerTest(reducer,initialState){
  const [state,setState] = useState(initialState);

  function dispatch(action){
    const newState = reducer(state,action);
    setState(newState);
  }

  return [state,dispatch];
}
const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null,
}
// 引入reducer
const reducer = (state, action)=>{
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
}
const App = ()=> {
  const [state, dispatch] = useReducerTest(reducer, initialState);
  useEffect(() => {
    console.log('11')
    fetch(MOVIE_API_URL)
        .then(response => response.json())
        .then(jsonResponse => {
        dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.Search
        });
    });
  },[]);
  // 搜索
  const search = searchValue => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });
    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          dispatch({
              type: "SEARCH_MOVIES_SUCCESS",
              payload: jsonResponse.Search
          });
        } else {
          dispatch({
              type: "SEARCH_MOVIES_FAILURE",
              error: jsonResponse.Error
          });
        }
      });
  };
  const { movies, errorMessage, loading } = state;
  return (
    <div className="App">
      <Header text="ReactHooKs例子"/>
      {/* <Example initState={0}/> */}
      <Search search={search} />
      <p className="App-intro">查询最新电影</p>
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
