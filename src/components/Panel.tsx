import { useNavigate } from "react-router-dom";
import "../css/Panel.css";
export const Panel = () => {  
  const navigate = useNavigate();

  const parseJwt = (token:any) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };
  const ImagePreview = (event:any) =>{
    let output = document.getElementById('ImageId') as HTMLImageElement;
    output!.src = URL.createObjectURL(event.target.files[0]);
  }   
  async function SendForm(e:any) {
    e.preventDefault();
    let formData = new FormData(e.target);
    formData.append("userId", parseJwt(localStorage.getItem('token')).id);

    let response = await fetch('http://localhost:7000/posts', {
      method: 'POST',
      body: formData
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
        <li onClick={()=>navigate(`/user/${parseJwt(localStorage.getItem('token')).id}`)}>Перейти в профиль</li>
        <li>О приложении</li>
        <li onClick={()=>{
          localStorage.clear();
          navigate("/login");
        }}>Выйти из аккаунта</li>
      </ul>
    </div>
    <dialog className='dialog'>
      <h3>Создать пост</h3>
      <form onSubmit={(event) => {
        SendForm(event);
        document.querySelector('dialog')!.close();
        }}>
        <div className="form-floating" id="myTargetForm">
            <input
              name="title"
              className="form-control"
              id="floatingTitle"
              placeholder="Название поста"
            />
            <label htmlFor="floatingTitle">Название поста</label>
          </div>
          <div className="form-floating mt-2">
            <textarea
              name="content"
              className="form-control"
              id="floatingText"
              placeholder="Название поста"
            />
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
