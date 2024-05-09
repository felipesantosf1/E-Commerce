// Seleção de Elementos do DOM
const LIST_CART = document.querySelector(".tbody_container");
const SUB_TOTAL = document.querySelector("#sub_total")
const FRETE_VALUE_H4 = document.querySelector("#frete_value")
const BTN_FRETE = document.querySelector("#btn_frete")
const FRETE_INPUT = document.querySelector("#frete_input")
const VALOR_TOTAL = document.querySelector("#TOTAL")

// Recuperação do Carrinho de Compras do Local Storage
const CARRINHO_COMPRAS = JSON.parse(localStorage.getItem('carrinhoCompras')) || [];

// Variáveis para cálculo do preço total e do frete
let preçoTotal = 0;
let frete = 20.00;

// Iteração sobre os Produtos do Carrinho
CARRINHO_COMPRAS.forEach((product, index) => {
    // Criação da estrutura HTML para cada item do carrinho
    const itemLista = document.createElement("tr");
    itemLista.innerHTML = `
        <td class="iten_list">
            <div class="tbody-info">
                <img src="${product.image}" alt="${product.name}">
                <strong>${product.name}.</strong> 
            </div>
        </td>
        <td class="iten_list">
            <h2>R$${product.price.toFixed(2)}</h2>
        </td>
        <td class="iten_list">
            <div class="container-input">
                <div class="input-number">
                    <i class="fa-solid fa-plus"></i>
                    <input type="number" value="${product.quantity}" class="qtd-tbody">
                    <i class="fa-solid fa-minus"></i>
                </div>
            </div>
        </td>
        <td class="iten_list">
            <i class="fa-solid fa-trash btn_remove" data-index="${index}"></i>
        </td>
    `;

    // Adiciona o item à lista no carrinho
    LIST_CART.appendChild(itemLista);

    // Comando Total
    preçoTotal += product.price 
    
    // Comando do botão de QUANTIDADE
    const PLUS_BTN = itemLista.querySelector(".fa-plus");
    const INPUT_QUANTIDADE = itemLista.querySelector(".qtd-tbody");
    const MINUS_BTN = itemLista.querySelector(".fa-minus");
    
    PLUS_BTN.addEventListener('click', () => {
        product.quantity++;
        INPUT_QUANTIDADE.value = product.quantity;
        atualizarsubTotal();
    });
    MINUS_BTN.addEventListener('click', () => {
        if (product.quantity > 1) {
            product.quantity--;
            INPUT_QUANTIDADE.value = product.quantity;
            atualizarsubTotal();
        }
    });
});

// Total da Compra junto do frete
BTN_FRETE.addEventListener('click', () => {
    frete_txt = FRETE_INPUT.value;
    // Cálculo do total da compra com o frete
    /* Total = preçoTotal + frete
    FRETE_VALUE_H4.textContent = `R$${frete.toFixed(2)}`
    VALOR_TOTAL.textContent = `R$${Total.toFixed(2)}` */
});

// Atualização do Subtotal
function atualizarsubTotal() {
    preçoTotal = 0;
    CARRINHO_COMPRAS.forEach(product => {
        preçoTotal += product.price * product.quantity;
    });
    SUB_TOTAL.textContent = `R$${preçoTotal.toFixed(2)}`;
}

atualizarsubTotal();

// Remoção de Item do Carrinho
const btnRemovedores = document.querySelectorAll(".btn_remove");
btnRemovedores.forEach(btnRemovedor => {
    btnRemovedor.addEventListener('click', () => {
        const index = parseInt(btnRemovedor.getAttribute('data-index'));
        const carrinhoCompras = JSON.parse(localStorage.getItem('carrinhoCompras')) || [];
        carrinhoCompras.splice(index, 1);
        localStorage.setItem('carrinhoCompras', JSON.stringify(carrinhoCompras));
        window.location.reload();
    });
});


