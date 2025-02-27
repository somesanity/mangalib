import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Title } from '../../Title/Title';
import { GetTitleById } from '../../../Axios/GetTitleById';
import { getTitleDataApi } from '../../../Axios/GetTitles';

import classes from './TitlePage.module.css';
import { SelectChapter } from '../../SelectChapter/SelectChapter';
import { GetChaptersApi, GetTitleChapters } from '../../../Axios/GetTitleChapters';
import { addNewChapter } from '../../../Axios/addNewChapter';
export const TitlePage = () => {

const [titleData, setTitleData] = useState<getTitleDataApi[]>([])
const [chaptersData, setChaptersData] = useState<GetChaptersApi[]>([])
const [addNewChapterIsClicked, setAddNewChapterIsClicked] = useState<boolean>(false);
const [newChapterNumberInput, setNewChapterNumberInput] = useState<number>(0);
const [newChapterNameInput, setNewChapterNameInput] = useState<string>('');

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

const createNewChapter = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault()

  if(newChapterNameInput && newChapterNumberInput) {
    const req = await addNewChapter(id as string, newChapterNumberInput, newChapterNameInput);
    console.log(req)
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
        titleId={Number(id)}
      />
      ))}

      <p onClick={
        () => addNewChapterIsClicked 
        ? setAddNewChapterIsClicked(false) 
        : setAddNewChapterIsClicked(true)}>Добавить главу +  
      </p>

      {addNewChapterIsClicked 
      ? 
      <div>
        <form action="">
          <input type="number" value={newChapterNumberInput} onChange={(e) => setNewChapterNumberInput(Number(e.target.value))} placeholder='введите номер главы' />
          <input type="text" value={newChapterNameInput} onChange={(e) => setNewChapterNameInput(e.target.value)} placeholder='введите название главы' />
          <button type='submit' onClick={(e) => createNewChapter(e)}>Создать главу</button>
        </form>
        <SelectChapter 
          chapter={newChapterNumberInput}
          name={newChapterNameInput}
          titleId={Number(id)}
          />
      </div>
      :
        ''
      }
    </div>
  </div>
  )
}
