import { useEffect, useMemo, useState } from "react";
import { type HierarchyAddresses } from "../hardcodedData";
import TreeHeader from "./TreeHeader";
import Box from "@mui/material/Box";
import styles from "./TreeItem.module.scss";
import { IconButton, Typography } from "@mui/material";
import { ChevronLeft } from "lucide-react";

interface TreeItemProps {
  allAddressesHierarchy: HierarchyAddresses[];
  currentAddress: HierarchyAddresses;
  isAllExpanded?: boolean;
  setIsAllExpended: React.Dispatch<React.SetStateAction<boolean>>;
}

function TreeItem({
  allAddressesHierarchy,
  currentAddress,
  isAllExpanded,
  setIsAllExpended,
}: TreeItemProps) {
  const [isExpanded, setIsExpanded] = useState(isAllExpanded);

  useEffect(() => {
    setIsExpanded(isAllExpanded);
  }, [isAllExpanded]);

  return (
    <>
      <Box
        className={styles.item}
        sx={{
          backgroundColor:
            currentAddress.children.length === 0 ? "#F2F2F2" : "none",
        }}
      >
        <Box
          className={styles.title}
          sx={{ paddingRight: `${currentAddress.level}rem` }}
        >
          {currentAddress.children.length > 0 && (
            <IconButton
              onClick={() => {
                setIsExpanded((prev) => !prev);
                // setIsAllExpended(false);
              }}
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
      <Box>
        {currentAddress.children.length > 0 &&
          isExpanded &&
          currentAddress.children.map((child) => (
            <Box key={child.value}>
              <TreeItem
                allAddressesHierarchy={allAddressesHierarchy}
                currentAddress={child}
                isAllExpanded={isAllExpanded}
                setIsAllExpended={setIsAllExpended}
              />
            </Box>
          ))}
      </Box>
    </>
  );
}

export default TreeItem;
