import { GameObject } from "../gameObject.js";
import { SystemLog } from "../../../utils/systemLog.js";

export class MysticAltar extends GameObject {
  constructor(props) {
    super({ ...props, isInteractable: true });
  }

  interact() {
    SystemLog.addMessage(`🔮 你觸碰了 ${this.name}，感受到神秘的力量湧入體內！`);
  }
}
