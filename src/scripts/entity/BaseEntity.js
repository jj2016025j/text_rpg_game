import { EntityState } from "./entityState.js";

/**
 * 生命體基礎類別
 * - 玩家 (Player)、NPC、Creature (生物) 繼承此類別
 */
export class BaseEntity {
    constructor({ id = "unknown", name = "未知", state = {} }) {
        this.id = id;
        this.name = name;
        this.state = new EntityState(this, state);
    }

    // 獲取基本資訊
    getInfo() {
        return {
            id: this.id,
            name: this.name,
            health: this.state.health,
            mana: this.state.mana,
            level: this.state.level
        };
    }
}
