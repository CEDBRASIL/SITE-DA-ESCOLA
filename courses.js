document.addEventListener('DOMContentLoaded', async () => {
  const courseList = document.getElementById('course-list');
  if (!courseList) return;

  const descriptions = {
    'Excel PRO': 'Domine planilhas e crie relat\u00f3rios avan\u00e7ados para impulsionar sua produtividade.',
    'Design Gr\u00e1fico': 'Aprenda t\u00e9cnicas profissionais de cria\u00e7\u00e3o visual e destaque-se no mercado.',
    'Analista e Desenvolvimento de Sistemas': 'Forma\u00e7\u00e3o completa para quem deseja programar e projetar sistemas de alta qualidade.',
    'Administra\u00e7\u00e3o': 'Construa habilidades essenciais para gerenciar neg\u00f3cios com efici\u00eancia.',
    'Ingl\u00eas Fluente': 'Alcance a flu\u00eancia no idioma mais requisitado pelo mercado de trabalho.',
    'Ingl\u00eas Kids': 'Aulas divertidas e interativas para crian\u00e7as aprenderem ingl\u00eas brincando.',
    'Inform\u00e1tica Essencial': 'Conhecimentos fundamentais de inform\u00e1tica para o dia a dia.',
    'Operador de Micro': 'Tudo sobre operacionaliza\u00e7\u00e3o de computadores e pacote office.',
    'Especialista em Marketing & Vendas 360\u00ba': 'Estrat\u00e9gias de marketing e vendas para alavancar qualquer neg\u00f3cio.',
    'Marketing Digital': 'Domine as principais ferramentas de divulga\u00e7\u00e3o online.',
    'Pacote Office': 'Aprenda Word, Excel, PowerPoint e muito mais para o mercado.'
  };

  const slugify = (str) => {
    return str.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '');
  };

  try {
    const res = await fetch('https://api.cedbrasilia.com.br/cursos');
    const data = await res.json();
    const cursos = data.cursos || {};

    Object.keys(cursos).forEach(name => {
      if (name === 'None') return;
      const slug = slugify(name);
      const desc = descriptions[name] || 'Curso profissionalizante do CED BRASIL.';
      const card = document.createElement('div');
      card.className = 'card p-6 flex flex-col justify-between';
      const priceVal = getCoursePrice(name);
      const price = `R$ ${priceVal.toFixed(2).replace('.', ',')}`;
      card.innerHTML = `
        <div>
          <h3 class="text-xl font-bold mb-2">${name}</h3>
          <p class="text-gray-400 mb-4">${desc}</p>
          <p class="text-gray-400 mb-4">Valor: ${price}</p>
        </div>
        <div class="flex gap-2 mt-auto">
          <a href="${slug}.html" class="button-glow bg-spotify-green text-black font-bold px-4 py-2 rounded">Detalhes</a>
          <button class="add-cart button-glow bg-blue-600 text-white font-bold px-4 py-2 rounded" data-name="${name}">Adicionar ao Carrinho</button>
        </div>
      `;
      const addBtn = card.querySelector('.add-cart');
      addBtn.addEventListener('click', () => {
        addCourse(name);
        alert('Curso adicionado ao carrinho!');
      });
      courseList.appendChild(card);
    });
  } catch (err) {
    courseList.innerHTML = '<p class="text-gray-400">Erro ao carregar cursos.</p>';
  }
});
