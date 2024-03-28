import mongoose from "mongoose";

const todolistSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        default: "",
    },
}, {timestamps: true})

const TodoList = mongoose.model("TodoList", todolistSchema);

export default TodoList;