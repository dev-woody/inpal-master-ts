import { PayloadAction } from "@reduxjs/toolkit";

interface CreateAsyncReducersParams {
  actionName: string;
  reducerName: string;
  cleanDataWhenStart?: boolean;
}

export interface DataForm {
  data: any;
  success: boolean;
  message: string | null;
}

type AsyncEntity<T, R> = {
  data: T | null; // 데이터 없는 경우에는 명시적으로 null
  error: R | null;
};

export interface ResponseData {
  [key: string]: any;
}

const createAsyncReducers =
  <State extends ResponseData>({
    actionName,
    reducerName,
    cleanDataWhenStart = false,
  }: CreateAsyncReducersParams) =>
  <Start, Success extends DataForm, Failure>() => {
    const result: {
      [key: string]:
        | ((state: State, action: PayloadAction<Start>) => void)
        | ((state: State, action: PayloadAction<Success>) => void)
        | ((state: State, action: PayloadAction<Failure>) => void);
    } = {
      // start reducer 함수
      [`${actionName}`]: (state: State, action: PayloadAction<Start>) => {
        if (cleanDataWhenStart) {
          (state[reducerName] as AsyncEntity<Success, Failure>).data = null;
        }
      },
      // success reducer 함수
      [`${actionName}Success`]: (
        state: State,
        action: PayloadAction<Success>
      ) => {
        (state[reducerName] as AsyncEntity<Success, Failure>).data =
          action.payload;
        // (state[reducerName] as AsyncEntity<Success, Failure>).success =
        //   action.payload.success;
        // (state[reducerName] as AsyncEntity<Success, Failure>).message =
        //   action.payload.message;
      },
      // fail reducer 함수
      [`${actionName}Failure`]: (
        state: State,
        action: PayloadAction<Failure>
      ) => {
        (state[reducerName] as AsyncEntity<Success, Failure>).error =
          action.payload;
        console.log(action.payload);
      },
    };
    return result;
  };

export default createAsyncReducers;

export const createSingleReducers =
  ({ actionName }: { actionName: string }) =>
  <Start>() => {
    const result = {
      [`${actionName}`]: (state: any, action: PayloadAction<Start>) => {
        const reducerName = action.payload;
        (state[reducerName] as DataForm).data = null;
        (state[reducerName] as DataForm).success = false;
        (state[reducerName] as DataForm).message = null;
      },
    };
    return result;
  };
