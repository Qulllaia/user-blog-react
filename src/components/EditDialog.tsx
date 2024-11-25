import { useState } from "react";

export const EditDialog = ({postData}:any) => {

    const [title, setTitle] = useState(postData.title)
    const [content, setContent] = useState(postData.content)


    const ImagePreview = (event:any) =>{
        let output = document.getElementById('ImageIdUpdateForm') as HTMLImageElement;
        output!.src = URL.createObjectURL(event.target.files[0]);
      }
    
      const parseJwt = (token:any) => {
        try {
          return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
          return null;
        }
      };

    const sendUpdate = async(event:any) =>{
        event.preventDefault();
    
        let formData = new FormData(event.target)
        formData.append("userId", parseJwt(localStorage.getItem('token')).id);
    
        let response = await fetch(`http://localhost:7000/posts/${postData.id}`,{
          method:'PUT', 
          body: formData
        })
        console.log(`http://localhost:7000/posts/${postData.id}`)
        console.log(response)
      }

    return(

        <dialog className={`edit-dialog`} id={`edit-dialog-${postData.id}`}>
            <h3>Обновить пост {postData.id}</h3>
            <form 
            onSubmit={(event) => {
            let dialogElementForUpdatePost = document.querySelector(`#edit-dialog-${postData.id}`) as HTMLDialogElement
            sendUpdate(event);
            dialogElementForUpdatePost!.close();
            }}
            >
            <div className="form-floating">
                <input
                    name="title"
                    className="form-control"
                    id="floatingTitle"
                    placeholder="Название поста"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                />
                <label htmlFor="floatingTitle">Название поста</label>
                </div>
                <div className="form-floating mt-2">
                <textarea
                    name="content"
                    className="form-control"
                    id="floatingText"
                    placeholder="Название поста"
                    value={content}
                    onChange={(e)=>setContent(e.target.value)}
                    ></textarea>
                <label htmlFor="floatingText">Текст поста</label>
                </div>

                <input
                    name="image"
                    type="file"
                    id="image"
                    className="form-control mt-2"
                    placeholder="Ваша картинка"
                    onChange={(event)=>ImagePreview(event)}
                    />
                <img
                    id="ImageIdUpdateForm"
                    alt="Ваша картинка"
                    src={`http://localhost:7000/${postData.image}`}
                    ></img>
                <button className="btn btn-primary w-100 py-2 mt-2" type="submit">
                Обновить пост
                </button>
            </form>
        </dialog>
    )
}