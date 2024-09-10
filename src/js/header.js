import { NavLink } from "react-router-dom";

const Header = () => {
    const data = [
        {
            id: 0,
            icon: "section section_trend",
            name: "Trending",
            link: "/",
        },
        {
            id: 1,
            icon: "section section_movie",
            name: "Movies",
            link: "/movies"
        },
        {
            id: 2,
            icon: "section section_tv",
            name: "TV Series",
            link: "/tv",
        },
        {
            id: 3,
            icon: "section section_srch",
            name: "Search",
            link: "/search",
        },
    ];
    return(
        <header>
            <div className="gnb">
                <h1 className="hd_title"><NavLink to={"/movie_db/"}><img src={process.env.PUBLIC_URL + `/img/tmdb_logo.svg`} alt="logo" /></NavLink></h1>
                
                <div className="container_cate">
                    {
                        data.map((Val,i)=>{
                            return(
                                
                                    <div className={`${Val.icon}`} key={Val.id}>
                                        <p className="section_title">
                                            <NavLink to={`${Val.link}`}>
                                                {Val.name}
                                            </NavLink>
                                        </p>
                                    </div>
                                
                            );
                        })
                    }
                </div>
            </div>
        </header>
    );
}

export default Header;