import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import useAuth from "@/hooks/useAuth";
import { getUserById, updateUserApi } from "@/services/api/user";

const UpdateUsername = () => {
  const [user, setUser] = useState(null);

  const { auth } = useAuth();

  const notifyOk = () => toast("Datos actualizados.");

  const notifyError = () => toast("Error al actualizar los datos.");

  useEffect(() => {
    (async () => {
      const response = await getUserById(auth.userId, auth.token);

      setUser(response.data);
      await formik.setFieldValue("userName", response.data.userName);
    })();
  }, []);

  function updateUserName(obj1, obj2) {
    obj1.userName = obj2.userName;
  }

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      try {
        await updateUserName(user, formData);
        await updateUserApi(auth, user);
        await notifyOk();
        await handleClose();
      } catch (error) {
        await notifyError();
      }
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

  return (
    <>
      <Box
        component="form"
        p={2}
        sx={{
          "& .MuiTextField-root": { mb: 1, mr: 1, width: "40ch" },
          "& .MuiButton-root": { mr: 2 },
        }}
        noValidate
        autoComplete="on">
        <div>
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Nombre de usuario"
            value={formik.values.userName}
            error={formik.errors.userName}
            onChange={(event) =>
              formik.setFieldValue("userName", event.target.value)
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
            <span>Guardar</span>
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
          {"Esta seguro que desea realizar los cambios?"}
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
    userName: "",
  };
}

function validationSchema() {
  return {
    userName: Yup.string().required(true),
  };
}

export default UpdateUsername;
