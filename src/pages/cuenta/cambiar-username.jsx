import React from 'react'
import { DashboardLayout } from '../layout';
import Head from "next/head";
import { Typography } from "@mui/material";
import styles from "@/styles/Home.module.css";
import UpdateUsername from '@/components/Account/UpdateUsername';


const UpdateUserName = () => {
  return (
    <>
      <Head>
        <title> Cambiar username - QuoteMed</title>
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
          sx={{ mt: 10, ml: 2 }}
        >
          Cambiar Nombre de Usuario
        </Typography>
        <UpdateUsername/>
      
      </main>
    </>
  );
}

UpdateUserName
.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default UpdateUserName
