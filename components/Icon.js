import { Asset } from "expo-asset";

export default class Icon {
  module: any;
  width: number;
  height: number;

  constructor(module: any, width: number, height: number) {
    this.module = module;
    this.width = width;
    this.height = height;
    Asset.fromModule(this.module).downloadAsync();
  }
}
