let cart = {};


$.getJSON('goods.json', function (data) {
  // обновляем корзину
  checkCart();
  // рендер товаров в корзину
  showCart();

  function showCart() {

    if( !isEmpty(cart) ) {
      let out = '';
      for (let item in cart) {
        out += `
        <article class="cart-item">
          <figure class="cart-item__img">
            <img src="${data[item].image}" alt="">
          </figure>
          <h2 class="cart-item__name">${data[item].name}</h2>
          <button data-art="${item}" class="minus-count">-</button>
          <p class="cart-item__count">${cart[item]}</p>
          <button data-art="${item}" class="plus-count">+</button>
          <p class="cart-item__descr">${data[item].description}</p>
          <p class="cart-item__cost">Цена: ${data[item].cost}</p>
          <p class="summa">Сумма: ${cart[item] * data[item].cost}</p>
          <button data-art="${item}" class="delete">Удалить</button>
        </article>
      `;
      }
      $('.cart').html(out); // рендерим

      // events
      $('.plus-count').on('click', plusCount);
      $('.minus-count').on('click', minusCount);
      $('.delete').on('click', deleteItem);
    } else {
      $('.cart').html('<p class="mini-cart">Корзина пуста</p>'); // рендерим
    }
  }

  function plusCount() {
    let artikul = $(this).attr('data-art');
    cart[artikul]++;
    showCart();
    localStorage.setItem('cart', JSON.stringify( cart )); // сохраняем в лок
  }

  function minusCount() {
    let artikul = $(this).attr('data-art');
    if( cart[artikul] > 1 ) {
      cart[artikul]--;
    } else {
      delete cart[artikul];
    }
    localStorage.setItem('cart', JSON.stringify( cart )); // сохраняем в лок
    showCart();
  }

  function deleteItem() {
    let artikul = $(this).attr('data-art');
    delete cart[artikul];
    localStorage.setItem('cart', JSON.stringify(cart) ); // сохраняем в лок
    showCart();
  }

});

function checkCart() {
  // проверяю наличие корзины в локальном хранилище
  if (localStorage.getItem('cart') != null) {
    cart = JSON.parse(localStorage.getItem('cart'));
  }
}

function isEmpty(obj) {
  for (let key in obj) {
    return false;
  }
  return true;
}



