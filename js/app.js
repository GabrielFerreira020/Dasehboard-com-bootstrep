import { initRouter } from './router.js';
import { templates } from './templates.js';
import { storage } from './storage.js';

const contentArea = document.getElementById('content-area');

// Renderiza a tela baseada na rota ativa
function renderView(route) {
  const items = storage.getAll();

  if (route === 'dashboard') {
    contentArea.innerHTML = templates.dashboard(items);
  } else if (route === 'novo') {
    contentArea.innerHTML = templates.novo();
    bindFormEvents();
  } else if (route === 'listar') {
    contentArea.innerHTML = templates.listar(items);
    bindListEvents();
  } else {
    window.location.hash = '#/dashboard';
  }
}

// Evento de submissão do formulário
function bindFormEvents() {
  const form = document.getElementById('form-item');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const newItem = {
      titulo: document.getElementById('titulo').value,
      categoria: document.getElementById('categoria').value,
      prioridade: document.getElementById('prioridade').value
    };

    storage.save(newItem);
    
    // Redireciona para a lista após salvar
    window.location.hash = '#/listar';
  });
}

// Evento para exclusão de itens na tabela
function bindListEvents() {
  contentArea.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('.btn-delete');
    if (deleteBtn) {
      const id = deleteBtn.dataset.id;
      if (confirm('Deseja realmente remover este item?')) {
        storage.delete(id);
        renderView('listar'); // Re-renderiza a tabela atualizada
      }
    }
  });
}

// Inicializa a navegação da aplicação
initRouter(renderView);