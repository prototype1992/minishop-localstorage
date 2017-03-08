let cart = {}; // корзина товаров

$('document').ready(function () {
  // загружаю товары
  loadGood();
  // проверяю наличие товаров в корзине
  checkCart();

  // миникорзина
  showMiniCart();

  // Количество товаров в корзине
  countInCart();

});

function loadGood() {
  // Загружаю товары на страницу

  let productsWrap = $('.products');

  $.getJSON('goods.json', function (data) {
    // console.log(data);
    out = '';
    for( let key in data ) {
      out += '<article class="product">';
      out += '<figure class="product__img"><img src="' + data[key].image + '"></figure>';
      out += '<h2 class="product__name"> ' + data[key].name + ' </h2>';
      out += '<p class="product__descr"> ' + data[key].description + ' </p>';
      out += '<p class="product__cost"> ' + data[key].cost + ' </p>';
      out += '<button class="add-to-cart" data-art="' + key + '">Добавить в корзину</button>';
      out += '</article>';
    }
    productsWrap.html(out);

    $('.add-to-cart').on('click', addToCart);
  });
}

function addToCart() {
  // Добавляем товар в корзину
  let artikul = $(this).attr('data-art'); // получаем атрибут товара
  if( cart[artikul] !== undefined ) {
    cart[artikul]++;
  } else {
    cart[artikul] = 1;
  }
  // записываем массив корзины в локальное хранилище
  localStorage.setItem('cart', JSON.stringify( cart ));
  // обновляю миникорзину
  showMiniCart();
  // Количество товаров в корзине
  countInCart();
}

function checkCart() {
  // проверяю наличие корзины в локальном хранилище
  if( localStorage.getItem('cart') != null ) {
    cart = JSON.parse( localStorage.getItem('cart') );
  }
}

function showMiniCart() {
  // показываю содержимое корзины
  let miniCart = $('.mini-cart');
  let out = '';
  for( let item in cart ) {
    out += item + ' --- ' + cart[item] + '<br>';
  }
  miniCart.html(out);
}

function countInCart() {
  let miniCart = $('.mini-cart');
  let counter = 0;
  for(let item in cart) {
    counter += cart[item];
  }
  miniCart.append('<p>В корзине ' + counter + ' товаров</p>');
  console.log(counter);
}
























