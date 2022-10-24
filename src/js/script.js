import { createCard } from './functions/vitrine.js'
import { btnsSection, search } from './functions/filtros.js'
import { criarCarrinho } from './functions/carrinho.js'

createCard(produtos)
btnsSection()
search()
criarCarrinho(produtos)