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
  if (typeof updateCartCount === 'function') {
    updateCartCount();
  }
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

function updateCartCount() {
  const el = document.getElementById('cart-count');
  if (el) {
    const cart = getCart();
    el.textContent = cart.length;
    el.style.display = cart.length ? 'flex' : 'none';
  }
}

function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

if (typeof window !== 'undefined') {
  window.getCart = getCart;
  window.addCourse = addCourse;
  window.removeCourse = removeCourse;
  window.getCoursePrice = getCoursePrice;
  window.showToast = showToast;
  window.updateCartCount = updateCartCount;
}
