const { ObjectID, ObjectId } = require("bson");
const express = require("express");
const Post = require("../schemas/post"); //.. 내 위치보다 위
const Comment = require("../schemas/comment"); //.. 내 위치보다 위

const router = express.Router(); // 라웅터 객체 사용 가능

router.get("/", (req, res) => {
  res.send("this is root page");
});

// 전체 게시글 조회
router.get("/posts", async (req, res) => {
  let posts = await Post.find();
  posts.sort((a,b) => new Date(a.date)-new Date(b.date));
  posts = posts.map((post) => ({title: post.title, userName: post.userName, date: post.date,}));
  res.json({
    posts,
  });
});

// 게시글 작성
router.post("/posts", async (req, res) => {
    const { title, userName, password, content } = req.body; // 비 구조화
    const today = new Date();

    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const date = year + '-' + month  + '-' + day;
    
    const createdPost = await Post.create({
        title,
        userName,
        password,
        content,
        date,
      });
    
    res.status(201).json({ post: createdPost });
});

// 게시글 조회
router.get("/posts/:postId", async (req, res) => {
    //:1234 => 해당 값이 goddsId가 된다.
    const { postId } = req.params; 
  
    let [post] = await Post.find({ _id: ObjectId(postId) });
    

    res.json({
      title: post.title,
      userName: post.userName,
      date: post.date,
      content: post.content,
    });
});

//게시글 수정
router.put("/posts/:postId", async(req, res) => {
    const {postId} = req.params; //url에 들어있음
    const {title, password, content} = req.body;
    let [post] = await Post.find({ _id: ObjectId(postId) })
    if(password!=post.password){
      return res.status(400).json({success: false, errorMessagage: "비밀번호가 틀렸습니다."})
    }
  
    await Post.updateOne({_id: ObjectId(postId)}, { $set: { title, content } });
    
    res.json({ success:true});
})

//게시글 삭제
router.delete("/posts/:postId", async(req, res) =>{
    const {postId} = req.params;
    const {password} = req.body;
    try {
        const existsPost = await Post.find({_id: ObjectId(postId)});
        if(existsPost.length){
            if(password!=existsPost[0].password){
              return res.status(400).json({success: false, errorMessagage: "비밀번호가 틀렸습니다."})
            }
            await Post.deleteOne({_id: ObjectId(postId)});
            await Comment.deleteMany({postId: postId});
            res.json({ success:true});
        }res.json({success:false, errorMessage:"이미 삭제된 게시물입니다."})    
    } catch (error) {
        res.json({ success:false, errorMessage:"존재하지 않는 게시물입니다."});
    }
})






module.exports = router; // router를 모듈로서 내보내기
