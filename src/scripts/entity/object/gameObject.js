import { SystemLog } from "../../utils/systemLog.js";

export class GameObject {
  constructor({ id, name, type, description = "", isInteractable = false }) {
      this.id = id;
      this.name = name;
      this.type = type;
      this.description = description;
      this.isInteractable = isInteractable;
  }

  interact() {
      if (this.isInteractable) {
          SystemLog.addMessage(`🔹 你與 ${this.name} 互動了！`);
      } else {
          SystemLog.addMessage(`🔹 ${this.name} 只是個裝飾物。`);
      }
  }
}
