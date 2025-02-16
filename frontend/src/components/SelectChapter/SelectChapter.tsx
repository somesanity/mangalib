import React, { FC } from 'react'

import classes from './SelectChapter.module.css';
import { Link } from 'react-router';

interface SelectChapterProps {
    chapter: number,
    name: string;
}

export const SelectChapter: FC<SelectChapterProps> = ({chapter, name}) => {
  return (
    <Link to={`/title/1/chapter/1`}>
    <div className={classes.SelectChapterWrapper}>
        Глава {chapter} {name}
    </div>
    </Link>
  )
}
