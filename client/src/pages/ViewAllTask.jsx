import { useState, useEffect } from "react";
import Navigation from "./Navigation";

function ViewAllTask() {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/ethereum/view-all",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTaskList(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);
  return (
    <>
  <Navigation />

      <ul>
        {taskList.map((task, index) => (
          <li key={index}>
            <p>Task ID: {task.id}</p>
            <p>Task Name: {task.name}</p>
            <p>Task Date: {task.date}</p>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
}

export default ViewAllTask;
