import React, { useEffect, useState } from 'react'
import { getTitleDataApi, getTitles } from '../../../Axios/GetTitles';
import { Search } from '../../Search/Search';
import { Title } from '../../Title/Title';

import classes from './MainPage.module.css';
import { Link } from 'react-router';

export const MainPage = () => {

    const [titleData, setTitleData] = useState<getTitleDataApi[]>([]);

  const getTitleData = async () => {
    const data = await getTitles();

   if (data) {
     setTitleData(data)
     console.log(data)
   }
}

  useEffect(() => {
    getTitleData()
  }, [])

  return (
    <div className='container'>
    
    <div className={classes.searchSection}>
      <Search></Search>
      <Link to={'/title/createnewtitle'}>
      <div className={classes.addTitle}>+</div>
      </Link>
    </div>

    <div className={classes.titleWrapper}>
        {titleData.map((title) => (
            <Title 
            key={title.id}
            name={title.title_name}
            cover={title.title_cover}
            totalNumberChapter={200}
            id={title.id}  
            />
        ))}
    </div>
  </div>
  )
}
