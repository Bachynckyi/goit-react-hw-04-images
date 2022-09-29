import { SearchBar } from "./SearchBar/SearchBar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";
import { Component } from "react";
import * as API from '../services/API';
export class App extends Component {
  state = {
    query: "",
    dataImages: [],
    isLoading: false,
    page: 1,
    total: null,
    largeImage: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    if(prevState.query !== this.state.query || prevState.page !== this.state.page)
    try {    
        this.setState({isLoading: true});
        const data = await API.fetchData(this.state.query, this.state.page);
        if(data.totalHits === 0) {
          alert("There is no matches");
          this.setState({isLoading: false});
          return;
        }
        setTimeout(() => {
          this.setState(state => ({dataImages: [...state.dataImages, ...data.hits], isLoading:false, total: data.totalHits}));
        }, 1000);

      }
      catch(error) {
        console.log(error => ({ error, isLoading: false }));
      }
  };

  handleformSubmit = newQuery => {
    if(this.state.query === newQuery) {
      return; 
    }
    this.setState({query: newQuery, dataImages: [], page: 1});
    window.scrollTo({ top: 0, left: 0 });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = () => {
    this.setState({largeImage: null})
  };

  onLargeImage = newOnLargeImage => {
    this.setState({ largeImage: newOnLargeImage });
  };
  
  render() {
    const { dataImages, total, largeImage} = this.state;
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
        <SearchBar onSubmit={this.handleformSubmit}/>
        {dataImages.length > 0 && (
        <>
          <ImageGallery dataImages={dataImages} onLargeImage={this.onLargeImage}/>
          {dataImages.length < total ? (<Button onClick={this.loadMore}/>) : ("")}
        </>
        )}
        {this.state.isLoading && <Loader/>}
        {largeImage && (<Modal onClose={this.toggleModal} largeImage={largeImage}/>)}
      </div>
    );
  }
};
