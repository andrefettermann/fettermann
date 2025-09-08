
 document.getElementById("formulario").addEventListener("submit", function (e) {
    const campos = document.querySelectorAll("[data-obrigatorio]");
    let campoInvalido = null;

    campos.forEach(function (campo) {
      if (campo.value.trim() === "" && !campoInvalido) {
        campoInvalido = campo;
      }
    });

    if (campoInvalido) {
      e.preventDefault();
      const mensagem = campoInvalido.getAttribute("data-obrigatorio");
      mostrarMensagem(mensagem);
      campoInvalido.focus();
    }
  });

  function mostrarMensagem(texto) {
    const topo = document.getElementById("mensagem-topo");
    const textoMensagem = document.getElementById("texto-mensagem");

    textoMensagem.textContent = texto;
    topo.classList.remove("d-none");

//    setTimeout(() => {
//      topo.classList.add("d-none");
//    }, 5000);
  }

  // Oculta a mensagem ao começar a digitar
  document.querySelectorAll("[data-obrigatorio]").forEach(function (campo) {
    campo.addEventListener("input", function () {
      document.getElementById("mensagem-topo").classList.add("d-none");
    });
  });