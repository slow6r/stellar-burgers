import {
  constructorReducer,
  initialState
} from '../slices/burgerConstructorSlice';

describe('тесты, проверяющие работу редьюсера конструктора бургера constructorSlice', () => {
  const ConstructorItemsMoc = {
    bun: {
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
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      id: '1'
    },
    ingredients: [
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
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        id: '2'
      },
      {
        _id: '643d69a5c3f7b9001cfa0949',
        name: 'Мини-салат Экзо-Плантаго',
        type: 'main',
        proteins: 1,
        fat: 2,
        carbohydrates: 3,
        calories: 6,
        price: 4400,
        image: 'https://code.s3.yandex.net/react/code/salad.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
        id: '3'
      }
    ]
  };

  it('добавление ингредиента', () => {
    let newState = constructorReducer(initialState, {
      payload: ConstructorItemsMoc.bun,
      type: 'constructorBurger/addIngredient'
    });
    const { bun } = newState.formulaBurger;
    expect(bun).toEqual({ ...ConstructorItemsMoc.bun });

    newState = constructorReducer(initialState, {
      payload: ConstructorItemsMoc.ingredients[0],
      type: 'constructorBurger/addIngredient'
    });
    const { ingredients } = newState.formulaBurger;
    expect(ingredients).toEqual([{ ...ConstructorItemsMoc.ingredients[0] }]);
    expect(newState.formulaBurger.ingredients).toHaveLength(1);
  });

  it('удаление ингредиента', () => {
    let newState = constructorReducer(initialState, {
      payload: ConstructorItemsMoc.ingredients[1],
      type: 'constructorBurger/addIngredient'
    });

    newState = constructorReducer(newState, {
      payload: '3',
      type: 'constructorBurger/deleteIngredient'
    });
    expect(newState).toEqual(initialState);
    expect(newState.formulaBurger.ingredients).toHaveLength(0);
  });

  it('изменение порядка ингредиентов', () => {
    let newState = constructorReducer(initialState, {
      payload: ConstructorItemsMoc.ingredients[0],
      type: 'constructorBurger/addIngredient'
    });

    newState = constructorReducer(newState, {
      payload: ConstructorItemsMoc.ingredients[1],
      type: 'constructorBurger/addIngredient'
    });

    newState = constructorReducer(newState, {
      payload: { id: '3', direction: 'up' },
      type: 'constructorBurger/moveIngredient'
    });

    let { ingredients } = newState.formulaBurger;
    expect(ingredients).toEqual([
      { ...ConstructorItemsMoc.ingredients[1] },
      { ...ConstructorItemsMoc.ingredients[0] }
    ]);

    newState = constructorReducer(newState, {
      payload: { id: '3', direction: 'down' },
      type: 'constructorBurger/moveIngredient'
    });

    ingredients = newState.formulaBurger.ingredients;
    expect(ingredients).toEqual([
      { ...ConstructorItemsMoc.ingredients[0] },
      { ...ConstructorItemsMoc.ingredients[1] }
    ]);
  });
});
