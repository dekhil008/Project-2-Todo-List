const mongoose = require("mongoose")

const mongooseURI = "mongodb://localhost:27017/TodoListV01"

mongoose.connect(mongooseURI, () => {
    console.log("connection established");
})

const db = mongoose.connection

db.on("error", (err) => {
    console.log("ERROR connect MongoDB")
})

db.on("connected", () => {
    console.log("MongoDB connected ...")
})

