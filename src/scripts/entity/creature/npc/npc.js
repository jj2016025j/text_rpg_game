import { BaseEntity } from "../../baseEntity.js";
import { SystemLog } from "../../../utils/systemLog.js";

class NPC extends BaseEntity {
    constructor({ id, name, dialogue = [], itemsForSale = [] }) {
        super({ id, name }); // ✅ 繼承 BaseEntity
        this.dialogue = dialogue;
        this.itemsForSale = new Map(itemsForSale.map(item => [item.id, item])); // ✅ 優化為 Map 方便查找
    }

    // 🔹 NPC 說話
    speak() {
        if (this.dialogue.length > 0) {
            const randomDialogue = this.dialogue[Math.floor(Math.random() * this.dialogue.length)];
            SystemLog.addMessage(`${this.name}: "${randomDialogue}"`);
        } else {
            SystemLog.addMessage(`${this.name} 沒有話要說`);
        }
    }

    // 🔹 NPC 賣東西
    sellItem(itemId, buyer) {
        const item = this.itemsForSale.get(itemId);
        if (!item) {
            SystemLog.addMessage(`${this.name} 沒有出售此物品`);
            return false;
        }

        if (buyer.gold >= item.price) {
            buyer.gold -= item.price;
            buyer.inventory.addItem(item);
            SystemLog.addMessage(`${this.name} 賣出 ${item.name} 給 ${buyer.name}`);
            return true;
        } else {
            SystemLog.addMessage(`${buyer.name} 金幣不足`);
            return false;
        }
    }

    // 🔹 取得可序列化數據
    getSerializableData() {
        return {
            id: this.id,
            name: this.name,
            dialogue: this.dialogue,
            itemsForSale: Array.from(this.itemsForSale.values()),
        };
    }
}

export { NPC };
