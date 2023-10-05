import {useState} from 'react'

const SingleContent = ({id,poster,title,date,media_type, setSelectedMovie}) => {
  
  // console.log(selectedMovie)
  return (
    <div className="media" onClick={(e)=> setSelectedMovie({id, media_type})}>
    <img src={poster? `https://image.tmdb.org/t/p/w300/${poster}` : "https://www.movienewz.com/img/films/poster-holder.jpg"} alt={title}/>
    <b className="title">{title}</b>
    <div className="movie">
    <span>{media_type=="movie" ? "Movie" :"TV Series"}</span>
    <span className="date">{date}</span>
    </div>
    </div>
  )
}

export default SingleContent