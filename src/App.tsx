import AddTask from "./components/AddTask";
import CompletedTask from "./components/CompletedTask";
import Homescreen from "./components/Homescreen";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Homescreen />} />

        <Route path="/addtask" element={<AddTask />} />

        <Route path="/completedtasks" element={<CompletedTask />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
