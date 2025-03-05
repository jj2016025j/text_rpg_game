import { SystemLog } from "../utils/SystemLog.js";

export class ShopUI {
    static initialize(gameSystem) {
        SystemLog.addMessage("[商店UI] 開始初始化");
        this.gameSystem = gameSystem;
        this.update();
        SystemLog.addMessage("[商店UI] 已初始化 ✅");
    }

    // ✅ 更新商店 UI（當玩家移動時自動更新）
    static update() {
        const mapRegion = this.gameSystem.currentLocation;
        if (!mapRegion || typeof mapRegion.listShops !== "function") {
            console.error("❌ 當前地圖數據異常，無法獲取商店");
            return;
        }

        this.shops = mapRegion.listShops(this.gameSystem.shopManager);
        console.log(this.shops)
        this.render();
        SystemLog.addMessage(`[商店UI] 更新 ${this.shops.length} 間商店`);
    }

    // ✅ 渲染商店 UI，直接列出所有商品
    static render() {
        const shopList = document.querySelector("#shop-list");
        if (!shopList) {
            console.error("❌ 無法找到 #shopsList，請確認 HTML 結構");
            return;
        }

        shopList.innerHTML = ""; // 清空列表

        if (!this.shops || this.shops.length === 0) {
            shopList.innerHTML = "<div class='no-shop'>🛒 這個地點沒有商店</div>";
            return;
        }

        this.shops.forEach(shop => {
            const shopElement = ShopUI.createShopElement(shop);
            shopList.appendChild(shopElement);
        });
    }

    // ✅ 創建單個商店 UI 元素
    static createShopElement(shop) {
        const shopDiv = document.createElement("div");
        shopDiv.className = "shop";
        shopDiv.dataset.shopId = shop.id;

        // 商店標題
        const shopTitle = document.createElement("div");
        shopTitle.className = "shop-title";

        const shopName = document.createElement("h4");
        shopName.textContent = shop.name;

        // 按鈕區域（全選 & 購買）
        const shopButtons = document.createElement("div");
        shopButtons.className = "shop-buttons";

        const selectAllButton = document.createElement("div");
        selectAllButton.className = "backpack-button";
        selectAllButton.textContent = "全選";
        selectAllButton.addEventListener("click", () => ShopUI.selectAllItems(shopDiv));

        const buyButton = document.createElement("div");
        buyButton.className = "backpack-button";
        buyButton.textContent = "購買";
        buyButton.addEventListener("click", () => ShopUI.purchaseSelectedItems(shopDiv, shop));

        shopButtons.appendChild(selectAllButton);
        shopButtons.appendChild(buyButton);

        shopTitle.appendChild(shopName);
        shopTitle.appendChild(shopButtons);

        // 物品清單
        const commodityList = document.createElement("div");
        commodityList.className = "commodity-list";

        // ✅ 取得商店內的物品列表
        console.log(shop)
        shop.inventory.getItems().forEach(item => {
            const itemElement = ShopUI.createItemElement(item);
            commodityList.appendChild(itemElement);
        });

        shopDiv.appendChild(shopTitle);
        shopDiv.appendChild(commodityList);

        return shopDiv;
    }

    // ✅ 創建單個商品 UI 元素
    static createItemElement(item) {
        const commodityDiv = document.createElement("div");
        commodityDiv.className = "commodity";
        commodityDiv.dataset.itemId = item.id;

        // 物品名稱
        const itemName = document.createElement("h6");
        itemName.textContent = item.name;

        // 物品標籤（屬性）
        const tagList = document.createElement("div");
        tagList.className = "commodity-tag-list";

        Object.entries(item.attributes).forEach(([key, value]) => {
            const tag = document.createElement("div");
            tag.className = "commodity-tag";
            tag.innerHTML = `<h6>${key} +${value}</h6>`;
            tagList.appendChild(tag);
        });

        commodityDiv.appendChild(itemName);
        commodityDiv.appendChild(tagList);

        // ✅ 點擊選擇商品
        commodityDiv.addEventListener("click", () => {
            commodityDiv.classList.toggle("selected");
        });

        return commodityDiv;
    }

    // ✅ 全選 / 取消選取所有物品
    static selectAllItems(shopElement) {
        const items = shopElement.querySelectorAll(".commodity");
        const allSelected = Array.from(items).every(item => item.classList.contains("selected"));
        items.forEach(item => item.classList.toggle("selected", !allSelected));
        SystemLog.addMessage(allSelected ? "取消選擇所有物品" : "選擇所有物品");
    }

    // ✅ 購買所選商品
    static purchaseSelectedItems(shopElement, shop) {
        const selectedItems = shopElement.querySelectorAll(".commodity.selected");
        if (selectedItems.length === 0) {
            SystemLog.addMessage("❌ 沒有選擇任何商品");
            return;
        }

        selectedItems.forEach(itemElement => {
            const itemId = itemElement.dataset.itemId;
            const item = shop.inventory.getItemById(itemId);
            if (!item) return;

            if (this.gameSystem.player.inventory.gold >= item.price) {
                this.gameSystem.player.inventory.addItem(item);
                this.gameSystem.player.inventory.gold -= item.price;
                SystemLog.addMessage(`💰 購買 ${item.name} 成功 (-${item.price} 金幣)`);
            } else {
                SystemLog.addMessage(`❌ 金幣不足，無法購買 ${item.name}`);
            }
        });

        ShopUI.update(); // 重新更新 UI
    }
}
