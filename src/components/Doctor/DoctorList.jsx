import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, esES, GridToolbar } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { getAllDoctorsApi } from "@/services/api/doctor";
import Loading from "../Loading/Loading";

const columns = [
  // { field: "_id", headerName: "Id", width: 200 },
  { field: "name", headerName: "Nombre", width: 100 },
  { field: "lastName", headerName: "Apellido", width: 100 },
  { field: "especialist", headerName: "Especialidad", width: 200 },
  { field: "dateBird", headerName: "Fecha Nacimiento", width: 100 },
  { field: "phone", headerName: "Telefono", width: 170 },
  { field: "email", headerName: "Email", width: 170 },
];

const DoctorList = () => {
  const [doctorData, setDoctorData] = useState(null);

  const [rowSelected, setRowSelected] = useState([]);

  const { push, back } = useRouter();

  const { auth } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getAllDoctorsApi(auth);
      setDoctorData(response.data);
    })();
  }, []);

  const handleClickAdd = () => {
    push("/doctores/agregar-doctores/");
  };

  const handleClickUpdate = (row) => {
    push({
      pathname: "/doctores/editar/[pid]",
      query: { pid: row },
    });
  };

  return (
    <Box sx={{ height: 400, width: "100%", ml: 2 }}>
      <Button variant="contained" onClick={handleClickAdd}>
        Agregar
      </Button>
      {!doctorData ? (
        <Loading text={"Cargando doctores..."} />
      ) : doctorData.length === 0 ? (
        <Typography
          variant="h7"
          align="center"
          color="text.secondary"
          paragraph>
          No hay doctores registrados...
        </Typography>
      ) : (
        <DataGrid
          rows={doctorData}
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

export default DoctorList;
