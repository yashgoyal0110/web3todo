import express from "express";
import { ABI } from "./ABI.js";
import { Web3 } from "web3";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());
cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type"],
});

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

const checkClash = async (taskDate) => {
  try {
    const tasks = await contract.methods.allTask().call();
    for (const task of tasks) {
      if (task.date === taskDate) {
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error("Error checking clash:", error);
    throw new Error("Failed to check clash");
  }
};

app.post("/api/ethereum/create-task", async (req, res) => {
  const { taskDate } = req.body;
  console.log("Received task date:", taskDate);
  try {
    const task = await checkClash(taskDate);
    if (task) {
      console.log("Task date clashes with an existing task", taskDate);

      return res
        .status(400)
        .json({ error: "Task date clashes with an existing task" });
    }
    return res
      .status(200)
      .json({ message: "No clash found, you can create the task" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
});

app.get("/api/ethereum/view-all", async (req, res) => {
  try {
    const tasks = await contract.methods.allTask().call();
    console.log("Tasks fetched:", tasks);
    return res.json(
      tasks.map((task) => {
        // Convert BigInts to strings
        return JSON.parse(
          JSON.stringify(task, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
      })
    );
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
