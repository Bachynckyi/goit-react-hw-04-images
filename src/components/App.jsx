import { SearchBar } from "./SearchBar/SearchBar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";
import { useState, useEffect } from "react";
import * as API from '../services/API';

export const App = () => {

  const [query, setQuery] = useState("");
  const [dataImages, setDataImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);
  const [largeImage, setLargeImage] = useState(null);
  

  useEffect(() => {
    if (!query) {
      return;
    }
    async function fethData(){
      try {    
        setIsLoading(true);
        const data = await API.fetchData(query, page);
        if(data.totalHits === 0) {
          alert("There is no matches");
          setIsLoading(false);
          return;
        }
        setTimeout(() => {
          setDataImages(prevDataImages => [...prevDataImages, ...data.hits]);
          setIsLoading(false);
          setTotal(data.totalHits);
        }, 1000);
        }
        catch(error) {
          console.log(error);
          setIsLoading(false);
        }
    }
    fethData();
  }, [query, page])

  const handleformSubmit = newQuery => {
    if(query === newQuery) {
      return; 
    }
    setQuery(newQuery);
    setDataImages([]);
    setPage(1);
    window.scrollTo({ top: 0, left: 0 });
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = () => {
    setLargeImage(null);
  };
  
  const onLargeImage = newOnLargeImage => {
    setLargeImage(newOnLargeImage);
  };

    return (
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
          paddingBottom: 24,
        }}
      >
        <SearchBar onSubmit={handleformSubmit}/>
        {dataImages.length > 0 && (
        <>
          <ImageGallery dataImages={dataImages} onLargeImage={onLargeImage}/>
          {dataImages.length < total ? (<Button onClick={loadMore}/>) : ("")}
        </>
        )}
        {isLoading && <Loader/>}
        {largeImage && (<Modal onClose={toggleModal} largeImageAndTags={largeImage}/>)}
      </div>
    );
};





  

  
