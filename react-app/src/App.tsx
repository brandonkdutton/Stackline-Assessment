import React, { FC, memo, useEffect } from "react";
import {
  createTheme,
  Grid,
  Toolbar,
  AppBar,
  ThemeProvider,
} from "@mui/material";

import Item from "./components/Item";
import Chart from "./components/Chart";
import Table from "./components/Table";

import { useAppDispatch } from "./redux/hooks";
import { fetchItems } from "./redux/thunks/itemsThunk";

const theme = createTheme({
  palette: {
    primary: {
      main: "#072d4c",
    },
    background: {
      default: "#f6f8fa",
    },
  },
});

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  // I built this app as if there would be many items, but since there's just
  // one, I'm passing the components a hard-coded Id.
  const itemId = "B007TIE0GQ";

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky">
        <Toolbar
          sx={{
            height: 50,
          }}
        >
          <img src="stackline_logo.svg" alt="" style={{ height: "60%" }} />
        </Toolbar>
      </AppBar>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid item container xs={3}>
          <Item itemId={itemId} />
        </Grid>
        <Grid item container xs={9} spacing={2} direction="column">
          <Grid item>
            <Chart itemId={itemId} />
          </Grid>
          <Grid item>
            <Table itemId={itemId} />
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default memo(App);
