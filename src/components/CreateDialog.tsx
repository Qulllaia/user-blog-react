export const CreteDialog = () =>{
    const parseJwt = (token:any) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };

    const ImagePreview = (event:any) =>{
        let output = document.getElementById('ImageIdPostForm') as HTMLImageElement;
        output.src = URL.createObjectURL(event.target.files[0]);
        console.log(output)
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
        console.log(result)
    };
    
        return(
            <dialog className='dialog'>
                <h3>Создать пост</h3>
                <form onSubmit={(e)=>{
                const dialogElementForSentForm = document.querySelector('.dialog') as HTMLDialogElement 
                SendForm(e)
                dialogElementForSentForm!.close();
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
                        id="ImageIdPostForm"
                        alt="Ваша картинка"
                        src=""
                        ></img>
                    <button className="btn btn-primary w-100 py-2 mt-2" type="submit">
                    Отправить пост
                    </button>
                </form>
            </dialog>
    )
}