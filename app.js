const BASE_URL = "https://v6.exchangerate-api.com/v6/271d02f283fc40635bd31451/latest/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCur = document.querySelector(" .from select ");
const toCur = document.querySelector(" .to select ");
const msg = document.querySelector(".msg");


for( let select of dropdowns ){
    for( let currCode in countryList ){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if( select.name === "from" && currCode === "USD" ){
            newOption.selected = "selected";
        }
        else if( select.name === "to" && currCode === "INR" ){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(event) => {
        updateFlag(event.target);
    })
}

const updateFlag = (ele) => {
    let currCode = ele.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let flag = ele.parentElement.querySelector("img");
    flag.src = newSrc;
}

btn.addEventListener("click", async (event) => {
    event.preventDefault();
    let amount = document.querySelector(".amount input");
    console.log(amount.value);
    let amtVal = amount.value;
    if( amtVal === "" || amtVal < 0 ){
        amtVal = 1;
        amount.value= 1;
    }
    // console.log(amtVal);
    // console.log(fromCur.value , toCur.value);
    const URL = `${BASE_URL}${fromCur.value}`;
    let response = await fetch(URL);
    // console.log(response);
    const toURL = response.json();
    toURL.then((res) => {
        // console.log(toCur.value);
        let rate = res.conversion_rates[toCur.value];
        let finalAmt = amtVal*rate;
        console.log(finalAmt);
        msg.innerText = `${amount.value} ${fromCur.value} = ${finalAmt} ${toCur.value}`;
    })
});

