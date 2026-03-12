import Box from "@mui/material/Box";
import { IconButton, Typography } from "@mui/material";
import styles from "./TreeHeader.module.scss"; // import the stylesheet
import { ChevronLeft, ChevronsLeft } from "lucide-react";


interface TreeHeaderProps {
    isAllExpended: boolean;
    setIsAllExpended: React.Dispatch<React.SetStateAction<boolean>>;
}

function TreeHeader({ isAllExpended, setIsAllExpended }: TreeHeaderProps) {
  return (
    <Box className={styles.tree_header}>
      <Box sx={{display:'flex', alignItems: 'center'}}>
        <IconButton
          onClick={() => setIsAllExpended((prev) => !prev)}
          className={styles.iconButton}
        >
          <ChevronsLeft className={ isAllExpended ? styles.expanded : styles.icon} />
        </IconButton>
        <Typography className={styles.header_text}>שם המפקדה</Typography>
      </Box>
      <Box className={styles.budget_titles}>
        <Box className={styles.column}>
          <Typography className={styles.header_text}>תקציב</Typography>
        </Box>
        <Box className={styles.column}>
          <Typography className={styles.header_text}>ניצול</Typography>
        </Box>
        <Box className={styles.column}>
          <Typography className={styles.header_text}>יתרה</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default TreeHeader;
