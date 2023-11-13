"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, esES, GridToolbar } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { getAllPatientsApi } from "@/services/api/patient";
import PatientAdd from "./PatientAdd";
import Loading from "../Loading/Loading";

const columns = [
  // { field: "_id", headerName: "Id", width: 200 },
  { field: "name", headerName: "Nombre", width: 100 },
  { field: "lastName", headerName: "Apellido", width: 100 },
  { field: "dateBird", headerName: "Fecha Nacimiento", width: 100 },
  { field: "phone", headerName: "Telefono", width: 170 },
  { field: "email", headerName: "Email", width: 170 },
  { field: "address", headerName: "Direección", width: 200 },
  { field: "allergies", headerName: "Alergico", width: 100 },
  { field: "diseases", headerName: "Enfermedad", width: 100 },
];

const PatientList = () => {
  const [patientData, setPatientData] = useState(null);

  const [rowSelected, setRowSelected] = useState([]);

  const { push, back } = useRouter();

  const { auth } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getAllPatientsApi(auth);
      setPatientData(response.data);
    })();
  }, []);

  const handleClickAdd = () => {
    push("/pacientes/agregar-pacientes/");
  };

  const handleClickUpdate = (row) => {
    push({
      pathname: "/pacientes/editar/[pid]",
      query: { pid: row },
    });
  };

  return (
    <Box sx={{ height: 400, width: "100%", ml: 2 }}>
      <Button variant="contained" onClick={handleClickAdd}>
        Agregar
      </Button>
      {!patientData ? (
        <Loading text={"Cargando pacientes..."} />
      ) : patientData.length === 0 ? (
        <Typography
          variant="h7"
          align="center"
          color="text.secondary"
          paragraph>
          No hay pacientes registrados...
        </Typography>
      ) : (
        <DataGrid
          rows={patientData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          slots={{ toolbar: GridToolbar }}
          getRowId={(row) => row._id}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          rowSelected={rowSelected}
          sx={{ mt: 2 }}
          onRowSelectionModelChange={(newRowSelected) => {
            setRowSelected(newRowSelected);
            handleClickUpdate(newRowSelected);
          }}
        />
      )}
    </Box>
  );
};

export default PatientList;
