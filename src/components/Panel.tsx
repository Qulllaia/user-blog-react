import { useNavigate } from "react-router-dom";
import "../css/Panel.css";
import { CreteDialog } from "./CreateDialog";

export const Panel = () => {  
  const navigate = useNavigate();
  const dialogElementForSentForm = document.querySelector('.dialog') as HTMLDialogElement 

  const parseJwt = (token:any) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  window.addEventListener('scroll',function(){
    if(this.window.scrollY >= 100){
      this.document.querySelector('.panel')?.classList.add('move')
    }
    else if(this.window.scrollY <= 400){
      this.document.querySelector('.panel')?.classList.remove('move')
    }
  })
  
  return (
    <>
    <div className="panel">
      <h1>Панель управления</h1>
      <ul>
        <li onClick={()=>{
          dialogElementForSentForm?.showModal()
          }}>Добавить пост</li>
        <li onClick={()=>navigate(`/user/${parseJwt(localStorage.getItem('token')).id}`)}>Перейти в профиль</li>
        <li>О приложении</li>
        <li onClick={()=>{
          localStorage.clear();
          navigate("/login");
        }}>Выйти из аккаунта</li>
      </ul>
    </div>
    <CreteDialog ></CreteDialog>
    </>
  );
};
