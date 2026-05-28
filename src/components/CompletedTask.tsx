import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type CompletedTasks = {
  id: number;
  title: string;
  description: string;
  selectedCategory: string;
  categoryColor: string;
  date: string;
  time: string;
  priority: string;
  colorTag: string;
};

const CompletedTask = () => {
  const [completedTasks, setCompletedTasks] = useState<CompletedTasks[]>(
    JSON.parse(localStorage.getItem("completedTasks") || "[]"),
  );
  const numCompletedTasks = completedTasks.length;

  const activeTasks: CompletedTasks[] = JSON.parse(
    localStorage.getItem("tasks") || "[]",
  );

  const numActiveTasks = activeTasks.length;

  const totalTasks = numCompletedTasks + numActiveTasks;
  const completionPercent = !totalTasks
    ? "0%"
    : `${Math.round((numCompletedTasks / totalTasks) * 100)}%`;

  const handleUndoTask = (id: number) => {
    const taskToUndo = completedTasks.find((task) => task.id === id);
    if (!taskToUndo) return;
    const updatedCompletedTasks = completedTasks.filter(
      (task) => task.id !== id,
    );
    const updatedActiveTasks = [...activeTasks, taskToUndo];
    setCompletedTasks(updatedCompletedTasks);
    localStorage.setItem(
      "completedTasks",
      JSON.stringify(updatedCompletedTasks),
    );
    localStorage.setItem("tasks", JSON.stringify(updatedActiveTasks));
  };
  return (
    <motion.main
      className="mainContainer"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.25 }}
    >
      <section className="secondaryContainer2">
        <div className="flex gap-x-5 sticky top-0 left-0 backdrop-blur-sm h-15 rounded-3xl w-full">
          <Link to={"/"}>
            <i className="fa-solid fa-circle-arrow-left fa-xl hover:scale-105 transition-all duration-300 ease-out" />
          </Link>
          <h1>Completed Tasks</h1>
        </div>
        <div className="bg-linear-to-r from-purple-200 to-pink-200 w-full h-auto p-3 rounded-2xl flex items-start gap-y-4 flex-col shadow-sm/30">
          <div className="grid grid-cols-[auto_1fr] gap-x-3">
            <div className="bg-white w-10 h-10 rounded-2xl flex items-center justify-center">
              <i className="fa-solid fa-trophy text-purple-500" />
            </div>
            <div className="w-full">
              <h1 className="text-[clamp(0.8rem,3vw,1rem)]">Your Progress</h1>
              <h2 className="progressText">
                {completionPercent === "0%"
                  ? "Go, Get it done, Tiger!"
                  : "Keep up the great work!"}
              </h2>
            </div>
          </div>
          <div className="w-full">
            <div className="flex justify-between">
              <h2 className="progressText">Completed</h2>
              <h2 className="progressText">{`${numCompletedTasks}/${totalTasks}`}</h2>
            </div>
            <div className="w-full bg-white opacity-70 h-2 rounded-4xl mb-3">
              <div
                className="bg-linear-to-r from-purple-500 to-pink-500 h-2 rounded-4xl transition-all duration-500 ease-in-out"
                style={{ width: completionPercent }}
              ></div>
            </div>
            <div className="w-full flex justify-center items-center">
              <h2 className="text-[clamp(1rem,4vw,1.5rem)]">{`${completionPercent} Complete`}</h2>
            </div>
          </div>
        </div>
        <div className="flex gap-x-2 items-center">
          <i className="fa-solid fa-star text-purple-500"></i>
          <h2 className="text-md">Completed Tasks</h2>
          <h2 className="text-xs font-light">{numCompletedTasks}</h2>
        </div>
        <div className="taskContainer">
          {completedTasks.map((task) => (
            <div key={task.id} className="task">
              <div className="flex flex-row items-center text-center justify-between">
                <div className="flex items-start">
                  <button onClick={() => handleUndoTask(task.id)}>
                    <i
                      className="
                      fa-regular
                      fa-circle-check
                      mr-1
                      text-green-400 hover:text-red-500 transition-all duration-300 ease-out hover:scale-105 active:scale-90 hover:cursor-pointer"
                    ></i>
                  </button>
                  <p className="line-through text-gray-400">{task.title}</p>
                </div>
                <span className={`${task.colorTag} rounded-4xl h-2 w-2`}></span>
              </div>
              <div className="flex ml-5 items-center">
                <p className={`${task.categoryColor} category`}>
                  {task.selectedCategory}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.main>
  );
};

export default CompletedTask;
