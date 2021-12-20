import React, { useState, useEffect, useCallback } from 'react';
import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import { getSerchMovies } from '../../api/api';
import s from './MoviesPage.module.css';

const SERCH_PARAM = 'serchQuery';

const MoviesPage = () => {
  const match = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  const [inputValue, setInputValue] = useState(() => startSerchQuery());
  const [serchQuery, setSerchQuery] = useState(() => startSerchQuery());
  const [infoSerch, setInfoSerch] = useState([]);

  function startSerchQuery() {
    return !location.search
      ? ''
      : new URLSearchParams(location.search).get(SERCH_PARAM);
  }

  const takeSerchMovie = useCallback(async () => {
    if (!serchQuery.trim()) {
      return;
    }
    const res = await getSerchMovies(serchQuery);
    setInfoSerch(res.results);
  }, [serchQuery]);

  useEffect(() => {
    takeSerchMovie();
  }, [takeSerchMovie]);

  const onSubmitForm = e => {
    e.preventDefault();

    if (!inputValue.trim() || serchQuery === inputValue) return;

    history.push({ ...location, search: `serchQuery=${inputValue}` });
    setSerchQuery(inputValue);
  };

  return (
    <div className={s.sectionSerch}>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="query"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <button className={s.submitForm} type="submit">
          Serch
        </button>
      </form>
      <ul className={s.list}>
        {infoSerch.map(({ id, original_title }) => (
          <li className={s.item} key={id}>
            <Link
              to={{
                pathname: `${match.url}/${id}`,
                state: { from: location },
              }}
            >
              {original_title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesPage;
