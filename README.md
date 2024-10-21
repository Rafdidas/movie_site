# MOVIE DB

https://movie-db-v1.netlify.app/

[![Netlify Status](https://api.netlify.com/api/v1/badges/28d14f02-6198-4836-8719-085267b808d0/deploy-status)](https://app.netlify.com/sites/movie-db-v1/deploys)
## 1. 소개 및 참여 인원
- TMDB를 활용한 영화 및 티비시리즈 정보 사이트
- 개인 프로젝트

## 2. 사용 기술
#### `API`
  - TMDB
  - https://developer.themoviedb.org/docs/getting-started
#### `Front-end`
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

## 3. 핵심 기능
- TMDB로 Movie, Tv 시리즈에 따른 분류와 상세설명 및 검색 기능
- 반응형 페이지 작업

## 4. 사이트 구성
   ### * 메인페이지
   - 메인페이지는 api의 Trend 항목을 보여줍니다.
   - Movie, Tv 시리즈 각각을 Swiper Slide로 보여준 뒤 아래에 전체적인 Trend 항목들을 Pagination으로 나눴습니다.

   #### * Movie 페이지
   - 상단 Now Playing Movies 부분에는 현재 극장에서 상영중인 영화들의 정보를 가져와 슬라이드로 구성하였습니다.
   - 하단 전첵 영화리스트는 Pagination 과 영화의 장르 카테고리로 구성하여, 장르별 영화리스트를 확인 할 수 있습니다.

   #### * TV Series 페이지
   - Popular TV Series의 정보를 가져와 장르 카테고리로 구성하여, 장르별 영화리스트를 확인 할 수 있습니다.

   #### * Search 페이지
   - TV Series, Movie 를 검색하여 상세페이지로 이동 가능합니다.

   #### * 상세페이지
   - 영화의 상세페이지에서는 영화의 포스터 썸네일과 배경을 넣었으며, 영화의 간단한 소개, 개봉 날짜, 수익, 상영 시간, 별점의 정보를 확인 할 수 있습니다.

## 5. 회고 / 느낀점
- 리액트를 처음 접하고 얼마 안되서 해본 개인프로젝트라서, 폴더 분류나 컴포넌트 분리 및 api 활용법이 미흡하며, 구글링으로 접한 장르 부분을 직접 개선해봐야할 듯
- 그 외 state 전달 방법 등 더 간소화 해야할 방안이 많아보이는 초기 프로젝트이다.
```
const useGenre = (value) => {
    if (value.length < 1) return "";
    
    const GenreIds = value.map((g) => g.id);
    return GenreIds.reduce((acc, curr) => acc + "," + curr);
};

export default useGenre;
```
```
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
```



