// import nav from './components/nav.js';
// import main from './components/main.js';
// import footer from './components/footer.js';
// import x from './components/X.js';



// function render() {

//     const root = document.getElementById("root")
//     root.innerHTML += nav() + main() + footer() + x("John","Doe")
    
// }

// render()

// let x =0
// const button=document.getElementById("button")
// const output=document.getElementById("output")

// button.addEventListener("click",()=>{
//     x++
//     output.innerHTML=x
// })

// const user = ["John" ,"Doe"]
// const [firstName, lastName] = user


const user = ()=> {
    let firstName="John"

    const setName=(x)=> {
        firstName=x
    }
    
    return [firstName,setName]
}
const [firstName, setName] = user() //["John" ,setName]
setName("mike")


  console.log(firstName)

  
// const [firstName,x]=["John",  ()=> {
//     return "Doe"
// }]
// console.log(firstName)
// console.log(x())


