import { Route, Routes, HashRouter } from "react-router-dom"
import './App.css';

import Project from "./pages/Project";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Project></Project>}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
