let card = {};

document.querySelectorAll(".add-to-card").forEach(el => {
    el.addEventListener("click", addToCard);
});

if (localStorage.getItem("card")) {
    card = JSON.parse(localStorage.getItem("card"));
    ajaxGetGoodsInfo();
}

function addToCard() {
    let goodsId = this.dataset.goods_id;
    if (card[goodsId]) {
        card[goodsId]++;
    }
    else {
        card[goodsId] = 1;
    }
    ajaxGetGoodsInfo();
}

function ajaxGetGoodsInfo() {
    updateLocalStorageCard();
    fetch("/card", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ "key": Object.keys(card) })
    })
        .then(res => res.json())
        .then(res => {
            showCard(res.goodsByIndex)
            return res;
        })
        .catch(error => {
            sweetAlerts(
                position = "center",
                icon = "error",
                title = "Error",
                text = "Problem with add item",
                confirmButtonText = "Ok",
                showConfirmButton = true,
                timer = null);
            return error
        })
}

function showCard(data) {
    let out = `<table class="table-card-nav"><tbody>`;
    let total = 0;

    for (const key in card) {
        out += `<tr><td colspan="4"><a href='/goods?id=${key}'>${data[key]["name"]}</a></tr>`
        out += `<tr><td><i class='far fa-minus-square card-minus' data-goods_id='${key}'></i></td>`;
        out += `<td>${card[key]}</td>`;
        out += `<td><i class='far fa-plus-square card-plus' data-goods_id='${key}'></i></td>`;
        out += `<td>${formatPrice(data[key]["cost"] * card[key])} $ </td>`;
        out += `<tr>`;
        total += card[key] * data[key]["cost"];
    }
    out += `</tr><td colspan="3">Total: </td><td id="finish-price" value="${formatPrice(total)}">${formatPrice(total)} $</td></tr>`;
    out += `</tbody></table>`;
    document.querySelector(".card-nav").innerHTML = out;
    document.querySelectorAll(".card-minus").forEach(el => el.addEventListener("click", cardMinus));
    document.querySelectorAll(".card-plus").forEach(el => el.addEventListener("click", cardPlus));
}

function cardPlus() {
    let goodsId = this.dataset.goods_id;
    card[goodsId]++;
    ajaxGetGoodsInfo()
}

function cardMinus() {
    let goodsId = this.dataset.goods_id;
    if (card[goodsId] - 1 > 0) {
        card[goodsId]--;
    } else {
        delete (card[goodsId]);
    }
    ajaxGetGoodsInfo()
}

function updateLocalStorageCard() {
    localStorage.setItem("card", JSON.stringify(card));
}

function formatPrice(price) {
    return price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$& ");
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
