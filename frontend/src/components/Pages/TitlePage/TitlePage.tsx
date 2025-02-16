import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Title } from '../../Title/Title';
import { GetTitleById } from '../../../Axios/GetTitleById';
import { getTitleDataApi } from '../../../Axios/GetTitles';

export const TitlePage = () => {

const [titleData, setTitleData] = useState<getTitleDataApi[] | undefined>()

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

useEffect(() => {
    getTitle()
}, [id])

useEffect(() => {
    console.log(titleData)
}, [])


  return (
    <div className="container">
{titleData && titleData.length > 0 ? (
  <Title
    name={titleData[0].title_name}
    cover={titleData[0].title_cover}
    totalNumberChapter={200}
    id={titleData[0].id}
  />
) : (
  <p>Загрузка...</p>
)}

  </div>
  )
}
