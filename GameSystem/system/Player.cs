using System.Numerics;

public class Player : IBusiness
{
    public string Name { get; private set; }
    public Inventory Inventory { get; private set; }
    public PlayerStats PlayerStats { get; private set; }
    public NPC_AI NPC_AI { get; private set; }
    private List<ISkill> Skills = new List<ISkill>();
    public List<Player> Friends { get; set; } = new List<Player>();
    public List<Player> Acquaintances { get; set; } = new List<Player>();

    public Player(string name, int gold = 0)
    {
        Name = name;
        Inventory = new Inventory(gold);
        PlayerStats = new PlayerStats();
        NPC_AI = new NPC_AI();
    }

    public void Collect(ICollectable collectable)
    {
        collectable.Collect(this);
    }

    public void AddItemsToInventory(Dictionary<Item, int> itemsToAdd)
    {
        Inventory.AddItems(itemsToAdd);
    }

    public void RemoveItemsFromInventory(Dictionary<Item, int> itemsToRemove)
    {
        if (itemsToRemove != null)
        {
            foreach (var entry in itemsToRemove)
            {
                Inventory.RemoveItem(entry.Key, entry.Value);
            }

        }
    }

    public void UseItem(Item item)
    {
        Inventory.UseItem(this, item);
    }

    public void InteractWith(IInteractable interactable)
    {
        interactable.Interact();
    }

    public void LearnSkill(ISkill skill)
    {
        if (!Skills.Contains(skill))
        {
            Skills.Add(skill);
        }
        else
        {
            Program.TypeTextWithThreadSleep($"玩家已經學會了 {skill.Name} 技能。");
        }
    }

    public void UnlearnSkill(ISkill skill)
    {
        Skills.Remove(skill);
        Program.TypeTextWithThreadSleep($"移除{skill}技能");
    }

    public ISkill GetSkillByName(string skillName)
    {
        var iSkill = Skills.FirstOrDefault(s => s.Name == skillName);
        //if (iSkill != null)
        return iSkill;
    }

    public void UseSkill<T>() where T : ISkill
    {
        var skill = Skills.OfType<T>().FirstOrDefault();
        if (skill != null)
        {
            skill.Execute(this);
        }
        else
        {
            Program.TypeTextWithThreadSleep($"{Name} 沒有學會這個技能，無法使用它。");
        }
    }

    public void UseSkill(string skillName)
    {
        ISkill skill = Skills.FirstOrDefault(s => s.Name == skillName);
        if (skill != null)
        {
            skill.Execute(this);
        }
        else
        {
            Program.TypeTextWithThreadSleep($"{this} 尚未學習 {skillName} 技能。");
        }
    }

    public List<Player> FindPeopleWithBusinessSkill()
    {
        var peopleWithBusiness = new List<Player>();

        foreach (var friend in Friends)
        {
            peopleWithBusiness.Add(friend);
        }
        foreach (var acquaintance in Acquaintances)
        {
            peopleWithBusiness.Add(acquaintance);
        }
        return peopleWithBusiness;
    }

    public bool BuyItem(Player buyer, Player seller, Item item, int quantity = 1)
    {
        return Inventory.BuyItem(buyer, seller, item, quantity);
    }

    public bool SellItem(Player seller, Player buyer, Item item, int quantity = 1)
    {
        return Inventory.SellItem(seller, buyer, item, quantity);
    }

    public void DailyChanges()
    {
        PlayerStats.DailyChanges(this);
        NPC_AI.DecideAction(this);
        DisplayInventory();
    }

    public void DisplayInventory()
    {
        Inventory.DisplayInventory(this);
    }

    public void DisplayStats()
    {
        PlayerStats.DisplayStats(this);
    }
}
