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

fetch("http://localhost:3000/api/products")
  .then((response) =>  response.json())
  .then((response) => {
    showCart(response);
})
.catch((error) => alert("Une erreur est survenue" + error));

function showCart (productData) {
    const userCart = JSON.parse(window.localStorage.getItem("userCart"));
    const injectCartInHtml = document.getElementById("cart__items");
      
    if (userCart === null){
        alert("Aucun article dans le panier")
    }else{
        let CartArray = [];
        
        for(list = 0; list < userCart.length; list++ ) {
            CartArray = CartArray + `
                <article class="cart__item" data-id="${userCart[list].id}" data-color="${userCart[list].color}">
                    <div class="cart__item__img">
                        <img src="${userCart[list].image}" alt="${userCart[list].altText}">
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                        <h2>${userCart[list].name}</h2>
                        <p>${userCart[list].color}</p>
                        <p>${productData.price}</p>
                        </div>
                        <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : ${userCart[list].quantity}</p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${userCart[list].quantity}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                        </div>
                    </div>
                </article>`;
            

            // const showPrice = (productData) => {
            //     document.querySelector(".cart__item__content__description").innerHTML = `<p>${productData.price}</p>`;
            //     console.log(showPrice)
            // }
        } 
    
        if(list === userCart.length) {
            injectCartInHtml.innerHTML = CartArray;
        }
    }
}

// function deleteArticle(productData) {
//     const deleteBtn = document.querySelector(".deleteItem");
//     deleteBtn.addEventListener("click", () => {
//         // event.preventDefault;
//         // event.stopPropagation;
    
//     });
   
// }
        
   
            






