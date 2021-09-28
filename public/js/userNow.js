function getUser() {
    fetch("/user", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
    })
        .then(res => res.json())
        .then(body => {
            let out;
            if (body.user) {
                out = `<span class="col col-sm-4 col-md-4 col-lg-4">`;
                out += `<h6 id="userRole">roles: ${body.user.roles}</h6></span>`
                out += `<span class="col col-sm-8 col-md-8 col-lg-8">`;
                out += `<h5 id="userName">WELCOME: ${body.user.name}</h5>`
                if (body.user.roles.includes("ADMIN")) {
                    out += `<h6><a href="/auth/admin">Admin Panel</a></h6>`
                }
                out += `</span>`;
                document.querySelector("#userLog").innerHTML = out;

            } else {
                out = `<div class="col col-sm-12 col-md-12 col-lg-12">`;
                out += `<h5>${body.message}</h5></div>`
                document.querySelector("#userLog").innerHTML = out;
            }
            return body;
        })
        .catch(error => {
            sweetAlerts(
                position = "center",
                icon = "error",
                title = "Error User",
                text = `${error}`,
                confirmButtonText = "Ok",
                showConfirmButton = true,
                timer = null);
            return error;
        })
}

function logout() {

    fetch("/logout", {
        method: "DELETE",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
    })
        .then(res => res.json())
        .then(body => {
            if (body.message === "Logout successful") {
                sweetAlerts(
                    position = "center",
                    icon = "success",
                    title = "Success",
                    text = `${body.message}`,
                    confirmButtonText = null,
                    showConfirmButton = false,
                    timer = 1500);
                console.log(body);
                let out = `<div class="col col-sm-12 col-md-12 col-lg-12">`;
                out += `<h5>user unauthorized</h5></div>`
                document.querySelector("#userLog").innerHTML = out;
            }
            return body;
        })
        .catch(error => {
            sweetAlerts(
                position = "center",
                icon = "error",
                title = "User not found",
                text = `${error}`,
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

getUser();
document.querySelector("#logout").addEventListener("click", logout);