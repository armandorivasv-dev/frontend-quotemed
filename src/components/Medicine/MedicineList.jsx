import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, esES, GridToolbar } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { getAllMedicinesApi } from "@/services/api/medicine";
import Loading from "../Loading/Loading";

const columns = [
  // { field: "_id", headerName: "Id", width: 200 },
  { field: "name", headerName: "Nombre", width: 100 },
  { field: "type", headerName: "Tipo", width: 100 },
  { field: "description", headerName: "Descripción", width: 200 },
  { field: "dose", headerName: "Dosis", width: 100 },
  { field: "frequency", headerName: "Frecuencia", width: 170 },
];

const MedicineList = () => {
  const [medicineData, setMedicineData] = useState(null);

  const [rowSelected, setRowSelected] = useState([]);

  const { push, back } = useRouter();

  const { auth } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getAllMedicinesApi(auth);
      setMedicineData(response.data);
    })();
  }, []);

  const handleClickAdd = () => {
    push("/medicinas/agregar-medicinas/");
  };

  const handleClickUpdate = (row) => {
    push({
      pathname: "/medicinas/editar/[pid]",
      query: { pid: row },
    });
  };

  return (
    <Box sx={{ height: 400, width: "100%", ml: 2 }}>
      <Button variant="contained" onClick={handleClickAdd}>
        Agregar
      </Button>
      {!medicineData ? (
        <Loading text={"Cargando medicines..."} />
      ) : medicineData.length === 0 ? (
        <Typography
          variant="h7"
          align="center"
          color="text.secondary"
          paragraph>
          No hay medicines registradas...
        </Typography>
      ) : (
        <DataGrid
          rows={medicineData}
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

export default MedicineList;
