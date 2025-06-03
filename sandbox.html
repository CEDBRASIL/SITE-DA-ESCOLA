/* checkout.js – produção */
const API_BASE = "https://api.cedbrasilia.com.br";
// Link de assinatura fixo do Mercado Pago
const MP_SUBSCRIPTION_PLAN_URL = "https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=2c93808496d9dcdf0196f2ff3b5f0b11";

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

    // Primeiro, armazena os dados do aluno no backend para que o webhook possa recuperá-los
    fetch(`${API_BASE}/sandbox/store-student-data`, { // Chama o novo endpoint de armazenamento
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(studentData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === "ok" && data.external_reference) {
        // Se os dados foram armazenados com sucesso, redireciona para o link da assinatura
        const redirectUrl = `${MP_SUBSCRIPTION_PLAN_URL}&external_reference=${data.external_reference}`;
        console.log("Redirecionando para:", redirectUrl);
        window.location.href = redirectUrl; 
      } else {
        console.error("Erro ao armazenar dados do aluno:", data.message || data.detail);
        alert("Erro ao iniciar assinatura: " + (data.message || data.detail || "Erro desconhecido."));
        submitButton.disabled = false; // Reabilita o botão em caso de erro
      }
    })
    .catch(error => {
      console.error("Erro na requisição de armazenamento de dados:", error);
      alert("Erro de conexão. Por favor, tente novamente.");
      submitButton.disabled = false; // Reabilita o botão em caso de erro
    });
  });
});
