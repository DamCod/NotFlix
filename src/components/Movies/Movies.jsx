import "./Movies.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Spinner } from "react-bootstrap";

function Movies({ movies }) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      {isLoading && (
        <div className="d-flex justify-content-center align-items-center w-100 h-100 loading-image rounded shadow my-5">
          <Spinner animation="border" variant="danger" />
        </div>
      )}
      {movies.map((movie, i) => (
        <div key={i} className="movies">
          <Link
            to={`/movies/${movie.id}`}
            className={`${isLoading && "d-none"} text-decoration-none`}
          >
            {movie.poster_path ? (
              <img
                className="rounded shadow img-fluid movie-poster w-100 h-100"
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                onLoad={() => setIsLoading(false)}
              />
            ) : (
              <div className="no-image d-flex align-items-center justify-content-center rounded shadow">
                <h5 className="notflix-logo text-danger">
                  <strong>N</strong>
                </h5>
                <p className="fs-4 text-white">{movie.title}</p>
              </div>
            )}
          </Link>
        </div>
      ))}
    </>
  );
}

export default Movies;
