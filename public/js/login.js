function sendLogin(event) {
    event.preventDefault();
    let form = document.querySelector("#form-login").elements;

    fetch("/auth/login", {
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
            document.querySelector("#form-login").reset();
            return res.json();
        })
        .then(body => {
            let role = body.user.roles.includes("ADMIN") || body.user.roles.includes("SELLER")
            if (body.message == "access allowed" && role) {
                window.location.href = "/auth/admin"
            }
            if (!role) {
                window.location.href = "/"
            }
            return body;
        })
        .catch(error => {
            sweetAlerts(
                position = "center",
                icon = "error",
                title = "Error",
                text = "Error Login",
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

document.querySelector("#form-login").addEventListener("submit", sendLogin);
