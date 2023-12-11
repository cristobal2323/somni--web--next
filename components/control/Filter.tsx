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
            Controles diarios por personas
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
              slotProps={{
                textField: {
                  sx: { backgroundColor: "info.main" },
                  helperText: null,
                },
              }}
            />
          </Box>
          <Box>
            <DatePicker
              label="Hasta"
              value={end}
              onChange={(newValue) => {
                changeDate("end", newValue);
              }}
              slotProps={{
                textField: {
                  sx: { backgroundColor: "info.main" },
                  helperText: null,
                },
              }}
            />
          </Box>
        </div>
      </Box>
    </section>
  );
};
