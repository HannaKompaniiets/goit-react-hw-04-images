import React, { useState} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactComponent as SearchIcon } from '../icons/search-glass.svg';
import PropTypes from 'prop-types';
import css from './SearchBar.module.css';

const SearchBar = ({ onSubmit}) => {
    const [query, setQuery] = useState('');

  const handleInput = event => {
    setQuery(event.currentTarget.value.toLowerCase())
  };

 const  onSubmitForm = event => {
    event.preventDefault();    
      if (query.trim() === '') {
        toast.error('Please enter something');
        return;
      }
    onSubmit(query);
    setQuery('');
  };

    return (
      <header className={css.Searchbar}>
        <form onSubmit={onSubmitForm} className={css.SearchForm}>
          <button type="submit" className={css.SearchFormButton}>
            <SearchIcon className={css.SearchFormButtonLabel} />
          </button>

          <input
            onChange={handleInput}
            className={css.SearchFormInput}
            value={query}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
}

export default SearchBar;

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};