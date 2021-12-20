import React, { useState, useEffect, useCallback } from 'react';
import { getMovieCreditsById } from '../../api/api';
import { useParams } from 'react-router-dom';
import defoultImg from '../../images/notfound.png';
import s from './Cast.module.css';

const BASE_URL_IMG = 'https://image.tmdb.org/t/p/w500';

const Cast = () => {
  const { movieId } = useParams();

  const [infoCredits, setInfoCredits] = useState([]);

  const takeCreditsInfoById = useCallback(async () => {
    const { cast } = await getMovieCreditsById(movieId);
    setInfoCredits(cast);
  }, [movieId]);

  useEffect(() => {
    takeCreditsInfoById();
    return () => {};
  }, [takeCreditsInfoById]);

  return (
    <div>
      {infoCredits.length > 0 && (
        <ul>
          {infoCredits.map(({ id, name, character, profile_path }) => {
            return (
              <li key={id}>
                <div className={s.wrapperImg}>
                  <img
                    src={
                      profile_path ? BASE_URL_IMG + profile_path : defoultImg
                    }
                    alt={name}
                  />
                </div>
                <div className={s.wrapperInfo}>
                  <p>{name}</p>
                  <p>
                    Character: <span>{character}</span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Cast;
