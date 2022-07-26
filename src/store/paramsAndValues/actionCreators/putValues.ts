import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SLICE_NAME } from 'store/paramsAndValues/constants';
import { ParamValue } from 'store/paramsAndValues/types';

export const putValues = createAsyncThunk<ParamValue, ParamValue>(`${SLICE_NAME}/putValues`, async ({ id, value }) => {
  try {
    const response = await axios.put(`https://62dd8721ccdf9f7ec2c979a1.mockapi.io/values/${id}`, { value });
    const data: ParamValue = await response.data;
    return data;
  } catch (e) {
    throw new Error('Ошибка редактирования');
  }
});
