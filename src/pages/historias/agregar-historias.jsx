import React from "react";
import Head from "next/head";
import { Typography } from "@mui/material";
import styles from "@/styles/Home.module.css";
import { DashboardLayout } from "../layout";
import HistoryAdd from "@/components/History/HistoryAdd";

const HistoryAddPage = () => {
  return (
    <>
      <Head>
        <title> Agregar Historias - HistoryMed</title>
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
          Agregar Nueva Historia
        </Typography>

        <HistoryAdd />
      </main>
    </>
  );
};

HistoryAddPage.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default HistoryAddPage;
