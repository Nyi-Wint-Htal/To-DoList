import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type Priority = "High" | "Medium" | "Low";

type Task = {
  id: number;
  title: string;
  description: string;
  selectedCategory: string;
  categoryColor: string;
  date: string;
  time: string;
  priority: Priority;
  colorTag: string;
};
const Homescreen = () => {
  const date = new Date();
  const currentTime = date.getHours();
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const getGreeting = () => {
    if (currentTime >= 5 && currentTime < 12) {
      return "Good Morning!";
    } else if (currentTime >= 12 && currentTime < 17) {
      return "Good Afternoon!";
    } else if (currentTime >= 17 && currentTime < 21) {
      return "Good Evening!";
    } else {
      return "Good Night!";
    }
  };

  const [tasks, setTasks] = useState<Task[]>(() =>
    JSON.parse(localStorage.getItem("tasks") || "[]"),
  );

  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredTasks =
    selectedCategory === "All"
      ? tasks
      : tasks.filter((task) => task.selectedCategory === selectedCategory);

  const [search, setSearch] = useState("");
  const searchedTasks = tasks.filter((task) => task.title.startsWith(search));

  let Tasks = tasks;

  if (!search) {
    Tasks = filteredTasks;
  } else if (search && selectedCategory === "All") {
    Tasks = searchedTasks;
  } else if (search && selectedCategory != "All") {
    Tasks = tasks.filter((task) => {
      return (
        task.title.startsWith(search) &&
        task.selectedCategory === selectedCategory
      );
    });
  }

  const existingCompletedTasks = JSON.parse(
    localStorage.getItem("completedTasks") || "[]",
  );
  const numActiveTasks = tasks.length;
  const numCompletedTasks = existingCompletedTasks.length;
  const totalTasks = numActiveTasks + numCompletedTasks;

  const handleCompleteTask = (id: number) => {
    const completedTask = tasks.find((task) => task.id === id);
    if (!completedTask) return;

    const updatedTasks = tasks.filter((task) => task.id !== id);

    const existingCompletedTasks = JSON.parse(
      localStorage.getItem("completedTasks") || "[]",
    );

    const updatedCompletedTasks = [...existingCompletedTasks, completedTask];

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    localStorage.setItem(
      "completedTasks",
      JSON.stringify(updatedCompletedTasks),
    );
  };

  const numPersonalTasks = Tasks.filter(
    (task) => task.selectedCategory === "Personal",
  ).length;

  const numStudyTasks = Tasks.filter(
    (task) => task.selectedCategory === "Study",
  ).length;

  const numWorkTasks = Tasks.filter(
    (task) => task.selectedCategory === "Work",
  ).length;

  const isTaskOverdue = (date: string, time: string) => {
    const taskDateTime = new Date(`${date}T${time}`);
    return new Date() > taskDateTime;
  };

  const [sortBy, setSortBy] = useState("date");
  const sortedTasks = [...Tasks].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }

    if (sortBy === "priority") {
      const priorityOrder: Record<Priority, number> = {
        High: 1,
        Medium: 2,
        Low: 3,
      };

      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }

    if (sortBy == "alphabet") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });
  return (
    <>
      <motion.main
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.25 }}
      >
        <div id="wholescreen" className="mainContainer">
          <section id="homescreen" className="secondaryContainer">
            <section>
              <h1 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold">
                {getGreeting()}
              </h1>
              <p className="text-xs">{formattedDate}</p>
            </section>

            <section className="cardContainer">
              <div className="card">
                <p className="text-xs">Active Tasks</p>
                <p className="text-xl">{numActiveTasks}</p>
              </div>
              <Link
                to={"/completedtasks"}
                className="card bg-green-100 border border-green-400 hover:scale-105 transition-all duration-300 ease-out hover:bg-green-300 hover:border-green-500 active:scale-100"
              >
                <p className="text-xs">Completed</p>
                <p className="text-xl">{numCompletedTasks}</p>
              </Link>
            </section>
            <section className="inputbox">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search tasks..."
                onChange={(e) => setSearch(e.target.value)}
                className="outline-none bg-transparent w-full"
              />
            </section>
            <section className="tabContainer">
              <button
                className={
                  selectedCategory === "All"
                    ? "activeTab bg-purple-100"
                    : "inactiveTab bg-purple-50"
                }
                onClick={() => setSelectedCategory("All")}
              >
                All
              </button>
              <button
                className={
                  selectedCategory === "Personal"
                    ? "activeTab bg-red-200"
                    : "inactiveTab hover:bg-red-50"
                }
                onClick={() => setSelectedCategory("Personal")}
              >
                Personal
              </button>
              <button
                className={
                  selectedCategory === "Study"
                    ? "activeTab bg-blue-200"
                    : "inactiveTab hover:bg-blue-50"
                }
                onClick={() => setSelectedCategory("Study")}
              >
                Study
              </button>
              <button
                className={
                  selectedCategory === "Work"
                    ? "activeTab bg-orange-200"
                    : "inactiveTab hover:bg-orange-50"
                }
                onClick={() => setSelectedCategory("Work")}
              >
                Work
              </button>
              <div className="ml-auto flex flex-row items-center justify-center">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sortSelect"
                >
                  <option value="date">Date</option>
                  <option value="priority">Priority</option>
                  <option value="alphabet">Alphabet</option>
                </select>
                <i className="fa-solid fa-arrow-down text-pink-400"></i>
              </div>
            </section>
            <section className="taskContainer">
              {sortedTasks.map((task) => (
                <section className="task" key={task.id}>
                  <div className="flex flex-row items-center text-center">
                    <div className="flex items-center mr-auto">
                      <button
                        id="task"
                        onClick={() => handleCompleteTask(task.id)}
                        className="checkBtn"
                      ></button>
                      <p className="">{task.title}</p>
                    </div>
                    <span
                      className={`${task.colorTag} rounded-4xl h-2 w-2`}
                    ></span>
                  </div>
                  <div className="flex flex-row gap-x-2 ml-5 items-center text-center">
                    <p className={`${task.categoryColor} category`}>
                      {task.selectedCategory}
                    </p>
                    <p
                      className={`text-xs ${isTaskOverdue(task.date, task.time) ? "text-red-400" : "text-gray-400"}`}
                    >
                      {task.time} / {task.date.substring(5)}
                    </p>
                  </div>
                </section>
              ))}
            </section>
          </section>
          <section id="overview" className="overviewMainContainer">
            <h1 className="mb-4">Overview</h1>
            <div className="overviewCardsContainer">
              <div className="overviewCard bg-pink-100">
                <h2>Total Tasks</h2>
                <p className="text-2xl">{totalTasks}</p>
              </div>
              <div className="overviewCard bg-blue-100">
                <h2>Active</h2>
                <p className="text-2xl">{numActiveTasks}</p>
              </div>
              <Link
                to={"/completedtasks"}
                className="overviewCard bg-green-100 border border-green-400 hover:scale-105 transition-all duration-300 ease-out hover:bg-green-300 hover:border-green-500 active:scale-100"
              >
                <h2>Completed</h2>
                <p className="text-2xl">{numCompletedTasks}</p>
              </Link>
              <div className="flex w-full justify-center">
                <div className="customHr"></div>
              </div>
              <div className="quickstatsContainer">
                <h2 className="mb-1">Quick Stats</h2>
                <div className="flex justify-between">
                  <p>Personal</p>
                  <p>{numPersonalTasks}</p>
                </div>
                <div className="flex justify-between">
                  <p>Study</p>
                  <p>{numStudyTasks}</p>
                </div>
                <div className="flex justify-between">
                  <p>Work</p>
                  <p>{numWorkTasks}</p>
                </div>
              </div>
            </div>
          </section>
          <div className="z-10">
            <Link to={"/addtask"} className="addBtn">
              <div className="-translate-y-0.5">+</div>
            </Link>
          </div>
        </div>
      </motion.main>
    </>
  );
};

export default Homescreen;
