function submitGoods(event) {
    event.preventDefault();
    let form = document.querySelector("#adminNewGoods").elements;
    if (
        form.name.value == "" ||
        form.description.value == "" ||
        form.cost.value == "" ||
        form.fileImage.files[0].name == ""
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

    fetch("/auth/admin-goods", {
        method: "POST",
        headers: {
            "Accept": 'application/json',
            "Content-type": "application/json"
        },
        body:
            JSON.stringify({
                "name": form.name.value.trim(),
                "description": form.description.value.trim(),
                "cost": form.cost.value.trim(),
                "image": form.fileImage.files[0].name.trim(),
                "category_id": form.category.value.trim(),
            }),
    })
        .then(res => res.json())
        .then(body => {
            sweetAlerts(
                position = "center",
                icon = "success",
                title = "Success",
                text = "Your newGoods has been saved!",
                confirmButtonText = null,
                showConfirmButton = false,
                timer = 1500);
            showNewGoods(body);
            return body;
        })
        .catch(error => {
            sweetAlerts(
                position = "center",
                icon = "error",
                title = "Error",
                text = "Your newGoods hasn't been saved!",
                confirmButtonText = "Ok",
                showConfirmButton = true,
                timer = null);
            return error;
        })
    document.querySelector('#adminNewGoods').reset()
}

function uploadFile() {
    let file = document.querySelector("#newImgGoods").files[0];
    let formData = new FormData();

    formData.append('fileImage', file);

    fetch(`/auth/uploads-img`, {
        method: "POST",
        headers: {
            "Accept": 'application/json',
        },
        body: formData
    })
        .then(data => data.json())
        .then(success => {
            sweetAlerts(
                position = "center",
                icon = "success",
                title = "Success",
                text = "Your file has been loaded!",
                confirmButtonText = null,
                showConfirmButton = false,
                timer = 1500);
            return success;
        })
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
            document.querySelector('#newImgGoods').value = "";
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

function deleteGoods(event) {
    event.preventDefault();
    let buttonId = this.dataset.button_id;
    this.parentElement.remove(buttonId);

    fetch("/auth/admin-goods", {
        method: "DELETE",
        headers: {
            "Accept": 'application/json',
            "Content-type": "application/json"
        },
        body:
            JSON.stringify({
                "goodsId": buttonId,
            }),
    })
        .then(res => res.json())
        .then(data => {
            sweetAlerts(
                position = "center",
                icon = "success",
                title = "Success",
                text = `${data} Goods has been deleted!`,
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
                text = "Goods hasn't been deleted!",
                confirmButtonText = "Ok",
                showConfirmButton = true,
                timer = null);
            return error;
        })
}

function showNewGoods(data) {
    let out = `<tr><td>${data.id}</td>
            <td>${data.name}</td>
            <td>${data.description}</td>
            <td>${data.cost} $</td>
            <td><img src="../img/${data.image}"></td>
            <td>${data["category_id"]}</td>
            <td class="delGoods" data-button_id=${data.id}>
            <button class="button-danger button-small" type="submit">
            <i class="fas fa-times" aria-hidden="true"></i></button></td></tr>`;
    document.querySelector("#admin-new-goods tbody").innerHTML += out;
    document.querySelectorAll(".delGoods").forEach(el => {
        el.addEventListener("click", deleteGoods);
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

document.querySelector("#adminNewGoods").addEventListener("submit", submitGoods);
document.querySelector("#newImgGoods").addEventListener("change", uploadFile);
document.querySelectorAll(".delGoods").forEach(el => {
    el.addEventListener("click", deleteGoods);
})