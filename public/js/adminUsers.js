function FixUser(event) {
    event.preventDefault();
    let form = document.querySelector("#adminChangesUser").elements;

    if (
        form.name.value == ""
        || form.password.value == ""
        || form.roles.value == ""
    ) {
        sweetAlerts(
            position = "center",
            icon = "warning",
            title = "Warning",
            text = "Fill all fields",
            confirmButtonText = "Ok",
            showConfirmButton = true,
            timer = null);
        return false;
    }

    fetch("/auth/admin-users", {
        method: "PUT",
        headers: {
            "Accept": 'application/json',
            "Content-type": "application/json"
        },
        body:
            JSON.stringify({
                "userId": form.id.value,
                "name": form.name.value.trim(),
                "password": form.password.value.trim(),
                "roles": form.roles.value.trim()
            }),
    })
        .then(res => res.json())
        .then(body => {
            sweetAlerts(
                position = "center",
                icon = "success",
                title = "Success",
                text = `${body.message}`,
                confirmButtonText = null,
                showConfirmButton = false,
                timer = 1500);
            return body;
        })
        .catch(error => {
            sweetAlerts(
                position = "center",
                icon = "error",
                title = "Error",
                text = `${error.message}`,
                confirmButtonText = "Ok",
                showConfirmButton = true,
                timer = null);
            return error;
        })
    showChangesUser();
    document.querySelector('#adminChangesUser').reset();
}

function changesUser(event) {
    document.querySelector("#fixForm").classList.toggle("shawForm");
    document.querySelector("#SelectUserId").value = this.dataset.button_id;
    document.querySelector("#SelectUserName").value = this.dataset.button_name;
    document.querySelector("#SelectUserPassword").value = this.dataset.button_password;
    document.querySelector("#SelectUserRoles").value = this.dataset.button_roles;
}

function deleteUser(event) {
    event.preventDefault();
    let buttonId = this.dataset.button_id;
    this.parentElement.remove(buttonId);
    document.querySelector("#fixForm").classList.add("shawForm");

    fetch("/auth/admin-users", {
        method: "DELETE",
        headers: {
            "Accept": 'application/json',
            "Content-type": "application/json"
        },
        body:
            JSON.stringify({
                "userId": buttonId,
            }),
    })
        .then(res => res.json())
        .then(data => {
            sweetAlerts(
                position = "center",
                icon = "success",
                title = "Success",
                text = `${data} User has been deleted!`,
                confirmButtonText = null,
                showConfirmButton = false,
                timer = 1500);
            return data;
        })
        .catch(error => {
            sweetAlerts(
                position = "center",
                icon = "error",
                title = "Error",
                text = "Category hasn't been deleted!",
                confirmButtonText = "Ok",
                showConfirmButton = true,
                timer = null);
            return error;
        })
}

function showChangesUser() {
    let form = document.querySelector("#adminChangesUser").elements;
    let id = form.id.value;
    let name = form.name.value.trim();
    let password = form.password.value.trim();
    let roles = form.roles.value.trim();
    let out = `<tr><td>${id}</td>
            <td>${name}</td>
            <td class="textDots users-pass">${password}</td>
            <td>${roles}</td>
            <td data-button_id=${id}
                data-button_name=${name}
                data-button_password=${password}
                data-button_roles=${roles}
                class="changesUser">
            <button class="button-warning button-small">
            <i class="fas fa-pencil-alt" aria-hidden="true"></i></button></td>
            <td class="deleteUser" data-button_id=${id}>
            <button class="button-danger button-small" type="submit">
            <i class="fas fa-times" aria-hidden="true"></i></button></td></tr>`;
    document.querySelector(`tr[data-tr_id="${id}"]`).innerHTML = out;
    document.querySelectorAll(".changesUser").forEach(el => {
        el.addEventListener("click", changesUser);
    })
    document.querySelectorAll(".deleteUser").forEach(el => {
        el.addEventListener("click", deleteUser);
    });
    document.querySelector("#fixForm").classList.add("shawForm");
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

document.querySelector("#adminChangesUser").addEventListener("submit", FixUser);
document.querySelectorAll(".changesUser").forEach(el => {
    el.addEventListener("click", changesUser);
})
document.querySelectorAll(".deleteUser").forEach(el => {
    el.addEventListener("click", deleteUser);
})