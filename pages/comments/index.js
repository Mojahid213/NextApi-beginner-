import { useState } from "react";

export default function CommentsPage() {
  const [comments, setComments] = useState([]);
  const fetchComments = async () => {
    const response = await fetch("http://localhost:1337/the-comments");
    const data = await response.json();
    setComments(data);
  };

  const deleteComment = async (commentId) => {
    const response = await fetch(
      `http://localhost:1337/the-comments/${commentId}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    fetchComments();
  };
  return (
    <>
      <button onClick={fetchComments}>Load comments</button>

      {comments.map((comment) => {
        return (
          <div key={comment.id}>
            <h2>
              {comment.id} {comment.text}
            </h2>
            <button onClick={() => deleteComment(comment.id)}>Delete</button>
          </div>
        );
      })}
    </>
  );
}
