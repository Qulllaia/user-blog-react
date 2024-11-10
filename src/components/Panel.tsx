import { useState } from "react";
import "../css/Panel.css";
export const Panel = () => {  
  const ImagePreview = (event:any) =>{
    let output = document.getElementById('ImageId') as HTMLImageElement;
    output!.src = URL.createObjectURL(event.target.files[0]);
  }   
  async function SendForm(e:any) {
    e.preventDefault();
    console.log(new FormData(e.target))
    let response = await fetch('http://localhost:7000/posts', {
      method: 'POST',
      body: new FormData(e.target) 
    });
    let result = await response.json();
    console.log(result);
  };
  return (
    <>
    <div className="panel">
      <h1>Панель управления</h1>
      <ul>
        <li onClick={()=>document.querySelector('dialog')!.showModal()}>Добавить пост</li>
        <li>Перейти в профиль</li>
        <li>О приложении</li>
      </ul>
    </div>
    <dialog className='dialog'>
      <h3>Создать пост</h3>
      <form onSubmit={event => SendForm(event)}>
        <div className="form-floating">
            <input
              className="form-control"
              id="floatingTitle"
              placeholder="Название поста"
            />
            <label htmlFor="floatingTitle">Название поста</label>
          </div>
          <div className="form-floating mt-2">
            <textarea
              className="form-control"
              id="floatingText"
              placeholder="Название поста"
            />
            <label htmlFor="floatingText">Текст поста</label>
          </div>

          <input
              type="file"
              className="form-control mt-2"
              placeholder="Ваша картинка"
              onChange={(event)=>ImagePreview(event)}
              />
            <img
              id="ImageId"
              alt="Ваша картинка"
              src="#"
            ></img>
          <button className="btn btn-primary w-100 py-2 mt-2" type="submit">
            Отправить пост
          </button>
      </form>

    </dialog>
    </>
  );
};
