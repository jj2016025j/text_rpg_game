import { SystemLog } from "../utils/SystemLog.js";
import { Inventory } from "../Inventory/Inventory.js";

export class Shop {
    constructor(gameSystem, { id, name, itemsForSale = [] }) {
        this.gameSystem = gameSystem;
        this.id = id;
        this.name = name;
        console.log(itemsForSale)

        // 🔹 將字串 ID 轉換為完整的物品物件
        const fullItems = itemsForSale.map(itemId => gameSystem.itemManager.getItemById(itemId)).filter(item => item !== null);

        this.inventory = new Inventory(gameSystem, { items: fullItems, gold: 0 });
    }

    // ✅ 列出商店內所有商品
    listItems() {
        SystemLog.addMessage(`🛒 商店: ${this.name}`);
        this.inventory.getItems().forEach(item => {
            SystemLog.addMessage(`${item.name} - 價格: ${item.price} 金幣`);
        });
    }

    listItems() {
        return this.inventory.getItems(); // ✅ 確保可用
    }

    // ✅ 購買物品
    buyItem(buyer, itemId, quantity = 1) {
        const item = this.inventory.getItem(itemId);
        if (!item) {
            SystemLog.addMessage(`❌ ${this.name} 沒有物品 ${itemId}`);
            return false;
        }

        const totalPrice = item.price * quantity;
        if (!buyer.inventory.hasMoney(totalPrice)) {
            SystemLog.addMessage(`❌ ${buyer.name} 金幣不足，無法購買 ${item.name}`);
            return false;
        }

        // ✅ 交易成功
        buyer.inventory.gold -= totalPrice;
        this.inventory.gold += totalPrice;
        buyer.inventory.addItem({ ...item, quantity });

        SystemLog.addMessage(`✅ ${buyer.name} 購買了 ${quantity} 個 ${item.name}`);
        return true;
    }

    // ✅ 出售物品
    sellItem(seller, itemId, quantity = 1) {
        const item = seller.inventory.getItem(itemId);
        if (!item || item.quantity < quantity) {
            SystemLog.addMessage(`❌ ${seller.name} 沒有足夠的 ${itemId}`);
            return false;
        }

        const totalPrice = item.price * quantity;
        if (!this.inventory.hasMoney(totalPrice)) {
            SystemLog.addMessage(`❌ ${this.name} 金幣不足，無法購買 ${item.name}`);
            return false;
        }

        // ✅ 交易成功
        seller.inventory.gold += totalPrice;
        this.inventory.gold -= totalPrice;
        seller.inventory.removeItem(itemId, quantity);

        SystemLog.addMessage(`✅ ${seller.name} 出售了 ${quantity} 個 ${item.name}`);
        return true;
    }
}
