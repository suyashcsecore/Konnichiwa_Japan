import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import QuizHome from "./pages/QuizHome";
import QuizPage from "./pages/QuizPage";
import QuizResult from "./pages/QuizResult";

import PuzzleHome from "./pages/PuzzleHome";
import GarbagePuzzle from "./pages/GarbagePuzzle";
import MannersGame from "./pages/MannersGame";
import PackingGame from "./pages/PackingGame";
import SurvivalMission from "./pages/SurvivalMission";
import MemoryGame from "./pages/MemoryGame";
import CultureGame from "./pages/CultureGame";
function App() {
  return (
    <BrowserRouter>

      <nav className="navbar">

        <Link to="/" className="logo">
          🇯🇵 Japan Life
        </Link>

        <div className="nav-links">
          <Link to="/">Quiz</Link>
          <Link to="/puzzles">Puzzles</Link>
        </div>

      </nav>

      <Routes>

        <Route
          path="/"
          element={<QuizHome />}
        />

        <Route
          path="/quiz/:level"
          element={<QuizPage />}
        />

        <Route
          path="/quiz/result"
          element={<QuizResult />}
        />

        <Route
          path="/puzzles"
          element={<PuzzleHome />}
        />

        <Route
          path="/puzzles/garbage"
          element={<GarbagePuzzle />}
        />

        <Route
  path="/puzzles/manners"
  element={<MannersGame />}
/>

<Route
  path="/puzzles/packing"
  element={<PackingGame />}
/>

<Route
  path="/puzzles/survival"
  element={<SurvivalMission />}
/>

<Route
  path="/puzzles/memory"
  element={<MemoryGame />}
/>

<Route
  path="/puzzles/culture"
  element={<CultureGame />}
/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;