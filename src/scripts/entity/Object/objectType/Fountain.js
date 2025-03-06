// **噴泉 (Fountain)** - 可恢復體力
import { GameObject } from "../gameObject.js";
import { SystemLog } from "../../../utils/systemLog.js";

export class Fountain extends GameObject {
  constructor(props) {
    super({ ...props, isInteractable: true });
    this.restoreAmount = props.restoreAmount || 10;
  }

  interact() {
    SystemLog.addMessage(`⛲ ${this.name} 的水讓你恢復了 ${this.restoreAmount} 點體力！`);
  }
}
