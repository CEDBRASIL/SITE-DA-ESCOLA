const CART_KEY = 'cart';
const COURSE_PRICE = 59.99;

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addCourse(name) {
  const cart = getCart();
  cart.push(name);
  saveCart(cart);
}

function removeCourse(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
}

if (typeof window !== 'undefined') {
  window.getCart = getCart;
  window.addCourse = addCourse;
  window.removeCourse = removeCourse;
  window.COURSE_PRICE = COURSE_PRICE;
}
