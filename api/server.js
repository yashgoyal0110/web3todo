import express from 'express';
import {ABI} from "./ABI.js"
import{Web3} from "web3";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const web3 = new Web3(process.env.QUICKNODE_ENDPOINT);

const contract = new web3.eth.Contract(ABI, process.env.CONTRACT_ADDRESS); // Replace [] with your contract ABI

const viewTask = async () => {
    try {
        const task = await contract.methods.viewTask(1).call();
        console.log('Task details:', task);
        return task;
    } catch (error) {
        console.error('Error fetching task:', error);
        throw error;
    }
};
viewTask();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
app.get('/', (req, res) => {
    return res.send('Hello, World!');
})