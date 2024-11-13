import { useEffect } from "react";
import "../css/Post.css";
import { data, event } from "jquery";
import { Link } from "react-router-dom";

export const Post = ({postData, setPostData}:any) => {
  const parseJwt = (token:any) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };
  const deletePost = () =>{
    fetch(`http://localhost:7000/posts/${postData.id}`, 
      {
        method:'delete'
      }
    )
    .then(res => res.json())
    .then((data)=>{
      setPostData(data)
    })
  }
  useEffect(()=>{console.log(postData)},[])
  return (
    <div className="posts">
      <div className="post-header">
        <h1>{postData.title}</h1>
        {
          postData.userId == parseJwt(localStorage.getItem('token')).id ? 
            <button className="btn btn-danger" onClick={event =>deletePost()}>Удалить пост</button>
          :
            <></>
        }
      </div>
      <div className="post-body">
        <Link className="profile-link" to={`/user/${postData.author.id}`}>Author: {postData.author.email}</Link>
        <p className="post-text">{postData.content}</p>
        <img alt="" src={'http://localhost:7000/' + postData.image}></img>
      </div>
    </div>
  );
};
