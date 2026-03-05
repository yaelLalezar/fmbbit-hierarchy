import { useMemo, useState } from "react";
import { type HierarchyAddresses } from "../hardcodedData";
import TreeHeader from "./TreeHeader";
import Box from "@mui/material/Box";
import styles from "./TreeItem.module.scss";
import { IconButton, Typography } from "@mui/material";
import { ChevronLeft } from "lucide-react";

interface TreeItemProps {
  allAddressesHierarchy: HierarchyAddresses[];
  currentAddress: HierarchyAddresses;
}

function TreeItem({ allAddressesHierarchy, currentAddress }: TreeItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      <Box className={styles.item} >
        <Box className={styles.item_content} sx={{ paddingRight: `${currentAddress.level * 1}rem` }}>
          <Box className={styles.column_large}>
            <Typography className={styles.text}>{currentAddress.value}</Typography>
          </Box>
          <Box className={styles.column}>
            <Typography className={styles.text}>{currentAddress.budget}</Typography>
          </Box>
          <Box className={styles.column}>
            <Typography className={styles.text}>{currentAddress.used}</Typography>
          </Box>
          <Box className={styles.column}>
            <Typography className={styles.text}>{currentAddress.balance}</Typography>
          </Box>
        </Box>

        {currentAddress.children.length > 0 && (
          <IconButton
            onClick={() => setIsExpanded((prev) => !prev)}
            className={styles.iconButton}
          >
            <ChevronLeft
              className={isExpanded ? styles.expanded : styles.icon}
            />
          </IconButton>
        )}
      </Box>
      <Box sx={{ backgroundColor: `rgba(0, 0, 0, ${currentAddress.level * 0.1})` }}>
        {currentAddress.children.length > 0 &&
          isExpanded &&
          currentAddress.children.map((child) => (
            <Box key={child.value}>
              <TreeItem
                allAddressesHierarchy={allAddressesHierarchy}
                currentAddress={child}
              />
            </Box>
          ))}
      </Box>
    </>
  );
}

export default TreeItem;
