import AddTask from "./components/AddTask";
import CompletedTask from "./components/CompletedTask";
import Homescreen from "./components/Homescreen";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homescreen />,
    },
    { path: "/addtask", element: <AddTask /> },
    {
      path: "/completedtasks",
      element: <CompletedTask />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
