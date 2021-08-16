var root = document.querySelector('#root');
var squareList = JSON.parse(localStorage.getItem('colorList'));
var selectedColorId = localStorage.getItem('selectedColor');
//I know that I can just save in the local storage the color, but I prefer to save the Id and filter, so I can use the property Filter also 🧐
var colorFiltered = squareList.filter(function (element) { return (element.id == selectedColorId); });
//This function is to redirect to the main page
try {
    var changePage = document.querySelector('#redirectMain');
    if (!changePage)
        throw new Error('Can`t access to the change page button');
    changePage.addEventListener('click', function () {
        window.location.href = '../index.html';
        if (!window.location.href)
            throw new Error('The page where you want to redirect it doesn´t exist!');
    });
}
catch (error) {
    console.error(error);
}
;
//I render the color square selected
function renderTheSquare() {
    try {
        for (var i = 0; i < 20; i++) {
            var html = "<div class=\"square__item\" style=\"background-color: " + colorFiltered[0].color + "\">\n            </div>";
            if (!html)
                throw new Error('An error happens when you want to render the pets!');
            root.insertAdjacentHTML('beforeend', html);
        }
    }
    catch (error) {
        console.error(error);
    }
}
;
renderTheSquare();
var backgroundSubmenu = document.querySelector('.submenu');
function displayRandomColor() {
    try {
        backgroundSubmenu.style.backgroundColor = randomColor();
        document.body.style.backgroundColor = randomColor();
        if (!backgroundSubmenu)
            throw new Error('Impossible to change the submenu color because we can´t find it');
    }
    catch (error) {
        console.error(error);
    }
}
;
setInterval('displayRandomColor()', 2000);
function randomColor() {
    try {
        return "rgb(" + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")";
    }
    catch (error) {
        console.error(error);
    }
}
;
