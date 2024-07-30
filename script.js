let cartCount = 0;

function addToCart(button) {
    const product = button.closest('.product');
    const productName = product.getAttribute('data-name');
    const productPrice = product.getAttribute('data-price');

    cartCount++;
    document.getElementById('cart-count').textContent = cartCount;

    alert(`Produto adicionado ao carrinho:\nNome: ${productName}\nPreço: R$${productPrice}`);
}

function showProductDetails(button) {
    const product = button.closest('.product');
    const productName = product.getAttribute('data-name');
    const productPrice = product.getAttribute('data-price');
    const productDescription = product.getAttribute('data-description') || 'Nenhuma descrição disponível.';

    alert(`Detalhes do Produto:\nNome: ${productName}\nPreço: R$${productPrice}\nDescrição: ${productDescription}`);
}
