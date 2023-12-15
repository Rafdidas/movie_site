import { useEffect } from "react";
import { Access_key } from "../js/Common";

const Genre = ({ genre, setGenre, setPage, type, value, setValue }) => {
    const fetchGenre = async () => {
        const data = await fetch( `https://api.themoviedb.org/3/genre/${type}/list?api_key=${Access_key}&language=en-US`);
        const { genres } = await data.json();
        setGenre(genres);
    };

    useEffect(()=>{
        fetchGenre();
    }, []);

    

    const CategoryAdd = (genres) => {
        setValue([...value, genres]);
        setGenre(genre.filter( (g) => g.id !== genres.id ));
        setPage(1);
    };

    const CategoryRemove = (genres) => {
        setValue(value.filter((g) => g.id !== genres.id ));
        setGenre([...genre, genres]);
        setPage(1);
    };

   return (
        
            <div className="genre_list">
            {
                value && value.map((Val) => {
                    const {id, name} = Val;
                    return(
                       
                        <div className="field active" key={id}>
                            <p className="btn" onClick={()=>CategoryRemove(Val)}>{name}</p>
                        </div>
                        
                    );  
                
                })
            }
            {
                genre && genre.map((Gen) => {
                    const { id, name } = Gen;
                    return(
                        
                        <div className="field" key={id}>
                            <p className="btn" onClick={()=>CategoryAdd(Gen)}>{name}</p>
                        </div>
                        
                    )
                })
            }
            </div>
        
    )
    
};

export default Genre;