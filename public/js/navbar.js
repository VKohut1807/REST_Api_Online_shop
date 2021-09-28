if (document.querySelector(".burger")) {
    document.querySelector(".show-nav").addEventListener("click", showNavigation);
    document.querySelector(".close-nav").addEventListener("click", closeNavigation);
}

function showNavigation() {
    document.querySelector(".site-nav").style.left = "0";
    document.querySelector("body").style.overflow = "hidden";
}

function closeNavigation() {
    document.querySelector(".site-nav").style.left = "-100%";
    document.querySelector("body").style.overflow = "visible";
}

function getCategoryList() {
    fetch("/navbar", {
        method: "POST",
    })
        .then(res => res.json())
        .then(body => {
            showCategoryList(body.result);
            return body;
        })
        .catch(error => {
            sweetAlerts(
                position = "center",
                icon = "error",
                title = "Error",
                text = "Problem with show list",
                confirmButtonText = "Ok",
                showConfirmButton = true,
                timer = null);
            return error;
        })
}

function showCategoryList(data) {
    let out = "<ul class='category-list'><li><a href='/'>Main</a></li>"
    data.forEach(el => {
        out += `<li><a href='/category?id=${el.id}'>${el.category}</a></li>`
    });
    out += "</ul>";
    if (document.querySelector(".burger")) {
        document.querySelector("#category-list").innerHTML = out;
    }
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

getCategoryList();