import * as React from "react";
import { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import KeyIcon from "@mui/icons-material/Key";
import MapIcon from "@mui/icons-material/Map";
import ListAltIcon from "@mui/icons-material/ListAlt";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import SickIcon from "@mui/icons-material/Sick";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import MedicationIcon from "@mui/icons-material/Medication";
import useAuth from "@/hooks/useAuth";

export const ResponsiveDrawerOptins = (props) => {
  const { logout } = useAuth();

  //dialog
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = () => {
    logout();
  };
  //dialog

  const iconStyle = {
    color: "#fff",
    fontSize: 30,
  };

  return (
    <>
      <div>
        <Toolbar />
        <Divider />

        <List>
          <Link href="/">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon sx={iconStyle} />
                </ListItemIcon>
                <ListItemText primary="Home" sx={iconStyle} />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
        <Divider />

        <List>
          <Link href="/pacientes">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Badge color="primary">
                    <SickIcon sx={iconStyle} />
                  </Badge>
                </ListItemIcon>

                <ListItemText primary="Pacientes" sx={iconStyle} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link href="/doctores">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SupervisedUserCircleIcon sx={iconStyle} />
                </ListItemIcon>
                <ListItemText primary="Doctores" sx={iconStyle} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link href="/medicinas">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Badge color="primary">
                    <MedicalServicesIcon sx={iconStyle} />
                  </Badge>
                </ListItemIcon>
                <ListItemText primary="Medicinas" sx={iconStyle} />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <Link href="/citas">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Badge color="primary">
                    <MedicationIcon sx={iconStyle} />
                  </Badge>
                </ListItemIcon>
                <ListItemText primary="Citas" sx={iconStyle} />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <Link href="/cuenta/cambiar-username">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PersonAddAltIcon sx={iconStyle} />
                </ListItemIcon>
                <ListItemText primary="Cambiar username" sx={iconStyle} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link href="/cuenta/cambiar-email">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AlternateEmailIcon sx={iconStyle} />
                </ListItemIcon>
                <ListItemText primary="Cambiar email" sx={iconStyle} />
              </ListItemButton>
            </ListItem>
          </Link>

          <Link href="/cuenta/cambiar-password">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <KeyIcon sx={iconStyle} />
                </ListItemIcon>
                <ListItemText primary="Cambiar password" sx={iconStyle} />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleClickOpen();
              }}>
              <ListItemIcon>
                <LogoutIcon sx={iconStyle} />
              </ListItemIcon>
              <ListItemText primary="Cerrar sessión" sx={iconStyle} />
            </ListItemButton>
          </ListItem>
        </List>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"Esta seguro que cerrar sessión?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleOk} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
