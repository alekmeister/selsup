import { REQUEST_STATUS } from 'types/RequestStatuses';
import { createSlice } from '@reduxjs/toolkit';
import { SLICE_NAME } from 'store/paramsAndValues/constants';
import type { State } from 'store/paramsAndValues/types';
import { getValues } from 'store/paramsAndValues/actionCreators/getValues';
import { getParams } from 'store/paramsAndValues/actionCreators/getParams';
import { putValues } from 'store/paramsAndValues/actionCreators/putValues';

const getInitialState = (): State => ({
  values: [],
  params: [],
  status: REQUEST_STATUS.PENDING,
});

const slice = createSlice({
  name: SLICE_NAME,
  initialState: getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    // Получение значений
    builder.addCase(getValues.pending, (state) => {
      state.status = REQUEST_STATUS.LOADING;
    });
    builder.addCase(getValues.fulfilled, (state, action) => {
      state.values = action.payload;
      state.status = REQUEST_STATUS.SUCCESS;
    });
    builder.addCase(getValues.rejected, (state) => {
      state.status = REQUEST_STATUS.ERROR;
    });
    // Получение параметров
    builder.addCase(getParams.pending, (state) => {
      state.status = REQUEST_STATUS.LOADING;
    });
    builder.addCase(getParams.fulfilled, (state, action) => {
      state.params = action.payload;
      state.status = REQUEST_STATUS.SUCCESS;
    });
    builder.addCase(getParams.rejected, (state) => {
      state.status = REQUEST_STATUS.ERROR;
    });
    // Редактирование параметров
    builder.addCase(putValues.pending, (state) => {
      state.status = REQUEST_STATUS.LOADING;
    });
    builder.addCase(putValues.fulfilled, (state, action) => {
      const index = state.values.findIndex((el) => el.id === action.payload.id);
      const copy = [...state.values];
      copy[index] = action.payload;
      state.values = copy;
      state.status = REQUEST_STATUS.SUCCESS;
    });
    builder.addCase(putValues.rejected, (state) => {
      state.status = REQUEST_STATUS.ERROR;
    });
  },
});
export default slice.reducer;
