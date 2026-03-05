import { useMemo, useState } from 'react'
import { buildHierarchyFromAddresses, GROUPING_OPTIONS, groupingByOrder, selectedTree, treeToFundsCenterNodes, type BudgetAdresses, type GroupingKey } from '../hardcodedData'    
import TreeHeader from './TreeHeader'
import Box from '@mui/material/Box';
import TreeContainer from './TreeContainer';

interface HierarchyTreeProps {
  addresses: BudgetAdresses[];
}

function HierarchyTree({ addresses }: HierarchyTreeProps) {

    const [groupingKeysByOrder , setGroupingKeysByOrder] = useState<GroupingKey[]>(groupingByOrder)

    const hierarchyAddresses = useMemo(() => {
      return buildHierarchyFromAddresses(addresses, groupingKeysByOrder);
    }, [addresses, groupingKeysByOrder]);

  return (
    <Box sx={{width:'70vw'}}>
    <TreeContainer addressesHierarchy={hierarchyAddresses}/>

    </Box>
  )
}

export default HierarchyTree
