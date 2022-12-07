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
})
.catch((error) => alert("Une erreur est survenue" + error));

function showCart (productData) {
    
    const injectCartInHtml = document.getElementById("cart__items");
    const userCart = JSON.parse(window.localStorage.getItem("userCart"));
    
    if (userCart === null){
        alert("Aucun article dans le panier")
    }else{
        
        for(index = 0; index < userCart.length; index++ ) {
            
            const findProduct = productData.find((element) => element._id === userCart[index].id);    
            const totalProductPrice = findProduct.price * userCart[index].quantity;  
          
            let cartNode = "";
            cartNode +=
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
            injectCartInHtml.innerHTML += cartNode;
            
            // let totalItemsQuantity = 0;
            // let totalCartPrice = 0;
            // totalCartPrice += parseInt(findProduct.price * userCart[index].quantity);
            // totalItemsQuantity += parseInt(userCart[index].quantity);
            // document.getElementById("totalQuantity").innerHTML = totalItemsQuantity;
            // document.getElementById("totalPrice").innerHTML = totalCartPrice;
            
            // console.log(totalCartPrice)
        }   
           

    }
}


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

   
