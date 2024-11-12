import { useEffect } from "react";
import "../css/Post.css";
import { event } from "jquery";

export const Post = (postData:any) => {
  const deletePost = () =>{
    console.log(postData.postData.id)
  }

  console.log(postData.postData)
  return (
    <div className="posts">
      <div className="post-header">
        <h1>{postData.postData.title}</h1>
        
        <button className="btn btn-danger" onClick={event =>deletePost()}>Удалить пост</button>
      </div>
      <p>{postData.postData.content}</p>
      <img alt="" src={'http://localhost:7000/' + postData.postData.image}></img>
    </div>
  );
};
