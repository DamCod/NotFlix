import "./App.css";
import MainNav from "./components/MainNav/MainNav";
import Home from "./pages/Home";
import About from "./pages/About";
import FilterByTitle from "./pages/FilterByTitle";
import FilterByRating from "./pages/FilterByRating";
import { Routes, Route } from "react-router-dom";
import Movie from "./pages/Movie";
import NoMatch from "./pages/NoMatch";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App position-relative bg-dark">
      <MainNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:id" element={<Movie />} />
        <Route path="/filter-title" element={<FilterByTitle />} />
        <Route path="/filter-rating" element={<FilterByRating />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;