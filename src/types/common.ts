export interface IObject {
  [key: string]: any;
}

export interface IRefParams {
  setRef: (el: any) => any;
  size?: string;
}
