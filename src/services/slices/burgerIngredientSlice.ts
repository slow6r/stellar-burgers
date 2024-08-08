import {
  createSlice,
  createAsyncThunk,
  createSelector,
  PayloadAction
} from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '@utils-types';
import { RootState } from '../store';

type TBurgerIngredientsState = {
  ingredients: TIngredient[];
  isIngredientLoading: boolean;
  error: string | null;
};

const initialState: TBurgerIngredientsState = {
  ingredients: [],
  isIngredientLoading: false,
  error: null
};

export const getIngredients = createAsyncThunk('ingredients/get', async () => {
  const result = await getIngredientsApi();
  return result;
});

export const getTypeSelector = (type: string) =>
  createSelector(
    (state: RootState) => state.ingredients.ingredients,
    (ingredients) => ingredients.filter((item) => item.type === type)
  );

export const burgerIngredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIsIngredientLoading: (state) => {
      state.isIngredientLoading = false;
    },
    setIngredientState: (state, action: PayloadAction<TIngredient[]>) => {
      state.isIngredientLoading = false;
      state.ingredients = action.payload;
    }
  },
  selectors: {
    getIsIngredientLoading: (state) => state.isIngredientLoading,
    getIngredientState: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isIngredientLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isIngredientLoading = false;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isIngredientLoading = false;
        state.error = action.error.message as string;
      });
  }
});

export const { setIsIngredientLoading, setIngredientState } =
  burgerIngredientSlice.actions;

export const { getIsIngredientLoading, getIngredientState } =
  burgerIngredientSlice.selectors;

export const ingredientReducer = burgerIngredientSlice.reducer;
