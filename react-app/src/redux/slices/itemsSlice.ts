import {
  createEntityAdapter,
  createSlice,
  EntityAdapter,
  EntityState,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Item } from "../types/itemTypes";
import { fetchItems } from "../thunks/itemsThunk";

const itemAdapter: EntityAdapter<Item> = createEntityAdapter<Item>({
  selectId: (entity: Item) => entity.id,
});

type AdditionalState = { pending: boolean };
type Action<T> = { type: string; payload: T };
type ItemState = EntityState<Item> & AdditionalState;

const initialState: ItemState = itemAdapter.getInitialState<AdditionalState>({
  pending: false,
});

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchItems.fulfilled,
      (state: ItemState, action: Action<Item[]>) => {
        itemAdapter.upsertMany(state, action.payload);
        state.pending = false;
      }
    );
    builder.addCase(fetchItems.pending, (state: ItemState) => {
      state.pending = true;
    });
    builder.addCase(fetchItems.rejected, (state: ItemState) => {
      state.pending = false;
    });
  },
});

export const { selectById: selectItemById } = itemAdapter.getSelectors(
  (state: RootState) => state.itemsSlice
);

export default itemsSlice.reducer;
