import React, { useState } from "react";

//Next
import { NextPage } from "next";

//Material
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { Box, Typography } from "@mui/material";

//Date
import dayjs, { Dayjs } from "dayjs";
dayjs.locale("en");

interface Props {
  start: Dayjs | null;
  end: Dayjs | null;
  changeDate: (type: string, date: Dayjs | null) => void;
}

export const FilterComponent: NextPage<Props> = ({
  start,
  end,
  changeDate,
}) => {
  const [value, setValue] = React.useState<Dayjs | null>(null);

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
            sx={{
              display: { xs: "none", sm: "none", md: "none", lg: "block" },
            }}
          >
            Detalle de controles realizados
          </Typography>
        </div>
        <div className="flex">
          <Box marginRight={2}>
            <DatePicker
              label="Desde"
              value={start}
              onChange={(newValue) => {
                changeDate("start", newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  helperText={null}
                  sx={{ backgroundColor: "info.main" }}
                />
              )}
            />
          </Box>
          <Box>
            <DatePicker
              label="Hasta"
              value={end}
              onChange={(newValue) => {
                changeDate("end", newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  helperText={null}
                  sx={{ backgroundColor: "info.main" }}
                />
              )}
            />
          </Box>
        </div>
      </Box>
    </section>
  );
};
