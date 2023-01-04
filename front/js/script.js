//  fetch pour récupération des articles dans l'API.
fetch("http://localhost:3000/api/products")
  .then((response) =>  response.json())
  .then((productData) => {

    // on créer le noeud html d'un article dans une boucle pour ajouter chaque article de l'API sur la page.
    let itemNode = "";
    for (let item of productData) {
      itemNode +=`
        <a href="./product.html?id=${item._id}">
          <article>
            <img src="${item.imageUrl}" alt="${item.altTxt}">
            <h3 class="productName">${item.name}</h3>
            <p class="productDescription">${item.description}</p>
          </article>
        </a>`;
    }
    document.querySelector("#items").innerHTML = itemNode;
  })
  .catch((error) => alert("Une erreur est survenue" + error));


