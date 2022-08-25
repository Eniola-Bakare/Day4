const addUser = document.getElementById('add-user')
const doubleBtn =   document.getElementById('double')
const showMillionaireBtn = document.getElementById('show')
const sortRichestBtn = document.getElementById('sort-richest')
const entireWealth = document.getElementById('entire-wealth')



const mainDiv = document.getElementById('main');

let generatedDataArr = []

// calling random users

fetchRandomUsers()
fetchRandomUsers()
fetchRandomUsers()

// to fectch random users

async function fetchRandomUsers(){
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    // .mdn - .json() > it takes a json doc and parse it to javascript

    // console.log(data)

    const users = data.results[0];
    //    console.log(users)

    const newUsers =  {
        'name': `${users.name.first} ${users.name.last}`,
        'wealth': Math.floor(Math.random() * 1000000)
    }

    // console.log(newUsers)

    addData(newUsers);
}


// beginning of event listeners functions
// to double money

function doubleMoney(){
    generatedDataArr = generatedDataArr.map((eachUser) => {
        // console.log( {...eachUser, wealth: eachUser.wealth *2})

        return {...eachUser, wealth: eachUser.wealth * 2}
    })
    updateDOM();
 }

//  showMillionaires function

function showMillionaires(){
    generatedDataArr = generatedDataArr.filter((each) => each.wealth > 1000000);

    updateDOM()
}

// sort by richest 
function sortByRichest (){
    generatedDataArr.sort((a, b )=> {b.wealth - a.wealth})


    updateDOM()
}

// calculate entire wealth

function calculateEntireWealth(){ 
    const wealthAll = generatedDataArr.reduce((acc, user) => acc+= user.wealth, 0)

    const wealthAccumulationEl = document.createElement('div')
    wealthAccumulationEl.innerHTML = `<h3>Total wealth: <strong>$ ${formatMoney(wealthAll)}</strong>`

    mainDiv.appendChild(wealthAccumulationEl)
}


// the end of events listeners

// add data to array

function addData(obj){
    generatedDataArr.push(obj);

    updateDOM()
}



// to update the DOm

function updateDOM (providedData = generatedDataArr){
    // clearing main
    mainDiv.innerHTML = ' <h2><strong>Person</strong>Wealth</h2>'


    providedData.forEach(item => {

        const newItem = document.createElement('div')
        newItem.classList.add('person');
        newItem.innerHTML =` <strong>${item.name}</strong> $ ${formatMoney(item.wealth)}`

        mainDiv.appendChild(newItem);
    })
}


// format number to money form

function formatMoney (number){
    return  number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// adding event listeners
addUser.addEventListener('click', fetchRandomUsers)
doubleBtn.addEventListener('click', doubleMoney)
showMillionaireBtn.addEventListener('click', showMillionaires)
sortRichestBtn.addEventListener('click', sortByRichest)
entireWealth.addEventListener('click', calculateEntireWealth)