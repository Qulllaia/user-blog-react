import { useEffect, useState } from "react";
import "../css/Home.css";
import { Panel } from "./Panel";
import { Post } from "./Post";
import { title } from "process";

export const Home = () => {
  const [postDataState, setPostData] = useState([])
  useEffect(()=>{
    loadPost()
  },[])
  const loadPost = () => {
    fetch('http://localhost:7000/posts').then((res)=>res.json()).then((data)=>{
      setPostData(data)
    })
  }
  return (
    <div>
      <div className="background">
        <div className="nav-bar">User blog</div>
        <div className="post-content">
          {postDataState.map((_: any, index: any) => (
            <Post key={index} postData={postDataState[index]}></Post>
          ))}
        </div>
        <Panel></Panel>
      </div>
    </div>
  );
};
