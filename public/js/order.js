function submitOrder(event) {
    event.preventDefault();
    let form = document.querySelector("#lite-shop-order").elements;
    if (form.username.value == "" || form.phone.value == "" || form.email.value == "" || form.address.value == "") {
        sweetAlerts(
            position = "center",
            icon = "info",
            title = "Info",
            text = "Fill all fields",
            confirmButtonText = "Ok",
            showConfirmButton = true,
            timer = null);
        return false;
    }
    if (!form.rule.checked) {
        sweetAlerts(
            position = "center",
            icon = "warning",
            title = "Warning",
            text = "Read and accept the rule",
            confirmButtonText = "Ok",
            showConfirmButton = true,
            timer = null);
        return false;
    }
    fetch("/order", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            "username": form.username.value.trim(),
            "phone": form.phone.value.trim(),
            "email": form.email.value.trim(),
            "address": form.address.value.trim(),
            "key": JSON.parse(localStorage.getItem("card"))
        })
    })
        .then(res => res.json())
        .then(body => {
            if (body.result.length === 0) {
                sweetAlerts(
                    position = "center",
                    icon = "error",
                    title = "Error",
                    text = "Add the goods to the order",
                    confirmButtonText = "Ok",
                    showConfirmButton = true,
                    timer = null);
                return false;
            } else {
                document.querySelector(".card-nav").remove();
                localStorage.removeItem("card");
                sweetAlerts(
                    position = "center",
                    icon = "success",
                    title = "Success",
                    text = "A letter has been sent",
                    confirmButtonText = null,
                    showConfirmButton = false,
                    timer = 1500);
                return body;
            }
        })
        .catch(error => {
            sweetAlerts(
                position = "center",
                icon = "error",
                title = "Error",
                text = "Problem with send letter",
                confirmButtonText = "Ok",
                showConfirmButton = true,
                timer = null);
            return error;
        })
    document.querySelector("#lite-shop-order").reset();
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

document.querySelector("#lite-shop-order").addEventListener("submit", submitOrder);