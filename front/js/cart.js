// function saveBasket(basket) {
//     localStorage.setItem("basket", JSON.stringify(basket));
// }

// function getBasket() {
//     return JSON.parse(localStorage.getItem("basket"));
// }

// function addBasket(product) {
//     let basket = getBasket();
//     basket.push(product);
//     saveBasket(basket);
// }


fetch("http://localhost:3000/api/products/")
  .then((response) =>  response.json())
  .then((response) => {
    showCart(response);
    // deleteProduct(response);
})
.catch((error) => alert("Une erreur est survenue" + error));

function showCart (productData) {
    // let totalItemsQuantity = 0;
    // let totalCartPrice = 0;
    const itemBloc = document.getElementById("cart__items");
    const userCart = JSON.parse(window.localStorage.getItem("userCart"));
    
    if (userCart === null){
        alert("Aucun article dans le panier")
    }else{
        
        // boucle pour ajouter noeud HTML des articles au panier avec les spécificités des articles.
        for(index = 0; index < userCart.length; index++ ) {
            
            let findProduct = productData.find((element) => element._id === userCart[index].id);   
            const totalProductPrice = findProduct.price * userCart[index].quantity;  
          
            let itemNode = "";
            itemNode +=
            `<article class="cart__item" data-id="${userCart[index].id}" data-color="${userCart[index].color}">
                <div class="cart__item__img">
                    <img src="${userCart[index].image}" alt="${userCart[index].altText}">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${userCart[index].name}</h2>
                        <p>${userCart[index].color}</p>
                        <p>${totalProductPrice}€</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté :</p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${userCart[index].quantity}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>`;
            itemBloc.innerHTML += itemNode;
        }
        
        let totalItemsQuantity = 0;
        let totalCartPrice = 0;
        
        // boucle pour calculer et afficher prix total et quantité totale au panier
        for(index = 0; index < userCart.length; index++) {
            const findProduct = productData.find((element) => element._id === userCart[index].id);
            totalCartPrice += parseInt(findProduct.price * userCart[index].quantity);
            totalItemsQuantity += parseInt(userCart[index].quantity);
            document.getElementById("totalQuantity").innerHTML = totalItemsQuantity;
            document.getElementById("totalPrice").innerHTML = totalCartPrice;
        }
        
        
        // boucle pour bouton supprimer du panier
        for (index = 0; index < userCart.length; index ++) {
            let foundProduct = userCart.find((element) => element.id === userCart[index].id && element.color === userCart[index].color);
            const deleteBtn = document.querySelectorAll(".deleteItem");
            console.log(userCart);
            deleteBtn[index].addEventListener("click", () => {
                deleteProduct(foundProduct);
                console.log(foundProduct);
                alert(foundProduct.name + " a bien été supprimé du panier.");
                location.reload();
            });    
        }
    }
}

// fonction pour supprimer l'article cliqué et mettre à jour le panier
function deleteProduct (product) {
    const userCart = JSON.parse(window.localStorage.getItem("userCart"));
    userCart.splice(userCart.findIndex((v) => v.id === product.id && v.color === product.color), 1);
    localStorage.setItem("userCart", JSON.stringify(userCart));
}     



// function ne marche pas
// function deleteItem (item) {
//     const btn = document.querySelector(".deleteItem");
//     btn.addEventListener("click", () => deleteItem(item))
//     console.log("item to delete", item)
// }


// const productDeleteBtn = document.getElementsByClassName("deleteItem");
// productDeleteBtn.addEventListener("click", () => {
//     deleteProduct(findProduct);
//     alert(findProduct.name + "a été supprimé du panier.");
//     showCart();
// });

// deleteItem();


// function deleteProduct(productData) {
//     userCart.splice(userCart.findIndex((v) => v.id === productData._id), 1);
//     localStorage.setItem("userCart", JSON.stringify(userCart));
//     showCart();
// }

