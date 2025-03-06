import { GameObject } from "./gameObject.js";
import { TreasureChest } from "./objectType/treasureChest.js";
import { Well } from "./objectType/well.js";
import { Lever } from "./objectType/lever.js";
import { Fountain } from "./objectType/fountain.js";
import { MysticAltar } from "./objectType/mysticAltar.js";
import { CursedRelic } from "./objectType/cursedRelic.js";
import { AncientStatue } from "./objectType/ancientStatue.js";
import { Ruins } from "./objectType/ruins.js";
import { Rock } from "./objectType/rock.js";
import { Tree } from "./objectType/tree.js";
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
