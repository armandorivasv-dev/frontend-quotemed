"use client";
import React, { useEffect, useState } from "react";
import { authLoginApi } from "@/services/api/auth";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";

const AuthLogin = (props) => {
  const { changeForm } = props;
  const [message, setMessage] = useState("Ingrese usuario y password");

  const { login } = useAuth();

  // const formData = {
  //   userName: "armandorivas",
  //   password: "armando",
  // };
  // useEffect(() => {
  //   (async () => {
  //     const response = await authLoginApi(formData);
  //     console.log("response", response);
  //   })();
  // }, []);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      try {
        const response = await authLoginApi(formData);
        console.log("response", response);
        if (response.error) throw "Error en usuario o contraseña!!!";
        login(response);
      } catch (error) {
        await toast(error);
      }
    },
  });

  //console.log("login", login);

  return (
    <Container maxWidth="xs" sx={{ mt: 5, backgroundColor: "#fff" }}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* <Image width="100" height="100" alt="Images" src={logo} /> */}
        <Typography
          variant="h6"
          gutterBottom
          align="center"
          sx={{ textTransform: "uppercase" }}
        >
          LOGIN
        </Typography>
        <Box component="form" sx={{ m: 1, width: "40ch" }} noValidate>
          <TextField
            margin="normal"
            fullWidth
            id="userName"
            label="Ingrese nombre de usuario"
            name="userName"
            variant="outlined"
            onChange={(event) =>
              formik.setFieldValue("userName", event.target.value)
            }
            value={formik.values.userName}
            error={formik.errors.userName}
          />
          <TextField
            margin="normal"
            name="password"
            fullWidth
            id="password"
            label="Ingrese password"
            variant="outlined"
            type="password"
            autoComplete="false"
            onChange={(event) =>
              formik.setFieldValue("password", event.target.value)
            }
            value={formik.values.password}
            error={formik.errors.password}
          />
          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              color="inherit"
              fullWidth
              onClick={() => {
                formik.handleSubmit();
              }}
            >
              LOGIN
            </Button>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              color="inherit"
              fullWidth
              onClick={() => {
                changeForm();
              }}
            >
              NO TIENES CUENTA? IR A REGISTRARSE
            </Button>
          </Box>
          <Box
            sx={{
              mt: 2,
              mb: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {message ? (
              <Typography
                variant="caption"
                gutterBottom
                align="center"
                sx={{ textTransform: "uppercase" }}
              >
                {message}
              </Typography>
            ) : (
              <Typography
                variant="caption"
                gutterBottom
                align="center"
                sx={{ textTransform: "uppercase" }}
              ></Typography>
            )}
          </Box>
        </Box>
      </Box>
      <Toaster position="top-center" duration="4000" />
    </Container>
  );
};

function initialValues() {
  return {
    userName: "",
    password: "",
  };
}

function validationSchema() {
  return {
    userName: Yup.string().required(true),
    password: Yup.string().required(true),
  };
}

export default AuthLogin;
