import { GameObject } from "../gameObject.js";
import { SystemLog } from "../../../utils/systemLog.js";

export class AncientStatue extends GameObject {
  constructor(props) {
    super({ ...props, isInteractable: false });
  }

  interact() {
    SystemLog.addMessage(`🗿 ${this.name} 似乎在注視著你，帶著神秘的表情...`);
  }
}
