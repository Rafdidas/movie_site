import './App.css';
import React from "react";

import Header from './js/header';
import Footer from './js/footer';
import Trending from './js/Trending';
import Movies from './js/Movies';
import Tv from './js/Tv';
import Search from './js/Search';
import Error from './js/Error';

import { Route, Routes } from 'react-router-dom';
import Detail from './js/Detail';


const App = () => {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/*' element={
          <Routes>
            <Route path='/' element={ <Trending/> } exact />
            <Route path='/detail/:id/:media_sort' element={<Detail />} />
          </Routes>
        } />
        <Route path='/movies/*' element={
          <Routes>
            <Route path='/' element={ <Movies/> } />
            <Route path='/detail/:id/:media_sort' element={<Detail />} />
          </Routes>
        } />
        <Route path='/tv/*' element={
          <Routes>
            <Route path='/' element={ <Tv/> } />
            <Route path='/detail/:id/:media_sort' element={<Detail />} />
          </Routes>
        } />
        <Route path='/search/*' element={
          <Routes>
            <Route path='/' element={ <Search/> } />
            <Route path='/detail/:id/:media_sort' element={<Detail />} />
          </Routes>
        } />
        
        <Route path='*' element={<Error/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
