import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SLICE_NAME } from 'store/paramsAndValues/constants';
import { Param } from 'store/paramsAndValues/types';

export const getParams = createAsyncThunk<Param[]>(`${SLICE_NAME}/fetchParams`, async () => {
  try {
    const response = await axios.get('https://62dd8721ccdf9f7ec2c979a1.mockapi.io/params');
    const data: Param[] = await response.data;
    return data;
  } catch (e) {
    throw new Error('Ошибка загрузки параметров');
  }
});
