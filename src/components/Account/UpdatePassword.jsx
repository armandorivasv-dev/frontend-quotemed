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

const UpdatePassword = () => {

  const [user, setUser]= useState(null)  
  console.log("🚀 -> UpdatePassword -> user->", user)

  const { auth } = useAuth();

  const notifyOk = () => toast("Datos actualizados.");

  const notifyError = () => toast("Error al actualizar los datos.");

  useEffect(() => {
    (async () => {
      const response = await getUserById(auth.userId, auth.token);
      
      setUser(response.data)     
      await formik.setFieldValue("password", response.data.password);
    })();
  }, []);

  function updateUserPassword(obj1, obj2){
    obj1.password = obj2.password
  }

  console.log("user", user);


  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      try {
        await updateUserPassword(user, formData)
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
      >

        <div>
          <TextField
            fullWidth
            required
            
            id="outlined-required"
            label="Password"
            type="password"
            value={formik.values.password}
            error={formik.errors.password}
            onChange={(event) =>
              formik.setFieldValue("password", event.target.value)
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
    password: "",
  };
}

function validationSchema() {
  return {
    password: Yup.string().required(true),
  };
}

export default UpdatePassword