

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


// fonction pour changer la quantité d'un article depuis le panier et 
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
                location.reload(); // le reload va permettre
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
    const userCart = JSON.parse(window.localStorage.getItem("userCart"));
    userCart.splice(userCart.findIndex((v) => v.id === product.id && v.color === product.color), 1);
    localStorage.setItem("userCart", JSON.stringify(userCart));
}     


