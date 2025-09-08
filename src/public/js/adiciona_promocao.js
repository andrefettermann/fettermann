document.getElementById("adiciona_promocao").addEventListener("click", adicionaPromocao);

function adicionaPromocao() {
    var content = document.getElementById("promocoes");
    var total_promotions = document.getElementById("total_promocoes");
    var count = parseInt(total_promotions.value) + 1;

    var divPromotion = document.createElement("div");
    divPromotion.setAttribute("class", "form-group row mb-3");

    var divColDateLabel = document.createElement("div");
    divColDateLabel.setAttribute("class", "col-1");

    var dateLabel = document.createElement("label");
    dateLabel.setAttribute("for", "data_promocao_" + (count));
    dateLabel.setAttribute("class", "col-form-label");
    dateLabel.innerText = "Data";
    divColDateLabel.appendChild(dateLabel);

    var divColDateInput = document.createElement("div");
    divColDateInput.setAttribute("class", "col-3");

    var dateInput = document.createElement("input");
    dateInput.id = "data_promocao_" + (count);
    dateInput.name = dateInput.id;
    dateInput.setAttribute("type", "text");
    dateInput.setAttribute("class", "form-control");
    dateInput.setAttribute("placeholder", "A data da promoção");
    divColDateInput.appendChild(dateInput);

    divPromotion.appendChild(divColDateLabel);
    divPromotion.appendChild(divColDateInput);

    var divColRankLabel = document.createElement("div");
    divColRankLabel.setAttribute("class", "col-2");

    var rankLabel = document.createElement("label");
    rankLabel.setAttribute("for", "graduacao_promocao_" + (count));
    rankLabel.setAttribute("class", "col-form-label");
    rankLabel.innerText = "Graduação";
    divColRankLabel.appendChild(rankLabel);

    //Busco as graduacoes carregadas para o campo graduacao atual
    var ranks = document.getElementById("id_graduacao");
    var options = ranks.options;

    var divColRankInput = document.createElement("div");
    divColRankInput.setAttribute("class", "col-3");

    var rankInput = document.createElement("select");
    rankInput.id = "id_graduacao_promocao_" + (count);
    rankInput.name = rankInput.id;
    rankInput.setAttribute("type", "text");
    rankInput.setAttribute("class", "form-select");

    var rankOption;
    for (let i=0; i<ranks.length; i++) {
        rankOption = document.createElement("option");
        rankOption.value = ranks[i].value;
        rankOption.innerText = ranks[i].innerText;
        rankInput.appendChild(rankOption);
    }

    divColRankInput.appendChild(rankInput);

    divPromotion.appendChild(divColRankLabel);
    divPromotion.appendChild(divColRankInput);

    content.appendChild(divPromotion);

    total_promotions.value = count;
}


