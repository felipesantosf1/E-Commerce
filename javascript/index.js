// Carregamento de dados do arquivo JSON
fetch("products.json")

    // Converte a resposta em formato JSON
    .then(response => response.json())
    // Manipula os dados recuperados
    .then(products => {
        // Seleciona o elemento do DOM onde os produtos serão exibidos
        const PRODUCTS = document.querySelector(".grid");

        // Itera sobre cada produto recuperado do arquivo JSON
        products.forEach(product => {

            // Cria um elemento <div> para representar cada produto
            const BOX = document.createElement("div");

            // Adiciona a classe "box" ao elemento <div>
            BOX.classList.add("box");

            // Preenche o conteúdo do elemento <div> com informações do produto
            BOX.innerHTML = `
                <a href="info_produto.html?id=${product.id}">
                    <div class="img_produto">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="info_produto">
                        <h2>${product.name}</h2>
                        <h3>R$${product.price.toFixed(2)}</h3>
                    </div>
                </a>
            `;

            // Adiciona o elemento <div> (representando o produto) ao elemento pai no DOM
            PRODUCTS.appendChild(BOX);
        });
    })
    // Captura e lida com erros no carregamento dos produtos
    .catch(error => console.error("Error loading products", error));


