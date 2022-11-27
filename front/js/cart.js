function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket));
}

function getBasket() {
    return JSON.parse(localStorage.getItem("basket"));
}

function addBasket(product) {
    let basket = getBasket();
    basket.push(product);
    saveBasket(basket);
}