function createProductImage(product) {
    const image = document.createElement('img')
    image.src   = product.img
    image.alt   = `Imagem ${product.nome}`
    image.classList.add('product_image')
    return image
}

function createProductName(product) {
    const name     = document.createElement('h3')
    name.innerText = product.nome
    name.classList.add('product_name')
    return name
}

function createProductSection(product) {
    const section     = document.createElement('p')
    section.innerText = product.secao
    section.classList.add('product_section')
    return section
}

function createListNutrients(produto) {
    const nutrientsAll  = produto.componentes
    const listNutrients = document.createElement('ol')
    listNutrients.id    = 'listNutrients'

    nutrientsAll.forEach(nutrient => {
        const nutrientLi     = document.createElement('li')
        nutrientLi.innerText = nutrient
        listNutrients.appendChild(nutrientLi)
    })
    return listNutrients
}

function createProductPrice(product) {
    const productPrice = Number(product.preco).toFixed(2)
    const price        = document.createElement('p')
    price.innerText    = `R$ ${productPrice}`
    price.classList.add('product_price')
    return price
}

export function createCard(produtos) {
    const listProducts = document.querySelector('ul')

    produtos.forEach(produto => {
        const nameProduct    = createProductName(produto)
        const sectionProduct = createProductSection(produto)
        const priceProduct   = createProductPrice(produto)
        const listNutrients  = createListNutrients(produto)
        const imageProduct   = createProductImage(produto)
        const cardProduct    = document.createElement('li')
        const divInfo        = document.createElement('div')
        const divPriceBtn    = document.createElement('div')
        const btnAddCarrinho = document.createElement('button')

        divPriceBtn.id           = 'divPriceBtn'
        btnAddCarrinho.innerText = 'Comprar'
        btnAddCarrinho.classList.add('btnAddCarrinho')
        cardProduct.classList.add('cardProduto')

        divPriceBtn.append(priceProduct, btnAddCarrinho)
        divInfo.append(nameProduct, sectionProduct, listNutrients, divPriceBtn)
        cardProduct.append(imageProduct, divInfo)
        listProducts.append(cardProduct)
    })
}