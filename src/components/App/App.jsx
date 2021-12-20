import { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { NavLinks } from './NavLinks/NavLinks';
import LoaderModal from '../LoaderModal/LoaderModal';
import s from './App.module.css';

const HomePage = lazy(() =>
  import('../../page/HomePage/HomePage' /* webpackChunkName: "HomePage" */),
);
const MoviesPage = lazy(() =>
  import(
    '../../page/MoviesPage/MoviesPage' /* webpackChunkName: "MoviesPage" */
  ),
);
const MovieDetailsPage = lazy(() =>
  import(
    '../../page/MovieDetailsPage/MovieDetailsPage' /* webpackChunkName: "MovieDetailsPage" */
  ),
);

// const NotFoundPade = lazy(() =>
//   import(
//     '../../page/NotFoundPage/NotFoundPage' /* webpackChunkName: "NotFoundPade" */
//   ),
// );

function App() {
  return (
    <div className="App">
      <header className={s.header}>
        <NavLinks />
      </header>

      <Suspense fallback={<LoaderModal />}>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/movies">
            <MoviesPage />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
          {/* <Route>
            <NotFoundPade />
          </Route> */}
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
