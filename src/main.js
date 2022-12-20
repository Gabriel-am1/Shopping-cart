import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { getSavedCartIDs, saveCartID } from './helpers/cartFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const criarCarregando = () => {
  const carregarElemento = document.createElement('div');
  carregarElemento.className = 'loading';
  carregarElemento.innerHTML = 'carregando...';
  const corpo = document.querySelector('body');
  corpo.appendChild(carregarElemento);
};

const removerCarregando = () => {
  const carregarElemento = document.querySelector('.loading');
  carregarElemento.remove();
};

const requisiçãoDeErro = () => {
  const carregarElemento = document.createElement('div');
  const corpo = document.querySelector('body');
  corpo.appendChild(carregarElemento);
  carregarElemento.className = 'error';
  carregarElemento.innerHTML = 'Algum erro ocorreu,recarregue a página e tente novamente';
};

const SecaoProduto = document.querySelector('.products');
const carrinho = document.querySelector('.cart__products');

// função que cria uma lista de produtos fazendo uma requisição
const createProductList = async () => {
  criarCarregando();
  try {
    const listaItens = await fetchProductsList('computador');
    listaItens.forEach((item) => {
      SecaoProduto.appendChild(createProductElement(item));
    });
  } catch {
    requisiçãoDeErro();
  } finally {
    removerCarregando();
  }
};

// função que carrega a lista de produtos depois da requisição
const CarregarLista = async () => {
  const carregandoItens = await Promise.all(getSavedCartIDs());
  if (carregandoItens.length !== 0) {
    carregandoItens.forEach(async (item) => {
      const avulso = await fetchProduct(item);
      carrinho.appendChild(createCartProductElement(await fetchProduct(avulso)));
    });
  }
};

SecaoProduto.addEventListener('click', async (event) => {
  const id = event.target.parentNode.firstChild.innerText;
  saveCartID(id);
  const result = await fetchProduct(id);
  carrinho.appendChild(createCartProductElement(result));
});

window.onload = () => createProductList();
CarregarLista();
