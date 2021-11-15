import { useState } from "react";

export default function CommentsPage() {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  //   Fetching comments from api
  const fetchComments = async () => {
    const response = await fetch("/api/comments");
    const data = await response.json();
    setComments(data);
  };
  //   Post request in api
  const submitComment = async () => {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ comment }),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };
  return (
    <>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={submitComment}>Submit comment</button>
      <button onClick={fetchComments}>Load comments</button>
      {comments.map((comment) => {
        return (
          <div key={comment.id}>
            <h1>
              {comment.id} {comment.text}
            </h1>
          </div>
        );
      })}
    </>
  );
}
