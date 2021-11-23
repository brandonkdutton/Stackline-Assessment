import React, { FC, memo } from "react";
import { styled } from "@mui/system";
import { Paper, Typography, Grid, Divider, Chip } from "@mui/material";

import { useAppSelector } from "../redux/hooks";
import { selectItemById } from "../redux/slices/itemsSlice";

const StyledDivider = styled(Divider)({
  width: "100%",
});
const CenteredGridItem = styled(Grid)({
  width: "100%",
  display: "flex",
  justifyContent: "center",
});

interface Props {
  itemId: string;
}
const Item: FC<Props> = ({ itemId }) => {
  const item = useAppSelector((state) => selectItemById(state, itemId));

  return (
    <Paper
      sx={{
        height: "100%",
        width: "100%",
      }}
    >
      <Grid container direction="column" alignItems="center" spacing={1}>
        <CenteredGridItem item>
          <img src={item?.image} alt="" style={{ width: "60%" }} />
        </CenteredGridItem>
        <Grid item container direction="column" alignItems="center" spacing={1}>
          <Grid item>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {item?.title}
            </Typography>
          </Grid>
          <CenteredGridItem item>
            <Typography
              variant="body2"
              sx={{ opacity: "50%", textAlign: "center", width: "80%" }}
            >
              {item?.subtitle}
            </Typography>
          </CenteredGridItem>
        </Grid>
        <CenteredGridItem item>
          <StyledDivider />
        </CenteredGridItem>
        <Grid
          item
          container
          spacing={1}
          sx={{ width: "90%", marginTop: 1, marginBottom: 1 }}
        >
          {item?.tags.map((tag) => (
            <Grid item key={tag}>
              <Chip
                variant="outlined"
                size="small"
                label={tag}
                sx={{ borderRadius: 1 }}
              />
            </Grid>
          ))}
        </Grid>
        <CenteredGridItem item>
          <StyledDivider />
        </CenteredGridItem>
      </Grid>
    </Paper>
  );
};

export default memo(Item);
