import { SystemLog } from "../utils/systemLog.js";

/**
 * 物品基類 (抽象類別)
 */
class Item {
    constructor({ id, type, name, description, value, quantity = 1, attributes = {} }) {
        this.id = id;                 // 唯一 ID
        this.type = type;             // 物品類型 (Weapon, Armor, Potion, etc.)
        this.name = name;             // 物品名稱
        this.description = description; // 物品描述
        this.value = value;           // 物品價值
        this.quantity = quantity;     // 數量
        this.attributes = attributes; // 屬性 (ex: 耐久度, 攻擊力, 效果等)
    }

    // 使用物品 (基礎類別不實作，子類別自行定義)
    use() {
        SystemLog.addMessage(`⚠️ ${this.name} 不能直接使用。`);
    }

    // 檢查是否可堆疊
    isStackable() {
        return this.type === "Material" || this.type === "Food" || this.type === "Potion";
    }

    // 檢查是否可裝備
    isEquippable() {
        return this.type === "Weapon" || this.type === "Armor" || this.type === "Tool";
    }
}

/**
 *  🔹 食物類別 (可食用，恢復狀態)
 */
class Food extends Item {
    use(player) {
        if (this.quantity > 0) {
            player.state.health = Math.min(player.state.maxHealth, player.state.health + this.attributes.heal);
            SystemLog.addMessage(`🍎 ${player.name} 吃了 ${this.name}，恢復 ${this.attributes.heal} 點生命值！`);
            this.quantity--;
        } else {
            SystemLog.addMessage(`⚠️ ${this.name} 已經沒有了！`);
        }
    }
}

/**
 * 🔹 藥水類別 (恢復生命值/魔力/其他增益)
 */
class Potion extends Item {
    use(player) {
        if (this.quantity > 0) {
            if (this.attributes.health) {
                player.state.health = Math.min(player.state.maxHealth, player.state.health + this.attributes.health);
                SystemLog.addMessage(`💖 ${player.name} 使用了 ${this.name}，恢復 ${this.attributes.health} 點生命值！`);
            }
            if (this.attributes.mana) {
                player.state.mana = Math.min(player.state.maxMana, player.state.mana + this.attributes.mana);
                SystemLog.addMessage(`🔮 ${player.name} 使用了 ${this.name}，恢復 ${this.attributes.mana} 點魔力！`);
            }
            if (this.attributes.effect) {
                player.applyEffect(this.attributes.effect);
                SystemLog.addMessage(`🌀 ${player.name} 受到了 ${this.attributes.effect} 的影響！`);
            }
            this.quantity--;
        } else {
            SystemLog.addMessage(`⚠️ ${this.name} 已經沒有了！`);
        }
    }
}

/**
 * 🔹 武器類別 (可裝備，影響攻擊力)
 */
class Weapon extends Item {
    constructor(data) {
        super(data);
        this.durability = data.attributes.durability || 100; // 耐久度
    }

    equip(player) {
        if (this.durability > 0) {
            player.equipItem("Weapon", this);
            SystemLog.addMessage(`⚔️ ${player.name} 裝備了 ${this.name}！`);
        } else {
            SystemLog.addMessage(`⚠️ ${this.name} 已經損壞，無法裝備！`);
        }
    }

    use(target) {
        if (this.durability > 0) {
            target.takeDamage(this.attributes.damage);
            SystemLog.addMessage(`🗡️ ${this.name} 造成 ${this.attributes.damage} 點傷害！`);
            this.durability--;
        } else {
            SystemLog.addMessage(`⚠️ ${this.name} 耐久度耗盡，無法使用！`);
        }
    }

    repair(amount) {
        this.durability += amount;
        SystemLog.addMessage(`🔧 修復 ${this.name}，耐久度增加 ${amount}！`);
    }
}

/**
 * 🔹 裝備類別 (盔甲/頭盔等)
 */
class Armor extends Item {
    equip(player) {
        player.equipItem("Armor", this);
        SystemLog.addMessage(`🛡️ ${player.name} 裝備了 ${this.name}，防禦力增加 ${this.attributes.defense}！`);
    }
}

/**
 * 🔹 工具類別 (可用於特殊操作)
 */
class Tool extends Item {
    constructor(data) {
        super(data);
        this.durability = data.attributes.durability || 50;
    }

    use(player) {
        if (this.durability > 0) {
            SystemLog.addMessage(`🔨 ${player.name} 使用了 ${this.name}！`);
            this.durability--;
        } else {
            SystemLog.addMessage(`⚠️ ${this.name} 耐久度耗盡，無法使用！`);
        }
    }

    repair(amount) {
        this.durability += amount;
        SystemLog.addMessage(`🔧 修復 ${this.name}，耐久度增加 ${amount}！`);
    }
}

/**
 * 🔹 材料類別 (可堆疊，用於合成)
 */
class Material extends Item {
    use() {
        SystemLog.addMessage(`⚠️ ${this.name} 不能直接使用，但可能可用於合成。`);
    }
}

// ✅ 匯出所有物品類別
export { Item, Food, Potion, Weapon, Armor, Tool, Material };
