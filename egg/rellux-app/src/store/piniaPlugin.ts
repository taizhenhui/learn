import { PiniaPluginContext } from "pinia";
 
const setStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};
 
const getStorage = (key: string) => {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : {};
};
 
type Options = {
  key?: string;
};
const __piniaKey__: string = "rellux-key";
 
export const piniaPlugin = (options: Options) => {
  return (context: PiniaPluginContext) => {
    const { store } = context
    const data = getStorage(`${options?.key ?? __piniaKey__}-${store.$id}`)
    store.$subscribe(() => {
      setStorage(`${options?.key ?? __piniaKey__}-${store.$id}`, toRaw(store.$state));
    })
    return {
      ...data,
    };
  };
};