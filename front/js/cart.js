

// récupération des données du local storage.
const userCart = JSON.parse(window.localStorage.getItem("userCart"));

// fetch de l'api et récupération de la réponse JSON.
fetch("http://localhost:3000/api/products/")
  .then((response) =>  response.json())
  .then((response) => {
    displayCart(response);
})
.catch((error) => alert("Une erreur est survenue" + error));


// fonction principale d'affichage des articles de la page panier.
function displayCart (productData) {
    
    if (userCart === null){
        alert("Aucun article dans le panier")
    }else{
        
        // appel des fonctions principale de la page.
        showItems(productData);
        showTotalQuantityAndPrice(productData);
        changeQuantity();
        deleteItemBtn();
        
        // Si panier vide, on supprime le tableau vide du localStorage. Puis retour à la page d'accueil.
        if (userCart.length === 0) {
            localStorage.removeItem("userCart");
            alert('Panier vide, retour à l\'accueil.');
            window.location.href = "index.html";
        }   
    }
}


// fonction et boucle pour ajouter noeud HTML des articles au panier avec les spécificités des articles.
function showItems (productData) {
    for(i = 0; i < userCart.length; i++ ) {
        const itemBloc = document.getElementById("cart__items");
        const findProduct = productData.find((element) => element._id === userCart[i].id);   
        const totalProductQuantity = userCart[i].quantity;
        const totalProductPrice = findProduct.price * totalProductQuantity;  
        
        let itemNode = "";
        itemNode +=
        `<article class="cart__item" data-id="${userCart[i].id}" data-color="${userCart[i].color}">
            <div class="cart__item__img">
                <img src="${userCart[i].image}" alt="${userCart[i].altText}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${userCart[i].name}</h2>
                    <p>${userCart[i].color}</p>
                    <p>${totalProductPrice}€</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté :</p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${totalProductQuantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>`;
        itemBloc.innerHTML += itemNode;
    }
}


// fonction pour calculer et actualiser total du prix et quantité au panier.
function showTotalQuantityAndPrice (productData) {
    let totalCartPrice = 0;
    let totalItemsQuantity = 0;
    
    for(i = 0; i < userCart.length; i++) {
        const findProduct = productData.find((element) => element._id === userCart[i].id);
        totalCartPrice += parseInt(findProduct.price * userCart[i].quantity);
        totalItemsQuantity += parseInt(userCart[i].quantity);
        document.getElementById("totalQuantity").innerHTML = totalItemsQuantity;
        document.getElementById("totalPrice").innerHTML = totalCartPrice;
    }
}


// fonction pour changer la quantité d'un article depuis le panier et mettre à jour le local storage
function changeQuantity () {
    for (i = 0; i < userCart.length; i ++) {
        const findProduct = userCart.find((product) => product.id === userCart[i].id && product.color === userCart[i].color);
        const totalProductQuantity = document.querySelectorAll(".itemQuantity")
        totalProductQuantity.value = userCart[i].quantity;
        totalProductQuantity[i].addEventListener("change", (event) => {
            const userValue = event.target.value;
            findProduct.quantity = parseInt(userValue, 10);

            if (userValue <= 0 || userValue > 100) {
                alert("Merci de sélectionner une quantité entre 1 et 100")
                location.reload();
            }else if (userValue != parseInt(userValue, 10)) {
                alert("Merci de choisir un nombre entier")
                location.reload();
            }else{
                localStorage.setItem("userCart", JSON.stringify(userCart));
                location.reload(); // le reload va permettre de mettre à jour le localstorage
            }
        })
    }
}


// fonction et boucle pour bouton supprimer du panier
function deleteItemBtn () {
    for (i = 0; i < userCart.length; i ++) {
        const findProduct = userCart.find((element) => element.id === userCart[i].id && element.color === userCart[i].color);
        const deleteBtn = document.querySelectorAll(".deleteItem");
        deleteBtn[i].addEventListener("click", () => {
            deleteFromUserCart(findProduct);
            alert(findProduct.name + " " + findProduct.color + " a bien été supprimé du panier.");
            location.reload();
        });    
    }
}


// fonction pour supprimer l'article cliqué (on prend bien en compte l'article avec la même couleur) et mettre à jour le localstorage.
function deleteFromUserCart (product) {
    const userCart = JSON.parse(window.localStorage.getItem("userCart")); // on peux supprimer ce parse? deja présent en haut de page
    userCart.splice(userCart.findIndex((v) => v.id === product.id && v.color === product.color), 1);
    localStorage.setItem("userCart", JSON.stringify(userCart));
}     


