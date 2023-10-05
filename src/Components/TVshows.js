import React, { useEffect, useState } from "react";
import SingleContent from "./Components/SingleContent";
import Popup from "./Components/Popup";
const Header = (props) => {
  const [content, setContent] = useState([]);
  const [inputText, setInputText] = useState("");
  const [filteredContent, setFilteredContent] = useState([]);
  const [page, setPage] = useState(1);
  const [length, setLength] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentPageGroup, setCurrentPageGroup] = useState(1);

  useEffect(() => {
    window.scroll(0, 0);
    fetchApi();
  }, [type,page]);

  const fetchApi = async () => {
    const url = `https://api.themoviedb.org/3${props.type}?api_key=867a3912870d9a450c401cc6c91591fc&page=${page}`;
    const response = await fetch(url);
    const resJson = await response.json();
    setContent(resJson.results);
    setFilteredContent(resJson.results);
    setLength(resJson.total_results);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const nextPage = () => {
    if (page < length) {
      setPage(page + 1);
      if (page % 10 === 0) {
        setCurrentPageGroup(currentPageGroup + 1);
      }
    }
  };

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      if ((page - 1) % 10 === 0) {
        setCurrentPageGroup(currentPageGroup - 1);
      }
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const startPage = (currentPageGroup - 1) * 10 + 1;
    const endPage = Math.min(currentPageGroup * 10, Math.ceil(length / 20));

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li
          key={i}
          onClick={() => handlePageChange(i)}
          className={i === page ? "active " : ""}
        >
          {i}
        </li>
      );
    }

    return pages;
  };

  const handleSearch = async () => {
    if (inputText.trim() === "") {
      setFilteredContent([]);
      setPage(1); 
      setLength(0);
      setCurrentPageGroup(1); 
      return;
    }
    const FetchUrl = `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?query=${inputText}&api_key=867a3912870d9a450c401cc6c91591fc`;
    const response = await fetch(FetchUrl);
    let data = await response.json();
    {
      if (data.results && Array.isArray(data.results)) {
        console.log("Search results:", data.results);
        setFilteredContent(data.results);
        setLength(data.results.length);
        setCurrentPageGroup(1); 
      } else {
        setFilteredContent([]);
        setPage(1);
        setLength(0); 
        setCurrentPageGroup(1);
      }
    }
  };

  

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Movie name"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {selectedMovie && (
        <Popup
          selectedMovie={selectedMovie}
          id={selectedMovie.id}
          media={selectedMovie.media_type}
        />
      )}
      <div className="content">
        {filteredContent.map((c) => (
          <SingleContent
            key={c.id}
            id={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            media_type={type? "tv " : "movie"}
            vote={c.average_vote}
            date={c.release_date || c.first_air_date}
            value={inputText}
            setSelectedMovie={setSelectedMovie}
          />
        ))}
      </div>

      <div className="page-body">
        <span onClick={() => previousPage()}>Previous</span>
        {renderPageNumbers()}
        <span onClick={() => nextPage()}>Next</span>
      </div>
    </div>
  );
};

export default Header;










































