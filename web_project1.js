
const productList = document.getElementById("productList");
const searchBox = document.getElementById("searchBox");
let ourProducts = [];

searchBox.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredProducts = ourProducts.filter((products) => {
    return (
      products.title.toLowerCase().includes(searchString) ||
      products.category.toLowerCase().includes(searchString) ||
      products.description.toLowerCase().includes(searchString)
    );
  });
  displayProducts(filteredProducts);
});



const loadProducts = async () => {
  try {
    const res = await fetch("product_dummy_data.json", {
      method: "GET",
    });
    let obj = await res.json();
    ourProducts = obj.products;
    displayProducts(ourProducts);
  } catch (err) {
    console.error(err);
  }
};



const displayProducts = (products) => {
  const htmlString = products
    .map((products) => {
      return `
            <li class="products">
                <h2>${products.title}</h2>
                <p>Price: ${products.price}</p><br><br>
                <img src="${products.thumbnail}"></img><br><br>
                <section> Description: ${products.description}</section>
            </li>
        `;
    })
    .join("");
    
  productList.innerHTML = htmlString;
};

loadProducts();