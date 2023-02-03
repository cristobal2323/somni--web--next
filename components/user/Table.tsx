import { ReactElement, useMemo, useState } from "react";

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
  Tooltip,
  IconButton,
} from "@mui/material";

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";

//Components
import { ModalTurnoComponent, ModalRoleComponent } from "./index";
import { LoaderComponent } from "../ui";

//types
import { IUsers } from "../../interfaces";

interface Props {
  data: IUsers;
  search: string;
  isFetching: boolean;
}

type Turno = {
  turno_id: number;
  turno_nombre: string;
  asignado: boolean;
};

const renderRole = (name: string): ReactElement => {
  const arr = name.split(",");
  const render: ReactElement[] = [];

  arr.forEach((value, i) => {
    if (value.trim() !== "") {
      render.push(
        <Chip
          key={`index-${i}`}
          sx={{
            fontSize: "12px",
            marginTop: "1px",
            marginBottom: "1px",
            marginRight: "5px",
            color: "#fff",
            background: "#8EB4D4",
          }}
          label={value.trim()}
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

const getArrRole = (name: string): string[] => {
  const arr = name.split(",");
  const arrRoles: string[] = [];

  arr.forEach((value, i) => {
    if (value !== " ") {
      arrRoles.push(value.trim());
    }
  });

  return arrRoles;
};

const getTurno = (arr: Turno[]): string => {
  if (arr.length === 0 || arr === null) {
    return "Sin turnos";
  }
  const text = arr.find((o) => o.asignado === true)?.turno_nombre;

  return text || "Sin turnos";
};

const getTurnoId = (arr: Turno[]): string => {
  if (arr.length === 0 || arr === null) {
    return "Sin turnos";
  }
  const id = arr.find((o) => o.asignado === true)?.turno_id;

  return id?.toString() || "Sin turnos";
};

// Start Component
export const TableComponent: NextPage<Props> = ({
  data,
  isFetching,
  search,
}) => {
  // General State
  // Useres
  const [userId, setUserId] = useState<number>(0);
  // Turnos
  const [openTurno, setOpenTurno] = useState<boolean>(false);
  const [turnos, setTurnos] = useState<Turno[] | []>([]);
  const [turnoId, setTurnoId] = useState<string>("");
  // Roles
  const [openRole, setOpenRole] = useState<boolean>(false);
  const [roles, setRoles] = useState<string[]>([]);

  let arr = data?.datos && data.ejecucion.estado ? [...data.datos] : [];

  arr = useMemo(() => {
    return arr.filter(
      (o) =>
        o.email.toLowerCase().includes(search) ||
        o.nombre_completo.toLowerCase().includes(search) ||
        o.roles_asignados.toLowerCase().includes(search)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.datos, search]);

  // Functions turno
  const handleClickOpenTurno = (
    selectUserId: number,
    selectTurnos: Turno[]
  ): void => {
    setOpenTurno(true);
    setTurnoId(getTurnoId(selectTurnos));
    setTurnos(selectTurnos);
    setUserId(selectUserId);
  };

  const handleCloseTurno = (): void => {
    setOpenTurno(false);
  };
  // Functions role
  const handleClickOpenRole = (
    selectUserId: number,
    selectRole: string
  ): void => {
    setRoles(getArrRole(selectRole));
    setOpenRole(true);
    setUserId(selectUserId);
  };

  const handleCloseRole = (): void => {
    setOpenRole(false);
  };

  return (
    <Box margin={2} position={"relative"}>
      <ModalTurnoComponent
        handleCloseTurno={handleCloseTurno}
        openTurno={openTurno}
        turnos={turnos}
        turnoId={turnoId}
        userId={userId}
      />
      <ModalRoleComponent
        handleCloseRole={handleCloseRole}
        openRole={openRole}
        roles={roles}
        userId={userId}
      />
      <TableContainer component={Paper}>
        {isFetching && <LoaderComponent borderRadius={1} />}
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
                Tipo turno
              </TableCell>
              <TableCell sx={{ background: "#8EB4D4", color: "#fff" }}>
                Turno
              </TableCell>
              <TableCell sx={{ background: "#8EB4D4", color: "#fff" }}>
                Acción
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
                <TableCell align="left">
                  {getTurno(row.asignaciones_turno)}
                </TableCell>
                <TableCell>{row.tipo_turno}</TableCell>
                <TableCell>
                  <Tooltip title="Cambiar turno">
                    <IconButton
                      size="small"
                      onClick={() => {
                        handleClickOpenTurno(
                          row.user_id,
                          row.asignaciones_turno
                        );
                      }}
                      sx={{
                        "&:hover": {
                          color: "secondary.light",
                          cursor: "pointer",
                        },
                      }}
                    >
                      <AccessAlarmIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Roles">
                    <IconButton
                      size="small"
                      onClick={() => {
                        handleClickOpenRole(row.user_id, row.roles_asignados);
                      }}
                      sx={{
                        "&:hover": {
                          color: "secondary.light",
                          cursor: "pointer",
                        },
                      }}
                    >
                      <AdminPanelSettingsIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
