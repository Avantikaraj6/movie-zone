import { useEffect, useState } from "react";

const Popup =(props)  =>{
    const { selectedMovie ,id} = props;
    const [content, setContent] = useState([0]);
    console.log(selectedMovie);
    useEffect(() => {
        fetchApi();
      },[selectedMovie]);
    
      const fetchApi = async () => {
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=867a3912870d9a450c401cc6c91591fc`;
        const response = await fetch(url);
        const resJson = await response.json();
        setContent(resJson);
        console.log(resJson)
      };
    return(
        <div className="popup" >
            <div className="image-section">
             <img src={ `https://image.tmdb.org/t/p/w300/${content ? content.poster_path : ""}` } alt={content ?  content.title : ""} className="popup-image"/>
             </div>
    <div className="second-section">
    <b className="popup-title">{content?.title }</b>
    {/* <span>{content.media_type==="tv" ? "TV Series" :"Movie"}</span> */}
    <span>Release Date - {content ? content.release_date : ""}</span>
    <span>{content ?  content.overview : ""}</span>
    <span>Rating -{content ? content.vote_average : ""}</span>
    </div>
        </div>
    )
}
export default Popup;