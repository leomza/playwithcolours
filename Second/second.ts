const root: HTMLElement = document.querySelector('#root')
const peopleList = JSON.parse(localStorage.getItem('peopleList'));


//This function is to redirect to the main page
try {
    const changePage = document.querySelector('#redirectMain');
    if (!changePage) throw new Error('Can`t access to the change page button');

    changePage.addEventListener('click', () => {
        window.location.href = '../Main/index.html'
        if (!window.location.href) throw new Error('The page where you want to redirect it doesn´t exist!')
    });
} catch (error) {
    console.error(error);
};

//I render all the pets
function renderPeople(): void {
    try {
        let html: string = this.peopleList.map(element => {
            return (
                `<div id='${element.name}' class="pet__item__wrapper">
                <div><img class="pet__item__image" src="${element.image}" alt=""></div>
                <div class="pet__item__information__wrapper">
                <div>Name: <b>${element.name.toUpperCase()}</b></div>
                </div>
                </div>`
            )
        }).join(''); 
        if (!html) throw new Error('An error happens when you want to render the pets!')
        root.innerHTML = html;
    } catch (error) {
        console.error(error);
    }
};

renderPeople();