const userColorValue = document.getElementById("colors");
const userQuantityValue = document.getElementById("quantity");

// récupération de l'id présent dans l'url (correspond à l'Id de l'article cliqué sur la page index).
const id = new URLSearchParams (document.location.search).get("id");

// fetch avec variable de l'id pour récupérer dans l'API toutes les données de l'article cliqué sur la page index.
fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((response) => {
        showProduct(response);
        addToCartValidation(response);
    })
    .catch((error) => alert("Une erreur est survenue" + error));

// fonction pour afficher l'article et ses données. On utilise productData comme la réponse de l'API, contient donc toutes les données de l'article cliqué.
function showProduct(productData) {
    // ajout du nom de l'article dans l'onglet.
    const productPageName = document.querySelector("title");
    productPageName.innerHTML = productData.name;
        
    // injection dans le HTML des images, alt, name, price, description dans leurs emplacements respectifs.
    document.querySelector(".item__img").innerHTML = `<img src="${productData.imageUrl}" alt="${productData.altTxt}">`;
    document.getElementById("title").innerHTML = productData.name;
    document.getElementById("price").innerHTML = productData.price;
    document.getElementById("description").innerHTML = productData.description; 

    // boucle qui va utiliser chaque couleur ("color") présente dans "colors", le but étant d'ajouter les options de couleur de l'article.
    for (const color of productData.colors) {
        // on crée un élément HTML "option" auquel on définie en "value", une de nos "color"
        const colorOption = document.createElement("option");
        colorOption.innerHTML = color;
        colorOption.value = color;
        userColorValue.appendChild(colorOption);
    }
};

// fonction pour ajouter l'article et ses options au panier.
function addToCartValidation(productData) {
    const addToCartBtn = document.getElementById("addToCart");
    // ajout d'une écoute du click du bouton ajouter au panier pour pouvoir ajouter des vérifications sur les données saisies par l'utilisateur.
    addToCartBtn.addEventListener("click", () => {

        if(userColorValue.value === "") {
            alert("Merci de sélectionner une couleur");
        }else if(userQuantityValue.value <= 0 ) {
            alert("Merci de choisir au moins 1 article");
        }else if(userQuantityValue.value > 100 ) {
            alert("Merci de choisir une quantité entre 1 et 100");
        }else if(userQuantityValue.value != parseInt (userQuantityValue.value, 10)) {
            alert("Merci de choisir un nombre entier");
        }else{
            addToCart(productData, productData.name, userColorValue.value, productData.imageUrl, productData.altTxt, productData.description, userQuantityValue.value);
        }
    });
}

// fonction pour ajouter l'article au panier (localStorage)
function addToCart(product, name, color, imageUrl, altTxt, description, quantity) {
    
    // Si rien n'est présent dans le localstorage, on crée un tableau panier (userCart).
    if (!window.localStorage.getItem("userCart")) {
        window.localStorage.setItem("userCart", JSON.stringify([]));
    }

    // on crée un object newProduct, qui sera un article dans le locastorage.
    const newProduct = {
        id: product._id,
        name: name, 
        color: color,
        image: imageUrl,
        altText: altTxt,
        description: description,
        quantity: parseInt (quantity, 10),
    };

    // on parse le panier du localstorage pour récupérer les infos.
    const userCart = JSON.parse(window.localStorage.getItem("userCart"));
    
    // conditions pour ne pas faire de doublons dans le panier et pouvoir ajuster la quantité:
    // Si aucun element du panier n'a le même ID que l'article à ajouter, alors on push cet article.
    if (!userCart.some((element) => element.id === newProduct.id)) {
        userCart.push(newProduct);
    }else{
        // sinon, si l'article à le même ID qu'un article déjà dans le panier, on le push uniquement s'il n'a pas la même couleur.
        const idFilter = userCart.filter((element) => element.id === newProduct.id);
        if (idFilter.every((element) => element.color !== newProduct.color)) {
            userCart.push(newProduct);
        }else{
            // si l'article est déjà présent dans le localstorage et qu'il a la même couleur, on va seulement ajuster (incrémenter) sa quantité.
            const sameColorFilter = userCart.findIndex((element) => element.id === newProduct.id && element.color === newProduct.color);
            userCart[sameColorFilter].quantity += newProduct.quantity;
        }
    }

    // une fois les vérifications faites, on envoie le résultat dans le localstorage.
    window.localStorage.setItem("userCart", JSON.stringify(userCart));

    if (window.confirm("Le produit à bien été ajouté, souhaitez-vous accéder à votre panier?")) {
        window.location.href = "cart.html";
    };
}