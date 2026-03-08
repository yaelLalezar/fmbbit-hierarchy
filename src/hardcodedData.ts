export type SelectedTree = {
  fundsCenter: string;
  children: SelectedTree[];
};

export type BudgetAdresses = {
  commitmentItem: string;
  fund: string;
  fundsCenter: string;
  balance: string;
  used: string;
  budget: string;
};

export type HierarchyAddresses = {
  value: string;
  balance?: string;
  used?: string;
  budget?: string;
  children: HierarchyAddresses[];
  level: number;
};

export type GroupingKey = "fund" | "fundsCenter" | "commitmentItem";

export const adresses: BudgetAdresses[] = [
  {
    commitmentItem: "100140001.0",
    fund: "G2025041",
    fundsCenter: "94343",
    balance: "1000000",
    used: "10000",
    budget: "10000000",
  },
  {
    commitmentItem: "123456789.2",
    fund: "G2025041",
    fundsCenter: "94003",
    balance: "100550000",
    used: "10020000",
    budget: "1000000000",
  },
  {
    commitmentItem: "111111111.3",
    fund: "G2025892",
    fundsCenter: "94003",
    balance: "1000000",
    used: "10000",
    budget: "10000000",
  },
  {
    commitmentItem: "123456789.2",
    fund: "G2025220",
    fundsCenter: "94343",
    balance: "1000000",
    used: "10000",
    budget: "10000000",
  },
  {
    commitmentItem: "100140001.0",
    fund: "G2025041",
    fundsCenter: "95123",
    balance: "1000000",
    used: "10000",
    budget: "10000000",
  },
  {
    commitmentItem: "895015452.3",
    fund: "G2025020",
    fundsCenter: "94003",
    balance: "1000000",
    used: "10000",
    budget: "10000000",
  },
  {
    commitmentItem: "895015452.3",
    fund: "G2025150",
    fundsCenter: "95123",
    balance: "1000000",
    used: "10000",
    budget: "10000000",
  },
  {
    commitmentItem: "123456789.2",
    fund: "G2025220",
    fundsCenter: "95123",
    balance: "1000000",
    used: "10000",
    budget: "10000000",
  },
  {
    commitmentItem: "895015452.3",
    fund: "G2025220",
    fundsCenter: "94343",
    balance: "1000000",
    used: "10000",
    budget: "10000000",
  },
  {
    commitmentItem: "100140001.0",
    fund: "G2025020",
    fundsCenter: "95600",
    balance: "1000000",
    used: "10000",
    budget: "10000000",
  },
  {
    commitmentItem: "812153563.5",
    fund: "G2025333",
    fundsCenter: "94343",
    balance: "1000000",
    used: "10000",
    budget: "10000000",
  },
  {
    commitmentItem: "123456789.2",
    fund: "G2025892",
    fundsCenter: "94343",
    balance: "1000000",
    used: "10000",
    budget: "10000000",
  },
  {
    commitmentItem: "812153563.5",
    fund: "G2025150",
    fundsCenter: "95600",
    balance: "1000000",
    used: "10000",
    budget: "10000000",
  },
  {
    commitmentItem: "100140001.0",
    fund: "G2025333",
    fundsCenter: "94003",
    balance: "1000000",
    used: "10000",
    budget: "10000000",
  },
  {
    commitmentItem: "895015452.3",
    fund: "G2025892",
    fundsCenter: "95123",
    balance: "1000000",
    used: "10000",
    budget: "10000000",
  },
  {
    commitmentItem: "100140001.0",
    fund: "G2025892",
    fundsCenter: "94003",
    balance: "1000000",
    used: "10000",
    budget: "10000000",
  },
  {
    commitmentItem: "895015452.3",
    fund: "G2025892",
    fundsCenter: "12345",
    balance: "1000000",
    used: "10000",
    budget: "10000000",
  },
  {
    commitmentItem: "100140001.0",
    fund: "G2025892",
    fundsCenter: "12345",
    balance: "1000000",
    used: "10000",
    budget: "10000000",
  },
];

export const selectedTree: SelectedTree[] = [
  {
    fundsCenter: "FM123",
    children: [
      {
        fundsCenter: "FM90430",
        children: [
          { fundsCenter: "94003", children: [] },
          { fundsCenter: "94343", children: [] },
          { fundsCenter: "12345", children: [] },
        ],
      },
    ],
  },
  { fundsCenter: "FM567", children: [{ fundsCenter: "95123", children: [] }] },
  { fundsCenter: "95600", children: [] },
];

export class FundsCenterNode {
  fundsCenter: string;
  parent: FundsCenterNode | null;
  path: string[];

  constructor(fundsCenter: string, parent: FundsCenterNode | null = null) {
    this.fundsCenter = fundsCenter;
    this.parent = parent;
    this.path = parent ? [...parent.path, fundsCenter] : [fundsCenter];
  }

  public getPath(): string[] {
    return this.path;
  }

