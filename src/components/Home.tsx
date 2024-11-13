import { useEffect, useState } from "react";
import "../css/Home.css";
import { Panel } from "./Panel";
import { Post } from "./Post";
import { title } from "process";
import PostSkeleton from "../content-loaders/PostSkeleton";

export const Home = () => {

  const [isLoading, setIsLoading] = useState(false)

  const [postDataState, setPostData] = useState([])
  useEffect(()=>{
    loadPost()
  },[])
  const loadPost = () => {
    setIsLoading(true)
    fetch('http://localhost:7000/posts').then((res)=>res.json()).then((data)=>{
      setPostData(data)
      setIsLoading(false)
    })
  }
  return (
    <div>
      <div className="background">
        <div className="nav-bar">User blog</div>
        {
          isLoading ? 
            <>
            <div className="post-content">
              <PostSkeleton></PostSkeleton>
              <PostSkeleton></PostSkeleton>
              <PostSkeleton></PostSkeleton>

            </div>
            </> 
            :

            <div className="post-content">
              {postDataState.map((_: any, index: any) => (
                <Post key={index} postData={postDataState[index]} setPostData={setPostData}></Post>
              ))}
            </div>
        }
        <Panel></Panel>
      </div>
    </div>
  );
};
