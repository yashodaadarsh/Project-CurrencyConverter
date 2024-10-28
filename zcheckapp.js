const URL = "https://cat-fact.herokuapp.com/facts";


//Using Async and Await
const getFacts = async () => {
    let promise = await fetch(URL);
    console.log(promise);
    let data = await promise.json();
    console.log(data);
    fact.innerText = data;
};


//Using Promise Chains
// const getFacts = () => {
//     fetch(URL).then((response) => {
//         return response.json();
//     }).then((data) => {
//         fact.innerText = data[2].text;
//     })
// }

let fact = document.querySelector("#fact");
let btn = document.querySelector(".fbtn");
btn.addEventListener("click",getFacts);
 