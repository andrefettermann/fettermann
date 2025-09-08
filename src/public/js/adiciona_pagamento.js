document.getElementById("adiciona_pagamento").addEventListener("click", adicionaPagamento);

function adicionaPagamento() {
    var content = document.getElementById("pagamentos");
    var total_payments = document.getElementById("total_pagamentos");
    var count = parseInt(total_payments.value) + 1;

    var divPayment = document.createElement("div");
    divPayment.setAttribute("class", "form-group row mb-3");

    //Constroi os elementos da data de pagamento: input
    var divColDateInput = document.createElement("div");
    divColDateInput.setAttribute("class", "col-2");

    var dateInput = document.createElement("input");
    dateInput.id = "data_pagamento_" + (count);
    dateInput.name = dateInput.id;
    dateInput.setAttribute("type", "text");
    dateInput.setAttribute("class", "form-control");
    dateInput.setAttribute("placeholder", "A data do pagamento");
    divColDateInput.appendChild(dateInput);

    divPayment.appendChild(divColDateInput);

    //Constroi os elementos do valor do pagamento: input
    var divColAmountPaidInput = document.createElement("div");
    divColAmountPaidInput.setAttribute("class", "col-2");

    var amountPaidInput = document.createElement("input");
    amountPaidInput.id = "valor_pagamento_" + (count);
    amountPaidInput.name = amountPaidInput.id;
    amountPaidInput.setAttribute("type", "text");
    amountPaidInput.setAttribute("class", "form-control");
    amountPaidInput.setAttribute("placeholder", "O valor pago");
    divColAmountPaidInput.appendChild(amountPaidInput);

    divPayment.appendChild(divColAmountPaidInput);

    //Constroi os elementos da descricao do pagamento: input
    var divColDescriptionInput = document.createElement("div");
    divColDescriptionInput.setAttribute("class", "col-3");

    var descriptionInput = document.createElement("input");
    descriptionInput.id = "descricao_pagamento_" + (count);
    descriptionInput.name = descriptionInput.id;
    descriptionInput.setAttribute("type", "text");
    descriptionInput.setAttribute("class", "form-control");
    descriptionInput.setAttribute("placeholder", "Descrição do pagamento");
    divColDescriptionInput.appendChild(descriptionInput);

    divPayment.appendChild(divColDescriptionInput);

    content.appendChild(divPayment);

    total_payments.value = count;
}


