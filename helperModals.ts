// Get the modal
const modal: HTMLElement = document.querySelector('#modal');

// Get the button that opens the modal
const modalButton: HTMLElement = document.querySelector('#modalButton');

// Get the <span> element that closes the modal
const closeModal: HTMLElement = document.querySelector('#closeModal');

// When the user clicks the button, open the modal 
modalButton.addEventListener('click', () => {
    try {
        modal.style.display = "block";
        if (!modal) throw new Error('Impossible to open the Modal because it doesn´t exist');
    } catch (error) {
        console.error(error);
    }
});

// When the user clicks on <span> (x), close the modal
closeModal.addEventListener('click', () => {
    try {
        modal.style.display = "none";
        if (!modal) throw new Error('Impossible to close the Modal because it doesn´t exist');
    } catch (error) {
        console.error(error);
    };
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', ev => {
    try {
        if (ev.target === modal) {
            modal.style.display = "none";
            if (!modal) throw new Error('Impossible to close the Modal because it doesn´t exist');
        };
    } catch (error) {
        console.error(error);
    };
});
