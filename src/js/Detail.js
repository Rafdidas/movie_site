import { useParams } from "react-router-dom";
import { Access_key, img_og, unavailable} from "./Common";
import { useEffect, useState } from "react";

const Detail = () => {
    const { id, media_sort } = useParams();
    const [stateDetail, setStateDetail] = useState([]);
    
    const fetchDetail = async ()=>{
        try {
            const data = await fetch(`https://api.themoviedb.org/3/${media_sort}/${id}?api_key=${Access_key}`);
            const dataJ = await data.json();
            setStateDetail(dataJ);
            console.log(dataJ);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const addCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    useEffect(()=>{
        fetchDetail();
    }, [id, media_sort]);
    
    const data = stateDetail;

    return(
        
        <>
            {
                data && (
                    <div className="detail_page" style={{
                        backgroundImage: `url("${img_og}/${data.backdrop_path}`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                    }}>
                        <div className="wrap_inner">
                            <h1 className="title">{ data.title || data.name }</h1>
                            <div className="info_box">
                                <div className="img_section">
                                    <img src={data.poster_path ? `${img_og}/${data.poster_path}` : unavailable} alt="thumb" />
                                </div>
                                <div className="text_section">
                                    <h2 className="title">{ data.title || data.name }</h2>
                                    <p className="tagline">{data.tagline}</p>
                                    <div className="field_genres">
                                        {data.genres && data.genres.length > 0 && (
                                            <>
                                            
                                                {data.genres.map((genre) => (
                                                <p key={genre.id}>{genre.name}</p>
                                                ))}
                                            
                                            </>
                                        )}
                                    </div>
                                    <p className="overview">{data.overview}</p>
                                    {data.release_date && (
                                        <p className="release txt_box">Release Date : <span>{data.release_date}</span></p>
                                    )}
                                    {data.revenue && (
                                        <p className="revenue txt_box">Revenue : <span>$ {addCommas(data.revenue)}</span></p>
                                    )}
                                    {data.runtime && (
                                        <p className="runtime txt_box">Runtime : <span>{data.runtime} min</span></p>
                                    )}
                                    {data.vote_average && (
                                        <p className="vote_avg txt_box">Vote_average : <span>{data.vote_average}/10</span></p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </> 
    )
}

export default Detail;