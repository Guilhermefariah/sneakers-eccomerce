let cartCount = 0

function addToCart(button) {
    const product = button.closest('.product')
    const productName = product.getAttribute('data-name')
    const productPrice = product.getAttribute('data-price')

    cartCount++
    document.getElementById('cart-count').textContent = cartCount

    alert(`Produto adicionado ao carrinho:\nNome: ${productName}\nPreço: R$${productPrice}`)
}

function showProductDetails(button) {
    const product = button.closest('.product')
    const productName = product.getAttribute('data-name')
    const productPrice = product.getAttribute('data-price')
    const productDescription = product.getAttribute('data-description') || 'Nenhuma descrição disponível.'

    alert(`Detalhes do Produto:\nNome: ${productName}\nPreço: R$${productPrice}\nDescrição: ${productDescription}`)
}

document.getElementById('admin-btn').addEventListener('click', function() {
    document.getElementById('admin-panel').classList.toggle('hidden')
})

document.getElementById('add-product-form').addEventListener('submit', function(event) {
    event.preventDefault()

    const name = document.getElementById('product-name').value
    const price = document.getElementById('product-price').value
    const description = document.getElementById('product-description').value

    addProductToList(name, price, description)

    document.getElementById('add-product-form').reset()
})

function addProductToList(name, price, description) {
    const productList = document.getElementById('product-list')
    const productManagement = document.getElementById('product-management')

    const productDiv = document.createElement('div')
    productDiv.className = 'product-item'
    productDiv.innerHTML = `
        <h4>${name}</h4>
        <p>Preço: R$${price}</p>
        <p>${description}</p>
        <button onclick="removeProduct(this)">Remover</button>
    `

    productManagement.appendChild(productDiv)
}

function removeProduct(button) {
    const productItem = button.closest('.product-item')
    productItem.remove()
}
