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
