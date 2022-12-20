import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui

describe('Teste a função fetchProduct', () => {
  it('Testa se fetchProduct é uma função', () => {
    expect(typeof fetchProduct).toBe('function')
   });

   it('Testa se fetch é chamada ao executar fetchProduct', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalled();
   });

   it('Testa  o retorno do endpoint ao executar a função fetchProduct', async () => {
		await fetchProduct('MLB1405519561');
    expect(fetch).toBeCalledWith('https://api.mercadolibre.com/items/MLB1405519561');
  });

	it('Testa o retorno da função fetchProduct com o argumento `MLB1405519561`', async () => {
    const resolve = await fetchProduct('MLB1405519561');
    expect(resolve).toEqual(product);
  });

	it('Testa o erro da função fetchProduct', async () => {
      await expect(fetchProduct()).rejects.toThrow('Id não informado');
  });
});
