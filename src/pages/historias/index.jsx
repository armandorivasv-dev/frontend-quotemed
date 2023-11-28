import React from "react";
import Head from "next/head";
import { Typography } from "@mui/material";
import styles from "@/styles/Home.module.css";
import { DashboardLayout } from "../layout";
import HistoryList from "@/components/History/HistoyList";


const HistoryListPage = () => {
  return (
    <>
      <Head>
        <title> Listado de Historias - HistoryMed</title>
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
          Listado de Historias
        </Typography>
        <HistoryList />
      </main>
    </>
  );
};

HistoryListPage.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default HistoryListPage;