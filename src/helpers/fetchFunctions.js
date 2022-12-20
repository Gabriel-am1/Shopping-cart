export const fetchProduct = async (carro) => {
  if (!carro) {
    throw new Error('ID não informado');
  }
  const responda = await fetch(`https://api.mercadolibre.com/items/${carro}`);
  const data = await responda.json();
  return data;
};

export const fetchProductsList = async (item) => {
  if (!item) {
    throw new Error('Termo de busca não informado');
  }
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${item}`);
  const data = await response.json();
  return data.results;
};
