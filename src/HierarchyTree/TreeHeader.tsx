import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import styles from './TreeHeader.module.scss';                  // import the stylesheet

function TreeHeader() {
  return (
    <Box className={styles.tree_header}>
      <Box className={styles.column_large}>
        <Typography className={styles.header_text}>שם המפקדה</Typography>
      </Box>
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
  );
}

export default TreeHeader;
