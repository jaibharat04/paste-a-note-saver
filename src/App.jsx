import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Paste from "./components/Paste";
import ViewPaste from "./components/ViewPaste";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Toaster />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pastes" element={<Paste />} />
          <Route path="/pastes/:id" element={<ViewPaste />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
