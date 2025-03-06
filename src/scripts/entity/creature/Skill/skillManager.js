import { skillsData } from "./skillsData.js";

export class SkillManager {
    constructor() {
        this.skills = { skillsData };
    }

    getSkillById(id) {
        return this.skills[id] || null;
    }
}
