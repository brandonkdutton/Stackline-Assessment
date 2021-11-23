import React, { FC, memo } from "react";
import { styled } from "@mui/system";
import XDate from "xdate";
import {
  Paper,
  Table,
  TableBody,
  TableCell as MuiCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { selectItemById } from "../redux/slices/itemsSlice";
import { useAppSelector } from "../redux/hooks";

const HeaderCell = styled(MuiCell)({
  color: "rgba(1,1,1,0.8)",
});
const TableCell = styled(MuiCell)({
  color: "rgba(1,1,1,0.5)",
});

interface Props {
  itemId: string;
}

const CustomTable: FC<Props> = ({ itemId }) => {
  const item = useAppSelector((state) => selectItemById(state, itemId));

  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <HeaderCell>WEEK ENDING</HeaderCell>
              <HeaderCell align="right">RETAIL SALES</HeaderCell>
              <HeaderCell align="right">WHOLESALE SALES</HeaderCell>
              <HeaderCell align="right">UNITS SOLD</HeaderCell>
              <HeaderCell align="right">RETAILER MARGIN</HeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {item?.sales.map((sale) => (
              <TableRow
                key={sale.weekEnding}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {new XDate(sale.weekEnding).toString("MM-dd-yy")}
                </TableCell>
                <TableCell align="right">
                  ${sale.retailSales.toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  ${sale.wholesaleSales.toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  {sale.unitsSold.toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  ${sale.retailerMargin.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default memo(CustomTable);
