const form = document.querySelector("form");
const inputEmail = form.querySelector("input[name=email]");
const inputName = form.querySelector("input[name=temat]");
const inputMessage = form.querySelector("textarea[name=message]");
const formMessage = form.querySelector(".form-message");
const regEmail = /\S+@\S+\.\S+/;

form.addEventListener("submit", e => {
    e.preventDefault();

    let formErrors = [];

    if (!regEmail.test(inputEmail.value)) {
        formErrors.push("Pole z emailem jest wypełnione niepoprawnie");
    }
    if (inputEmail.value==='kowalski@wp.pl') {
        formErrors.push("Proszę zmienić przykładowy adres email na własny");
    }

    const selectedTemat = form.querySelector('input[name="temat"]:checked');
    if(!selectedTemat){
        formErrors.push("Temat wiadomości nie został wybrany");
    }

    if(inputMessage.value.length<5)
    {
        formErrors.push("Wiadomość jest za krótka");
    }
    if(inputMessage.value === 'Tutaj proszę wpisać wiadomość.')
    {
        formErrors.push("Proszę wpisać wiadomość");
    }

    if(!formErrors.length){
        form.submit();
    }
    else{
        formMessage.innerHTML = `
        <h3 class="form-error-title">Przed wysłaniem proszę poprawić błędy:</h3>
        <ul class="form-error-list">
            ${formErrors.map(el => `<li>${el}</li>`).join("")}
        </ul>
        `;
    }
});

setInterval(() => {
const teraz = new Date();
const godzina = teraz.getHours().toString().padStart(2,"0");
const minuta = teraz.getMinutes().toString().padStart(2,"0");
const godzina1 = godzina + ":" + minuta;

const poleGodziny = document.getElementById("godzina");
poleGodziny.value = godzina1;
},1000);