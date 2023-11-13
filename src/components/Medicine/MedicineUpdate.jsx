import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import useAuth from "@/hooks/useAuth";
import {
  updateMedicineApi,
  getMedicineByIdApi,
  deleteMedicineApi,
} from "@/services/api/medicine";
import router from "next/router";

const MedicineUpdate = (props) => {
  const { auth } = useAuth();

  const { push, back } = useRouter();

  const { medicineId } = props;

  useEffect(() => {
    (async () => {
      if (!medicineId) {
        return;
      }
      const response = await getMedicineByIdApi(auth, medicineId);
      await formik.setFieldValue("name", response.data?.name || "");
      await formik.setFieldValue("type", response.data?.type || "");
      await formik.setFieldValue(
        "description",
        response.data?.description || ""
      );
      await formik.setFieldValue("dose", response.data?.dose || "");
      await formik.setFieldValue("frequency", response.data?.frequency || "");
    })();
  }, [medicineId]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      try {
        await updateMedicineApi(auth, router.query.slug, formData);
        push("/medicinas");
      } catch (error) {
        console.log(error);
      }

      // setLoading(false);
    },
  });

  const deleteMedicine = async () => {
    try {
      await deleteMedicineApi(auth, router.query.slug);
      push("/medicinas");
    } catch (error) {
      console.log(error);
    }
  };

  //dialog update
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false);

  const handleClickOpenUpdate = () => {
    setOpenDialogUpdate(true);
  };
  const handleCloseUpdate = () => {
    setOpenDialogUpdate(false);
  };
  const handleOkUpdate = () => {
    formik.handleSubmit();
  };
  //dialog update

  //dialog delete
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  const handleClickOpenDelete = () => {
    setOpenDialogDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDialogDelete(false);
  };
  const handleOkDelete = () => {
    deleteMedicine();
  };
  //dialog delete

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
              handleClickOpenUpdate();
            }}>
            <span>GUARDAR</span>
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => {
              handleClickOpenDelete();
            }}>
            <span>ELIMINAR</span>
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
        open={openDialogUpdate}
        onClose={handleCloseUpdate}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"Esta seguro que desea realizar los cambios?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleCloseUpdate}>Cancelar</Button>
          <Button onClick={handleOkUpdate} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDialogDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"Esta seguro que desea eliminar paciente?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancelar</Button>
          <Button onClick={handleOkDelete} autoFocus>
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

export default MedicineUpdate;
