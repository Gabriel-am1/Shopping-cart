export const getAddress = async (cep) => {
  const api1 = fetch(`https://cep.awesomeapi.com.br/json/${cep}`);
  const url2 = fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
  const consultandoAPI = [api1, url2];
  const enderecinho = await Promise.any(consultandoAPI)
    .then((response) => response.json())
    .then((data) => {
      const street = data.address;
      const neighborhood = data.district;
      const ciudad = data.city;
      const provincia = data.state;
      if (street && neighborhood && ciudad && provincia) {
        const correios = `${street} - ${neighborhood} - ${ciudad} - ${provincia}`;
        return correios;
      }
      return 'CEP não encontrado';
    }).catch((e) => {
      console.log(e);
      return 'CEP não encontrado';
    });
  return enderecinho;
};

export const searchCep = async () => {
  const colocaOCep = document.querySelector('.cep-input').value;
  const data = await getAddress(colocaOCep);
  const cepSpan = document.querySelector('.cart__address');
  cepSpan.innerText = data;
};

