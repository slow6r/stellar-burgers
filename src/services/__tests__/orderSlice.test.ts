import {
  createOrder,
  initialState,
  orderReducer
} from '../slices/profileOrderSlice';

describe('тест редьюсер слайса отправки заказа orderSlice', () => {
  it('проверка статуса pending при обработке экшена', async () => {
    const state = orderReducer(initialState, {
      type: createOrder.pending.type
    });
    expect(state.orderRequest).toBe(true);
  });

  it('проверка статуса fulfilled при обработке экшена', async () => {
    const expectedResponse = {
      order: {
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa093f',
          '643d69a5c3f7b9001cfa093c'
        ],
        _id: '662bc99897ede0001d067b6c',
        status: 'done',
        name: 'Краторный бессмертный люминесцентный био-марсианский бургер',
        number: 38857
      }
    };

    const receivedResponse = {
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093f',
        '643d69a5c3f7b9001cfa093c'
      ],
      _id: '662bc99897ede0001d067b6c',
      status: 'done',
      name: 'Краторный бессмертный люминесцентный био-марсианский бургер',
      number: 38857
    };

    const state = orderReducer(initialState, {
      type: createOrder.fulfilled.type,
      payload: expectedResponse
    });

    expect(state.orderRequest).toBe(false);
    expect(state.orderState).toEqual(receivedResponse);
  });

  it('проверка статуса rejected при обработке экшена', async () => {
    const state = orderReducer(initialState, {
      type: createOrder.rejected.type
    });
    expect(state.orderRequest).toBe(false);
  });
});
