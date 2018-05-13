document.addEventListener("DOMContentLoaded", event => {
  var oReq = new XMLHttpRequest();

  oReq.open("get", "http://demo1853299.mockable.io/filters", true);
  oReq.send();

  function reqError(err) {
    console.log("Fetch Error :-S", err);
  }

  function processFilters() {
    var data = JSON.parse(this.responseText);

    var priceFilters = data.filters[2];
    var colorFilters = data.filters[1];
    var brandFilters = data.filters[0];

    var priceMin = document.getElementsByClassName("price-min-dd");
    var priceMax = document.getElementsByClassName("price-max-dd");
    priceFilters.values.map((item, key) => {
      var option = document.createElement("option");
      option.value = item.key;
      option.innerHTML = item.displayValue;
      if (item.key === "Min") {
        priceMin[0].appendChild(option);
      } else if (item.key === "Max") {
        priceMax[0].appendChild(option);
      } else {
        priceMin[0].appendChild(option);
        var optionMax = option.cloneNode(true);
        priceMax[0].appendChild(optionMax);
      }
    });

    // var filterBrand = document.getElementsByClassName("search-brand");
    // brandFilters.values.map((item, key) => {
    //   var inp = document.createElement("input");
    //   inp.value = item.key;
    //   inp.value = item.key;
    //   inp.innerHTML = item.displayValue;
    // });

    var filtercolor = document.getElementsByClassName("color-checkboxes");
    colorFilters.values.map((item, key) => {
      var inp = document.createElement("input");
      var label = document.createElement("label");
      inp.value = item.color;
      inp.className = "color-check";
      label.innerHTML = item.title;
      inp.type = "checkbox";
      var brand = document.createElement("span");
      brand.className = "brands";
      brand.appendChild(inp);
      brand.appendChild(label);

      filtercolor[0].appendChild(brand);
    });
  }
  oReq.onload = processFilters;

  oReq.onerror = reqError;
});

//Filter Colors
var selectedColors = [];
onChangeColorFilter = () => {
  var colors = document.getElementsByClassName("color-check");
  for (var i = 0; i < colors.length; i++) {
    if (colors[i].checked == true) {
      if (selectedColors.indexOf(colors[i].value) === -1) {
        selectedColors.push(colors[i].value);
      }
    }
  }
  filterProducts();
};

//Filter Price
var minPrice = null;
var maxPrice = null;
onChangeMinPriceFilter = () => {
  var minPriceDD = document.getElementsByClassName("price-min-dd");
  minPrice = minPriceDD[0].value;
  filterProducts();
};
onChangeMaxPriceFilter = () => {
  var maxPriceDD = document.getElementsByClassName("price-min-dd");
  maxPrice = maxPriceDD[0].value;
  filterProducts();
};

//Filter Brand
onChangeBrandFilter = () => {
  console.log("am hit!!!");
};

var products = {};
sendDataForFilters = productData => {
  products = productData.products;
};

// var selectedColors = [orange, blue];
var brandFilter = [];

filterProducts = () => {
  console.log(selectedColors, minPrice, maxPrice);
  var filteredList = products.reduce((acc, item) => {
    if (
      selectedColors.indexOf(item.colour.color) > -1 ||
      selectedColors.length < 1
    ) {
      if (brandFilter.indexOf(item.brand) > -1 || brandFilter.length < 1) {
        if (
          (minPrice < item.price.final_price || minPrice === null) &&
          (maxPrice > item.price.final_price || maxPrice === null)
        )
          acc.push(item);
      }
    }
    return acc;
  }, []);
  console.log(filteredList);
  renderProductList(filteredList);
};
