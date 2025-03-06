import { GameObject } from "./GameObject.js";
import { TreasureChest } from "./objectType/TreasureChest.js";
import { Well } from "./objectType/Well.js";
import { Lever } from "./objectType/Lever.js";
import { Fountain } from "./objectType/Fountain.js";
import { MysticAltar } from "./objectType/MysticAltar.js";
import { CursedRelic } from "./objectType/CursedRelic.js";
import { AncientStatue } from "./objectType/AncientStatue.js";
import { Ruins } from "./objectType/Ruins.js";
import { Rock } from "./objectType/Rock.js";
import { Tree } from "./objectType/Tree.js";
import { defaultObjectData } from "./defaultObjectData.js";

export class ObjectManager {
  constructor(objectData = []) {
    const mergedData = [...defaultObjectData, ...(Array.isArray(objectData) ? objectData : [])];

    this.objects = new Map(
      mergedData.map(obj => [obj.id, this.createObject(obj)])
    );
  }

  createObject(obj) {
    const objectClasses = {
      "TreasureChest": TreasureChest,
      "Well": Well,
      "Lever": Lever,
      "Fountain": Fountain,
      "MysticAltar": MysticAltar,
      "CursedRelic": CursedRelic,
      "AncientStatue": AncientStatue,
      "Ruins": Ruins,
      "Rock": Rock,
      "Tree": Tree
    };

    return new (objectClasses[obj.type] || GameObject)(obj);
  }

  getObjectById(id) {
    return this.objects.get(id) || null;
  }

  listAllObjects() {
    return Array.from(this.objects.values());
  }
}
