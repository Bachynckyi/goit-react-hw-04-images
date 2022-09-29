import PropTypes from 'prop-types';
import css from './SearchBar.module.css';
import { Component } from 'react';
import { FaSearch } from 'react-icons/fa';

export class SearchBar extends Component {
    state = {
        query: "",
    }

    handleNameChange = event => {
        this.setState({query: event.currentTarget.value.toLowerCase()})
    }

    
    handleSubmit = event => {
        event.preventDefault();
        if(this.state.query.trim() === "") {
            alert("Введите запрос")
            return; 
        }
        this.props.onSubmit(this.state.query);
        // this.setState({ query: '' })
    };

    render() {
        return(
            <header className={css.Searchbar}>
                <form className={css.SearchForm} onSubmit={this.handleSubmit}>
                    <button type="submit" className={css.SearchFormButton}>
                        <FaSearch size='26' />
                    </button>
                    <input
                        onChange={this.handleNameChange}
                        className={css.SearchFormInput}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={this.state.query} 
                    />
                </form>
            </header>
        );
    }
};

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}