import "../css/Post.css";
import { Link } from "react-router-dom";
import { EditDialog } from "./EditDialog";
import { HiDotsHorizontal } from "react-icons/hi";

export const Post = ({postData, setPostData}:any) => {

  const parseJwt = (token:any) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  const deletePost = async () =>{
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

  return (
    <div className="posts">
      <div className="post-header">
        <h1>{postData.title}</h1>
        {
          postData.userId == parseJwt(localStorage.getItem('token')).id ? 
          <div className="ul-activator">
            <HiDotsHorizontal className="dots"/>
            <ul className="buttons">
              <li>
                <button className="delete btn" onClick={event =>deletePost()}>Удалить пост</button>
              </li>
              <li>
                <button className="edit btn" onClick={event =>{
                    let dialogElementForUpdatePost = document.querySelector(`#edit-dialog-${postData.id}`) as HTMLDialogElement
                    dialogElementForUpdatePost?.showModal()
                  }}>Редактировать пост</button>
              </li>
            </ul>
          </div>
          :
            <></>
        }
      </div>

      <div className="post-body">
        <Link className="profile-link" to={`/user/${postData.author.id}`}>Author: {postData.author.email}</Link>
        <p className="post-text">{postData.content}</p>
        <img className="pre-watch" alt="" src={'http://localhost:7000/' + postData.image}></img>
      </div>
      <EditDialog postData={postData}></EditDialog>
    </div>
  );
};
