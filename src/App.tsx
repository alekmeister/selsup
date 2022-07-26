import React, { useEffect, useState } from 'react';
import './App.css';
import { REQUEST_STATUS } from 'types/RequestStatuses';
import { putValues } from 'store/paramsAndValues/actionCreators/putValues';
import { useAppDispatch, useAppSelector } from 'store/types';
import { getValues } from 'store/paramsAndValues/actionCreators/getValues';
import { getParams } from 'store/paramsAndValues/actionCreators/getParams';
import { useDebounce } from 'debounce/Debounce';
import { selectValidParamsWithValues } from 'store/paramsAndValues/selectValidParamsWithValues';
import { Preloader } from 'preloader/Preloader';
import { MappedValues } from 'store/paramsAndValues/types';

const App = () => {
  const [inputValue, setInputValue] = useState<MappedValues>({});

  const { mappedActualValues, actualParams } = useAppSelector(selectValidParamsWithValues);
  const loadingStatus = useAppSelector((state) => state.paramsAndValues.status);

  const isLoading = loadingStatus === REQUEST_STATUS.LOADING;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loadingStatus === REQUEST_STATUS.SUCCESS) {
      setInputValue(mappedActualValues);
    }
  }, [mappedActualValues, actualParams]);

  useEffect(() => {
    dispatch(getValues());
    dispatch(getParams());
  }, []);

  const debouncedChangeValue = useDebounce(inputValue, 1000);

  useEffect(() => {
    const changedItems = Object.entries(debouncedChangeValue)
      .map(([, data]) => data)
      .filter(({ value, id }) => value !== mappedActualValues[id].value);

    changedItems.forEach((el) => dispatch(putValues(el)));
  }, [debouncedChangeValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const key = e.target.name;
    setInputValue((prevState) => ({ ...prevState, [key]: { id: key, value: newValue } }));
  };

  return (
    <div className="App">
      <div className="inner">
        <div>
          {actualParams.map((el) => (
            <div key={el.id} className="params">
              {el.name}
            </div>
          ))}
        </div>
        <div>
          <div className="inputs">
            {Object.entries(inputValue).map(([, el]) => (
              <div key={el.id} style={{ display: 'flex' }}>
                <input disabled={isLoading} name={el.id} value={el.value} onChange={handleChange} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {isLoading && <Preloader />}
    </div>
  );
};

export default App;
