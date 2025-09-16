document.getElementById("adiciona_tecnica").addEventListener("click", adicionaTecnica);

function adicionaTecnica() {
    var content = document.getElementById("tecnicas");
    var total_tecnicas = document.getElementById("total_tecnicas");
    var count = parseInt(total_tecnicas.value) + 1;

    var divTecnica = document.createElement("div");
    divTecnica.setAttribute("class", "form-group row mb-3");

    var divColTecnicaLabel = document.createElement("div");
    divColTecnicaLabel.setAttribute("class", "col-1");

    var tecnicaLabel = document.createElement("label");
    tecnicaLabel.setAttribute("for", "nome_" + (count));
    tecnicaLabel.setAttribute("class", "col-form-label");
    tecnicaLabel.innerText = "Nome";
    divColTecnicaLabel.appendChild(tecnicaLabel);

    var divColTecnicaInput = document.createElement("div");
    divColTecnicaInput.setAttribute("class", "col-9");

    var tecnicaInput = document.createElement("input");
    tecnicaInput.id = "nome_" + (count);
    tecnicaInput.name = tecnicaInput.id;
    tecnicaInput.setAttribute("type", "text");
    tecnicaInput.setAttribute("class", "form-control");
    tecnicaInput.setAttribute("placeholder", "O nome da tecnica");
    divColTecnicaInput.appendChild(tecnicaInput);

    divTecnica.appendChild(divColTecnicaLabel);
    divTecnica.appendChild(divColTecnicaInput);

    content.appendChild(divTecnica);

    total_tecnicas.value = count;
}


