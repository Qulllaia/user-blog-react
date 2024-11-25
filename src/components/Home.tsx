import { useEffect, useRef, useState } from "react";
import "../css/Home.css";
import { Panel } from "./Panel";
import { Post } from "./Post";
import PostSkeleton from "../content-loaders/PostSkeleton";
import { useNavigate } from "react-router-dom";

export const Home = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [postDataState, setPostData] = useState([])
  const navigate = useNavigate();

  useEffect(()=>{
    loadPost()
  },[])

  const loadPost = () => {
    fetch('http://localhost:7000/posts').then((res)=>res.json()).then((data)=>{
      setPostData(data)
      setIsLoading(false)
    })
  }
  return (
    <div>
      <div className="background">
        <div className="nav-bar">
          User blog
          <ul className="home-panel">
            <li onClick={()=>{
              // dialogElementForSentForm?.showModal()
              }}>Добавить пост</li>
            <li 
            // onClick={()=>navigate(`/user/${parseJwt(localStorage.getItem('token')).id}`)}
              >Перейти в профиль</li>
            <li>О приложении</li>
            <li onClick={()=>{
              localStorage.clear();
              navigate("/login");
            }}>Выйти из аккаунта</li>
          </ul>

        </div>
        {
          isLoading || !localStorage.getItem("token") ? 
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
