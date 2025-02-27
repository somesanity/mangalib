import React, { FC } from 'react'

import classes from './SelectChapter.module.css';
import { Link } from 'react-router';

import pencilIcon from './pencilIcon.svg';

interface SelectChapterProps {
    titleId: number;
    chapter: number,
    name: string;
}

export const SelectChapter: FC<SelectChapterProps> = ({titleId, chapter, name}) => {
  return (
    <div className={classes.SelectChapterWrapper}>
      <Link to={`/title/${titleId}/chapter/${chapter}`}>
      Глава {chapter} {name}
      </Link>

      <Link to={`/title/${titleId}/chapter/${chapter}/edit`}>
        <img src={pencilIcon} alt="pencilIcon" />
      </Link>
    </div>
  )
}