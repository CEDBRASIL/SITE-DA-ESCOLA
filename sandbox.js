/* sandbox.js – ambiente de teste (chave pública sandbox) */
const MP_PUBLIC_KEY = "{{ MP_PUBLIC_KEY }}";   // Render injeta o valor de MP_PUBLIC_KEY aqui
const API_BASE       = "https://api.cedbrasilia.com.br";    //  ← domínio do BACKEND (API)

/* ── Carregar cursos ───────────────────────── */
fetch(`${API_BASE}/cursos`)
  .then(res => res.json())
  .then(data => {
    const select = document.getElementById("cursoSelect");
    select.innerHTML = "<option value=''>Selecione…</option>";

    // data.cursos é um objeto: { "Nome": [ids] }
    if (data.cursos && typeof data.cursos === "object") {
      Object.entries(data.cursos).forEach(([nome, ids]) => {
        const opt = document.createElement("option");
        opt.value = nome;         // ou ids[0] se quiser guardar primeiro ID
        opt.textContent = nome;
        select.appendChild(opt);
      });
    } else {
      alert("Formato inesperado de /cursos.");
    }
  })
  .catch(() => alert("Erro ao carregar cursos."));


  /* ── Enviar formulário ────────────────────── */
  const form = document.getElementById("formCheckout");
  form.addEventListener("submit", async e => {
    e.preventDefault();

    const payload = {
      nome:      form.nome.value.trim(),
      whatsapp:  form.whatsapp.value.trim(),
      email:     form.email.value.trim(),
      cursoId:   form.curso.value,
      ambiente:  "sandbox"
    };

    try {
      const resp  = await fetch(`${API_BASE}/api/matricular`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const json = await resp.json();
      if (json.init_point) {
        window.location.href = json.init_point;      // redireciona ao checkout MP (sandbox)
      } else {
        alert("Falha ao iniciar pagamento.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar matrícula.");
    }
  });

