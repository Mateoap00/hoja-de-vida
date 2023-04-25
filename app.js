const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    result.innerHTML = "Enviando correo...";

    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: json,
    })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                // result.innerHTML = json.message;
                result.innerHTML = 'Correo enviado exitosamente!';
                result.removeAttribute('class');
                result.setAttribute('class', 'resultSuccess');
            } else {
                console.log(response);
                // result.innerHTML = json.message;
                result.innerHTML = "Error, no se envió el correo!";
                result.removeAttribute('class');
                result.setAttribute('class', 'resultFailure');
            }
        })
        .catch((error) => {
            console.log(error);
            result.innerHTML = "Error, no se envió el correo!";
        })
        .then(function () {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 5000);
        });
});