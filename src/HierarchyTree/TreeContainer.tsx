import { type HierarchyAddresses } from "../hardcodedData";
import TreeHeader from "./TreeHeader";
import Box from "@mui/material/Box";
import styles from "./TreeContainer.module.scss"; // import the stylesheet
import TreeItem from "./TreeItem";

interface TreeContainerProps {
  addressesHierarchy: HierarchyAddresses[];
}

function TreeContainer({ addressesHierarchy }: TreeContainerProps) {
  return (
    <Box className={styles.wrapper}>
      <TreeHeader />
      <Box className={styles.tree}>
        {addressesHierarchy.map((address) => (
          <TreeItem
            key={address.value}
            currentAddress={address}
            allAddressesHierarchy={addressesHierarchy}
          />
        ))}
      </Box>
    </Box>
  );
}

export default TreeContainer;
