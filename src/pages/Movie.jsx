import "./Movie.css";
import axios from "axios";
import tmdbApiConfig from "../tmdbApiConfig";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import { Modal } from "react-bootstrap";
import ScrollToTopBtn from "../components/ScrollToTopBtn/ScrollToTopBtn";
import Reviews from "../components/Reviews/Reviews";
import Cast from "../components/Cast/Cast";
import RecommendedMovies from "../components/RecommendedMovies/RecommendedMovies";
import Trailer from "../components/Trailer/Trailer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Movie() {
  const [movie, setMovie] = useState([]);
  const [countryFlag, setCountryFlag] = useState("");
  const params = useParams();
  const [director, setDirector] = useState([]);
  const [writer, setWriter] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getMovie = async () => {
      const { data } = await axios.get(`/movie/${params.id}`, tmdbApiConfig);
      setMovie(data);
      setCountryFlag(
        data.production_countries.length > 0 &&
          process.env.REACT_APP_FLAG_ICONS_URL +
            Object.values(data.production_countries[0])[0].toLowerCase()
      );
    };
    getMovie();
  }, [params.id]);

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconEmpty": {
      color: "#fff",
    },
  });

  function movieRuntime(movieDurationInMin) {
    const m = movieDurationInMin % 60;
    const h = (movieDurationInMin - m) / 60;
    const HHMM = h.toString() + "h " + (m < 10 ? "0" : "") + m.toString() + "m";
    return HHMM;
  }

  const [zoom, setZoom] = useState(false);
  const handleClose = () => {
    setZoom(false);
  };

  const notify = () =>
    toast.info("This functionality has not been implemented yet!");

  return (
    <>
      <ToastContainer />
      <div className="container-fluid movie-page-container text-white p-0 animate__fadeIn">
        <div className="header-movie position-relative">
          <div className="header-gradient w-100 h-100 position-absolute"></div>
          <img
            className="header-bg-img img-fluid w-100 h-100"
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt="background"
          />
          <div className="row mx-4 mx-lg-5 px-1 py-5 movie-details justify-content-between position-relative mt-5 gx-md-5">
            {movie.poster_path ? (
              <div className="col-md-3 poster-img-container position-relative p-0 rounded-3 shadow">
                <img
                  className="poster-img img-fluid"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />

                <div
                  onClick={() => setZoom(true)}
                  className="poster-expand rounded w-100 h-100"
                >
                  <span className="fs-4">
                    <i className="bi bi-arrows-fullscreen"></i> Expand
                  </span>
                </div>
              </div>
            ) : (
              <div className="no-poster-img align-items-center justify-content-center rounded shadow">
                <h5 className="notflix-logo text-danger">
                  <strong>N</strong>
                </h5>
              </div>
            )}
            <div className="col-custom-9">
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center">
                  <h1 className="title text-start fs-2">
                    <strong>{movie.title}</strong>{" "}
                    <span className="year">
                      (
                      {Object.keys(movie).length > 0 &&
                        movie.release_date.slice(0, 4)}
                      )
                    </span>
                  </h1>
                  <button
                    onClick={() => setZoom(true)}
                    className="btn btn-danger poster-btn"
                  >
                    <i className="bi bi-file-image"></i>
                  </button>
                </div>
                <div className="facts align-items-center text-start">
                  {countryFlag ? (
                    <img
                      src={countryFlag}
                      className="country img-fluid"
                      alt="production country flag"
                    />
                  ) : (
                    <p className="mb-0">Unknown production country</p>
                  )}

                  <span className="release">
                    {Object.keys(movie).length > 0 &&
                      movie.release_date
                        .replace(/-/g, "/")
                        .split("/")
                        .reverse()
                        .join("/")}
                  </span>
                  <span className="genres">
                    {Object.keys(movie).length > 0 &&
                      movie.genres.map((genre, i) =>
                        i > 0 ? ", " + genre.name : genre.name
                      )}
                  </span>
                  <span className="runtime">{movieRuntime(movie.runtime)}</span>
                </div>
                <div className="d-flex align-items-center">
                  <StyledRating
                    readOnly
                    className="my-4 me-2"
                    size="large"
                    name="simple-controlled"
                    value={Math.round(movie.vote_average / 2)}
                  />
                  <span className="me-3 fs-5">{movie.vote_average}/10</span>
                  <button
                    className="btn btn-danger circle-button"
                    onClick={notify}
                  >
                    <i className="bi bi-list-ul"></i>
                  </button>
                  <button
                    className="btn btn-danger circle-button"
                    onClick={notify}
                  >
                    <i className="bi bi-heart-fill"></i>
                  </button>
                  <button
                    className="btn btn-danger circle-button"
                    onClick={notify}
                  >
                    <i className="bi bi-bookmark-fill"></i>
                  </button>
                  <button
                    className="btn btn-danger circle-button"
                    onClick={notify}
                  >
                    <i className="bi bi-star-fill"></i>
                  </button>
                  <Trailer />
                </div>
              </div>
              {movie.tagline && (
                <p className="text-start tagline">"{movie.tagline}"</p>
              )}
              <h3 className="fs-5 text-start">
                <strong>Overview</strong>
              </h3>
              <p className="fs-5 text-start">{movie.overview}</p>
              <div className="facts pe-md-5 justify-content-between">
                <div>
                  <p className="text-start mt-3">
                    <strong>
                      {director.length > 0 && director[0].original_name}
                    </strong>
                    <br />
                    Director
                  </p>
                </div>
                <div>
                  {writer[0] && (
                    <p className="text-start mt-3">
                      <strong>
                        {writer.length > 0 && writer[0].original_name}
                      </strong>
                      <br />
                      Writer
                    </p>
                  )}
                </div>
                <div>
                  {writer[1] && (
                    <p className="text-start mt-3">
                      <strong>{writer[1].original_name}</strong>
                      <br />
                      Writer
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mx-4 mx-lg-5 page-content h-100 mt-2 py-0 g-3">
          <div className="col-lg-9 h-100">
            <div className="facts-sm flex-column text-start text-white">
              <div className="d-flex">
                <p className="pe-3">
                  <strong>Production country:</strong>
                </p>
                {countryFlag ? (
                  <img
                    src={countryFlag}
                    className="country img-fluid mt-1"
                    alt="production country flag"
                  />
                ) : (
                  <p className="mb-0">Unknown</p>
                )}
              </div>

              <div>
                <p className="pe-3">
                  <strong>Realease date:</strong>{" "}
                  {Object.keys(movie).length > 0 &&
                    movie.release_date
                      .replace(/-/g, "/")
                      .split("/")
                      .reverse()
                      .join("/")}
                </p>
              </div>
              <div>
                <p className="pe-3">
                  <strong>Genres:</strong>{" "}
                  {Object.keys(movie).length > 0 &&
                    movie.genres.map((genre, i) =>
                      i > 0 ? ", " + genre.name : genre.name
                    )}
                </p>
              </div>

              <div>
                <p className="pe-3">
                  <strong>Runtime:</strong> {movieRuntime(movie.runtime)}{" "}
                </p>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <p className="text-start mt-3">
                    <strong>
                      {director.length > 0 && director[0].original_name}
                    </strong>
                    <br />
                    Director
                  </p>
                </div>
                <div>
                  {writer[0] && (
                    <p className="text-start mt-3">
                      <strong>
                        {writer.length > 0 && writer[0].original_name}
                      </strong>
                      <br />
                      Writer
                    </p>
                  )}
                </div>
                <div>
                  {writer[1] && (
                    <p className="text-start mt-3">
                      <strong>{writer[1].original_name}</strong>
                      <br />
                      Writer
                    </p>
                  )}
                </div>
              </div>
              <hr className="my-5 bg-secondary" />
            </div>
            <Cast
              className="mt-4"
              movieId={params.id}
              setWriter={setWriter}
              setDirector={setDirector}
            />
            <hr className="mt-5 me-lg-5 bg-secondary" />
            <Reviews movieId={params.id} />
          </div>
          <div className="col-lg-3 h-100">
            <RecommendedMovies movieId={params.id} />
          </div>
        </div>
      </div>

      <Modal show={zoom} onHide={handleClose} centered>
        <Modal.Body className="bg-dark p-0">
          <img
            onClick={() => setZoom(true)}
            className="img-fluid rounded-bottom"
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title}
          />
        </Modal.Body>
      </Modal>

      <ScrollToTopBtn />
    </>
  );
}

export default Movie;
