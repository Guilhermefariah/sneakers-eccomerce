let cartCount = 0
let currentSlide = 0

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

function adminPanel() {
    document.getElementById('admin-panel').classList.toggle('hidden')
}

document.getElementById('add-product-form').addEventListener('submit', (event) => {
    event.preventDefault()

    const name = document.getElementById('product-name').value.trim()
    const price = document.getElementById('product-price').value.trim()
    const description = document.getElementById('product-description').value.trim()
    const category = document.getElementById('product-category').value.trim()

    if (!name || !price || isNaN(price) || price <= 0) {
        alert('Por favor, preencha todos os campos corretamente.')
        return
    }
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

function filterProducts() {
    const category = document.getElementById('category-filter').value
    const priceRange = parseFloat(document.getElementById('price-range').value)
    const searchText = document.getElementById('search-box').value.toLowerCase()

    const products = document.querySelectorAll('.product')

    products.forEach(product => {
        const productCategory = product.getAttribute('data-category')
        const productPrice = parseFloat(product.getAttribute('data-price'))
        const productName = product.getAttribute('data-name').toLowerCase()

        const withinPriceRange = priceRange === '' || productPrice <= priceRange
        const matchesCategory = category === '' || productCategory === category
        const matchesSearch = productName.includes(searchText)

        if (withinPriceRange && matchesCategory && matchesSearch) {
            product.style.display = 'block'
        } else {
            product.style.display = 'none'
        }
    })

    document.getElementById('price-label').textContent = priceRange || 'Sem limite'
}

function sortProducts() {
    const sortOrder = document.getElementById('sort-order').value
    const productList = document.getElementById('product-list')
    const products = Array.from(productList.querySelectorAll('.product'))

    products.sort((a, b) => {
        const priceA = parseFloat(a.getAttribute('data-price'))
        const priceB = parseFloat(b.getAttribute('data-price'))

        if (sortOrder === 'price-asc') {
            return priceA - priceB
        } else if (sortOrder === 'price-desc') {
            return priceB - priceA
        } else {
            return 0
        }
    })

    products.forEach(product => productList.appendChild(product))
}

async function loadProducts() {
    try {
        const response = await fetch('/products.json')
        const products = await response.json()

        const productList = document.getElementById('product-list')
        products.forEach(product => {
            const newProduct = document.createElement('div')
            newProduct.classList.add('product')
            newProduct.setAttribute('data-name', product.name)
            newProduct.setAttribute('data-price', product.price)
            newProduct.setAttribute('data-description', product.description)
            newProduct.setAttribute('data-category', product.category)
            newProduct.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>Preço: R$${product.price}</p>
                <div class="rating">
                    <span>⭐⭐⭐⭐⭐</span>
                    <button onclick="rateProduct(this)">Avaliar</button>
                </div>
                <button onclick="addToCart(this)">Adicionar ao carrinho</button>
                <button onclick="showProductDetails(this)">Ver Detalhes</button>
            `
            productList.appendChild(newProduct)
        })
    } catch (error) {
        console.error('Erro ao carregar produtos:', error)
    }
}

window.onload = loadProducts

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-item')
    if (index >= slides.length) currentSlide = 0
    if (index < 0) currentSlide = slides.length - 1
    
    document.querySelector('.carousel-inner').style.transform = `translateX(-${currentSlide * 100}%)`
}

function prevSlide() {
    showSlide(--currentSlide)
}

function nextSlide() {
    showSlide(++currentSlide)
}

setInterval(nextSlide, 2000)
