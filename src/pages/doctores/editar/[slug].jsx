import React from "react";
import router from "next/router";
import Head from "next/head";
import { Typography } from "@mui/material";
import styles from "@/styles/Home.module.css";
import { DashboardLayout } from "@/pages/layout";
import DoctorUpdate from "@/components/Doctor/DoctorUpdate";

const Doctor = () => {
  return (
    <>
      <Head>
        <title> Editar doctores- QuoteMed</title>
        <meta name="description" content="App de citas medicas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Typography
          component="h1"
          variant="h4"
          align="left"
          gutterBottom
          sx={{ mt: 10, ml: 2 }}>
          Editar doctor
        </Typography>
        <DoctorUpdate doctorId={router.query.slug} />
      </main>
    </>
  );
};

Doctor.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Doctor;
