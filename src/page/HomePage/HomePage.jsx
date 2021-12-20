import { useState, useEffect, useCallback } from 'react';
import { getTrendingMovie } from '../../api/api';
import { Link, useLocation } from 'react-router-dom';
import s from './HomePage.module.css';

const HomePage = () => {
  const location = useLocation();

  const [moviesTrend, setMoviesTrend] = useState([]);

  const takeTrendMovies = useCallback(async () => {
    const res = await getTrendingMovie();
    setMoviesTrend(state => [...state, ...res.results]);
  }, []);

  useEffect(() => {
    takeTrendMovies();

    return () => {};
  }, [takeTrendMovies]);

  return (
    <div className={s.sectionHome}>
      <h2 className={s.sectionHomeTitle}>Trending today</h2>
      {moviesTrend.length > 0 && (
        <ul className={s.list}>
          {moviesTrend.map(({ id, original_title }) => (
            <li key={id} className={s.item}>
              <Link
                to={{
                  pathname: `/movies/${id}`,
                  state: { from: location },
                }}
              >
                {original_title}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {/* <button type="button">show more</button> */}
    </div>
  );
};

export default HomePage;
