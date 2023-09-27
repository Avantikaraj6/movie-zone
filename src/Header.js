import React, { useEffect, useState } from "react";
import SingleContent from "./Components/SingleContent";
import Popup from "./Components/Popup";
import Shimmer from "./Components/Shimmer";
const Header = (props) => {
  const [content, setContent] = useState([0]);
  const [inputText, setinputText] = useState("");
  const [filteredContent, setFilteredContent] = useState([]);
  const [page, setPage] =useState([1])
  const[length, setLength] = useState([]);
  const [mediaType, setType] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState([]);
  

  useEffect(() => {
    fetchApi();
  },[page]);

  const fetchApi = async () => {
    const url = `https://api.themoviedb.org/3${props.type}?api_key=867a3912870d9a450c401cc6c91591fc&page=${page}`;
    const response = await fetch(url);
    const resJson = await response.json();
    setContent(resJson.results);
    setFilteredContent(resJson.results);
    setLength(resJson.total_results)
  };
  // const fetchMovies= content.filter((movie) => ((movie.media_type) == "movie"));
  // console.log(fetchMovies);
  
   const handlePageChange =(page) =>{
    setPage(page);
   }
   const nextPage =() =>{
    if(page < (length -1)){
     setPage(page+1)
    }
   }
   const previousPage =() =>{
    if(page > 0){
      setPage(page-1)
    }
   }
  {if(content === 0){ return <Shimmer />}}
  // if(selectedMovie){
  //   return (
  //     <Popup  selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie}/>
  //   )
  // }
  
  return (
    <div>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Movie name"
          value={inputText}
          onChange={(e) => {
            setinputText(e.target.value);
          }}
        />
        <button
          onClick={() => {
            const filteredData = content.filter((movie) => (movie.title||movie.name).toLowerCase().includes(inputText.toLowerCase()));
            console.log(filteredData);
            setFilteredContent(filteredData);
          }}
        >
          Search
        </button>                                                                       
      </div>
      
      <div className="content">
        {filteredContent.map((c) => (
              <SingleContent
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                media_type={c.media_type}
                vote={c.average_vote}
                date={c.release_date || c.first_air_date}
                value={inputText}
                setSelectedMovie={setSelectedMovie}
              />
            ))}
      </div>
      <div className="page-body" >
      <span onClick={() => previousPage()}>Previous</span>
    {[...Array(10)].map((c, page)=>{
       c=page+1;
      return(
        <li onClick={(e) => handlePageChange(e.target.textContent)} key={page}>{c}</li>
      )
    })
    }
    <span onClick={() => nextPage((page)=> page +1)}>Next</span>
    </div>
    </div>
  );
};

export default Header;
