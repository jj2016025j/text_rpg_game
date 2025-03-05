import { Shop } from "./Shop.js";
import { shopData } from "./shopData.js";

export class ShopManager {
    constructor(gameSystem) {
        this.gameSystem = gameSystem;
        this.shops = new Map();
        this.initializeShops();
    }

    // ✅ 初始化商店
    initializeShops() {
        shopData.forEach(shopInfo => {
            this.shops.set(shopInfo.id, new Shop(this.gameSystem, shopInfo));
        });
    }

    // ✅ 透過 ID 獲取商店
    getShopById(id) {
        // console.log(this.shops)
        return this.shops.get(id) || null;
    }

    // ✅ 獲取所有商店列表
    getAllShops() {
        return Array.from(this.shops.values());
    }
}
