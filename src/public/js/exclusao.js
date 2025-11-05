document.addEventListener('DOMContentLoaded', function() {
    // Delega eventos para a lista
    const lista = document.getElementById('lista');
    
    if (lista) {
      lista.addEventListener('click', function(e) {
        const target = e.target;
        const action = target.getAttribute('data-action');
        var id = target.getAttribute('data-id');
        const id_cobranca = target.getAttribute('data-cobranca-id') || null;
        
        if (!action || !id) return;

        e.preventDefault();
        
        switch(action) {
          case 'show-confirm':
            showConfirm(id, target);
            break;
          case 'hide-confirm':
            hideConfirm(id);
            break;
          case 'confirm-delete':
            confirmDelete(id);
            break;
          case 'confirm-delete-pagamento':
            confirmDeletePagamento(id_cobranca, id);
            break;
        }
      });
    }
  });
  
  function showMessage(message, type) {
    // Remove mensagem anterior se existir
    const mensagemAntiga = document.getElementById('mensagem-topo');
    if (mensagemAntiga) {
      mensagemAntiga.remove();
    }
    
    // Cria nova mensagem
    const alertDiv = document.createElement('div');
    alertDiv.id = 'mensagem-topo';
    alertDiv.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible`;
    alertDiv.innerHTML = `
      <span id="texto-mensagem">${message}</span>
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Insere no topo da lista
    const colDiv = document.querySelector('.col-12');
    const lista = document.getElementById('lista');
    colDiv.insertBefore(alertDiv, lista);
    
    // Remove automaticamente após 5 segundos
    /*
    setTimeout(() => {
      if (alertDiv.parentElement) {
        alertDiv.remove();
      }
    }, 5000);
    */
  }
  
  function showConfirm(id, linkElement) {
    // Esconde o link "Excluir"
    linkElement.style.display = 'none';
    
    // Mostra a seção de confirmação
    document.getElementById('confirm-' + id).classList.add('active');
  }
  
  function hideConfirm(id) {
    // Esconde a seção de confirmação
    const confirmSection = document.getElementById('confirm-' + id);
    confirmSection.classList.remove('active');
    
    // Mostra novamente o link "Excluir"
    const item = document.querySelector('.list-group-item[data-id="' + id + '"]');
    const deleteLink = item.querySelector('.delete-link[data-id="' + id + '"]');
    deleteLink.style.display = 'inline';
  }
  
  async function confirmDelete(id) {
    try {
      const response = await fetch('/graduacoes/exclui/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const data = await response.json();
  
      if (response.ok && data.success) {
        // Mostra mensagem de sucesso
        showMessage(data.message || 'Graduação excluída com sucesso!', 'success');
        
        // Remove o item da página com animação
        const item = document.querySelector('.list-group-item[data-id="' + id + '"]');
        item.style.opacity = '0';
        item.style.transition = 'opacity 0.3s';
        
        setTimeout(() => {
          item.remove();
          
          // Atualiza o contador de graduações
          const lista = document.getElementById('lista');
          const total = lista.querySelectorAll('.list-group-item').length;
          const cardHeader = document.querySelector('.card-header');
          cardHeader.textContent = total + ' graduação(ões) encontrada(s)';
          
          // Se não houver mais itens, mostra mensagem
          if (total === 0) {
            lista.innerHTML = '<li class="list-group-item text-center text-muted">Nenhuma graduação cadastrada</li>';
          }
        }, 300);
      } else {
        // Mostra mensagem de erro
        showMessage(data.message || 'Erro ao excluir a graduação', 'error');
        hideConfirm(id);
      }
    } catch (error) {
      showMessage('Erro ao excluir a graduação', 'error');
      hideConfirm(id);
    }
  }

    async function confirmDeletePagamento(id_cobranca, id_pagamento) {
    try {
      const response = await fetch('/cobrancas/pagamento/exclui/' + id_cobranca + '/' + id_pagamento, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const data = await response.json();
  
      if (response.ok && data.success) {
        // Mostra mensagem de sucesso
        showMessage(data.message || 'Pagamento excluído com sucesso!', 'success');
        
        // Remove o item da página com animação
        const item = document.querySelector('.list-group-item[data-id="' + id_pagamento + '"]');
        item.style.opacity = '0';
        item.style.transition = 'opacity 0.3s';
        
        setTimeout(() => {
          item.remove();
          
          // Atualiza o contador de graduações
          /*
          const lista = document.getElementById('lista');
          const total = lista.querySelectorAll('.list-group-item').length;
          const cardHeader = document.querySelector('.card-header');
          cardHeader.textContent = total + ' pagamento(s) encontrado(s)';
          
          // Se não houver mais itens, mostra mensagem
          if (total === 0) {
            lista.innerHTML = '<li class="list-group-item text-center text-muted">Nenhuma pagamento cadastrado</li>';
          }
          */
        }, 300);
      } else {
        // Mostra mensagem de erro
        showMessage(data.message || 'Erro ao excluir o pagamento', 'error');
        hideConfirm(id_cobranca);
      }
    } catch (error) {
      showMessage('Erro ao excluir o pagamento', 'error');
      hideConfirm(id_cobranca);
    }
  }