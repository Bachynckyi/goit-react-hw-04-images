import PropTypes from 'prop-types';
import css from './SearchBar.module.css';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export const SearchBar = ({onSubmit}) => {
    const [query, setQuery] = useState("");

    const handleNameChange = event => {
        setQuery(event.currentTarget.value.toLowerCase())
    }

    
    const handleSubmit = event => {
        event.preventDefault();
        if(query.trim() === "") {
            alert("Введите запрос")
            return; 
        }
        onSubmit(query);
    };

        return(
            <header className={css.Searchbar}>
                <form className={css.SearchForm} onSubmit={handleSubmit}>
                    <button type="submit" className={css.SearchFormButton}>
                        <FaSearch size='26' />
                    </button>
                    <input
                        onChange={handleNameChange}
                        className={css.SearchFormInput}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={query} 
                    />
                </form>
            </header>
        );
}

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}