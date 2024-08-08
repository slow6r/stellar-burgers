import { TConstructorIngredient, TIngredient } from '@utils-types';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

type TBurgerConstructorState = {
  formulaBurger: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
};

const initialState: TBurgerConstructorState = {
  formulaBurger: {
    bun: null,
    ingredients: []
  }
};

export const burgerConstructorSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        switch (action.payload.type) {
          case 'bun':
            state.formulaBurger.bun = action.payload;
            break;
          case 'main':
          case 'sauce':
            state.formulaBurger.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    deleteIngredient: (state, action) => {
      state.formulaBurger.ingredients = state.formulaBurger.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ id: string; direction: string }>
    ) => {
      const { direction, id } = action.payload;

      const index = state.formulaBurger.ingredients.findIndex(
        (idx) => idx.id === id
      );

      const ingredients = state.formulaBurger.ingredients;
      const ingredientMove = ingredients[index];

      if (direction === 'up') {
        ingredients[index] = ingredients[index - 1];
        ingredients[index - 1] = ingredientMove;
      } else {
        ingredients[index] = ingredients[index + 1];
        ingredients[index + 1] = ingredientMove;
      }
    },
    resetConstructor: (state: TBurgerConstructorState) => (state = initialState)
  },
  selectors: {
    getConstructorState: (state) => state
  }
});

export const {
  addIngredient,
  deleteIngredient,
  moveIngredient,
  resetConstructor
} = burgerConstructorSlice.actions;

export const { getConstructorState } = burgerConstructorSlice.selectors;

export const constructorReducer = burgerConstructorSlice.reducer;
