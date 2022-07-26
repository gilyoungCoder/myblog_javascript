const { ObjectID, ObjectId } = require("bson");
const express = require("express");
const Comment = require("../schemas/comment"); //.. 내 위치보다 위
const router = express.Router(); // 라웅터 객체 사용 가능

// 댓글 조회
router.get("/posts/:postId/comments", async (req, res) => {
    const {postId} = req.params;
    let comments = await Comment.find({ postId, });
    comments.sort((a,b) => new Date(a.date)-new Date(b.date));
    comments = comments.map((comment) => ({content: comment.content,}));
    res.json({
      comments,
    });
});

// 댓글 작성
router.post("/posts/:postId/comments", async (req, res) => {
    const {postId} = req.params;
    const { content } = req.body; // 비 구조화
    const today = new Date();

    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const date = year + '-' + month  + '-' + day;

    if(!content){
        return res.status(400).json({success: false, errorMessage: "댓글 내용을 입력해주세요",});
    }

    const createdComment = await Comment.create({
        content,
        postId,
        date,
      });
    
    res.status(201).json({ comment: createdComment });
});

//댓글 수정
router.put("/posts/:postId/comments/:commentId", async (req, res) => {
    const { content } = req.body; // 비 구조화
    const {commentId} = req.params;
    if(!content){
        return res.status(400).json({success: false, errorMessage: "댓글 내용을 입력해주세요",});
    }

    await Comment.updateOne({_id: ObjectId(commentId)}, { $set: { content } });
  
    res.json({ success:true});
})

//댓글 삭제
router.delete("/posts/:postId/comments/:commentId", async (req, res) => {
    const {commentId} = req.params;
    try {
        const existsComments = await Comment.find({_id: ObjectId(commentId) });
        if(existsComments.length){
            await Comment.deleteOne({_id: ObjectId(commentId)});
            res.json({ success:true});
        }res.json({success:false, errorMessage:"이미 삭제된 댓글입니다."})    
    } catch (error) {
        res.json({ success:false, errorMessage:"존재하지 않는 댓글입니다."});
    }
})


module.exports = router; // router를 모듈로서 내보내기
