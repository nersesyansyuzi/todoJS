const btn=document.querySelector(".btnadd")
const form=document.querySelector("form")
const ul=document.querySelector("ul")
const h2=document.querySelector("h2")
const btnAll=document.querySelector(".button")
let div=document.querySelectorAll(".details")

let title="Список задач"

let todo=[]



if(localStorage.getItem("vals")){
    todo=JSON.parse(localStorage.getItem("vals"))
    addTodo()
}

form.addEventListener("submit",(e)=>{

    e.preventDefault()

    if(!form.children[0].value) return;
    
   let inputVal={...Object.fromEntries(...[new FormData(e.target)]),performed:false}

    todo.push(inputVal)
    addTodo()
    localStorage.setItem("vals",JSON.stringify(todo))
    
    form.children[0].value=""
})

function addTodo(){
    let li=''
    todo.forEach((elem)=>{
        li+=`<li  class="${elem.performed ? "performed" : ""}">
        <span>${elem.val}</span> 
        <div class="changeDiv">
         <input class="chageInput"  >
           <button class="chageButton">change</button>
        </div>
        <div class="details">
        <input type="checkbox" class="checkbox"${elem.performed ? "checked" : ""  }>
        <i class="fa-solid fa-pen  pen" ></i>
        <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
        </div>
        </li>`
        ul.innerHTML=li 
        

    })
    localStorage.setItem("h2",JSON.stringify(todo.length))
    h2.innerText=`${title}:${todo.length}`

    deleteTodo()
    performed()
    showChangeButton()
    changeTodoValue() 
}


function showChangeButton(){
    let details=document.querySelectorAll(".details")
    document.querySelectorAll(".pen").forEach((elem,id)=>{
        elem.addEventListener("click",()=>{
            details[id].classList.add("show")
            ul.children[id].children[1].classList.add("open")
        })
    })
    
}



//////////////////////////////////////////////////////////////////
function changeTodoValue(){
    let lival=""
    document.querySelectorAll(".chageInput").forEach((elem)=>{
        elem.addEventListener("input",(e)=>{
            lival=e.target.value
        })
    })

    document.querySelectorAll(".chageButton").forEach((elem,id)=>{
        elem.addEventListener("click",()=>{
            let  details=document.querySelectorAll(".details")
            details[id].classList.remove("show")
            
            ul.children[id].children[1].classList.remove("open")
            if(lival){
             todo[id].val=lival
             addTodo()
         }
            localStorage.setItem("vals",JSON.stringify(todo))
        })
    })
}


////////////////////////////////////////////////////////////////////

function performed(){
    document.querySelectorAll(".checkbox").forEach((elem,id)=>{
        elem.addEventListener("change",()=>{
            let liT=elem.closest("li").innerText

            todo.forEach((elem)=>{
                if(elem.val==liT) elem.performed=!elem.performed
                localStorage.setItem("vals",JSON.stringify(todo))
                addTodo()
            })
        })
    })
}




///////////////////////////////////////////////////////////////////////

function deleteTodo(){
    document.querySelectorAll(".delete").forEach((elem,index)=>{
        elem.addEventListener("click",()=>{
            todo.splice(index,1)
            addTodo()

          if(!todo.length){
            document.location.reload()
          }
          localStorage.setItem("vals",JSON.stringify(todo))
          addTodo();
        })
    })
}



const todoAll=todo

 btnAll.addEventListener("click",(e)=>{
    if(!e.target.matches("button")) return
    let text=e.target.innerText
    let ft=e.target.dataset.performed
    title=text

    if(text=="все"){
        todo=todoAll
        title="Список задач"
        addTodo()
    }

    else{
       let newtodo=[...todoAll].filter((elem)=>elem.performed==Boolean(ft))
        todo=newtodo
        h2.innerText=`${title}:${todo.length}`
        addTodo()  
    }

})


