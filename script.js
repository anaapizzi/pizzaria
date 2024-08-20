document.addEventListener('DOMContentLoaded', () => {
    const pizzas = [
        { id: 1, titulo: 'Pizza Calabresa', preco: 39.99, imagem: 'https://static.baratocoletivo.com.br/2019/0109/oferta_15470592312068_OFERTA_pizza8fatias.jpg', categoria: 'Calabresa' },
        { id: 2, titulo: 'Pizza Marguerita', preco: 45.90, imagem: 'https://www.donguilherme.com.br/assets/userfiles/archives/6405dff0d4d8d.jpg', categoria: 'Marguerita' },
        { id: 3, titulo: 'Pizza Frango com Catupiry', preco: 50.00, imagem: 'https://bonissima.com.br/web/image/product.template/34332/image_1024?unique=917ec29', categoria: 'Frango' },
        { id: 4, titulo: 'Pizza Vegetariana', preco: 52.90, imagem: 'https://jetitaliandeli.com/cdn/shop/files/pizveg.jpg?v=1698734461', categoria: 'Vegetariana' },
        { id: 5, titulo: 'Pizza Portuguesa', preco: 39.99, imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkJKVUmuVJWpKtXJpIec1Wtsa_BGok3dVUoA&s', categoria: 'Portuguesa' },
        { id: 6, titulo: 'Pizza Peperoni', preco: 55.00, imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtcRSJRcJjs4OPbWdmAGjWCr6PY3qTNMKuiejVmU_jqvj8rR7x3fnl3w4rm1N9LdGbBd8&usqp=CAU', categoria: 'Peperoni' },
        { id: 7, titulo: 'Pizza Quatro Queijos', preco: 39.99, imagem: 'https://redefoodservice.com.br/wp-content/uploads/2023/07/Pizza-Quatro-Queijos.jpg', categoria: 'Quatro Queijos' }
    ];

    const formatarPreco = (preco) => preco.toFixed(2);

    const searchInput = document.getElementById('searchInput');
    const categoryButtons = document.querySelectorAll('.category-filters button');
    const pizzasList = document.getElementById('pizzasList');
    const cartItems = document.getElementById('cartItems');
    const totalElement = document.querySelector('.total h2');

    let shoppingCart = [];
    let categoriaSelecionada = 'Todos';
    let pesquisa = '';

    const renderPizzas = () => {
        pizzasList.innerHTML = pizzas
            .filter(pizza => 
                (categoriaSelecionada === 'Todos' || pizza.categoria === categoriaSelecionada) &&
                pizza.titulo.toLowerCase().includes(pesquisa.toLowerCase())
            )
            .map(pizza => `
                <li>
                    <img src="${pizza.imagem}" alt="${pizza.titulo}" />
                    <p>${pizza.titulo}</p>
                    <p>R$ ${formatarPreco(pizza.preco)}</p>
                    <button onclick="adicionarAoCarrinho(${pizza.id})">Adicionar</button>
                </li>
            `).join('');
    };

    const renderCarrinho = () => {
        cartItems.innerHTML = shoppingCart.map(item => `
            <li>
                <p>Produto: ${item.produto.titulo}</p>
                <p>Preço: R$ ${formatarPreco(item.produto.preco)}</p>
                <p>Quantidade: ${item.quantidade}</p>
                <p>Total: R$ ${formatarPreco(item.quantidade * item.produto.preco)}</p>
                <button onclick="removerDoCarrinho(${item.produto.id})">Remover</button>
            </li>
        `).join('');

        totalElement.textContent = `Total: R$ ${formatarPreco(calcularTotal())}`;
    };

    const calcularTotal = () => {
        return shoppingCart.reduce((total, item) => total + (item.quantidade * item.produto.preco), 0);
    };

    window.adicionarAoCarrinho = (id) => {
        const pizza = pizzas.find(p => p.id === id);
        if (pizza) {
            const itemIndex = shoppingCart.findIndex(item => item.produto.id === id);
            if (itemIndex > -1) {
                shoppingCart[itemIndex].quantidade += 1;
            } else {
                shoppingCart.push({ produto: pizza, quantidade: 1 });
            }
            renderCarrinho();
        }
    };

    window.removerDoCarrinho = (id) => {
        const itemIndex = shoppingCart.findIndex(item => item.produto.id === id);
        if (itemIndex > -1) {
            if (shoppingCart[itemIndex].quantidade > 1) {
                shoppingCart[itemIndex].quantidade -= 1;
            } else {
                shoppingCart.splice(itemIndex, 1);
            }
            renderCarrinho();
        }
    };

    searchInput.addEventListener('input', (e) => {
        pesquisa = e.target.value;
        renderPizzas();
    });

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            categoriaSelecionada = button.getAttribute('data-category');
            renderPizzas();
        });
    });

    renderPizzas();
});
