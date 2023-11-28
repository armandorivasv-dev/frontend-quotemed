import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, esES, GridToolbar } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { getAllHistorysApi } from "@/services/api/history";
import Loading from "../Loading/Loading";

const columns = [
  // { field: "_id", headerName: "Id", width: 200 },
  { field: "createAt", headerName: "Fecha", width: 100 },
  { field: "type", headerName: "Tipo", width: 100 },
  { field: "description", headerName: "Descripción", width: 200 },
  { field: "status", headerName: "Estatus", width: 100 },
  { field: "idPatient", headerName: "Paciente", width: 100 },
  { field: "idDoctor", headerName: "Doctor", width: 100 },
  { field: "location", headerName: "Locación", width: 300 },
];

const HistoryList = () => {
  const [historyData, setHistoryData] = useState([]);
  console.log("🚀 -> HistoryList -> historyData->", historyData);

  const [rowSelected, setRowSelected] = useState([]);

  const { push, back } = useRouter();

  const { auth } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getAllHistorysApi(auth);
      const result = response.data.map((item) => ({
        _id: item._id,
        createAt: item.createAt.slice(0, 10),
        type: item.type,
        description: item.description,
        status: item.status,
        idPatient: item.idPatient,
        idDoctor: item.idDoctor,
        location: item.location,
      }));
      setHistoryData(result);
    })();
  }, []);

  const handleClickAdd = () => {
    push("/historias/agregar-historias/");
  };

  const handleClickUpdate = (row) => {
    push({
      pathname: "/historias/editar/[pid]",
      query: { pid: row },
    });
  };

  return (
    <Box sx={{ height: 400, width: "100%", ml: 2 }}>
      <Button variant="contained" onClick={handleClickAdd}>
        Agregar
      </Button>
      {!historyData ? (
        <Loading text={"Cargando historias..."} />
      ) : historyData.length === 0 ? (
        <Typography
          variant="h7"
          align="center"
          color="text.secondary"
          paragraph
        >
          No hay historias registradas...
        </Typography>
      ) : (
        <DataGrid
          rows={historyData}
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

export default HistoryList;
