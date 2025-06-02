/* checkout.js – produção */
const MP_PUBLIC_KEY = "{{ MP_PUBLIC_KEY }}";              // chave pública real
const API_BASE       = "https://api.cedbrasilia.com.br";
const PLAN_URL       = "https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=2c93808496d9dcdf0196f2ff3b5f0b11";

document.addEventListener("DOMContentLoaded", () => {
  fetch(`${API_BASE}/cursos`).then(r => r.json()).then(({ cursos }) => {
    const sel = document.getElementById("cursoSelect");
    sel.innerHTML = "<option value=''>Selecione…</option>";
    Object.keys(cursos).forEach(nome =>
      sel.insertAdjacentHTML("beforeend",
        `<option value="${nome}">${nome}</option>`));
  });

  document.getElementById("formCheckout").addEventListener("submit", e => {
    e.preventDefault();
    fetch(`${API_BASE}/api/pre_matricular`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: e.target.nome.value.trim(),
        whatsapp: e.target.whatsapp.value.trim(),
        email: e.target.email.value.trim(),
        curso: e.target.curso.value
      })
    }).finally(() => window.location.href = PLAN_URL);
  });
});
