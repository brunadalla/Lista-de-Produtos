let carrinho = [] 

export function criarCarrinho(produtos) {
    let btnAddCarrinho = document.getElementsByClassName('btnAddCarrinho')
    
    for (let i = 0; i < btnAddCarrinho.length; i++){
        btnAddCarrinho[i].addEventListener('click', () => {
            const nomeProduto = criarObjetoCarrinho(btnAddCarrinho[i])
            const acheProduto = produtos.find( produto => produto.nome === nomeProduto)

            carrinho.push(acheProduto)
                
                
            addCarrinho(acheProduto)
            addInfoFinaisCarrinho(carrinho)
        })   
    }
}

function criarObjetoCarrinho (btn) {
    const parent           = btn.parentElement
    const infoProduto      = parent.parentElement
    const infoProdutoNome  = infoProduto.childNodes[0].innerText
   
    return infoProdutoNome
}

let listaCarrinho  = document.createElement('ul')
listaCarrinho.id = 'ulCarrinho'

function addCarrinho(produtoCarrinho) {
    const mainCarrinho   = document.getElementById('mainCarrinho')

    mainCarrinho.classList.remove('mainCarrinho_Vazio')
    mainCarrinho.classList.add('mainCarrinho_Cheio')
    document.getElementById('carrinhoVazio').classList.add('hidden')
    document.getElementById('imgCarrinhoVazio').classList.add('hidden')

    listaCarrinho.append(criarTemplateCarrinho(produtoCarrinho))
    mainCarrinho.append(listaCarrinho)  
}

function criarQntd(arrayProdutos) {
    const divQntd         = document.createElement('div')
    const quantidade      = document.createElement('h3')
    const quantidadeTotal = document.createElement('span')

    quantidade.innerText      = 'Quantidade:'
    quantidadeTotal.innerText = arrayProdutos.length

    divQntd.id         = 'quantidadeTotal'
    quantidadeTotal.id = 'quantidadeTotalSpan'

    divQntd.append(quantidade, quantidadeTotal)

    return divQntd
}

function criarPrecoTotal(arrayProdutos) {
    const divValor   = document.createElement('div')
    const total      = document.createElement('h3')
    const valorTotal = document.createElement('span')
    let arrayPreco   = []

    arrayProdutos.forEach(produto => {
        arrayPreco.push(produto.preco)
    })

    let somaValorTotal = arrayPreco.reduce((acc, valorProduto)=>acc+valorProduto, 0)

    total.innerText      = 'Total:'
    let valorFormatado =  Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(somaValorTotal)
    valorTotal.innerText = valorFormatado

    divValor.id   = 'valorTotal'
    valorTotal.id = 'valorTotalSpan'

    divValor.append(total, valorTotal)

    return divValor
}

function addInfoFinaisCarrinho (arrayProdutos) {
    const infoFinaisCarrinho     = document.getElementById('infoFinaisCarrinho')
    infoFinaisCarrinho.innerText = ''
    infoFinaisCarrinho.classList.remove('hidden')
    infoFinaisCarrinho.append(criarQntd(arrayProdutos), criarPrecoTotal(arrayProdutos))
}

function criarTemplateCarrinho(product) {
    const productLi            = document.createElement('li')
    const imgProduct           = document.createElement('img')
    const infoProduct          = document.createElement('div')
    const infoProductName      = document.createElement('h3')
    const infoProductSection   = document.createElement('p')
    const infoProductPrice     = document.createElement('span')
    const btnRemover           = document.createElement('button')
    const imgBtnRemover        = document.createElement('img')

    btnRemover.addEventListener('click', (event) => {
        const element = event.currentTarget
        const parent = element.parentElement
        const produtoAchado = carrinho.find((product) => product.id == parent.id
        )
        const index = carrinho.indexOf(produtoAchado)
        carrinho.splice(index, 1)
        parent.remove()
        const qntd = document.getElementById('quantidadeTotalSpan')
        qntd.innerText = carrinho.length
        const valor = document.getElementById('valorTotalSpan')
        const total = carrinho.reduce((acc, {preco}) => acc + preco, 0)
        let valorFormatado =  Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)
        valor.innerText = valorFormatado
        
    })

    productLi.classList.add('carrinho_produto')
    imgProduct.classList.add('carrinho_imgProduto')
    infoProduct.classList.add('carrinho_infoProduto')
    btnRemover.classList.add('btnRemover')

    productLi.id = product.id
    imgProduct.src               = `${product.img}`
    infoProductName.innerText    = product.nome
    infoProductPrice.innerText   = `R$ ${product.preco.toFixed(2)}`
    infoProductSection.innerText = product.secao
    imgBtnRemover.src = "src/img/icons/bx-trash.svg"

    btnRemover.appendChild(imgBtnRemover)
    infoProduct.append(infoProductName, infoProductSection, infoProductPrice)
    productLi.append(imgProduct, infoProduct, btnRemover)

    return productLi
}