const btn=document.querySelector(".btnadd")
const form=document.querySelector("form")
const ul=document.querySelector("ul")
const h2=document.querySelector("h2")
const btnAll=document.querySelector(".button")

let title="Список задач"
let todoVal=[]



if(localStorage.getItem("vals")){
    todoVal=JSON.parse(localStorage.getItem("vals"))
    addVall()
}

form.addEventListener("submit",(e)=>{

    e.preventDefault()

    if(!form.children[0].value) return;
    
   let inputVal={...Object.fromEntries(...[new FormData(e.target)]),performed:false}

    todoVal.push(inputVal)
    addVall()
    localStorage.setItem("vals",JSON.stringify(todoVal))
    
    form.children[0].value=""
})

function addVall(){
    let li=''
    todoVal.forEach((elem)=>{
        li+=`<li  class="${elem.performed ? "performed" : ""}">
        <span>${elem.val}</span> 
        <div class="changeinput">
         <input class="chageV"  >
           <button class="chageb">change</button>
        </div>
        <div class="details">
        <input type="checkbox" class="checkbox"${elem.performed ? "checked" : ""  }>
        <i class="fa-solid fa-pen  change" ></i>
        <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
        </div>
        </li>`
        ul.innerHTML=li 
        

    })
    localStorage.setItem("h2",JSON.stringify(todoVal.length))
    h2.innerText=`${title}:${todoVal.length}`

    deleteVall()
    performed()
    change()
    newVal() 
}



function change(){
    document.querySelectorAll(".change").forEach((elem,id)=>{
        elem.addEventListener("click",()=>{
            ul.children[id].children[1].classList.toggle("open")
            document.querySelector(".details").classList.toggle("show")
        })
    })
    
    
}



//////////////////////////////////////////////////////////////////
function newVal(){
    let lival=""
    document.querySelectorAll(".chageV").forEach((elem)=>{
        elem.addEventListener("input",(e)=>{
            lival=e.target.value
        })
    })

    document.querySelectorAll(".chageb").forEach((elem,id)=>{
        elem.addEventListener("click",()=>{

            document.querySelector(".details").classList.toggle("show")
            ul.children[id].children[1].classList.toggle("open")
            
            if(lival){
             todoVal[id].val=lival
             addVall()
         }
            localStorage.setItem("vals",JSON.stringify(todoVal))
        })
    })
}


////////////////////////////////////////////////////////////////////

function performed(){
    document.querySelectorAll(".checkbox").forEach((elem,id)=>{
        elem.addEventListener("change",()=>{
            let liT=elem.closest("li").innerText

            todoVal.forEach((elem)=>{
                if(elem.val==liT) elem.performed=!elem.performed
                localStorage.setItem("vals",JSON.stringify(todoVal))
                addVall()
            })
        })
    })
}




///////////////////////////////////////////////////////////////////////

function deleteVall(){
    document.querySelectorAll(".delete").forEach((elem,index)=>{
        elem.addEventListener("click",()=>{
            todoVal.splice(index,1)
            addVall()

          if(!todoVal.length){
            document.location.reload()
          }
          localStorage.setItem("vals",JSON.stringify(todoVal))
          addVall();
        })
    })
}



let todoValAll=todoVal

 btnAll.addEventListener("click",(e)=>{
    if(!e.target.matches("button")) return
    let text=e.target.innerText
    let ft=e.target.dataset.performed
    title=text

    if(text=="все"){
        todoVal=todoValAll
        title="Список задач"
        addVall()
    }

    else{
       let newtodo=[...todoValAll].filter((elem)=>elem.performed==Boolean(ft))
        todoVal=newtodo
        h2.innerText=`${title}:${todoVal.length}`
        addVall()  
    }

})

