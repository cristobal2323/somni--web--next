import React, { useState } from "react";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { Box, Typography } from "@mui/material";

export const FilterComponent = () => {
  const [start, setStart] = React.useState<Dayjs | null>(dayjs("2022-04-07"));
  const [end, setEnd] = React.useState<Dayjs | null>(dayjs("2022-05-07"));

  return (
    <section className="container">
      <Box
        display={"flex"}
        flex={1}
        paddingRight={2}
        paddingTop={2}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <div className="flex">
          <Typography
            color="primary.main"
            marginLeft={2}
            variant="h4"
            textAlign={"center"}
            fontSize={"30px"}
            fontWeight={200}
          >
            Dashboard
          </Typography>
        </div>
        <div className="flex">
          <Box marginRight={2}>
            <DatePicker
              views={["year", "month"]}
              label="Desde"
              minDate={dayjs("2012-03-01")}
              maxDate={dayjs("2023-06-01")}
              value={start}
              onChange={(newValue) => {
                setStart(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} helperText={null} />
              )}
            />
          </Box>
          <Box>
            <DatePicker
              views={["year", "month"]}
              label="Hasta"
              minDate={dayjs("2012-03-01")}
              maxDate={dayjs("2023-06-01")}
              value={end}
              onChange={(newValue) => {
                setEnd(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} helperText={null} />
              )}
            />
          </Box>
        </div>
      </Box>
    </section>
  );
};
