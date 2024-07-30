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

function rateProduct(button) {
    const product = button.closest('.product')
    const rating = prompt('Qual a sua avaliação (1 a 5 estrelas)?')
    
    if (rating >= 1 && rating <= 5) {
        button.previousElementSibling.textContent = '⭐'.repeat(rating) + '⭐'.repeat(5 - rating)
        alert('Obrigado pela sua avaliação!')
    } else {
        alert('Por favor, insira uma avaliação válida entre 1 e 5.')
    }
}

document.getElementById('admin-btn').addEventListener('click', () => {
    document.getElementById('admin-panel').classList.toggle('hidden')
})

function toggleAdminPanel() {
    document.getElementById('admin-panel').classList.toggle('hidden')
}

document.getElementById('add-product-form').addEventListener('submit', (event) => {
    event.preventDefault()

    const name = document.getElementById('product-name').value
    const price = document.getElementById('product-price').value
    const description = document.getElementById('product-description').value
    const category = document.getElementById('product-category').value

    const productList = document.getElementById('product-list')
    const newProduct = document.createElement('div')
    newProduct.classList.add('product')
    newProduct.setAttribute('data-name', name)
    newProduct.setAttribute('data-price', price)
    newProduct.setAttribute('data-description', description)
    newProduct.setAttribute('data-category', category)
    newProduct.innerHTML = `
        <img src="https://via.placeholder.com/150" alt="${name}">
        <h2>${name}</h2>
        <p>Preço: R$${price}</p>
        <div class="rating">
            <span>⭐⭐⭐⭐⭐</span>
            <button onclick="rateProduct(this)">Avaliar</button>
        </div>
        <button onclick="addToCart(this)">Adicionar ao carrinho</button>
        <button onclick="showProductDetails(this)">Ver Detalhes</button>
    `
    productList.appendChild(newProduct)

    document.getElementById('product-name').value = ''
    document.getElementById('product-price').value = ''
    document.getElementById('product-description').value = ''
    document.getElementById('product-category').value = ''
})

function filterProducts(select) {
    const category = select.value
    const products = document.querySelectorAll('.product')
    
    products.forEach(product => {
        if (category === '' || product.getAttribute('data-category') === category) {
            product.style.display = 'block'
        } else {
            product.style.display = 'none'
        }
    })
}
