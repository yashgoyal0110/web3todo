import { useState } from "react";
import Navigation from "./Navigation";

function ViewTask() {
  const [task, setTask] = useState({});
  const [taskId, setTaskId] = useState("");
  const viewTask = async () => {
    try {
      event.preventDefault();
      const response = await fetch(
        `http://localhost:3000/api/ethereum/view-task/${taskId}`,
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
      setTask(data);
    } catch (error) {
      console.error("Error fetching task:", error);
      setTask({});
    }
  };
  return (
    <>
  <Navigation />

    <form onSubmit={viewTask}>
      <h1>View Task</h1>
      <input
        type="text"
        placeholder="Enter Task ID"
        value={taskId}
        onChange={(e) => setTaskId(e.target.value)}
      />
      <button type="submit">View Task</button>
      {task && (
        <div>
          <p>Task ID: {task.id}</p>
          <p>Task Name: {task.name}</p>
          <p>Task Date: {task.date}</p>
        </div>
      )}
    </form>
    </>

  );
}

export default ViewTask;
