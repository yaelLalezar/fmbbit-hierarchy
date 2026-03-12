import { type HierarchyAddresses } from "../hardcodedData";
import TreeHeader from "./TreeHeader";
import Box from "@mui/material/Box";
import styles from "./TreeContainer.module.scss"; // import the stylesheet
import TreeItem from "./TreeItem";
import { use, useState } from "react";

interface TreeContainerProps {
  addressesHierarchy: HierarchyAddresses[];
}

function TreeContainer({ addressesHierarchy }: TreeContainerProps) {
    const [isAllExpanded, setAllExpanded] = useState(false);
  return (
    <Box className={styles.wrapper}>
      <TreeHeader isAllExpended={isAllExpanded} setIsAllExpended={setAllExpanded} />
      <Box className={styles.tree}>
        {addressesHierarchy.map((address) => (
          <TreeItem
            key={address.value}
            currentAddress={address}
            allAddressesHierarchy={addressesHierarchy}
            isAllExpanded={isAllExpanded}
            setIsAllExpended={setAllExpanded}
          />
        ))}
      </Box>
    </Box>
  );
}

export default TreeContainer;
