import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from 'store/index';
import { MappedValues } from 'store/paramsAndValues/types';

export const selectValidParamsWithValues = createSelector(
  (state: RootState) => state.paramsAndValues,
  ({ params, values }) => {
    // Сверка полей по id
    const actualValues = values.filter(({ id }) => params.find(({ id: paramId }) => id === paramId));
    const actualParams = params.filter(({ id }) => values.find(({ id: valuesId }) => id === valuesId));

    const mappedActualValues = actualValues.reduce<MappedValues>((acc, item) => ({ ...acc, [item.id]: item }), {});

    return {
      mappedActualValues,
      actualParams,
    };
  }
);
