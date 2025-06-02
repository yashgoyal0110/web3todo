import React, { useState } from "react";
import Navigation from "./Navigation";

function CreateTask({ state }) {
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");

  const { contract, account } = state;

  const createTask = async (event) => {
    event.preventDefault();
    const response = await fetch(
      "http://localhost:3000/api/ethereum/create-task",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskDate: taskDate }),
      }
    );
    console.log("Request body:", response);

  
    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

      if (!response.ok) {
      alert(`${data.error}`);
    }

    if(contract && account) {
      try {
        const tx = await contract.methods
          .createTask(taskName, taskDate)
          .send({ from: account });
        console.log("Transaction successful:", tx);
        alert("Task created successfully!");
      } catch (error) {
        console.error("Error creating task:", error);
        alert("Failed to create task. Please try again.");
      }
    }
  };

  return (
    <>
  <Navigation />

    <form onSubmit={createTask}>
      <h1>Create Task</h1>
      <input
        type="text"
        placeholder="Enter Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Task Date"
        value={taskDate}
        onChange={(e) => {
          setTaskDate(e.target.value);
        }}
      />
      <button type="submit">Create Task</button>
    </form>
    </>
  );
}

export default CreateTask;
