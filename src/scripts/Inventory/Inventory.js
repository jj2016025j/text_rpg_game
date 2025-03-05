import { SystemLog } from "../utils/SystemLog.js";

export class Inventory {
    constructor(gameManager, { items = [], gold = 0 }) {
        this.gameManager = gameManager;
        this.gold = typeof gold === "number" ? gold : 0;
        this.items = new Map();
        console.log(items)

        items.forEach(({ id, quantity }) => {
            const item = this.gameManager.itemManager.getItemById(id)
            if (this.gameManager.itemManager.getItemById(id)) {
                this.items.set(id, { ...item, quantity }); // ✅ 只存 ID 和數量
            } else {
                SystemLog.addMessage(`⚠️ 找不到物品 ID: ${id}`);
            }
        });
    }

    addItems(inputItems) {
        inputItems.forEach(({ id, quantity }) => {
            if (!this.gameManager.itemManager.getItemById(id)) {
                SystemLog.addMessage(`⚠️ 無法添加未知物品 ID: ${id}`);
                return;
            }
            if (!this.items.has(id)) {
                this.items.set(id, { id, quantity });
            } else {
                this.items.get(id).quantity += quantity;
            }
            SystemLog.addMessage(`✅ 添加物品: ${id} x${quantity}`);
        });
    }

    removeItems(inputItems) {
        inputItems.forEach(({ id, quantity }) => {
            const item = this.items.get(id);
            if (item && item.quantity >= quantity) {
                item.quantity -= quantity;
                if (item.quantity === 0) this.items.delete(id);
                SystemLog.addMessage(`✅ 移除物品: ${id} x${quantity}`);
            } else {
                SystemLog.addMessage(`⚠️ ${id} 數量不足`);
            }
        });
    }

    // ✅ 確保可以返回所有物品
    getItems() {
        return Array.from(this.items.values());
    }

    getItem(itemId) {
        return this.items.get(itemId) || null;
    }

    listAllItemIds() {
        return Array.from(this.items.keys()); // ✅ 只回傳 ID
    }

    filterItemsByType(type) {
        return this.listAllItemIds().filter(id => {
            const item = this.gameManager.itemManager.getItemById(id);
            return item && item.type === type;
        });
    }

    addMoney(amount) {
        this.gold += amount;
    }

    removeMoney(amount) {
        if (this.gold >= amount) {
            this.gold -= amount;
        } else {
            SystemLog.addMessage("⚠️ 金幣不足");
        }
    }

    checkMoney(amount) {
        return this.gold >= amount;
    }

    getSerializableData() {
        return {
            items: this.listAllItemIds().map(id => ({
                id,
                quantity: this.items.get(id).quantity
            })),
            gold: this.gold,
        };
    }
}
