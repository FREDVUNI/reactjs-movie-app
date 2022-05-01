import React,{useEffect,useState} from "react"
import "./App.css"
import  Card from"./Card"
import SearchIcon from "./search.svg"

const API_URL = "http://www.omdbapi.com?apikey=b3ee82b4"

const App = () =>{
    const [searchTitle,setSearchTitle] = useState("")
    const [movies,setMovies] = useState([])

    const searchMovies = (e) =>{
        let searchValue = e.target.value
        setSearchTitle(searchValue)
    }

    const getMovies = async (title) =>{
        let response = await fetch(`${API_URL}&s=${title}`,{mode: 'cors'})
        let data = await response.json()
        setMovies(data.Search)
    }

    const movieSearch = () =>{
        getMovies(searchTitle)
    }

    useEffect(()=>{
        getMovies('spy')   
    },[]);

    return(
        <div className="app">
            <h1>movie land</h1>  
            <div className="search">
                <input
                    placeholder="what are you searching for ?"
                    value={searchTitle}
                    onChange={searchMovies}
                />
                <img src={SearchIcon} alt="search" onClick={movieSearch}/>
            </div>
            <div className="container">
                {
                    movies?.length > 0  ? 
                    movies.map((movie)=>(
                        <Card movie={movie} key={movie.imdbID}/> 
                    ))
                    :
                    <div className="empty">
                        <h2>The movie does not exist</h2>
                    </div>
                }
            </div>
        </div>
    );  
}

export default App;