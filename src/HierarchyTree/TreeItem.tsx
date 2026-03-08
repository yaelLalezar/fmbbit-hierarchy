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
      <Box className={styles.item}>
        <Box
          className={styles.title}
          sx={{ paddingRight: `${currentAddress.level}rem` }}
        >
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
          <Typography className={styles.text}>
            {currentAddress.value}
          </Typography>
        </Box>
        <Box className={styles.budget_details}>
          <Box className={styles.column}>
            <Typography className={styles.text}>
              {currentAddress.budget}
            </Typography>
          </Box>
          <Box className={styles.column}>
            <Typography className={styles.text}>
              {currentAddress.used}
            </Typography>
          </Box>
          <Box className={styles.column}>
            <Typography className={styles.text}>
              {currentAddress.balance}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: `rgba(0, 0, 0, ${currentAddress.level * 0.02})`,
        }}
      >
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
