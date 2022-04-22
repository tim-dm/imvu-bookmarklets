/*Get the product page url*/
let productUrl = document.URL;

if(productUrl != "" && productUrl.indexOf("imvu.com/shop/product.php?products_id=") != -1) {
  /*Get the product icon url*/
  let imgUrl = document.getElementById("product-image").src;

  /*Generate the BBCode and alert it to the user for copying*/
  window.prompt ("BBCode:","[url=" + productUrl + "][img]" + imgUrl +"[/img][/url]");
}
