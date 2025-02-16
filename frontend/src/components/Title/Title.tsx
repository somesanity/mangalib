import React, { FC } from 'react'
import classes from './Title.module.css';
import { Link } from 'react-router';


interface TitleProps {
    id: number;
    cover: string;
    name: string;
    totalNumberChapter: number;
};

export const Title: FC<TitleProps> = ({cover, name, totalNumberChapter, id}) => {
  return (
    <div className={classes.TitleWrapper}>
      <Link to={`/title/${id}`}>
        <img className={classes.titleCover} src={cover} alt={name + ' cover'} />
      </Link>
        <p className={classes.titleName}>{name}</p>
    </div>
  )
}
