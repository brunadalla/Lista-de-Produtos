import { createCard } from './vitrine.js'
import { criarCarrinho } from './carrinho.js'

function resetList() {
    const listProducts     = document.querySelector('ul')
    listProducts.innerHTML = ""
}

function filterProducts(productsList, filterSection) {
    const products = productsList.filter(product => product.secao === filterSection);
    resetList()
    createCard(products)
}

function filterProductsByName(productsList, filterValue) {
    const products = productsList.filter(product => product.nome.toUpperCase().includes(filterValue.toUpperCase())      ||
                                                    product.secao.toUpperCase().includes(filterValue.toUpperCase())     ||
                                                    product.categoria.toUpperCase().includes(filterValue.toUpperCase()) )
    resetList()
    createCard(products)
}

export function btnsSection() {
    const buttons = document.querySelectorAll(".estiloGeralBotoes")
    buttons.forEach(btn => {
        if (btn.innerText === 'Todos Produtos'){
            btn.addEventListener('click', () => {
                styleClickBtn(btn)
                resetList()
                createCard(produtos)
                criarCarrinho(produtos)
            })
        } else {
            btn.addEventListener('click', () => {
                styleClickBtn(btn)
                resetList()
                filterProducts(produtos, btn.innerText)
                criarCarrinho(produtos)
            })
        }
    })  
}

function styleClickBtn(btn) {
    const btnTodos        = document.getElementById('estiloGeralBotoes--mostrarTodos')
    const btnHortifruti   = document.getElementById('estiloGeralBotoes--filtrarHortifruti')
    const btnPanificadora = document.getElementById('estiloGeralBotoes--filtrarPanificadora')
    const btnLaticinios   = document.getElementById('estiloGeralBotoes--filtrarLaticinios')

    btnTodos.classList.remove('estiloBtnClicado')
    btnHortifruti.classList.remove('estiloBtnClicado')
    btnPanificadora.classList.remove('estiloBtnClicado')
    btnLaticinios.classList.remove('estiloBtnClicado')

    btn.classList.add('estiloBtnClicado')
}

export function search() {
    const input        = document.getElementById('campoBuscaPorNome')
    const btnPesquisar = document.getElementById('estiloGeralBotoes--botaoBuscaPorNome')

    btnPesquisar.addEventListener('click', () => {
        styleClickBtn(btnPesquisar)
        filterProductsByName(produtos, input.value)
        criarCarrinho(produtos)
    })
}