import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AddTask = () => {
  const currentDate = new Date().toISOString().split("T")[0];
  const currentTime = new Date().toTimeString().slice(0, 5);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Personal");
  const [categoryColor, setCategoryColor] = useState("bg-red-100 text-red-400");
  const [date, setDate] = useState(currentDate);
  const [time, setTime] = useState(currentTime);
  const [priority, setPriority] = useState("Low");
  const [colorTag, setColorTag] = useState("bg-purple-400");

  const navigate = useNavigate();

  const handleSaveTask = () => {
    const newTask = {
      id: Date.now(),
      title,
      description,
      selectedCategory,
      categoryColor,
      date,
      time,
      priority,
      colorTag,
    };
    const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    existingTasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(existingTasks));
    navigate("/");
  };

  return (
    <motion.main
      className="mainContainer"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.25 }}
    >
      <section className="secondaryContainer pb-20 overflow-y-scroll scroll-smooth">
        <div className="flex gap-x-5 sticky top-0 backdrop-blur-sm h-15 rounded-3xl w-full">
          <Link to={"/"}>
            <i className="fa-solid fa-circle-arrow-left fa-xl" />
          </Link>
          <h1>New Task</h1>
        </div>
        <div className="flex flex-col gap-y-10 text-xs">
          <div>
            <h2 className="subheading">Task Title</h2>
            <input
              type="text"
              name="tasktitle"
              id="tasktitle"
              placeholder="Enter task title..."
              className="inputbox2"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div>
            <h2 className="subheading">Description</h2>
            <textarea
              name="description"
              id="description"
              placeholder="Add details about your task"
              className="inputbox2 h-25 pt-2"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
          </div>
          <div>
            <h2 className="subheading">Category</h2>
            <div className="grid grid-cols-3 w-full text-center gap-x-2">
              <button
                onClick={() => {
                  setSelectedCategory("Personal");
                  setCategoryColor("bg-red-100 text-red-400");
                }}
                className={
                  selectedCategory === "Personal"
                    ? "activeCategory bg-red-100 text-red-400"
                    : "inactiveCategory"
                }
              >
                Personal
              </button>
              <button
                onClick={() => {
                  setSelectedCategory("Study");
                  setCategoryColor("bg-blue-100 text-blue-400");
                }}
                className={
                  selectedCategory === "Study"
                    ? "activeCategory bg-blue-100 text-blue-400"
                    : "inactiveCategory"
                }
              >
                Study
              </button>
              <button
                onClick={() => {
                  setSelectedCategory("Work");
                  setCategoryColor("bg-orange-100 text-orange-400");
                }}
                className={
                  selectedCategory === "Work"
                    ? "activeCategory bg-orange-100 text-orange-400"
                    : "inactiveCategory"
                }
              >
                Work
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <div>
              <h2 className="subheading">Date</h2>
              <input
                type="date"
                name="date"
                id="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                className="inputbox2 pl-10"
              />
            </div>
            <div>
              <h2 className="subheading">Time</h2>
              <input
                type="time"
                name="time"
                id="time"
                value={time}
                onChange={(e) => {
                  setTime(e.target.value);
                }}
                className="inputbox2 pl-10"
              />
            </div>
          </div>
          <div>
            <h2 className="subheading">Priority</h2>
            <div className="grid grid-cols-3 gap-x-2 text-center">
              <button
                onClick={() => {
                  setPriority("Low");
                }}
                className={
                  priority === "Low"
                    ? "activePriority bg-green-100 text-green-400"
                    : "inactivePriority"
                }
              >
                Low
              </button>
              <button
                onClick={() => {
                  setPriority("Medium");
                }}
                className={
                  priority === "Medium"
                    ? "activePriority bg-orange-100 text-orange-400"
                    : "inactivePriority"
                }
              >
                Medium
              </button>
              <button
                onClick={() => {
                  setPriority("High");
                }}
                className={
                  priority === "High"
                    ? "activePriority bg-red-100 text-red-400"
                    : "inactivePriority"
                }
              >
                High
              </button>
            </div>
          </div>
          <div>
            <h2 className="subheading">Color Tag</h2>
            <div className="flex items-start flex-row gap-x-2">
              <button
                onClick={() => {
                  setColorTag("bg-purple-400");
                }}
                className={
                  colorTag === "bg-purple-400"
                    ? "activeColorTag bg-purple-400"
                    : "inactiveColorTag bg-purple-300"
                }
              ></button>
              <button
                onClick={() => {
                  setColorTag("bg-blue-400");
                }}
                className={
                  colorTag === "bg-blue-400"
                    ? "activeColorTag bg-blue-400"
                    : "inactiveColorTag bg-blue-300"
                }
              ></button>
              <button
                onClick={() => {
                  setColorTag("bg-red-400");
                }}
                className={
                  colorTag === "bg-red-400"
                    ? "activeColorTag bg-red-400"
                    : "inactiveColorTag bg-red-300"
                }
              ></button>
              <button
                onClick={() => {
                  setColorTag("bg-pink-400");
                }}
                className={
                  colorTag === "bg-pink-400"
                    ? "activeColorTag bg-pink-400"
                    : "inactiveColorTag bg-pink-300"
                }
              ></button>
              <button
                onClick={() => {
                  setColorTag("bg-green-400");
                }}
                className={
                  colorTag === "bg-green-400"
                    ? "activeColorTag bg-green-400"
                    : "inactiveColorTag bg-green-300"
                }
              ></button>
              <button
                onClick={() => {
                  setColorTag("bg-yellow-400");
                }}
                className={
                  colorTag === "bg-yellow-400"
                    ? "activeColorTag bg-yellow-400"
                    : "inactiveColorTag bg-yellow-300"
                }
              ></button>
            </div>
          </div>
        </div>
      </section>
      <section className="saveContainer">
        <div className="w-screen flex h-15 justify-center items-center px-5">
          <button
            className="saveBtn"
            disabled={!title}
            onClick={() => handleSaveTask()}
          >
            Save Task
          </button>
        </div>
      </section>
    </motion.main>
  );
};

export default AddTask;
