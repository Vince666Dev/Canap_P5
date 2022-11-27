fetch("http://localhost:3000/api/products")
  .then((response) =>  response.json()
  .then((productsData) => {

    let output = "";
    for (let item of productsData) {
      output +=`
        <a href="./product.html?id=${item._id}">
          <article>
            <img src="${item.imageUrl}" alt="${item.altTxt}">
            <h3 class="productName">${item.name}</h3>
            <p class="productDescription">${item.description}</p>
          </article>
        </a>`;
    }
    document.getElementById("items").innerHTML = output;
  })
);
  


