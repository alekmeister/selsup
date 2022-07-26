import { REQUEST_STATUS } from 'types/RequestStatuses';

export interface ParamValue {
  id: string;
  value: string;
}
export interface Param {
  id: string;
  name: string;
}

export interface State {
  values: ParamValue[];
  params: Param[];
  status: REQUEST_STATUS;
}

export type MappedValues = Record<string, ParamValue>;
