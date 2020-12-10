export interface PlainObject {
  [key: string]: any;
}

export interface RefParams {
  setRef: (el: any) => any;
  size?: string;
}
