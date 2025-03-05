import { SystemLog } from "../utils/SystemLog.js";

export class InventoryUI {
  // 初始化背包 UI
  static initialize(gameSystem) {
    SystemLog.addMessage("[背包UI] 開始初始化");

    this.inventory = gameSystem.player.inventory;
    this.selectedItems = new Set(); // 記錄選中的物品

    // 綁定按鈕事件
    this.bindButtonEvents();

    // 初始渲染
    this.update();

    SystemLog.addMessage(`[背包UI] 初始化完成，共 ${this.inventory.items.size} 件物品 ✅`);
  }

  // // 綁定按鈕事件
  // static bindButtonEvents() {
  //   document.getElementById("SelectionButton").addEventListener("click", InventoryUI.toggleSelection);
  //   document.getElementById("useItemButton").addEventListener("click", InventoryUI.useSelectedItems);
  //   document.getElementById("addItemButton").addEventListener("click", () => SystemLog.addMessage("加入背包"));
  //   document.getElementById("removeItemButton").addEventListener("click", () => SystemLog.addMessage("移除物品"));
  // }

  // 綁定所有按鈕事件
  static bindButtonEvents() {
    const buttonActions = {
      "SelectionButton": this.toggleSelection,
      "useItemButton": this.useSelectedItems,
      "addItemButton": this.addItem,
      "removeItemButton": this.removeSelectedItems,
      "sellItemButton": this.sellSelectedItems,
    };

    Object.entries(buttonActions).forEach(([id, handler]) => {
      const button = document.getElementById(id);
      if (button) {
        button.addEventListener("click", handler.bind(this));
      } else {
        console.warn(`按鈕 ${id} 未找到`);
      }
    });
  }

  // 更新背包內容到 UI
  static update() {
    const inventoryList = document.querySelector("#backpack-list");
    inventoryList.innerHTML = ""; // 清空舊的背包內容
    // console.log(this.inventory)
    Array.from(this.inventory.items.values()).forEach(item => {
      const itemElement = InventoryUI.createItemElement(item);
      inventoryList.appendChild(itemElement);
    });
  }

  // // 創建單個物品元素
  // static createItemElement(item) {
  //   const li = document.createElement("li");
  //   li.textContent = `${item.name} (x${item.quantity})`;
  //   li.dataset.itemId = item.id;
  //   li.addEventListener("click", () => InventoryUI.toggleItemSelection(li));
  //   return li;
  // }

  // 創建單個物品 UI
  static createItemElement(item) {
    const itemElement = document.createElement("div");
    itemElement.className = "item";
    itemElement.dataset.itemId = item.id;
    if (this.selectedItems.has(item.id)) itemElement.classList.add("selected");

    // 物品名稱
    const itemName = document.createElement("h6");
    itemName.textContent = `${item.name} (x${item.quantity})`;
    itemElement.appendChild(itemName);

    // 物品標籤
    if (item.tags && item.tags.length > 0) {
      const tagList = document.createElement("div");
      tagList.className = "item-tag-list";
      item.tags.forEach(tag => {
        const tagElement = document.createElement("div");
        tagElement.className = "item-tag";
        tagElement.textContent = tag;
        tagList.appendChild(tagElement);
      });
      itemElement.appendChild(tagList);
    }

    // 點擊切換選取狀態
    itemElement.addEventListener("click", () => this.toggleItemSelection(item.id, itemElement));

    return itemElement;
  }

  // // 切換全選/取消全選
  // static toggleSelection() {
  //   const items = document.querySelectorAll("#inventoryList li");
  //   const allSelected = Array.from(items).every(item => item.classList.contains("selected"));
  //   items.forEach(item => item.classList.toggle("selected", !allSelected));
  //   SystemLog.addMessage(allSelected ? "取消選擇所有物品" : "選擇所有物品");
  // }

  // // 切換單個物品的選擇狀態
  // static toggleItemSelection(itemElement) {
  //   itemElement.classList.toggle("selected");
  //   const itemId = itemElement.dataset.itemId;
  //   const isSelected = itemElement.classList.contains("selected");
  //   SystemLog.addMessage(`${isSelected ? "選擇" : "取消選擇"}物品: ${itemId}`);
  // }

  // 切換物品選取狀態
  static toggleItemSelection(itemId, itemElement) {
    if (this.selectedItems.has(itemId)) {
      this.selectedItems.delete(itemId);
      itemElement.classList.remove("selected");
    } else {
      this.selectedItems.add(itemId);
      itemElement.classList.add("selected");
    }
    SystemLog.addMessage(`已${this.selectedItems.has(itemId) ? "選取" : "取消選取"}物品: ${itemId}`);
  }

  // 全選 / 取消全選
  static toggleSelection() {
    const allSelected = this.selectedItems.size === this.inventory.items.size;
    this.selectedItems.clear();

    if (!allSelected) {
      this.inventory.items.forEach((_, id) => this.selectedItems.add(id));
    }

    this.update();
    SystemLog.addMessage(allSelected ? "取消選擇所有物品" : "選擇所有物品");
  }

  // // 使用選中的物品
  // static useSelectedItems() {
  //   const selectedItems = document.querySelectorAll("#inventoryList li.selected");
  //   if (selectedItems.length === 0) {
  //     SystemLog.addMessage("沒有選中任何物品");
  //     return;
  //   }

  //   selectedItems.forEach(item => {
  //     const itemId = item.dataset.itemId;
  //     SystemLog.addMessage(`使用物品: ${itemId}`);
  //     // 在這裡加入具體的物品使用邏輯
  //   });
  // }

  // 使用選取的物品
  static useSelectedItems() {
    if (this.selectedItems.size === 0) {
      SystemLog.addMessage("沒有選中任何物品");
      return;
    }

    this.selectedItems.forEach(itemId => {
      SystemLog.addMessage(`使用物品: ${itemId}`);
      // TODO: 實作具體的物品使用邏輯
    });

    this.selectedItems.clear();
    this.update();
  }

  // 丟棄選中的物品
  static removeSelectedItems() {
    if (this.selectedItems.size === 0) {
      SystemLog.addMessage("沒有選中任何物品");
      return;
    }

    this.selectedItems.forEach(itemId => {
      this.inventory.items.delete(itemId);
      SystemLog.addMessage(`已丟棄物品: ${itemId}`);
    });

    this.selectedItems.clear();
    this.update();
  }

  // 售出選中的物品
  static sellSelectedItems() {
    if (this.selectedItems.size === 0) {
      SystemLog.addMessage("沒有選中任何物品");
      return;
    }

    this.selectedItems.forEach(itemId => {
      // TODO: 這裡可以加上售出獲得金錢的邏輯
      this.inventory.items.delete(itemId);
      SystemLog.addMessage(`已售出物品: ${itemId}`);
    });

    this.selectedItems.clear();
    this.update();
  }

  // 添加物品（測試用）
  static addItem() {
    const testItem = {
      id: `item${Math.floor(Math.random() * 1000)}`,
      name: `隨機道具`,
      quantity: 1,
      tags: ["測試", "稀有"],
    };

    this.inventory.items.set(testItem.id, testItem);
    SystemLog.addMessage(`已加入物品: ${testItem.name}`);
    this.update();
  }
}
