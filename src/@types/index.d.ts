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
    interface UserModel {
      name: string;
    }
    interface ElectronIF {
      webFrame: WebFrame;
      screen: Screen;
      shell: Shell;
      remote: Remote;
    }
    // window上没有的属性也可以用 typeof window === 'object' && (window as any).方法名
    interface Window {
      less: any;
      BMap: any;
      BMapLib: any;
      polygon: any;
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
      ipcRenderer: IpcRenderer;
      electron: ElectronIF;
    }
  }
