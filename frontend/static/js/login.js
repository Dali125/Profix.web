import { Login } from "./auth_controller.js"



document.addEventListener('DOMContentLoaded', () =>{
    const email = document.getElementById("email")
    const password = document.getElementById("password")
    const loginButton = document.getElementById("loginButton")
    
    loginButton.addEventListener('click',async function(e){
        e.preventDefault();
        
        const loginObject = {
            email: email.value,
            password: password.value
        }
        const [response, err] = await Login(loginObject)

        if (err){
            alert(err)
            return
        } else {
            window.location.href = '/dashboard'
           
        }

    })
    
    


})



function isEmailValid(email){

    const regString = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    const emailRegex = new RegExp(regString)

    if(emailRegex.test(email)){
        return true
    }



    return false
}