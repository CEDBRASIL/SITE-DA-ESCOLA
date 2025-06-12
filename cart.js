const CART_KEY = 'cart';
const COURSE_PRICES = {
  "Excel PRO": 49.90,
  "Design Gráfico": 89.90,
  "Analista e Desenvolvimento de Sistemas": 79.90,
  "Administração": 49.90,
  "Inglês Fluente": 99.90,
  "Inglês Kids": 39.90,
  "Informática Essencial": 49.90,
  "Operador de Micro": 59.90,
  "Especialista em Marketing & Vendas 360º": 149.90,
  "Marketing Digital": 89.90,
  "Pacote Office": 29.99,
};

function getCoursePrice(name) {
  return COURSE_PRICES[name] || 0;
}

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
  window.getCoursePrice = getCoursePrice;
}
