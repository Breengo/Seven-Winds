import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  showLevel: boolean;
  updatingRow: number | null;
}

const initialState: UIState = {
  showLevel: false,
  updatingRow: null,
};

export const UISlice = createSlice({
  name: "UI",
  initialState,

  reducers: {
    showLevel: (state, { payload }) => {
      if (!state.updatingRow) state.showLevel = payload;
    },
    setUpdatingRow: (state, { payload }) => {
      state.showLevel = false;
      if (payload === state.updatingRow) state.updatingRow = null;
      else state.updatingRow = payload;
    },
  },
});

export const { showLevel, setUpdatingRow } = UISlice.actions;

export default UISlice.reducer;
