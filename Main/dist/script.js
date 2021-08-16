var _this = this;
//Bring information from the localStorage in case I have it
var peopleFromStorage = JSON.parse(localStorage.getItem('peopleList'));
var Person = /** @class */ (function () {
    function Person(name, image) {
        this.id = "id" + Math.random().toString(16).slice(2);
        this.name = name;
        this.image = image;
    }
    return Person;
}());
;
//Initialice an array of pepople empty (I will push all the new person here)
var people = [];
//The first thing that I do is that if the localStorage contain information I will work on that information
if (peopleFromStorage != null) {
    people = peopleFromStorage;
}
;
//Function to handle the submit
var handleSubmit = function (ev) {
    ev.preventDefault();
    try {
        var name = ev.target.elements.name.value;
        if (!name)
            throw new Error('Imposible to access in the form to the name of the person');
        var image = document.querySelector('#previewImage').getAttribute("src");
        if (!image)
            throw new Error('Imposible to access in the form to the picture of the person');
        var person = new Person(name, image);
        if (!person)
            throw new Error('The person to create doesn´t exist!');
        addPerson(person);
        alert('Person uploaded successfully');
        document.querySelector('#previewImage').setAttribute("src", "../img/profile.png");
        ev.target.reset();
    }
    catch (error) {
        console.error(error);
    }
    ;
};
//Function to show the previous image in the form:
function readURL(input) {
    try {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                document.querySelector('#previewImage').setAttribute("src", "" + e.target.result);
                return e.target.result;
            };
            reader.readAsDataURL(input.files[0]);
        }
        ;
    }
    catch (error) {
        console.error(error);
    }
}
;
//Use this function to add all the people created in the new array "People"
function addPerson(person) {
    try {
        people.push(person);
        renderPeople(people);
        document.querySelector('#previewImage').setAttribute('src', "../Img_whatsapp/profile.png");
        modal.style.display = "none";
        if (!modal)
            throw new Error('Impossible to close the Modal because it doesn´t exist');
    }
    catch (error) {
        console.error(error);
    }
    ;
}
;
//This function is to render the people in the DOM
function renderPeople(people) {
    try {
        var table = document.querySelector(".table");
        if (!table)
            throw new Error('There is a problem finding the table from HTML');
        localStorage.setItem('peopleList', JSON.stringify(people));
        //Doing a loop to show the contacts
        var html = people.map(function (element) {
            if (!element.image) {
                element.image = "../Img_whatsapp/profile.png";
            }
            ;
            return ("<tr>\n                <td>" + element.name + "</td>\n                <td><img src=\"" + element.image + "\" alt=\"\"></td> \n                <td>\n                <i class=\"fas fa-trash table__remove\" onclick='remove(\"" + element.id + "\", \"" + element.name + "\")' title=\"Remove\"></i>\n                </td>\n                </tr>");
        }).join('');
        table.innerHTML = html;
    }
    catch (error) {
        console.error(error);
    }
    ;
}
;
//To delete a Person
function remove(personId, name) {
    try {
        var option = confirm("Are you sure do you want to delete " + name + "?");
        if (option) {
            var personIndex = people.findIndex(function (element) { return element.id === personId; });
            people.splice(personIndex, 1);
            if (!renderPeople)
                throw new Error('There is a problem to render the people');
            renderPeople(people);
        }
    }
    catch (error) {
        console.error(error);
    }
}
;
//Function to handle the number of members in a group submit
var handleNumber = function (ev) {
    ev.preventDefault();
    try {
        var numberMember = ev.target.elements.numberMember.value;
        alert('Number uploaded successfully');
        localStorage.setItem('numberMember', numberMember);
        ev.target.reset();
    }
    catch (error) {
        console.error(error);
    }
    ;
};
//This function is to redirect to the next page and show the groups
try {
    var changePage = document.querySelector('#redirectPage');
    if (!changePage)
        throw new Error('Can`t access to the change page button');
    changePage.addEventListener('click', function () {
        window.location.href = '../Second/second.html';
        if (!window.location.href)
            throw new Error('The page where you want to redirect it doesn´t exist!');
    });
}
catch (error) {
    console.error(error);
}
;
//Function to do a filter in the search input
try {
    var searchName_1 = document.querySelector("#search");
    if (!searchName_1)
        throw new Error('Can`t access to the search in filters');
    searchName_1.addEventListener('keyup', function () {
        var regEx = searchName_1.value;
        var searching = new RegExp(regEx, 'i');
        _this.filterUsers = people.filter(function (element) { return searching.test(element.name); });
        checkFilters(_this.filterUsers);
    });
}
catch (error) {
    console.error(error);
    ;
}
//Function to render or to add a not found title, depending the results of the filters
function checkFilters(filterUsers) {
    try {
        if (filterUsers.length === 0) {
            var table = document.querySelector(".table");
            if (!table)
                throw new Error('There is a problem finding table from HTML');
            var html = "<h1 class=\"table__noFound\"> Element not found \uD83D\uDE2F </h1>";
            table.innerHTML = html;
        }
        else {
            renderPeople(this.filterUsers);
        }
    }
    catch (error) {
        console.error(error);
    }
}
;
//Function when I come back from the random groups to the main page, render the saved information from the localstorage
function checkStorage() {
    try {
        if (peopleFromStorage) {
            renderPeople(peopleFromStorage);
        }
    }
    catch (error) {
        console.error(error);
    }
}
;
checkStorage();
