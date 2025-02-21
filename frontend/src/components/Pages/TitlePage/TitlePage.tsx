import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Title } from '../../Title/Title';
import { GetTitleById } from '../../../Axios/GetTitleById';
import { getTitleDataApi } from '../../../Axios/GetTitles';

import classes from './TitlePage.module.css';
import { SelectChapter } from '../../SelectChapter/SelectChapter';
import { GetChaptersApi, GetTitleChapters } from '../../../Axios/GetTitleChapters';
export const TitlePage = () => {

const [titleData, setTitleData] = useState<getTitleDataApi[]>([])
const [chaptersData, setChaptersData] = useState<GetChaptersApi[]>([])

const { id } = useParams<{ id: string }>();

const getTitle = async () => {
    try {
        const data = await GetTitleById(id)
        if(data) {
            setTitleData(data)
        }
    } catch (error) {
        console.log(error)
    }
}

const getChapters = async () => {
  try {
      const data = await GetTitleChapters(id)
      if(data) {
          setChaptersData(data)
      }
  } catch (error) {
      console.log(error)
  }
}

useEffect(() => {
    getTitle()
    getChapters()
}, [id])


  return (
  <div className="container">
    <div className={classes.titleWrapper}>
      {titleData.map(title => (
      <Title
        name={titleData[0].title_name}
        cover={titleData[0].title_cover}
        totalNumberChapter={200}
      />
      ))}
    </div>

    <div className={classes.SelectChapterWrapper}>
      {chaptersData.map(title => (
      <SelectChapter
        chapter={title.chapter_number}
        name={title.chapter_title}
      />
      ))}

      <p>Добавить главу +</p>
    </div>
  </div>
  )
}
