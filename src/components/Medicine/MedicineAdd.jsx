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
import { addMedicineApi } from "@/services/api/medicine";
//import { addMedicineApi } from "@/services/api/patient";

const MedicineAdd = () => {
  const { auth } = useAuth();

  const { push, back } = useRouter();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      try {
        await addMedicineApi(auth, formData);
        push("/medicinas");
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
            label="Nombre"
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
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Dosis"
            value={formik.values.dose}
            error={formik.errors.dose}
            onChange={(event) =>
              formik.setFieldValue("dose", event.target.value)
            }
          />
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Frecuencia"
            value={formik.values.frequency}
            error={formik.errors.frequency}
            onChange={(event) =>
              formik.setFieldValue("frequency", event.target.value)
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
    type: "",
    description: "",
    dose: "",
    frequency: "",
  };
}

function validationSchema() {
  return {
    name: Yup.string().required(true),
    type: Yup.string().required(true),
    description: Yup.string().required(true),
    dose: Yup.string().required(true),
    frequency: Yup.string().required(true),
  };
}

export default MedicineAdd;
