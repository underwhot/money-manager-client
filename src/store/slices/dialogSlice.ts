import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface Dialog {
  isOpen: boolean;
  type: "post" | "patch" | "delete";
  id?: number | null;
  // onOpen: () => void;
  // onClose: () => void;
  // data: any;
  // setData: (data: any) => void;
}

const initialState: Dialog = {
  isOpen: false,
  type: "post",
  id: null,
  // onOpen: () => {},
  // onClose: () => {},
  // data: {},
  // setData: (data: any) => {},
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    setOnOpen: (state, action: PayloadAction<"post" | "patch" | "delete">) => {
      state.isOpen = true;
      state.type = action.payload;
    },
    setOnClose: (state) => {
      state.isOpen = false;
      state.id = null;
    },
    setId: (state, action: PayloadAction<number | null>) => {
      state.id = action.payload;
    },
  },
});

export const { setOnOpen, setOnClose, setId } = dialogSlice.actions;

export const selectIsOpen = (state: RootState) => state.dialog.isOpen;
export const selectType = (state: RootState) => state.dialog.type;
export const selectId = (state: RootState) => state.dialog.id;

export default dialogSlice.reducer;
