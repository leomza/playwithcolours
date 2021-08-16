var root = document.querySelector('#root');
var peopleList = JSON.parse(localStorage.getItem('peopleList'));
//This function is to redirect to the main page
try {
    var changePage = document.querySelector('#redirectMain');
    if (!changePage)
        throw new Error('Can`t access to the change page button');
    changePage.addEventListener('click', function () {
        window.location.href = '../Main/index.html';
        if (!window.location.href)
            throw new Error('The page where you want to redirect it doesn´t exist!');
    });
}
catch (error) {
    console.error(error);
}
;
//I render all the pets
function renderPeople() {
    try {
        var html = this.peopleList.map(function (element) {
            return ("<div id='" + element.name + "' class=\"pet__item__wrapper\">\n                <div><img class=\"pet__item__image\" src=\"" + element.image + "\" alt=\"\"></div>\n                <div class=\"pet__item__information__wrapper\">\n                <div>Name: <b>" + element.name.toUpperCase() + "</b></div>\n                </div>\n                </div>");
        }).join('');
        if (!html)
            throw new Error('An error happens when you want to render the pets!');
        root.innerHTML = html;
    }
    catch (error) {
        console.error(error);
    }
}
;
renderPeople();
