import { FC, ReactElement, useMemo } from "react";

//Next
import { NextPage } from "next";

//Material
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";

//types
import { IUsers } from "../../interfaces";

interface Props {
  data: IUsers;
  search: string;
  isFetching: boolean;
}

const renderRole = (name: string): ReactElement => {
  const arr = name.split(",");
  const render: ReactElement[] = [];

  arr.forEach((value) => {
    if (value !== " ") {
      render.push(
        <Chip
          sx={{
            fontSize: "12px",
            marginTop: "1px",
            marginBottom: "1px",
            marginRight: "5px",
            color: "#fff",
            background: "#8EB4D4",
          }}
          label={value}
          size="small"
        />
      );
    }
  });

  return (
    <Box display={"flex"} flexWrap={"wrap"}>
      {render}
    </Box>
  );
};

export const TableComponent: NextPage<Props> = ({
  data,
  isFetching,
  search,
}) => {
  let arr = [...data.datos];

  arr = useMemo(() => {
    return data.datos.filter(
      (o) =>
        o.email.toLowerCase().includes(search) ||
        o.nombre_completo.toLowerCase().includes(search) ||
        o.roles_asignados.toLowerCase().includes(search)
    );
  }, [data.datos, search]);

  return (
    <Box margin={2}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ background: "#8EB4D4", color: "#fff" }}>
                ID
              </TableCell>
              <TableCell
                sx={{ background: "#8EB4D4", color: "#fff" }}
                align="left"
              >
                Nombre
              </TableCell>
              <TableCell
                sx={{ background: "#8EB4D4", color: "#fff" }}
                align="left"
              >
                email
              </TableCell>
              <TableCell
                sx={{ background: "#8EB4D4", color: "#fff" }}
                align="left"
              >
                Roles
              </TableCell>
              <TableCell sx={{ background: "#8EB4D4", color: "#fff" }}>
                Turno
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {arr.map((row) => (
              <TableRow
                key={row.user_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.user_id}
                </TableCell>
                <TableCell align="left">{row.nombre_completo}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">
                  {renderRole(row.roles_asignados)}
                </TableCell>
                <TableCell>{row.tipo_turno}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
