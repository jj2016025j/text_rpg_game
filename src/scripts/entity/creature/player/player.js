import { defaultPlayerData } from "./playerData.js";
import { Skill } from "../Skill/skill.js";
import { EventManager } from "../../../utils/eventManager.js";
import { BehaviorManager } from "../../state/BehaviorManager.js";
import { Creature } from "../creature.js";
import { CreatureState } from "../creatureState.js";
import { Inventory } from "../../../Inventory/inventory.js";
import { SystemLog } from "../../../utils/systemLog.js";
import { skillsData } from "../Skill/skillsData.js"; // 確保有正確導入技能數據

/**
 * 玩家類別
 * - 繼承 Creature
 */
export class Player extends Creature {
    constructor(gameSystem, initPlayerData = {}) {
        const playerData = { ...defaultPlayerData, ...initPlayerData };

        super(gameSystem, {
            id: playerData.id || "fake_id",
            name: playerData.name,
            state: playerData.state,
            inventory: playerData.inventory,
        });
        // console.log("玩家")

        this.inventory = new Inventory(gameSystem, playerData.inventory)
        this.gameSystem = gameSystem;
        this.skillList = new Set(playerData.skillList); // ✅ 只存技能 ID

        this.events = new EventManager();
        this.behavior = new BehaviorManager(this, this.events);

        this.initializeEvents();
    }

    initializeEvents() {
        this.events.on("death", () => {
            SystemLog.addMessage(`💀 [死亡] ${this.name} 已死亡`);
        });

        this.events.on("move", ({ oldLocation, newLocation }) => {
            SystemLog.addMessage(`🚶 [移動] ${this.name} 從 ${oldLocation} 移動到 ${newLocation}`);
        });

        this.events.on("skillUsed", ({ skillId, target }) => {
            const skill = this.gameSystem.skillManager.getSkillById(skillId);
            if (skill) {
                SystemLog.addMessage(`✨ [技能] ${this.name} 使用 ${skill.name} 對 ${target?.name || "未知目標"}`);
            } else {
                SystemLog.addMessage(`⚠️ 技能 ID ${skillId} 不存在`);
            }
        });
    }

    getSkillList() {
        // 使用 `map` 將 ID 轉換為技能完整物件
        return Array.from(this.skillList) // 轉換為陣列
            .map(skillId => skillsData.find(skill => skill.id === skillId) || null
            ).filter(skill => skill !== null); // 過濾掉無效技能 ID
    }

    getPlayerData() {
        return {
            name: this.name,
            id: this.id,
            state: this.state.getSerializableData(),
            inventory: this.inventory.getSerializableData(),
            skillList: this.getSkillList(),
        };
    }

    toJSON() {
        try {
            return this.getPlayerData();
        } catch (err) {
            console.error("序列化錯誤:", err);
            return null;
        }
    }
}
