import { createAsyncThunk } from "@reduxjs/toolkit";
import { Item } from "../types/itemTypes";

export const fetchItems = createAsyncThunk<
  Item[],
  void,
  { rejectValue: Error }
>("items/fetchItems", async (_: void, thunkApi) => {
  let data: Item[] = [];
  try {
    const request = await fetch("/api/items");
    if (!request.ok) throw Error(request.statusText);

    const json: { items: Item[] } = await request.json();
    data = json.items;
  } catch (e) {
    console.log(e);
    thunkApi.rejectWithValue(e as Error);
  }
  debugger;
  return data;
});
