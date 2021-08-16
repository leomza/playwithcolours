//Bring information from the localStorage in case I have it
let squareFromStorage: Array<Square> = JSON.parse(localStorage.getItem('colorList'));

class Square {
    id: string;
    color: string;

    constructor(color: string) {
        this.id = "id" + Math.random().toString(16).slice(2);
        this.color = color;
    }
};

//Initialice an array of squares empty (I will push all the new squares here)
let listColors: Array<Square> = [];

//The first thing that I do is that if the localStorage contain information I will work on that information
if (squareFromStorage != null) {
    listColors = squareFromStorage;
};

//Function to handle the submit
const handleSubmit = (ev: any): void => {
    ev.preventDefault();
    try {
        const color: string = ev.target.elements.color.value;
        if (!color) throw new Error('Imposible to access in the form to the color')
        const square = new Square(color);
        if (!square) throw new Error('The color to create doesn´t exist!')
        addSquare(square);
        localStorage.setItem('colorList', JSON.stringify(listColors));
        alert('Color uploaded successfully');
        ev.target.reset();
    } catch (error) {
        console.error(error);
    };
};

//Use this function to add all the people created in the new array "People"
function addSquare(color: Square): void {
    try {
        listColors.push(color);
        renderSquare(listColors);
    } catch (error) {
        console.error(error);
    };
};

//This function is to render the people in the DOM
function renderSquare(listColors: Array<Square>): void {
    try {
        const root: HTMLElement = document.querySelector("#root");
        if (!root) throw new Error('There is a problem finding the root to render the color');
        //Doing a loop to show the colors
        let html: any = listColors.map(element => {
            return (
                `<div class="square__wrapper">
                <div class="square__item" style="background-color: ${element.color}" onclick='changePage("${element.id}")'></div>
                <i class="fas fa-trash table__remove square__remove" style="color: ${element.color}" onclick='removeSquare("${element.id}", "${element.color}")' title="Remove item"></i>
                </div>`
            )
        }).join('');
        root.innerHTML = html;
    } catch (error) {
        console.error(error);
    };
};

//To delete a Square
function removeSquare(squareId: string, color: string) {
    try {
        const option = confirm(`Are you sure do you want to delete ${color}?`);
        if (option) {
            const squareIndex = listColors.findIndex((element: Square) => element.id === squareId);
            listColors.splice(squareIndex, 1);
            if (!renderSquare) throw new Error('There is a problem to render the squares');
            localStorage.setItem('colorList', JSON.stringify(listColors));
            renderSquare(listColors);
        }
    } catch (error) {
        console.error(error);
    }
};

//This function is to redirect to the next page and show the page with the same color
function changePage(squareId) {
    try {
        localStorage.setItem('selectedColor', squareId);
        window.location.href = '../Second/second.html'
        if (!window.location.href) throw new Error('The page where you want to redirect it doesn´t exist!')
    } catch (error) {
        console.error(error);
    }
};

//Function when I come back from the random groups to the main page, render the saved information from the localstorage
function checkStorage(): void {
    try {
        if (squareFromStorage) {
            renderSquare(squareFromStorage);
        }
    } catch (error) {
        console.error(error);
    }
};

checkStorage();


//Function to display random colors background
const backgroundSubmenu: HTMLElement = document.querySelector('.submenu');
function displayRandomColor() {
    try {
        backgroundSubmenu.style.backgroundColor = randomColor();
        if (!backgroundSubmenu) throw new Error('Impossible to change the submenu color because we can´t find it');
    } catch (error) {
        console.error(error);
    }
};

setInterval('displayRandomColor()', 2000);

function randomColor() {
    try {
        return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`;
    } catch (error) {
        console.error(error);
    }
};


//This function is to empty the array and starts from cero
try {
    const emptyColors = document.querySelector('#emptyColors');
    emptyColors.addEventListener('click', emptySquares);
} catch (error) {
    console.error(error);
};

function emptySquares() {
    try {
        const option = confirm(`Are you sure do you want to delete all the colors?`);
        if (option) {
            localStorage.clear();
            location.reload();
        }
    } catch (error) {
        console.error(error);
    };
};
