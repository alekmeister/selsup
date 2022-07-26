import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SLICE_NAME } from 'store/paramsAndValues/constants';
import { ParamValue } from 'store/paramsAndValues/types';

export const getValues = createAsyncThunk<ParamValue[]>(`${SLICE_NAME}/fetchValues`, async () => {
  try {
    const response = await axios.get('https://62dd8721ccdf9f7ec2c979a1.mockapi.io/values');
    const data: ParamValue[] = await response.data;
    return data;
  } catch (e) {
    throw new Error('Ошибка загрузки значений');
  }
});