// function deleteItem() {
//     const deleteButtons = document.querySelectorAll(".deleteItem");
//     deleteButtons.forEach((deleteButton) => {
//         deleteButton.addEventListener("click", (event) => {
//             event.preventDefault();
//             let userCart = JSON.parse(window.localStorage.getItem("userCart"));
//             const deleteId = event.target.getAttribute("data-id");
//             const deleteColor = event.target.getAttribute("data-color");
//             userCart = userCart.filter((element) => !(element._id == deleteId && element.color == deleteColor));
//             deleteConfirm = window.confirm(
//                 "Etes vous sûr de vouloir supprimer cet article ?"
//             );
//             if (deleteConfirm == true) {
//                 localStorage.setItem("userCart", JSON.stringify(userCart));
//                 alert("Article supprimé avec succès");
//                 const card = deleteButton.closest(".cart__item");
//                 card.remove();
//                 reloadCart();
//             } else {
//                 alert("Article non supprimé");
//             }

//             const deleteKanap = JSON.parse(localStorage.getItem("userCart"));

//             if (deleteKanap.length === 0) {
//                 localStorage.removeItem("userCart");
//                 alert('Panier vide, retour à l\'accueil.');
//                 window.location.href = "index.html";

//             }
//         });
//     });
// }

// function reloadCart() {

//     const userCart = JSON.parse(window.localStorage.getItem("userCart"));

//     let totalItemsQuantity = 0;
//     let totalCartPrice = 0;

//     for (index = 0; index < userCart.length; index++) {
//         const findProduct = userCart.find((element) => element.id === userCart[index].id);
//         totalItemsQuantity += parseInt(userCart[index].quantity);
//         totalCartPrice += parseInt(findProduct.price * userCart[index].quantity);
//         // console.log(parseInt(findProduct.price * userCart[index].quantity));
//         // document.getElementById("prix_" + i).innerHTML = findProduct.price * userCart[i].quantity + " €";
//     }

//     document.getElementById("totalQuantity").innerHTML = totalItemsQuantity;
//     document.getElementById("totalPrice").innerHTML = totalCartPrice;
// }


        
// function removeFromuserCart(product) {
//     let userCart = JSON.parse(window.localStorage.getItem("userCart"));
//     userCart = userCart.filter(p => p.id != product.id);
//     localStorage.setItem("userCart", JSON.stringify(userCart));
    
// }        
     
   

        
           



// CODE AMI MAIS NE MARCHE PAS

// const basket = localStorage.getItem("userCart");
// const userCart = JSON.parse(userCart);


// async function getProductById(id) {
//     return fetch("http://localhost:3000/api/products/" + id)
//     .then(function (res) {
//         return res.json();
//     })
//     .catch((error) => {
//         alert("Une erreur est survenue" + error)
//     })
//     .then((response) => {
//         return response;
//     });
// };


// async function showCart() {
    
//     const parser = new DOMParser();
//     const articleBlock = document.getElementById("cart__items");
     

//     if (userCart === null || userCart == 0) {
//         alert("Aucun article dans le panier")
//     }else{
//         let cartArray = [];
        
//         for(list = 0; list < userCart.length; list++ ) {
//             const product = await getProductById(userCart[list].id);
//             const totalProductPrice = (product.price *= userCart[list].quantity);
//             cartArray += 
//             `<article class="cart__item" data-id="${userCart[list].id}" data-color="${userCart[list].color}">
//                 <div class="cart__item__img">
//                     <img src="${product.imageUrl}" alt="${product.altText}">
//                 </div>
//                 <div class="cart__item__content">
//                     <div class="cart__item__content__description">
//                         <h2>${userCart[list].name}</h2>
//                         <p>${userCart[list].color}</p>
//                         <p>${totalProductPrice}</p>
//                     </div>
//                     <div class="cart__item__content__settings">
//                         <div class="cart__item__content__settings__quantity">
//                             <p>Qté :</p>
//                             <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${userCart[list].quantity}">
//                         </div>
//                         <div class="cart__item__content__settings__delete">
//                             <p class="deleteItem">Supprimer</p>
//                         </div>
//                     </div>
//                 </div>
//             </article>`;
//         } 
    
//         if(list == userCart.length) {
//             const displayBasket = parser.parseFromString(cartArray, "text/html");
//             articleBlock.appendChild(displayBasket.body);
//         }
//     }
// }

   
