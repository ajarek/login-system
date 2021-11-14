const formReg = document.querySelector('form#reg')
const formLog = document.querySelector('form#log')


 async function register(e){
  e.preventDefault()
  const email = document.querySelector('input[name="email"]').value
  const password = document.querySelector('input[name="password"]').value
  const repeat = document.querySelector('input[name="repeat"]').value
  const element = document.querySelector('#post');

  if(password !== repeat){
    alert('red' ,'Passwords do not match 😕')
   return
  }
  const data = {
    email: email,
    password: password
  }
  
  const requestOptions = {
    method: 'POST', 
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const response =await fetch('http://localhost:3000/api/register', requestOptions)
  info = await response.json();
  alert('hsl(167, 98%, 39%)',info)
 clearRegister()
}
formReg.addEventListener('submit', register)



async function logSubmit(e){
  e.preventDefault()
  const email = document.querySelector('input[name="email1"]').value
  const password = document.querySelector('input[name="password1"]').value
  const element = document.querySelector('#post1');
  
  const data = {
    email: email,
    password: password
  }
  const requestOptions = {
    method: 'POST', 
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const response =await fetch('http://localhost:3000/api/login', requestOptions)
  info = await response.json();

  info.status == 201?alert1('hsl(167, 98%, 39%)',info.mesage):alert1('red',info.mesage)
 clearLogSubmit()
}
formLog.addEventListener('submit', logSubmit)

function clearRegister(){
  const email = document.querySelector('input[name="email"]')
  const password = document.querySelector('input[name="password"]')
  const repeat = document.querySelector('input[name="repeat"]')
  email.value = ''
  password.value = ''
  repeat.value = ''
}
function clearLogSubmit(){
  const email = document.querySelector('input[name="email1"]')
  const password = document.querySelector('input[name="password1"]')
  email.value = ''
  password.value = ''
}
function alert(background, message){
  element = document.querySelector('#post')
  element.innerHTML = message;
  element.style.background = background;

}
function alert1(background, message){
  element = document.querySelector('#post1')
  element.innerHTML = message;
  element.style.background = background

}