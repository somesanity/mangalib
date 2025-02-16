import React, { FC } from 'react'
import classes from './Search.module.css';
import SearchIcon from './SearchIcon.svg';


export const Search: FC = () => {
  return (
    <div>
        <div className={classes.SearchWrapper}>
            <search className={classes.searchBlock}>
                <img className={classes.searchIcon} src={SearchIcon} alt="" />
                <input className={classes.searchInput} type="search" />
            </search>
        </div>
    </div>
  )
}
