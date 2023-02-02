import Box from '@mui/material/Box';
import { GridToolbarQuickFilter } from '@mui/x-data-grid';

function QuickSearchToolbar() {
    return (
      <Box
        sx={{
          p: 0.5,
          pb: 0,
        }}
      >
        <GridToolbarQuickFilter />
      </Box>
    );
}

export default QuickSearchToolbar;