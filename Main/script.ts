//Bring information from the localStorage in case I have it
let peopleFromStorage: Array<Person> = JSON.parse(localStorage.getItem('peopleList'));

class Person {
    id: string;
    name: string;
    image: string;

    constructor(name: string, image: string) {
        this.id = "id" + Math.random().toString(16).slice(2);
        this.name = name;
        this.image = image;
    }
};

//Initialice an array of pepople empty (I will push all the new person here)
let people: Array<Person> = [];

//The first thing that I do is that if the localStorage contain information I will work on that information
if (peopleFromStorage != null) {
    people = peopleFromStorage;
};

//Function to handle the submit
const handleSubmit = (ev: any): void => {
    ev.preventDefault();
    try {
        const name: string = ev.target.elements.name.value;
        if (!name) throw new Error('Imposible to access in the form to the name of the person')

        const image: string = document.querySelector('#previewImage').getAttribute("src");
        if (!image) throw new Error('Imposible to access in the form to the picture of the person')

        const person = new Person(name, image);
        if (!person) throw new Error('The person to create doesn´t exist!')
        addPerson(person);
        alert('Person uploaded successfully');
        document.querySelector('#previewImage').setAttribute("src", "../img/profile.png")
        ev.target.reset();
    } catch (error) {
        console.error(error);
    };
};

//Function to show the previous image in the form:
function readURL(input: any): void {
    try {
        if (input.files && input.files[0]) {
            let reader: FileReader = new FileReader();

            reader.onload = (e) => {
                document.querySelector('#previewImage').setAttribute("src", `${e.target.result}`);
                return e.target.result;
            }
            reader.readAsDataURL(input.files[0]);
        };
    } catch (error) {
        console.error(error);
    }
};

//Use this function to add all the people created in the new array "People"
function addPerson(person: Person): void {
    try {
        people.push(person);
        renderPeople(people);
        document.querySelector('#previewImage').setAttribute('src', "../Img_whatsapp/profile.png");
        modal.style.display = "none";
        if (!modal) throw new Error('Impossible to close the Modal because it doesn´t exist');
    } catch (error) {
        console.error(error);
    };
};

//This function is to render the people in the DOM
function renderPeople(people: Array<Person>): void {
    try {
        const table: HTMLElement = document.querySelector(".table");
        if (!table) throw new Error('There is a problem finding the table from HTML');
        localStorage.setItem('peopleList', JSON.stringify(people));
        //Doing a loop to show the contacts
        let html: any = people.map(element => {
            if (!element.image) {
                element.image = "../Img_whatsapp/profile.png";
            };
            return (
                `<tr>
                <td>${element.name}</td>
                <td><img src="${element.image}" alt=""></td> 
                <td>
                <i class="fas fa-trash table__remove" onclick='remove("${element.id}", "${element.name}")' title="Remove"></i>
                </td>
                </tr>`
            )
        }).join('');
        table.innerHTML = html;
    } catch (error) {
        console.error(error);
    };
};

//To delete a Person
function remove(personId: string, name: string) {
    try {
        const option = confirm(`Are you sure do you want to delete ${name}?`);
        if (option) {
            const personIndex = people.findIndex((element: Person) => element.id === personId);
            people.splice(personIndex, 1);
            if (!renderPeople) throw new Error('There is a problem to render the people');
            renderPeople(people);
        }
    } catch (error) {
        console.error(error);
    }
};

//Function to handle the number of members in a group submit
const handleNumber = (ev: any): void => {
    ev.preventDefault();
    try {
        const numberMember: string = ev.target.elements.numberMember.value;
        alert('Number uploaded successfully');
        localStorage.setItem('numberMember', numberMember);
        ev.target.reset();
    } catch (error) {
        console.error(error);
    };
};

//This function is to redirect to the next page and show the groups
try {
    const changePage = document.querySelector('#redirectPage');
    if (!changePage) throw new Error('Can`t access to the change page button');

    changePage.addEventListener('click', () => {
        window.location.href = '../Second/second.html'
        if (!window.location.href) throw new Error('The page where you want to redirect it doesn´t exist!')
    });
} catch (error) {
    console.error(error);
};

//Function to do a filter in the search input
try {
    const searchName: HTMLInputElement = document.querySelector("#search");
    if (!searchName) throw new Error('Can`t access to the search in filters');
    searchName.addEventListener('keyup', () => {
        const regEx: string = searchName.value;
        const searching: RegExp = new RegExp(regEx, 'i');

        this.filterUsers = people.filter(element => searching.test(element.name))
        checkFilters(this.filterUsers)
    });
} catch (error) {
    console.error(error);
;}

//Function to render or to add a not found title, depending the results of the filters
function checkFilters(filterUsers: Array<Person>): void {
    try {
        if (filterUsers.length === 0) {
            const table: HTMLElement = document.querySelector(".table");
            if (!table) throw new Error('There is a problem finding table from HTML');

            let html: string = `<h1 class="table__noFound"> Element not found 😯 </h1>`;
            table.innerHTML = html;
        } else {
            renderPeople(this.filterUsers);
        }
    } catch (error) {
        console.error(error);
    }
};

//Function when I come back from the random groups to the main page, render the saved information from the localstorage
function checkStorage(): void {
    try {
        if (peopleFromStorage) {
            renderPeople(peopleFromStorage);
        }
    } catch (error) {
        console.error(error);
    }
};

checkStorage();