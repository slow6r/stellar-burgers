import {
  ingredientReducer,
  initialState,
  getIngredients
} from '../slices/burgerIngredientSlice';

describe('тесты, проверяющие обработку редьюсером экшенов генерируемых при выполнении асинхронного запроса', () => {
  it('проверка статуса pending при обработке экшена', () => {
    const state = ingredientReducer(initialState, {
      type: getIngredients.pending.type,
      payload: ''
    });
    expect(state.isIngredientLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('проверка статуса fulfilled при обработке экшена', async () => {
    const expectedResult = [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      },
      {
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
      }
    ];

    const state = ingredientReducer(initialState, {
      type: getIngredients.fulfilled.type,
      payload: expectedResult
    });
    expect(state.isIngredientLoading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.ingredients).toEqual(expectedResult);
  });

  it('проверка статуса rejected при обработке экшена', () => {
    const error = { message: 'Request rejected' };
    const state = ingredientReducer(initialState, {
      type: getIngredients.rejected.type,
      error: error
    });
    expect(state.isIngredientLoading).toBe(false);
    expect(state.error).toEqual('Request rejected');
    expect(state.ingredients).toEqual([]);
  });
});
