var productData = {};
document.addEventListener("DOMContentLoaded", event => {
  var oReq = new XMLHttpRequest();

  oReq.open("get", "http://demo1853299.mockable.io/products", true);
  oReq.send();

  function reqError(err) {
    console.log("Fetch Error :-S", err);
  }

  function processData() {
    productData = JSON.parse(this.responseText);
    renderProductList(productData.products);
    sendDataForFilters(productData);
  }

  oReq.onload = processData;
  oReq.onerror = reqError;

  renderProductList = products => {
    var grids = document.getElementsByClassName("product-grid-container");
    grids[0].innerHTML = "";

    products.map((item, key) => {
      var productDiv = document.createElement("div");
      productDiv.className = "grid-item";

      var prodImg = document.createElement("div");
      prodImg.className = "product-img";
      var img = document.createElement("img");
      prodImg.appendChild(img);
      img.src = item.image;

      var title = document.createElement("div");
      title.innerHTML = item.title;
      title.className = "title";

      var rating = document.createElement("div");
      rating.innerHTML = item.rating + "*";
      rating.className = "rating";

      var price = document.createElement("div");
      var discount = document.createElement("div");
      var priceSpan = document.createElement("div");
      priceSpan.className = "price-details";

      price.innerHTML = "Rs." + item.price.final_price;
      price.className = "price";
      discount.className = "discount";
      discount.innerHTML = "Rs." + item.discount + " off";

      priceSpan.appendChild(price);
      priceSpan.appendChild(discount);

      var details = document.createElement("div");
      details.className = "product-details";
      details.appendChild(title);
      details.appendChild(rating);
      details.appendChild(priceSpan);

      productDiv.appendChild(prodImg);
      productDiv.appendChild(details);

      grids[0].appendChild(productDiv);
    });
  };
});
