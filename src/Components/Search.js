import {useState, useEffect} from "react";
import SingleContent from "./SingleContent";

const Search =() =>{
    const [content, setContent] = useState([0]);
    const [type, setType] = useState(0);
  const [inputText, setInputText] = useState("");
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
    useEffect(() => {
        fetchApi();
      },[type,page]);
    
      const fetchApi = async () => {
        const url = `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=867a3912870d9a450c401cc6c91591fc`;
        const response = await fetch(url);
        const resJson = await response.json();
        setContent(resJson.results);
        setNumOfPages(resJson.total_pages);
      };
    return(
        <div className="search">
            <div className="search-bar">
        <input
          type="text"
          placeholder="Movie name"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
        />
        <button
          
            onClick={fetchApi}
          
        >
          Search
        </button>                                                                       
      </div>
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
       
    </div>
        </div>
    )
}
export default Search;