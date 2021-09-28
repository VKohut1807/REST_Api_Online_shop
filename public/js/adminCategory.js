function submitCategory(event) {
    event.preventDefault();
    let form = document.querySelector("#adminNewCategory").elements;

    if (
        form.name.value == ""
        || form.description.value == ""
        || form.fileImage.files[0].name == ""
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

    fetch("/auth/admin-category", {
        method: "POST",
        headers: {
            "Accept": 'application/json',
            "Content-type": "application/json"
        },
        body:
            JSON.stringify({
                "name": form.name.value.trim(),
                "description": form.description.value.trim(),
                "image": form.fileImage.files[0].name,
            }),
    })
        .then(res => res.json())
        .then(body => {
            sweetAlerts(
                position = "center",
                icon = "success",
                title = "Success",
                text = "Your newCategory has been saved!",
                confirmButtonText = null,
                showConfirmButton = false,
                timer = 1500);
            showNewCategory(body);
            return body;
        })
        .catch(error => {
            sweetAlerts(
                position = "center",
                icon = "error",
                title = "Error",
                text = "Your newCategory hasn't been saved!",
                confirmButtonText = "Ok",
                showConfirmButton = true,
                timer = null);
            return error;
        })
    document.querySelector('#adminNewCategory').reset();
}

function uploadFile() {
    let file = document.querySelector("#newImgCat").files[0];
    let formData = new FormData();
    formData.append('fileImage', file);

    fetch(`/auth/uploads-img`, {
        method: "POST",
        headers: {
            "Accept": 'application/json',
        },
        body: formData
    })
        .then(res => res.json())
        .then(result => {
            if (result != undefined && result.message === "File loaded") {
                sweetAlerts(
                    position = "center",
                    icon = "success",
                    title = "Success",
                    text = `${result.message}`,
                    confirmButtonText = null,
                    showConfirmButton = false,
                    timer = 1500);
            } else {
                sweetAlerts(
                    position = "center",
                    icon = "info",
                    title = "warning",
                    text = `${result.message}`,
                    confirmButtonText = "Ok",
                    showConfirmButton = true,
                    timer = null);
            }
        })
        .catch(error => {
            document.querySelector('#newImgCat').value = "";
            sweetAlerts(
                position = "center",
                icon = "error",
                title = "Error - Problem load file",
                text = "Only .png, .jpg and .jpeg format allowed! and file size < 1MB",
                confirmButtonText = "Ok",
                showConfirmButton = true,
                timer = null);
            return error;
        });
}

function deleteCategory(event) {
    event.preventDefault();
    let buttonId = this.dataset.button_id;
    this.parentElement.remove(buttonId);

    fetch("/auth/admin-category", {
        method: "DELETE",
        headers: {
            "Accept": 'application/json',
            "Content-type": "application/json"
        },
        body:
            JSON.stringify({
                "categoryId": buttonId,
            }),
    })
        .then(res => res.json())
        .then(data => {
            sweetAlerts(
                position = "center",
                icon = "success",
                title = "Success",
                text = `${data} Category has been deleted!`,
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

function showNewCategory(data) {
    let out = `<tr><td>${data.id}</td>
            <td>${data.category}</td>
            <td>${data.description}</td>
            <td><img src="../img/${data.image}"></td>
            <td class="deleteCategory" data-button_id=${data.id}>
            <button class="button-danger button-small" type="submit">
            <i class="fas fa-times" aria-hidden="true"></i></button></td></tr>`;
    document.querySelector("#admin-new-category tbody").innerHTML += out;
    document.querySelectorAll(".deleteCategory").forEach(el => {
        el.addEventListener("click", deleteCategory);
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

document.querySelector("#adminNewCategory").addEventListener("submit", submitCategory);
document.querySelectorAll(".deleteCategory").forEach(el => {
    el.addEventListener("click", deleteCategory);
})
document.querySelector("#newImgCat").addEventListener("change", uploadFile);