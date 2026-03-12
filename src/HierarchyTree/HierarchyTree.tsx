import { useMemo, useState } from "react";
import {
  buildHierarchyFromAddresses,
  groupingByOrder,
  type BudgetAdresses,
  type GroupingKey,
} from "../hardcodedData";

import Box from "@mui/material/Box";
import TreeContainer from "./TreeContainer";
import { Button } from "@mui/material";

interface HierarchyTreeProps {
  addresses: BudgetAdresses[];
}

function HierarchyTree({ addresses }: HierarchyTreeProps) {
  const [groupingKeysByOrder, setGroupingKeysByOrder] =
    useState<GroupingKey[]>(groupingByOrder);
  const [withParents, setWithParents] = useState<boolean>(true);

  const hierarchyAddresses = useMemo(() => {
    return buildHierarchyFromAddresses(addresses, groupingKeysByOrder, undefined, undefined, withParents);
  }, [addresses, groupingKeysByOrder, withParents]);

  return (
    <Box sx={{ width: "70vw" }}>
      <Button onClick={() => setWithParents(!withParents)}>
        {withParents ? "Hide Parents" : "Show Parents"}
      </Button>
      <TreeContainer addressesHierarchy={hierarchyAddresses} />
    </Box>
  );
}

export default HierarchyTree;
