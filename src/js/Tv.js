import { useEffect, useState } from "react";
import { Access_key, img_200, unavailable } from "./Common";
import useGenre from "../Components/useGenre";
import Genre from "../Components/Genre";
import Paginations from "../Components/Pagination";
import { Link } from "react-router-dom";

const Tv = () => {

    const [state, setState] = useState([]);
    const [page, setPage] = useState(1);
    const [genre, setGenre] = useState([]);
    const [value, setValue] = useState([]);
    const genreURL = useGenre(value);
    

    const fetchTvs = async ()=>{
        try {
            const data = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${Access_key}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=${page}&with_genres=${genreURL}`);
            const dataJ = await data.json();
            setState(dataJ.results);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(()=>{
        fetchTvs();
    }, [page, genreURL]);    

    return(
        <div className="tv_page list_page">
            <div className="wrap_inner">
                
                <div className="title_section">
                    <h2>TV Series 📺</h2>
                </div>
                <div className="title_btn">
                    <div className="list_title">Popular TV Series 🔥</div>
                    <Paginations page={page} setPage={setPage} />
                </div>
                <Genre genre={genre} setGenre={setGenre} setPage={setPage} type="tv" value={value} setValue={setValue}/>
                <div className="trend_list list">
                {
                    state && state.map((Val) => {
                        const {
                            name,title,poster_path,media_type,id,vote_average
                        } = Val;
                        const media_sort = "tv";
                        return (
                            <div key={id} className="cont_box">
                                <Link to={`detail/${id}/${media_sort}`}>
                                    <div className="img_box">
                                        <img src={poster_path ? `${img_200}/${poster_path}` : unavailable} alt="thumb" />
                                        <div className="vote">{vote_average}</div>
                                    </div>
                                </Link>
                                <div className="info">
                                    <div className="media_type">{media_type === "tv" ? "Movie" : "TV"}</div>
                                    <p className="subject">{title || name}</p>
                                </div>
                            </div>
                        );
                    })
                }
                </div> 
            </div>
        </div> 
    );
}

export default Tv;