/*Get the product page url*/
let productUrl = document.URL;

/*Get the product name*/
let productTitle = document.title;

if(productUrl != "" && productUrl.indexOf("http://www.imvu.com/shop/product.php?products_id=") != -1) {
  /*Get the product icon url*/
  let imgUrl = document.getElementById("product-image").src;

  /*Generate the BBCode and alert it to the user for copying*/
  window.prompt ("HTML Code:","<a href='" + productUrl + "' target='_blank' title='" + productTitle + "'><img src='" + imgUrl + "'/></a>");
}
