const mongoose = require("mongoose");

const postSchema = mongoose.Schema({

    title:{
        type: String,
        //required: true,
    },
    userName:{
        type: String,
        //required: true,
    },
    content:{
        type: String,
        //required: true,
    },
    password:{
        type: String,
        //required: true,
    },
    date:{
        type: String,
        //required: true,
    }
})

 module.exports = mongoose.model("Post", postSchema)
