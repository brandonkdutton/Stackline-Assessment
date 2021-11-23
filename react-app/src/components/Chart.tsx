import React, { FC, memo, useMemo } from "react";
import { Paper } from "@mui/material";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { useAppSelector } from "../redux/hooks";
import { selectItemById } from "../redux/slices/itemsSlice";
import { Sale } from "../redux/types/itemTypes";

// Chart configuration options. Memoized to avoided recomputation.
const makeOptions = (
  keys: (keyof Sale)[],
  salesData?: Sale[]
): Highcharts.Options => ({
  title: {
    align: "left",
    text: "Retail Sales",
  },
  series: keys.map((key, index) => ({
    marker: {
      enabled: false,
    },
    color: ["#42a6f6", "#9ba6bf"][index % 2],
    name: key,
    type: "spline",
    data: salesData?.map((sale) => ({
      x: new Date(sale.weekEnding).getTime(),
      y: sale?.[key] as number,
    })),
  })),
  yAxis: {
    title: { text: null },
    labels: {
      enabled: false,
    },
  },
  xAxis: {
    title: { text: null },
    type: "datetime",
    dateTimeLabelFormats: {
      month: "%b",
    },
    labels: {
      style: {
        textTransform: "uppercase",
        color: "rgba(0,0,0,0.4)",
      },
    },
  },
  legend: {
    enabled: false,
  },
});

interface Props {
  itemId: string;
}

const Chart: FC<Props> = ({ itemId }) => {
  const item = useAppSelector((state) => selectItemById(state, itemId));
  const options = useMemo(
    () => makeOptions(["retailSales", "retailerMargin"], item?.sales),
    [item]
  );

  return (
    <Paper sx={{ height: "100%", width: "100%" }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Paper>
  );
};

export default memo(Chart);
