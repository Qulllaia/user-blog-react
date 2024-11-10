import { useEffect } from "react";
import "../css/Post.css";

export const Post = (postData:any) => {
  useEffect(()=>{console.log(postData.postData)},[])
  return (
    <div className="posts">
      <h1>{postData.postData.title}</h1>
      <p>{postData.postData.content}</p>
      <img alt="" src={'http://localhost:7000/' + postData.postData.image}></img>
    </div>
  );
};
