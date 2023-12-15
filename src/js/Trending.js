import React from "react";
import { useEffect, useState } from "react";
import {Access_key, img_200, unavailable} from "./Common";
import Paginations from "../Components/Pagination";
import { Link } from "react-router-dom";
// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Trending = () => {
    const [page, setPage] = useState(1);
    const [stateAll, setStateAll] = useState([]);
    const [stateMovie, setStateMovie] = useState([]);
    const [stateTv, setStateTv] = useState([]);
    
    const fetchTrending = async ()=>{
        try {
            const data = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${Access_key}&page=${page}`);
            const dataJ = await data.json();
            setStateAll(dataJ.results);
        } catch(error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchMovieTrending = async ()=>{
        try {
            const data = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${Access_key}`);
            const dataJ = await data.json();
            setStateMovie(dataJ.results);
        } catch(error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchTvTrending = async ()=>{
        try {
            const data = await fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${Access_key}`);
            const dataJ = await data.json();
            setStateTv(dataJ.results);
        } catch(error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(()=>{
        fetchMovieTrending();
        fetchTvTrending();
    }, []);

    useEffect(()=>{
        fetchTrending();
    }, [page]);

    return(
        <div className="trend_page list_page">
            <div className="wrap_inner">
                <div className="title_section">
                    <h2>Check out the Trending.</h2>
                </div>
                {/* movie trend */}
                <div className="trend_list movie_trend">
                    <div className="list_title">Movie Trends 🔥</div>
                    <Swiper pagination={{type: 'progressbar',}} modules={[Pagination, ]} slidesPerView={2} spaceBetween={15}  speed={700} className="movieTrendSlide" breakpoints={{ 768: { slidesPerView: 6, spaceBetween: 15, }, 1024: { slidesPerView: 8, spaceBetween: 20, }, }}>
                        {
                            stateMovie && stateMovie.map((Val) => {
                                
                                const {
                                    name,title,poster_path,first_air_date,release_date,media_type,id,vote_average,
                                } = Val;
                                const media_sort = "movie";
                                return(
                                    <SwiperSlide key={id} >
                                        <div className="cont_box">
                                            <Link to={`detail/${id}/${media_sort}`}>
                                                <div className="img_box">
                                                    <img src={poster_path ? `${img_200}/${poster_path}` : unavailable} alt="thumb" />
                                                    <div className="vote">{vote_average}</div>
                                                </div>
                                            </Link>
                                            <div className="info">
                                                <div className="media_type">{media_type === "tv" ? "TV" : "Movie"}</div>
                                                <p className="subject">{title || name}</p>
                                                <div className="date">
                                                    {first_air_date || release_date === '' ? "date" : first_air_date || release_date}
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                );
                            })
                        }
                    </Swiper>
                </div>
                {/* tv trend */}
                <div className="trend_list tv_trend">
                    <div className="list_title">Tv Trends 🔥</div>
                    <Swiper pagination={{type: 'progressbar',}} modules={[Pagination, ]} slidesPerView={2} spaceBetween={15}  speed={750} className="tvTrendSlide" breakpoints={{ 768: { slidesPerView: 6, spaceBetween: 15, }, 1024: { slidesPerView: 8, spaceBetween: 20, }, }}>
                        {
                            stateTv && stateTv.map((Val) => {
                                
                                const {
                                    name,title,poster_path,first_air_date,release_date,media_type,id,vote_average
                                } = Val;
                                const media_sort = "tv";
                                return(
                                    <SwiperSlide key={id} >
                                        <div className="cont_box">
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
                                    </SwiperSlide>
                                );
                            })
                        }
                    </Swiper>
                </div>
                {/* all trend */}
                <div className="title_btn">
                    <div className="list_title">All Trends 🔥</div>
                    <Paginations page={page} setPage={setPage} />
                </div>
                <div className="trend_list list">
                {
                    stateAll && stateAll.map((Val) => {
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

export default Trending;