import { SystemLog } from "../../utils/systemLog.js";

class AttributeHandler {
    static apply(attributes, states) {
        Object.keys(attributes).forEach((key) => {
            const value = attributes[key];
            if (AttributeHandler.handlers[key]) {
                AttributeHandler.handlers[key](value, states);
            } else {
                SystemLog.addMessage(`⚠️ 未定義的屬性影響: ${key}`);
            }
        });
    }
}

// 定義不同屬性的影響策略
AttributeHandler.handlers = {
    health: (value, states) => {
      states.health = Math.max(0, Math.min(states.maxHealth, states.health + value));
      SystemLog.addMessage(`🩹 調整生命值：${value}`);
    },
    heal: (value, states) => {
        states.health = Math.min(states.maxHealth, states.health + value);
        SystemLog.addMessage(`💖 恢復 ${value} 點生命值`);
    },
    mana: (value, states) => {
        states.mana = Math.min(states.maxMana, states.mana + value);
        SystemLog.addMessage(`🔮 恢復 ${value} 點魔力`);
    },
    experience: (value, states) => {
        states.gainExperience(value);
        SystemLog.addMessage(`✨ 增加 ${value} 點經驗值`);
    },
    strength: (value, states) => {
        states.strength += value;
        SystemLog.addMessage(`💪 力量增加 ${value}`);
    },
    saturation: (value, states) => {
        states.saturation = Math.min(states.maxSaturation, states.saturation + value);
        SystemLog.addMessage(`🍗 飽食度增加 ${value}`);
    },
};

export { AttributeHandler };