// ************* FORMULAIRE DONNEES UTILISATEUR ***************

// REGEX (Regular Expressions) caractères autorisés ou inderdits à la saisie.
let nameRegEx = /^[a-zA-Z\-çñàéèêëïîôüù ]{2,}$/;
let addressRegEx = /^[0-9a-zA-Z\s,.'-çñàéèêëïîôüù]{3,}$/;
let emailRegEx = /^[A-Za-z0-9\-\.]+@([A-Za-z0-9\-]+\.)+[A-Za-z0-9-]{2,}$/;

// cyblage de la div formulaire pour récupérer les inputs.
const form = document.querySelector(".cart__order__form");

// Validation prénom
form.firstName.addEventListener("change", (event) => {
    event.preventDefault();
    if (nameRegEx.test(firstName.value) == false || lastName.value === null){
        document.querySelector("#firstNameErrorMsg").innerHTML = "Merci de saisir un prénom valide";
        return false;
    }else{
        document.querySelector("#firstNameErrorMsg").innerHTML = null;
        return true;
    }
});

// Validation nom de famille
form.lastName.addEventListener("change", (event) => {
    event.preventDefault();
    if (nameRegEx.test(lastName.value) == false || lastName.value === null){
        document.querySelector("#lastNameErrorMsg").innerHTML = "Merci de saisir un nom valide";
        return false;
    }else{
        document.querySelector("#lastNameErrorMsg").innerHTML = null;
        return true;
    }
});

// Validation adresse postale
form.address.addEventListener("change", (event) => {
    event.preventDefault();
    if (addressRegEx.test(address.value) == false || address.value === null){
        document.querySelector("#addressErrorMsg").innerHTML = "Merci de saisir une adresse valide";
        return false;

    // pour imposer au moins 3 lettres dans l'adresse.
    }else if (!/[A-Za-z]{3}$/.test(address.value)){
        document.querySelector("#addressErrorMsg").innerHTML = "Merci de saisir une adresse valide";
        return false;
    }else{
        document.querySelector("#addressErrorMsg").innerHTML = null;
        return true;
    }
});

// Validation ville
form.city.addEventListener("change", (event) => {
    event.preventDefault();
    if (nameRegEx.test(city.value) == false || city.value === null){
        document.querySelector("#cityErrorMsg").innerHTML = "Merci de saisir une ville valide";
        return false;
    }else{
        document.querySelector("#cityErrorMsg").innerHTML = null;
        return true;
    }
});

// Validation adresse email
form.email.addEventListener("change", (event) => {
    event.preventDefault();
    if (emailRegEx.test(email.value) == false || email.value === null){
        document.querySelector("#emailErrorMsg").innerHTML = "Merci de saisir une adresse email valide";
        return false;
    }else{
        document.querySelector("#emailErrorMsg").innerHTML = null;
        return true;
    }
});

// Bouton pour valider le formulaire et passer commande.
let order = document.getElementById("order");
order.addEventListener("click", (e) => {
    e.preventDefault();

    // avant d'envoyer le formulaire, on demande que toutes les validations soient remplies.
    if(nameRegEx.test(firstName.value) && 
    nameRegEx.test(lastName.value) &&
    addressRegEx.test(address.value) &&
    nameRegEx.test(city.value) &&
    emailRegEx.test(email.value) &&
    firstName.value != null &&
    lastName.value != null &&
    address.value != null &&
    city.value != null &&
    email.value != null) {

        // on crée un objet, le formulaire de contact utilisateur.
        let contact = {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value,
        };
        
        // on crée un nouveau tableau contenant uniquement les ID's des produits au panier.
        let products = [];
        userCart.forEach((order) => {
            products.push(order.id);
        });

        // on crée un nouvel objet contenant le tableau des Id's des produits au panier et l'objet formulaire utilisateur, complété.
        let order = {
            contact,
            products,
        };
        console.log(order);
    

        // Fetch POST pour envoyer les infos de la commande au serveur et récupérer un id de commande dans l'URL de la page confirmation.
        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(order),
        })
        .then((response) => response.json())
        .then((confirm) => {
            window.location.href = "./confirmation.html?orderId=" + confirm.orderId;
            localStorage.clear();
        })
        .catch((err) => {
            console.log("une erreur est survenue" + err);
        });
    
    // Si le formulaire n'est pas correctement rempli.
    }else{
        alert("Merci de remplir le formulaire")
    }
});