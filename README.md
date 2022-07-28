# myblog_javascript

## API 명세서

| 기능 | API URL | Method | 입력|
| ------ | ------ | ------ | ------ |
| 게시글 작성 | /api/posts | POST | **body** <br>{title, <br>userName, <br>password, <br>content} | 
| 게시글 조회 | /api/posts | GET | | 
| 게시글 상세조회 | /api/posts/:postId | GET | | 
| 게시글 수정 | /api/posts/:postId | PUT | **body** <br>{title, <br>password, <br>content} | 
| 게시글 삭제 | /api/posts/:postId | DELETE | | 
|  |  |  | | 
| 댓글 생성 | /api/posts/:postId/comments | POST | **body** <br>{content} | 
| 댓글 목록 조회 | /api/posts/:postId/comments | GET | | 
| 댓글 수정 | /api/posts/:postId/comments/:commentId | PUT | **body** <br>{content} | 
| 댓글 삭제 | /api/posts/:postId/comments/:commentId | DELETE | | 



[구현 페이지 링크](13.125.52.83) => 13.125.52.83 

본 코드에서 게시글과 댓글의 id는 몽고db에서 자체적으로 부여해주는 ObjectId를 사용했습니다.
<br/>

sample 게시글의 id한개와 해당 게시글에 달린 댓글의 id값입니다.

게시글 id : ObjectId("62e0d894c42e7285576366a7")
댓글 id : ObjectId("62e1eb7ef154a089574787a4")

url 입력시에는 해당 ObjectId()안의 문자열 값을 입력하여 기능 테스트를 해주시면 됩니다.
