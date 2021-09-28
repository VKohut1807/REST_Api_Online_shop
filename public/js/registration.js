function sendRegistration(event) {
    event.preventDefault();
    let form = document.querySelector("#form-registration").elements;

    fetch("/auth/registration", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            "userName": form.username.value.trim(),
            "userPassword": form.password.value.trim(),
        })
    })
        .then(res => {
            document.querySelector("#form-registration").reset();
            return res.json();
        })
        .then(body => {
            return body;
        })
        .catch(error => {
            sweetAlerts(
                position = "center",
                icon = "error",
                title = "Error",
                text = "Error Registration",
                confirmButtonText = "Ok",
                showConfirmButton = true,
                timer = null);
            return error;
        })
}

function sweetAlerts(position, icon, title, text, confirmButtonText, showConfirmButton, timer) {
    Swal.fire({
        position: position,
        icon: icon,
        title: title,
        text: text,
        confirmButtonText: confirmButtonText,
        showConfirmButton: showConfirmButton,
        timer: timer
    })
}

document.querySelector("#form-registration").addEventListener("submit", sendRegistration);
