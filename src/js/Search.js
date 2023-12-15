import { useEffect, useState } from "react";
import { Access_key, img_200, unavailable } from "./Common";
import Paginations from "../Components/Pagination";
import { Link } from "react-router-dom";

const Search = () => {
    
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);

    const fetchSearch = async ()=> {
        try {
            const data = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${Access_key}&language=en-US&query=${searchText}&page=${page}&include_adult=false`);
            const { results } = await data.json();
            setContent(results);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(()=>{
        fetchSearch();
    }, []);

    const Trigger = (e) => {
        setSearchText(e.target.value);
        fetchSearch();
        console.log(searchText);
    };

    return(
        <div className="search_page list_page">
            <div className="wrap_inner">
                <div className="title_section">
                    <h2>Search</h2>
                </div>
                <div className="srch_box">
                    <input className="form_input" type="text" onChange={Trigger} placeholder="search..." />
                    {/* <button onClick={Search}>Search</button> */}
                </div>
                <div className="title_btn">
                    <div className="list_title">Look it up 🔎</div>
                    {
                        page > 1 && <Paginations page={page} setPage={setPage} />
                    }
                </div>
                <div className="search_list list">
                {
                    content && content.map((Val) => {
                        const {name, title, poster_path, media_type, id } = Val;
                        const media_sort = media_type;
                        return (
                            <div key={id} className="cont_box">
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
                        );
                    })
                    
                }
                
                </div>
            </div>
        </div>
    );
}

export default Search;