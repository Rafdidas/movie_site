import { useEffect, useState } from "react";
import Genre from "../Components/Genre";
import useGenre from "../Components/useGenre";
import Paginations from "../Components/Pagination";
import { Access_key, img_200, unavailable } from "./Common";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from "react-router-dom";

const Movies = () => {
    
    const [stateNow, setStateNow] = useState([]);
    const [statePopular, setStatePopular] = useState([]);
    const [page, setPage] = useState(1);
    const [genre, setGenre] = useState([]);
    const [value, setValue] = useState([]);
    const genreURL = useGenre(value);

    //https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&region=en-US
    //https://api.themoviedb.org/3/movie/popular?language=en-US&page=1
    //https://api.themoviedb.org/3/movie/now_playing?api_key=${Access_key}&language=en-US&with_genres=${genreURL}

    const fetchMovieNow = async ()=>{
        try {
            const data = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${Access_key}&language=en-US`);
            const dataJ = await data.json();
            setStateNow(dataJ.results);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchMoviePopular = async () =>{
        try {
            const data = await fetch(`//api.themoviedb.org/3/discover/movie?api_key=${Access_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreURL}`);
            const dataJ = await data.json();
            setStatePopular(dataJ.results);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(()=>{
        fetchMovieNow();
    }, []);

    useEffect(()=>{
        fetchMoviePopular();
    }, [page, genreURL]);
    
    return(
            <div className="movie_page list_page">
                <div className="wrap_inner">
                    <div className="title_section">
                        <h2>Moveis 🎬 </h2>
                    </div>

                    <div className="trend_list movie_trend">
                        <div className="list_title">Now Playing Movies ✨</div>
                        <Swiper pagination={{type: 'progressbar',}} modules={[Pagination, ]} slidesPerView={3} spaceBetween={10}  speed={700} breakpoints={{ 768: { slidesPerView: 6, spaceBetween: 15, }, 1024: { slidesPerView: 8, spaceBetween: 20, }, }} className="movieNowSlide">
                            {
                                stateNow && stateNow.map((Val) => {
                                    const {
                                        name,title,poster_path,media_type,id,
                                    } = Val;
                                    const media_sort = "movie"
                                    return(
                                        <SwiperSlide key={id} >
                                            <div className="cont_box">
                                                <Link to={`detail/${id}/${media_sort}`}>
                                                    <div className="img_box">
                                                        <img src={poster_path ? `${img_200}/${poster_path}` : unavailable} alt="thumb" />
                                                    </div>
                                                </Link>
                                                 <div className="info">
                                                    <div className="media_type">{media_type === "tv" ? "TV" : "Movie"}</div>
                                                    <p className="subject">{title || name}</p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    );
                                })
                            }
                        </Swiper>
                    </div>

                    {/* Popular */}
                    <div className="title_btn">
                        <div className="list_title">Popular Movies 🔥</div>
                        <Paginations page={page} setPage={setPage} />
                    </div>
                    <Genre genre={genre} setGenre={setGenre} setPage={setPage} type="movie" value={value} setValue={setValue}/>
                    <div className="trend_list list">
                    {
                        statePopular && statePopular.map((Val) => {
                            const {
                                name,title,poster_path,first_air_date,release_date,media_type,id,vote_average
                            } = Val;
                            const media_sort = "movie";
                            return (
                                <div key={id} className="cont_box">
                                    <Link to={`detail/${id}/${media_sort}`}>
                                        <div className="img_box">
                                            <img src={poster_path ? `${img_200}/${poster_path}` : unavailable} alt="thumb" />
                                            <div className="vote">{vote_average}</div>
                                        </div>
                                    </Link>
                                    <div className="info">
                                        <div className="media_type">{media_type === "tv" ? "TV" : "Movie"}</div>
                                        <p className="subject">{title || name}</p>
                                        <div className="date">{first_air_date || release_date}</div>
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



export default Movies;