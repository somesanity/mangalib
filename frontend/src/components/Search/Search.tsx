import React, { FC, useState } from 'react';
import classes from './Search.module.css';
import SearchIcon from './SearchIcon.svg';

interface SearchProps {
  onSearch: (query: string) => void;
}

export const Search: FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className={classes.SearchWrapper}>
      <div className={classes.searchBlock}>
        <img className={classes.searchIcon} src={SearchIcon} alt="Search" />
        <input
          className={classes.searchInput}
          type="search"
          value={query}
          onChange={handleChange}
          placeholder="Поиск..."
        />
      </div>
    </div>
  );
};
