import React, { useState } from "react";
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
import { addPatientApi } from "@/services/api/patient";

const PatientAdd = () => {
  const { auth } = useAuth();

  const { push, back } = useRouter();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      try {
        await addPatientApi(auth, formData);
        push("/pacientes");
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
          "& .MuiButton-root": { mr: 2 },
        }}
        noValidate
        autoComplete="on">
        <div>
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Nombres"
            value={formik.values.name}
            error={formik.errors.name}
            onChange={(event) =>
              formik.setFieldValue("name", event.target.value)
            }
          />
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Apellidos"
            value={formik.values.lastName}
            error={formik.errors.lastName}
            onChange={(event) =>
              formik.setFieldValue("lastName", event.target.value)
            }
          />
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Dirección"
            value={formik.values.address}
            error={formik.errors.address}
            onChange={(event) =>
              formik.setFieldValue("address", event.target.value)
            }
          />
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Fecha de nacimiento"
            value={formik.values.dateBird}
            error={formik.errors.dateBird}
            onChange={(event) =>
              formik.setFieldValue("dateBird", event.target.value)
            }
          />
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Teléfono"
            value={formik.values.phone}
            error={formik.errors.phone}
            onChange={(event) =>
              formik.setFieldValue("phone", event.target.value)
            }
          />
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="email"
            value={formik.values.email}
            error={formik.errors.email}
            onChange={(event) =>
              formik.setFieldValue("email", event.target.value)
            }
          />
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Alergias"
            value={formik.values.allergies}
            error={formik.errors.allergies}
            onChange={(event) =>
              formik.setFieldValue("allergies", event.target.value)
            }
          />
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Enfermedades"
            value={formik.values.diseases}
            error={formik.errors.diseases}
            onChange={(event) =>
              formik.setFieldValue("diseases", event.target.value)
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
            }}>
            <span>GUARDAR</span>
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => {
              handleBack();
            }}>
            <span>CANCELAR</span>
          </Button>
        </div>
      </Box>
      <Toaster position="top-center" duration="4000" />

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
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
    name: "",
    lastName: "",
    address: "",
    dateBird: "",
    phone: "",
    email: "",
    allergies: "",
    diseases: "",
  };
}

function validationSchema() {
  return {
    name: Yup.string().required(true),
    lastName: Yup.string().required(true),
    address: Yup.string().required(true),
    dateBird: Yup.string().required(true),
    phone: Yup.string().required(true),
    email: Yup.string().required(true),
    allergies: Yup.string().required(true),
    diseases: Yup.string().required(true),
  };
}

export default PatientAdd;
