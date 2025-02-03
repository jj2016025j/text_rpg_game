// **寶箱 (TreasureChest)** - 可開啟獲取物品

import { GameObject } from "../GameObject.js";

export class TreasureChest extends GameObject {
  constructor(props) {
    super({ ...props, isInteractable: true });
    this.contents = props.contents || [];
    this.isOpened = false;
  }

  interact() {
    if (this.isOpened) {
      console.log(`📦 ${this.name} 已經被打開過了，裡面空空如也。`);
    } else {
      this.isOpened = true;
      console.log(`📦 你打開了 ${this.name}，獲得物品: ${this.contents.join(", ") || "空空如也"}`);
    }
  }
}