/* sandbox.js – ambiente de teste */
const MP_PUBLIC_KEY = "PUBLIC_KEY_SANDBOX"; // insira sua chave pública sandbox

// const mp = new MercadoPago(MP_PUBLIC_KEY, { locale: 'pt-BR' });

document.addEventListener("DOMContentLoaded", () => {
  fetch("/cursos")
    .then(r => r.json())
    .then(cursos => {
      const select = document.getElementById("cursoSelect");
      select.innerHTML = "<option value=''>Selecione...</option>";
      Object.entries(cursos).forEach(([nome, dados]) => {
        const opt = document.createElement("option");
        opt.value = dados.id || nome;
        opt.textContent = nome;
        select.appendChild(opt);
      });
    })
    .catch(() => alert("Erro ao carregar cursos."));

  const form = document.getElementById("formCheckout");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dados = {
      nome: form.nome.value.trim(),
      whatsapp: form.whatsapp.value.trim(),
      email: form.email.value.trim(),
      cursoId: form.curso.value,
      ambiente: "sandbox"
    };

    try {
      const resp = await fetch("/api/matricular", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
      });
      const json = await resp.json();
      if (json.init_point) {
        window.location.href = json.init_point;
      } else {
        alert("Falha ao iniciar pagamento.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar matrícula.");
    }
  });
});
