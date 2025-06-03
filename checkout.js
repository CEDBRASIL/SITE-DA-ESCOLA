/* checkout.js – produção */
const API_BASE = "https://api.cedbrasilia.com.br";
// O MP_SUBSCRIPTION_PLAN_URL agora será obtido dinamicamente do backend.
// const MP_SUBSCRIPTION_PLAN_URL = "https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=SEU_PREAPPROVAL_PLAN_ID_DE_SANDBOX_AQUI";

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
    
    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true; // Desabilita o botão para evitar cliques múltiplos

    const formData = new FormData(e.target);
    const studentData = {
      nome: formData.get('nome').trim(),
      whatsapp: formData.get('whatsapp').trim(),
      email: formData.get('email').trim(),
      cursos: [formData.get('curso')] // Assume que 'curso' é o nome do campo select
    };

    // Chamada para o novo endpoint que inicia a assinatura e retorna o preapproval_id
    fetch(`${API_BASE}/api/initiate-subscription`, { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(studentData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === "ok" && data.redirect_url && data.preapproval_id) {
        // AQUI: Exibe o preapproval_id antes de redirecionar
        console.log("PREAPPROVAL ID GERADO (PRODUÇÃO):", data.preapproval_id);
        alert("PREAPPROVAL ID GERADO (PRODUÇÃO): " + data.preapproval_id + "\nRedirecionando para o Mercado Pago...");
        
        window.location.href = data.redirect_url; // Redireciona para a URL do Mercado Pago
      } else {
        console.error("Erro ao iniciar assinatura:", data.message || data.detail);
        alert("Erro ao iniciar assinatura: " + (data.message || data.detail || "Erro desconhecido."));
        submitButton.disabled = false; // Reabilita o botão em caso de erro
      }
    })
    .catch(error => {
      console.error("Erro na requisição de iniciar assinatura:", error);
      alert("Erro de conexão. Por favor, tente novamente.");
      submitButton.disabled = false; // Reabilita o botão em caso de erro
    });
  });
});
