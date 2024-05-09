const urlParams = new URLSearchParams(window.location.search);//Pegando o id da outra pg
const productId = parseInt(urlParams.get('id'));//transformando o id

fetch('products.json') // Pegando informações do json
    .then(response => response.json())
    .then(products => {
        const product = products.find(p => p.id === productId);
        if (product) { // Forma dos Produtos
            const productDetails = document.getElementById('product-details');
            productDetails.innerHTML = `
            <div class="img-product">
                <img id="image" src="${product.image}" alt="${product.name}">
            </div>
            <div class="info_text">
                <h1 id="name">${product.name}.</h1>
                <h4>${product.description}</h4>
            </div>
        
            <div class="info_valor">
                <div class="valor">
                    <h1>R$${product.cart.toFixed(2)}</h1>
                    <h3>no Pix</h3>
                    <p id="price"><i class="fa-regular fa-credit-card"></i> R$${product.price.toFixed(2)} em até x10.</p>
                </div>
                <div class="input_qtd">
                    <i id="plus" class="fa-solid fa-plus"></i>
                    <input id="input_qtd" type="number" value="${product.quantity}">
                    <i id="minus" class="fa-solid fa-minus"></i>
                </div>
                <div class="btn_valor">
                    <button>COMPRAR</button>
                    <button id="add_cart">ADICIONAR AO CARRINHO</button>
                </div>
            </div>
            `;

            // Seleciona os elementos HTML relacionados à manipulação da quantidade
            const PLUS_BTN = document.querySelector("#plus");
            const INPUT_QUANTIDADE = document.querySelector("#input_qtd");
            const MINUS_BTN = document.querySelector("#minus");

            // Adiciona um event listener para o botão de aumento da quantidade
            if (PLUS_BTN) {
                PLUS_BTN.addEventListener("click", () => {
                    // Incrementa a quantidade do produto em 1
                    product.quantity++;
                    // Atualiza o valor do input da quantidade com a nova quantidade
                    INPUT_QUANTIDADE.value = product.quantity;
                    // Exibe a nova quantidade no console (opcional, para fins de depuração)
                    console.log(product.quantity);
                });
            }
            // Adiciona um event listener para o botão de diminuição da quantidade
            if (MINUS_BTN) {
                MINUS_BTN.addEventListener("click", () => {
                    // Verifica se a quantidade do produto é maior que 1 antes de diminuir
                    if (product.quantity > 1) {
                        // Decrementa a quantidade do produto em 1
                        product.quantity--;
                        // Atualiza o valor do input da quantidade com a nova quantidade
                        INPUT_QUANTIDADE.value = product.quantity;
                        console.log(product.quantity);
                    }
                });
            }


            //Mandando o Produto para o carrinho
            const ADD_CART = document.querySelector("#add_cart")
            if (ADD_CART) {
                ADD_CART.addEventListener('click', () => {
                    let carrinhoCompras = JSON.parse(localStorage.getItem('carrinhoCompras')) || [];
                    carrinhoCompras.push({name:product.name, price:product.price, image:product.image, quantity:product.quantity})
                    localStorage.setItem("carrinhoCompras", JSON.stringify(carrinhoCompras))
                    alert(`${product.name} foi adicionado com o preço de R$${product.price.toFixed(2)} na quantidade: ${product.quantity}`)
                })
            }

        } else {
            console.error("Product not found");
        }
    })
    .catch(error => {console.error('Erro ao carregar os detalhes do produto:', error);});











