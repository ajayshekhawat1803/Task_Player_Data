import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import PlayerModel from "./PlayerModel.js";

const port = 4000;
// const connection = mongoose.connect("mongodb://localhost:27017/Task")
const connection = mongoose.connect("mongodb://127.0.0.1:27017/Task")

const app = express()
app.use(express.json())
app.use(cors())

app.get("/getData/:search", async (req, res) => {
    let PlayerData = await PlayerModel.findOne({ aadharNo: req.params.search })
    res.json(PlayerData)
})

app.post("/addData", async (req, res) => {
    let PlayerData = new PlayerModel(req.body)
    let allData = await PlayerModel.find()
    if (allData.length == 0) {
        PlayerData.srno += `001`
    } else {
        let lastPart = ++allData[allData.length - 1].srno.split("/")[3];
        lastPart = String(lastPart).padStart(3, "0")
        PlayerData.srno += `${lastPart}`
    }
    let result = await PlayerData.save()
    res.status(201).json(result)
})



connection.then(() => {
    app.listen(port, () =>
        console.log("Server started at port " + port))
})
    .catch((err) => console.log("DB ERROR: " + err));