  public getHierarchy(
    node: HierarchyAddresses,
    currentLevel: number,
  ): HierarchyAddresses {
    const parents = this.path.slice(0, -1);
    let currentNode = { ...node, level: currentLevel + parents.length };

    for (let i = parents.length - 1; i >= 0; i--) {
      currentNode = {
        value: parents[i],
        balance: node.balance,
        used: node.used,
        budget: node.budget,
        children: [currentNode],
        level: currentLevel + i,
      };
    }

    return currentNode;
  }
}

export function treeToFundsCenterNodes(
  tree: SelectedTree[],
  parent: FundsCenterNode | null = null,
): FundsCenterNode[] {
  const fundCenterNodes: FundsCenterNode[] = [];
  for (const item of tree) {
    const node = new FundsCenterNode(item.fundsCenter, parent);
    fundCenterNodes.push(node);
    if (item.children && item.children.length) {
      fundCenterNodes.push(...treeToFundsCenterNodes(item.children, node));
    }
  }
  return fundCenterNodes;
}

export const selectedTreeNodes = treeToFundsCenterNodes(selectedTree);

export const groupingByOrder: GroupingKey[] = [
  "fund",
  "fundsCenter",
  "commitmentItem",
];

export function groupByKey(
  addresses: BudgetAdresses[],
  key: GroupingKey,
): Record<string, BudgetAdresses[]> {
  return addresses.reduce<Record<string, BudgetAdresses[]>>((acc, address) => {
    const keyValue = address[key];
    if (!acc[keyValue]) {
      acc[keyValue] = [];
    }
    acc[keyValue].push(address);
    return acc;
  }, {});
}

const getTotalBalanceAndUsed = (
  groupedAddresses: BudgetAdresses[],
): { totalBalance: number; totalUsed: number; totalBudget: number } => {
  const totalBalance = groupedAddresses.reduce(
    (sum, address) => sum + parseInt(address.balance || "0"),
    0,
  );
  const totalUsed = groupedAddresses.reduce(
    (sum, address) => sum + parseInt(address.used || "0"),
    0,
  );

  const totalBudget = groupedAddresses.reduce(
    (sum, address) => sum + parseInt(address.budget || "0"),
    0,
  );
  return { totalBalance, totalUsed, totalBudget };
};

export function buildHierarchyFromAddresses(
  addresses: BudgetAdresses[],
  groupingKeys: GroupingKey[] = groupingByOrder,
  selectedTreeData: FundsCenterNode[] = selectedTreeNodes,
  currentLevel: number = 1,
): HierarchyAddresses[] {
  if (groupingKeys.length === 0 || addresses.length === 0) {
    return [];
  }
  const currentKey = groupingKeys[0];
  const remainingKeys = groupingKeys.slice(1);

  const grouped = groupByKey(addresses, currentKey);

  const nodes: HierarchyAddresses[] = [];

  Object.entries(grouped).forEach(([value, groupedAddresses]) => {
    const node: HierarchyAddresses = {
      value,
      children: [],
      level: currentLevel,
    };

    const { totalBalance, totalUsed, totalBudget } =
      getTotalBalanceAndUsed(groupedAddresses);

    node.balance = totalBalance.toString();
    node.used = totalUsed.toString();
    node.budget = totalBudget.toString();

    if (currentKey === "fundsCenter") {
      const selectedNode = selectedTreeData.find(
        (item) => item.fundsCenter === value,
      );

      const selectedNodePath = selectedNode ? selectedNode.getPath() : [];

      node.children = buildHierarchyFromAddresses(
        groupedAddresses,
        remainingKeys,
        selectedTreeData,
        currentLevel + selectedNodePath.length,
      );

      if (selectedNode && selectedNodePath && selectedNodePath.length > 0) {
        const hierarchyNode = selectedNode.getHierarchy(node, currentLevel);
        nodes.push(hierarchyNode);
      } else {
        nodes.push(node);
      }
    } else {
      node.children = buildHierarchyFromAddresses(
        groupedAddresses,
        remainingKeys,
        selectedTreeData,
        currentLevel + 1,
      );
      nodes.push(node);
    }
  });

  return mergeNodesByValue(nodes);
}

function mergeNodesByValue(nodes: HierarchyAddresses[]): HierarchyAddresses[] {
  const merged = new Map<string, HierarchyAddresses>();

  nodes.forEach((node) => {
    if (merged.has(node.value)) {
      const existing = merged.get(node.value)!;

      existing.children = mergeNodesByValue([
        ...existing.children,
        ...node.children,
      ]);

      if (node.balance !== undefined && existing.balance !== undefined) {
        existing.balance = (
          parseInt(existing.balance) + parseInt(node.balance)
        ).toString();
      }
      if (node.used !== undefined && existing.used !== undefined) {
        existing.used = (
          parseInt(existing.used) + parseInt(node.used)
        ).toString();
      }
      if (node.budget !== undefined && existing.budget !== undefined) {
        existing.budget = (
          parseInt(existing.budget) + parseInt(node.budget)
        ).toString();
      }
    } else {
      merged.set(node.value, node);
    }
  });

  return Array.from(merged.values());
}