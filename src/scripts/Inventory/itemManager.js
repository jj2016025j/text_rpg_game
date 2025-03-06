import { Item, Food, Potion, Weapon, Armor, Tool, Material } from "./Item.js";
import { itemsData } from "./itemData.js";

export class ItemManager {
    constructor() {
        this.items = new Map();

        // ✅ 初始化所有物品
        itemsData.forEach((itemData) => {
            let item;
            switch (itemData.type) {
                case "Food":
                    item = new Food(itemData);
                    break;
                case "Potion":
                    item = new Potion(itemData);
                    break;
                case "Weapon":
                    item = new Weapon(itemData);
                    break;
                case "Armor":
                    item = new Armor(itemData);
                    break;
                case "Tool":
                    item = new Tool(itemData);
                    break;
                case "Material":
                    item = new Material(itemData);
                    break;
                default:
                    item = new Item(itemData);
                    break;
            }
            this.items.set(itemData.id, item);
        });
    }

    getItemById(id) {
        return this.items.get(id) || null;
    }
}
