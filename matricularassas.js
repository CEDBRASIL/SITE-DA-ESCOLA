// Script for matricularassas.html

// Reuses validation and masking logic from assinatura page

function applyWhatsappMask(value) {
  value = value.replace(/\D/g, "");
  if (value.length > 0) {
    value = "(" + value;
    if (value.length > 3) {
      value = value.substring(0, 3) + ") " + value.substring(3);
    }
    if (value.length > 10) {
      value = value.substring(0, 10) + "-" + value.substring(10, 15);
    } else if (value.length > 9) {
      value = value.substring(0, 9) + "-" + value.substring(9);
    }
  }
  return value;
}

function applyCPFMask(value) {
  value = value.replace(/\D/g, "").slice(0, 11);
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return value;
}

function validateField(inputElement) {
  if (inputElement.checkValidity()) {
    inputElement.classList.remove('is-invalid');
    inputElement.classList.add('is-valid');
  } else {
    inputElement.classList.remove('is-valid');
    inputElement.classList.add('is-invalid');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('enrollmentForm');
  const nomeInput = document.getElementById('nome');
  const cpfInput = document.getElementById('cpf');
  const phoneInput = document.getElementById('phone');
  const formMessage = document.getElementById('form-message');
  const submitButton = document.getElementById('submitButton');

  nomeInput.addEventListener('input', () => validateField(nomeInput));
  cpfInput.addEventListener('input', (e) => {
    e.target.value = applyCPFMask(e.target.value);
    validateField(cpfInput);
  });
  cpfInput.addEventListener('blur', () => validateField(cpfInput));

  phoneInput.addEventListener('input', (e) => {
    e.target.value = applyWhatsappMask(e.target.value);
    validateField(phoneInput);
  });
  phoneInput.addEventListener('blur', () => validateField(phoneInput));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    validateField(nomeInput);
    validateField(cpfInput);
    validateField(phoneInput);
    if (!form.checkValidity()) {
      formMessage.textContent = 'Por favor, corrija os campos destacados.';
      formMessage.className = 'text-center error-message';
      return;
    }

    const nome = nomeInput.value.trim();
    const cpf = cpfInput.value.replace(/\D/g, '').slice(0,11);
    const phone = phoneInput.value.replace(/\D/g, '');

    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    formMessage.textContent = 'Enviando seus dados...';
    formMessage.className = 'text-center loading-message';

    try {
      const res = await fetch('https://api.cedbrasilia.com.br/matricularasaas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, cpf, phone })
      });
      if (!res.ok) throw new Error('Falha ao conectar');
      window.location.href = 'https://www.asaas.com/c/dnbrk5s1xcf5zo1q';
    } catch (err) {
      formMessage.textContent = err.message;
      formMessage.className = 'text-center error-message';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Pagar e Matricular';
    }
  });
});
