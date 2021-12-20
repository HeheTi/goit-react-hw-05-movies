import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import {
  Route,
  Switch,
  NavLink,
  useRouteMatch,
  useParams,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { getMoviesById } from '../../api/api';
import LoaderModal from '../../components/LoaderModal/LoaderModal';
import defoultImg from '../../images/notfound.png';
import s from './MovieDetailsPage.module.css';

const Cast = lazy(() =>
  import('../../components/Cast/Cast' /* webpackChunkName: "Cast" */),
);
const Reviews = lazy(() =>
  import('../../components/Reviews/Reviews' /* webpackChunkName: "Reviews" */),
);

const BASE_URL_IMG = 'https://image.tmdb.org/t/p/w500';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const match = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  const [infoMovie, setInfoMovie] = useState(null);

  const takeMovieById = useCallback(async () => {
    const res = await getMoviesById(movieId);
    // console.log('🚀 ~ res', res);
    setInfoMovie(res);
  }, [movieId]);

  useEffect(() => {
    takeMovieById();
    return () => {
      setInfoMovie(null);
    };
  }, [takeMovieById]);

  const onClickGoBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <div className={s.sectionInfo}>
      <button className={s.btnGoBack} type="button" onClick={onClickGoBack}>
        Go back
      </button>
      {infoMovie && (
        <>
          <div className={s.movieInfo}>
            <div className={s.wrapperImg}>
              <img
                src={
                  infoMovie.poster_path
                    ? BASE_URL_IMG + infoMovie.poster_path
                    : defoultImg
                }
                alt={infoMovie.original_title}
              />
            </div>
            <div className={s.wrapperMovieInfo}>
              <h2 className={s.titleMovie}>{infoMovie.title}</h2>
              <p>
                User Score:{' '}
                <span>{Math.round((infoMovie.vote_average / 10) * 100)}%</span>
              </p>
              <h3>Overview</h3>
              <p>{infoMovie?.overview}</p>
              <h4>Genres</h4>
              <p>{infoMovie.genres.map(({ name }) => name).join(' ')}</p>
            </div>
          </div>

          <div className={s.movieMoreInfo}>
            <p className={s.textMoreInfo}>Additional information</p>
            <ul className={s.list}>
              <li>
                <NavLink
                  to={{
                    pathname: `${match.url}/cast`,
                    state: { from: location?.state?.from ?? '/' },
                  }}
                >
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: `${match.url}/reviews`,
                    state: { from: location?.state?.from ?? '/' },
                  }}
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
        </>
      )}

      <Suspense fallback={<LoaderModal />}>
        <Switch>
          <Route path={`${match.path}/cast`}>
            <Cast />
          </Route>
          <Route path={`${match.path}/reviews`}>
            <Reviews />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;

/*
<div>
      <button type="button">Go back</button>
      <div className="movieInfo">
        <div className="wrapperImg">
          <img src="" alt="" />
        </div>
        <div className="wrapperMovieInfo">
          <h2 className="titleMovie">The Lion King</h2>
          <p>
            User Score: <span>71%</span>
          </p>
          <h3>Overview</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut, dolor
            laborum temporibus aliquam dolorem quisquam illum maiores natus, cum
            enim aliquid similique delectus esse soluta consequatur. Nesciunt,
            tempore? Reiciendis, blanditiis.
          </p>
          <h4>Genres</h4>
          <p>Adventure Animation Drama</p>
        </div>
      </div>
      */
