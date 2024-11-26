import { useEffect, useState } from "react";
import '../css/Profile.css'
import defaultAvatar from '../static/default.png';
import { Post } from "./Post";
interface UserData{
    id:number;
    email: string;
    createdAt: string;
    banned:boolean;
    posts:any
}

export const Profile = () =>{

    const [userData, setUserData] = useState<UserData>()
    const [postData, setPostData] = useState([])

    const parseJwt = (token:any) => {
        try {
          return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
          return null;
        }
      };
    useEffect(()=>{
        const hrefArr = window.location.href.split('/');
        fetch(`http://localhost:7000/users/${hrefArr[hrefArr.length-1]}`)
        .then((res)=>res.json())
        .then((data)=>{
            setUserData(data); 
            setPostData(data.posts); 
        })
    },[])
    return(
        <div className="profile-main">
            <div className="p-5 mb-4 bg-body-tertiary rounded-3">
                <button className="back-btn btn btn-secondary" onClick={()=>window.history.back()}>Вернуться</button>
                <div className="user-header">
                    <img className="profilePic" src={defaultAvatar}></img>
                    <div className="container-fluid py-5">
                        <h1 className="display-5 fw-bold">{userData?.email}</h1>
                        <p className="col-md-8 fs-4">{userData?.createdAt}</p>
                        <button className="btn btn-primary btn-lg" type="button">Add to friend</button>
                </div>
                </div>
            </div>    
            <h1>Публикации {userData?.email}</h1>
            <div className="profile-post-content">
                {
                    postData.map((_:any, index:any)=>(
                        <Post key={index} postData={postData[index]} setPostData={setPostData}></Post>
                    ))
                }
            </div>
        </div>
    )
}