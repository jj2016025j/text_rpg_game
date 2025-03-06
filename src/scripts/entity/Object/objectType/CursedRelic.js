import { GameObject } from "../gameObject.js";
import { SystemLog } from "../../../utils/systemLog.js";

export class CursedRelic extends GameObject {
  constructor(props) {
    super({ ...props, isInteractable: true });
  }

  interact() {
    SystemLog.addMessage(`☠️ 你觸碰了 ${this.name}，身體感到一股詭異的詛咒力量...`);
  }
}
