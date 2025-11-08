

export function showPassword (){
    const password = document.querySelector('#password') as HTMLInputElement
    if(password.type === "password"){
        password.type = "text"
    }else {
        password.type = "password"
    }
}