import React, { useEffect, useState } from "react";
import axios from "axios";

//Next
import NextLink from "next/link";
import { NextPage } from "next";

import { styled } from "@mui/material/styles";

import TextField from "@mui/material/TextField";
import { Box, Typography, Button } from "@mui/material";
import { ColorButton } from "../../utils/customButtons";

import { usePostUploadArchiveMutation } from "../../services/upload";

import { CloudUpload } from "@mui/icons-material";
import { ModalCheckComponent } from "./ModalCheck";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { ModalUploadFileComponent } from "./ModalUploadFile";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface Props {
  search: string;
  changeInputSearch: (value: string) => void;
}

export const FilterComponent: NextPage<Props> = ({
  search,
  changeInputSearch,
}) => {
  const [uploadArchive, result] = usePostUploadArchiveMutation();

  const [modalCheck, setModalCheck] = useState<boolean>(false);
  const [modalUpload, setModalUpload] = useState<boolean>(false);

  const empresaId = useSelector((state: RootState) => state.home.empresa_id);

  const validarExt = async () => {
    return new Promise<boolean>((resolve) => {
      const archivoInput = document.getElementById(
        "file"
      ) as HTMLInputElement | null;

      if (!archivoInput) {
        resolve(false);
        return;
      }

      const archivoRuta = archivoInput.value;
      const extPermitidas = /(.xlsx|.csv|.xls)$/i;

      if (!extPermitidas.exec(archivoRuta)) {
        setModalCheck(true);
        archivoInput.value = "";
        resolve(false);
      } else {
        if (archivoInput.files && archivoInput.files[0]) {
          resolve(true);
        }
      }
    });
  };

  const handleUploadUsers = async ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) {
      return;
    }

    const isValid = await validarExt();

    if (isValid) {
      const formData = new FormData();
      formData.append("file", target.files[0]);
      formData.append("empresa_id", empresaId);

      setModalUpload(true);

      uploadArchive({
        data: formData,
      });
    }
  };

  return (
    <section className="container">
      <ModalCheckComponent
        openCheck={modalCheck}
        handleCloseCheck={() => setModalCheck(false)}
      />

      <ModalUploadFileComponent
        openUpload={modalUpload}
        handleCloseUpload={() => setModalUpload(false)}
        result={result}
      />

      <Box
        display={"flex"}
        flex={1}
        paddingRight={2}
        paddingTop={2}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <div className="flex" style={{ alignItems: "center" }}>
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
            Listado de usuarios
          </Typography>

          <Box>
            <TextField
              value={search}
              onChange={(e) => {
                changeInputSearch(e.target.value);
              }}
              color={"secondary"}
              helperText={null}
              label="Buscar"
              sx={{
                backgroundColor: "info.main",
                ml: 2,
              }}
            />
          </Box>
        </div>

        <Box alignItems={"center"} marginRight={2} display={"flex"} gap={5}>
          <ColorButton
            component="label"
            variant="contained"
            startIcon={<CloudUpload />}
          >
            Cargar usuarios
            <VisuallyHiddenInput
              type="file"
              name="file"
              id="file"
              onChange={handleUploadUsers}
              accept="text/csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            />
          </ColorButton>

          <NextLink href="/dashboard/users/add-user">
            <Box>
              <ColorButton>Agregar Usuario</ColorButton>
            </Box>
          </NextLink>
        </Box>
      </Box>
    </section>
  );
};
