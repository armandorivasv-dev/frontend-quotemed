import React, { useEffect, useState } from 'react'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import useAuth from '@/hooks/useAuth';
import { getUserById, updateUserApi } from '@/services/api/user';

const UpdateEmail = () => {

  const [user, setUser]= useState(null)  

  const { auth } = useAuth();

  const notifyOk = () => toast("Datos actualizados.");

  const notifyError = () => toast("Error al actualizar los datos.");

  useEffect(() => {
    (async () => {
      const response = await getUserById(auth.userId, auth.token);
      
      setUser(response.data)     
      await formik.setFieldValue("email", response.data.email);
    })();
  }, []);

  function updateUserEmail(obj1, obj2){
    obj1.email = obj2.email
  }


  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      try {
        await updateUserEmail(user, formData)
        await updateUserApi(auth, user);
        await notifyOk();
        await handleClose()
      } catch (error) {
        await notifyError();
      }
    },
  });

  //dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOk = () => {
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
          "& .MuiButton-root": { mr: 2}, 
        }}
        noValidate
        autoComplete="on"
      >

        <div>
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Email"
            value={formik.values.email}
            error={formik.errors.email}
            onChange={(event) =>
              formik.setFieldValue("email", event.target.value)
            }
          />
          </div>
          <div>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => {
              handleClickOpen();
            }}
          >
            <span>Guardar</span>
          </Button>



          </div>


        
      </Box>
      <Toaster position="top-center" duration="4000" />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Esta seguro que desea realizar los cambios?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleOk} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

function initialValues() {
  return {
    email: "",
  };
}

function validationSchema() {
  return {
    email: Yup.string().required(true),
  };
}

export default UpdateEmail