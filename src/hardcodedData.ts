export type SelectedTree = {
  fundsCenter: string;
  children: SelectedTree[];
};

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
    node.level = currentLevel + parents.length ;

    let currentNode = node;
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
  const result: FundsCenterNode[] = [];
  for (const item of tree) {
    const node = new FundsCenterNode(item.fundsCenter, parent);
    result.push(node);
    if (item.children && item.children.length) {
      result.push(...treeToFundsCenterNodes(item.children, node));
    }
  }
  return result;
}

export type BudgetAdresses = {
  commitmentItem: string;
  fund: string;
  fundsCenter: string;
  balance: string;
  used: string;
  budget: string;
};

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

export const selectedTreeNodes = treeToFundsCenterNodes(selectedTree);

export type GroupingKey = "fund" | "fundsCenter" | "commitmentItem";

export const groupingByOrder: GroupingKey[] = [
  "fund",
  "fundsCenter",
  "commitmentItem",
];

export type HierarchyAddresses = {
  value: string;
  balance?: string;
  used?: string;
  budget?: string;
  children: HierarchyAddresses[];
  level: number;
};

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
        currentLevel + selectedNodePath.length ,
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

// export const hierarchyAddresses: HierarchyAddresses[] = [
//   {
//     value: "G2025333",
//     children: [
//       {
//         value: "FM123",
//         children: [
//           {
//             value: "FM90430",
//             children: [
//               {
//                 value: "94343",
//                 children: [{ value: "895015452.3", children: [] }],
//               },
//               {
//                 value: "94003",
//                 children: [{ value: "100140001.0", children: [] }],
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     value: "G2025892",
//     children: [
//       {
//         value: "FM567",
//         children: [
//           {
//             value: "95123",
//             children: [{ value: "895015452.3", children: [] }],
//           },
//         ],
//       },
//       {
//         value: "FM123",
//         children: [
//           {
//             value: "90430",
//             children: [
//               {
//                 value: "94343",
//                 children: [{ value: "123456789.2", children: [] }],
//               },
//               {
//                 value: "94003",
//                 children: [
//                   { value: "111111111.3", children: [] },
//                   { value: "100140001.0", children: [] },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     value: "G2025220",
//     children: [
//       {
//         value: "FM567",
//         children: [
//           {
//             value: "95123",
//             children: [{ value: "123456789.2", children: [] }],
//           },
//         ],
//       },
//       {
//         value: "FM123",
//         children: [
//           {
//             value: "90430",
//             children: [
//               {
//                 value: "94343",
//                 children: [
//                   { value: "123456789.2", children: [] },
//                   { value: "895015452.3", children: [] },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     value: "G2025020",
//     children: [
//       {
//         value: "FM123",
//         children: [
//           {
//             value: "90430",
//             children: [
//               {
//                 value: "94003",
//                 children: [{ value: "895015452.3", children: [] }],
//               },
//             ],
//           },
//         ],
//       },

//       { value: "95600", children: [{ value: "100140001.0", children: [] }] },
//     ],
//   },
//   {
//     value: "G2025041",
//     children: [
//       {
//         value: "FM123",
//         children: [
//           {
//             value: "90430",
//             children: [
//               {
//                 value: "94343",
//                 children: [{ value: "100140001.0", children: [] }],
//               },
//               {
//                 value: "94003",
//                 children: [{ value: "123456789.2", children: [] }],
//               },
//             ],
//           },
//         ],
//       },
//       {
//         value: "FM567",
//         children: [
//           {
//             value: "95123",
//             children: [{ value: "100140001.0", children: [] }],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     value: "G2025150",
//     children: [
//       {
//         value: "FM567",
//         children: [
//           {
//             value: "95123",
//             children: [{ value: "895015452.3", children: [] }],
//           },
//         ],
//       },

//       { value: "95600", children: [{ value: "812153563.5", children: [] }] },
//     ],
//   },
// ];

export const GROUPING_OPTIONS: { value: GroupingKey[]; label: string }[] = [
  {
    value: ["fundsCenter", "commitmentItem", "fund"],
    label: "מרכז קרנות ← פריט התחייבות ← קרן",
  },
  {
    value: ["fundsCenter", "fund", "commitmentItem"],
    label: "מרכז קרנות ← קרן ← פריט התחייבות",
  },
  {
    value: ["commitmentItem", "fundsCenter", "fund"],
    label: "פריט התחייבות ← מרכז קרנות ← קרן",
  },
  {
    value: ["commitmentItem", "fund", "fundsCenter"],
    label: "פריט התחייבות ← קרן ← מרכז קרנות",
  },
  {
    value: ["fund", "fundsCenter", "commitmentItem"],
    label: "קרן ← מרכז קרנות ← פריט התחייבות",
  },
  {
    value: ["fund", "commitmentItem", "fundsCenter"],
    label: "קרן ← פריט התחייבות ← מרכז קרנות",
  },
];
