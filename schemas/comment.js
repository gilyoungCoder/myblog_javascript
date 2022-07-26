const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({

    content:{
        type: String,
        //required: true,
    },
    postId:{
        type: String,
        //required: true,
    },
    date:{
        type: String,
        //required: true,
    }

})

module.exports = mongoose.model("Comment", commentSchema)
