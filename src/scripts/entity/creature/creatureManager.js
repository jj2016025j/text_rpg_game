import { Creature } from "./creature.js";
import { creatureData } from "./creatureData.js";
import { SystemLog } from "../../utils/systemLog.js";

export class CreatureManager {
    constructor(gameSystem, customCreatures = []) {
        this.gameSystem = gameSystem;

        // 確保傳入的是陣列，並合併內建生物數據
        const allCreatures = [...creatureData, ...(Array.isArray(customCreatures) ? customCreatures : [])];

        // ✅ 排查問題：確保每個生物對象都有 id
        allCreatures.forEach(creature => {
            if (!creature.id) {
                console.error("❌ 錯誤: 生物缺少 ID", creature);
            }
        });

        // ✅ 轉換成 Map 以便快速存取
        this.creatures = new Map(
            allCreatures.map(creature => {
                // console.log(`📌 正在創建生物: ${creature.id} - ${creature.name}`);
                return [creature.id, new Creature(this.gameSystem, creature)];
            })
        );

        SystemLog.addMessage(`[CreatureManager] 初始化完成，共 ${this.creatures.size} 種生物`);
    }

    // ✅ 依照 ID 獲取生物
    getCreatureById(id) {
        return this.creatures.get(id) || null;
    }

    // ✅ 取得所有生物
    listAllCreatures() {
        return Array.from(this.creatures.values());
    }

    // ✅ 根據地區列出生物
    getCreaturesInLocation(location) {
        return location.creatureIds.map(id => this.getCreatureById(id)).filter(creature => creature !== null);
    }
}
