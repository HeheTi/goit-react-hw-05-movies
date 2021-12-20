import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviewsById } from '../../api/api';
import s from './Reviews.module.css';

const Reviews = () => {
  const { movieId } = useParams();

  const [infoReviews, setInfoReviews] = useState([]);

  const takeReviewsInfoById = useCallback(async () => {
    const { results } = await getMovieReviewsById(movieId);
    setInfoReviews(results);
  }, [movieId]);

  useEffect(() => {
    takeReviewsInfoById();
    return () => {};
  }, [takeReviewsInfoById]);

  return (
    <div className={s.sectionRevier}>
      {infoReviews.length > 0 && (
        <ul>
          {infoReviews.map(({ id, author, content }) => (
            <li key={id}>
              <p className={s.tittleRevier}>Author: {author}</p>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reviews;

/* {infoReviews.length === 0 && (
        <p>There are no reviews for this movie yet.</p>
      )} */
