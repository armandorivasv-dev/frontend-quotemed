import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import useAuth from "@/hooks/useAuth";
import { addHistoryApi } from "@/services/api/history";
import { getAllPatientsApi } from "@/services/api/patient";
import { getAllDoctorsApi } from "@/services/api/doctor";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Loading from "../Loading/Loading";
//import { addHistoryApi } from "@/services/api/patient";

const HistoryAdd = () => {
  const [patientData, setPatientData] = useState([]);
  const [doctorData, setDoctorData] = useState([]);
  console.log("🚀 -> HistoryAdd -> doctorData->", doctorData);
  console.log("🚀 -> HistoryAdd -> patientData->", patientData);

  const [selectedPatient, setSelectedPatient] = useState("");

  const [selectedDoctor, setSelectedDoctor] = useState("");

  const [openPatient, setOpenPatient] = React.useState(false);

  const handleClosePatient = () => {
    setOpenPatient(false);
  };

  const handleOpenPatient = () => {
    setOpenPatient(true);
  };

  const [openDoctor, setOpenDoctor] = React.useState(false);

  const handleCloseDoctor = () => {
    setOpenDoctor(false);
  };

  const handleOpenDoctor = () => {
    setOpenDoctor(true);
  };

  const { auth } = useAuth();

  const { push, back } = useRouter();

  useEffect(() => {
    (async () => {
      const response = await getAllPatientsApi(auth);
      setPatientData(response.data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await getAllDoctorsApi(auth);
      setDoctorData(response.data);
    })();
  }, []);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      console.log("🚀 -> onSubmit: -> formData->", formData);
      try {
        await addHistoryApi(auth, formData);
        push("/historias");
      } catch (error) {
        console.log(error);
      }

      // setLoading(false);
    },
  });

  //dialog
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOkDialog = () => {
    formik.handleSubmit();
  };
  //dialog

  const handleBack = () => {
    back();
  };

  return (
    <>
      <Box
        component="form"
        p={2}
        sx={{
          "& .MuiTextField-root": { mb: 2, mr: 2, width: "40ch" },
          "& .MuiFormControl-root": { mb: 2, mr: 2, width: "40ch" },
          "& .MuiButton-root": { mr: 2 },
        }}
        noValidate
        autoComplete="on"
      >
        <div>
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Tipo"
            value={formik.values.type}
            error={formik.errors.type}
            onChange={(event) =>
              formik.setFieldValue("type", event.target.value)
            }
          />
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Descripción"
            value={formik.values.description}
            error={formik.errors.description}
            onChange={(event) =>
              formik.setFieldValue("description", event.target.value)
            }
          />

          <FormControl>
            <InputLabel id="demo-controlled-open-select-label">
              Paciente
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={openPatient}
              onClose={handleClosePatient}
              onOpen={handleOpenPatient}
              value={selectedPatient}
              label="Paciente"
              onChange={(event) => {
                formik.setFieldValue("idPatient", event.target.value);
                setSelectedPatient(event.target.value);
              }}
            >
              <MenuItem>
                <em>None</em>
              </MenuItem>
              {patientData.map((data) => (
                <MenuItem key={data._id} value={data.name}>
                  {data.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel id="demo-controlled-open-select-label">
              Doctor
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={openDoctor}
              onClose={handleCloseDoctor}
              onOpen={handleOpenDoctor}
              value={selectedDoctor}
              label="Doctor"
              onChange={(event) => {
                formik.setFieldValue("idDoctor", event.target.value);
                setSelectedDoctor(event.target.value);
              }}
            >
              <MenuItem>
                <em>None</em>
              </MenuItem>
              {doctorData.map((data) => (
                <MenuItem key={data._id} value={data.name}>
                  {data.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Resultado"
            value={formik.values.result}
            error={formik.errors.result}
            onChange={(event) =>
              formik.setFieldValue("result", event.target.value)
            }
          />

          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Diagnostico"
            value={formik.values.diagnostic}
            error={formik.errors.diagnostic}
            onChange={(event) =>
              formik.setFieldValue("diagnostic", event.target.value)
            }
          />
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Estatus"
            value={formik.values.status}
            error={formik.errors.status}
            onChange={(event) =>
              formik.setFieldValue("status", event.target.value)
            }
          />
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Locación"
            value={formik.values.location}
            error={formik.errors.location}
            onChange={(event) =>
              formik.setFieldValue("location", event.target.value)
            }
          />
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => {
              handleClickOpenDialog();
            }}
          >
            <span>GUARDAR</span>
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => {
              handleBack();
            }}
          >
            <span>CANCELAR</span>
          </Button>
        </div>
      </Box>
      <Toaster position="top-center" duration="4000" />

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Esta seguro que desea agregar el registro?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleOkDialog} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

function initialValues() {
  return {
    type: "",
    description: "",
    result: "",
    diagnostic: "",
    status: "",
    location: "",
    idDoctor: "",
    idPatient: "",
  };
}

function validationSchema() {
  return {
    type: Yup.string().required(true),
    description: Yup.string().required(true),
    result: Yup.string().required(true),
    diagnostic: Yup.string().required(true),
    status: Yup.string().required(true),
    location: Yup.string().required(true),
    idDoctor: Yup.string().required(true),
    idPatient: Yup.string().required(true),
  };
}

export default HistoryAdd;
