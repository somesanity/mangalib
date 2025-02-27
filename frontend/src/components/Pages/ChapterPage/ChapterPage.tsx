import React, { FC, useEffect, useState } from 'react'

import classes from './ChapterPage.module.css'
import { GetCover } from '../../../Axios/GetCover';
import { useParams } from 'react-router';
import { GetPagesForChapter, GetPagesForChapterApi } from '../../../Axios/GetPagesForChapter';

export const ChapterPage: FC = () => {
    const {id, chapterid} = useParams<{ id: string, chapterid: string }>() 
    const [cover, setCover] = useState<string>('');
    const [imgPages, setImagePages] = useState<GetPagesForChapterApi[]>([]);

    const getCover = async () => {
        try {
            const coverData = await GetCover(id)
            if(coverData) {
                setCover(coverData)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getImagesForChapter = async () => {
        try {
            const imagePagesData = await GetPagesForChapter(id, chapterid)
            if(imagePagesData) {
                setImagePages(imagePagesData)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCover()
        getImagesForChapter()
    }, [id])

    
    useEffect(() => {
        console.log(cover)
    }, [cover])

    return (
    <div>
        <header className={classes.header}>
        {cover ? <img src={cover} alt="" /> : ''}
            <p>Глава {chapterid}</p>
        </header>

        <div className={classes.chapterImagesWrapper}>
            {imgPages.map(ChapterImage => (
                <img src={`http://localhost:2000${ChapterImage.image_url}`} alt="" />
            ))}
        </div>
    </div>
  )
}
