import express from "express";
import { ABI } from "./ABI.js";
import { Web3 } from "web3";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const web3 = new Web3(process.env.QUICKNODE_ENDPOINT);

const contract = new web3.eth.Contract(ABI, process.env.CONTRACT_ADDRESS);

app.get("/api/ethereum/view-task/:id", async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await contract.methods.viewTask(taskId).call();

    // Convert BigInts to strings
    const sanitizedTask = JSON.parse(
      JSON.stringify(task, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );

    return res.json(sanitizedTask);
  } catch (error) {
    console.error("Error fetching task:", error);
    return res.status(500).json({ error: "Failed to fetch task" });
  }
});


app.get("/api/ethereum/view-all", async (req, res) => {
  try {
    const tasks = await contract.methods.allTask().call();
    return res.json(tasks.map(task => {
      // Convert BigInts to strings
      return JSON.parse(
        JSON.stringify(task, (key, value) =>
          typeof value === "bigint" ? value.toString() : value
        )
      );
    }
    ));
  } catch (error) {
    console.error("Error fetching task:", error);
    return res.status(500).json({ error: "Failed to fetch task" });
  }
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.get("/", (req, res) => {
  return res.send("Hello, World!");
});
