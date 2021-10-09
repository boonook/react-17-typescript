export declare type fEmptyVoid = () => void
declare module 'js-cookie';
export declare type fEmptyReturn = () => any
export declare type fArgVoid = (...args: any[]) => void
export declare type fArgReturn = (...args: any[]) => any
export declare type fFunction =
  | fEmptyVoid
  | fEmptyReturn
  | fArgVoid
  | fArgReturn

declare global {
  interface Window {
    eruda: any
    ha: fFunction
  }
}
