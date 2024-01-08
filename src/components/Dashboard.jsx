import React, { useState } from "react";

import Container from "./Container";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  LinearProgress,
} from "@mui/material";

function Dashboard() {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [environments, setEnvironments] = useState([
    {
      id: 1,
      fagkode: "IKT101",
      konfigurasjon: "C++",
      status: "Aktiv",
    },
    {
      id: 2,
      fagkode: "IKT102",
      konfigurasjon: "Python",
      status: "Stoppet",
    },
    {
      id: 3,
      fagkode: "IKT103",
      konfigurasjon: "Java",
      status: "Aktiv",
    },
    {
      id: 4,
      fagkode: "IKT104",
      konfigurasjon: "JavaScript",
      status: "Stoppet",
    },
    {
      id: 5,
      fagkode: "IKT105",
      konfigurasjon: "Ruby",
      status: "Aktiv",
    },
  ]);

  const [progress, setProgress] = useState(environments.length * 10);

  const dashboardContainerStyle = {
    width: "80%", // Width of the container for the dashboard
    maxWidth: "1200px", // Maximum width
  };

  const toggleEnvironmentStatus = (id) => {
    setEnvironments(
      environments.map((env) =>
        env.id === id
          ? { ...env, status: env.status === "Aktiv" ? "Stoppet" : "Aktiv" }
          : env
      )
    );
  };

  const deleteEnvironment = (id) => {
    setEnvironments(environments.filter((env) => env.id !== id));
  };

  const confirmDelete = (id) => {
    if (window.confirm("Er du sikker på at du vil slette dette miljøet?")) {
      deleteEnvironment(id);
    }
  };

  return (
    <Container style={dashboardContainerStyle}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Environment Dashboard</h1>
        <Button variant="contained" color="primary" onClick={handleOpenDialog}>
          Nytt miljø
        </Button>
      </div>
      {/* Dialog for Nytt miljø */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Nytt miljø</DialogTitle>
        <DialogContent>
          <DialogContentText>Her opprettes nye miljø</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Lukk
          </Button>
        </DialogActions>
      </Dialog>
      {environments.length > 0 ? (
        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Fagkode</TableCell>
                <TableCell>Konfigurasjon</TableCell>
                <TableCell>Status</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {environments.map((env) => (
                <TableRow key={env.id}>
                  <TableCell>{env.fagkode}</TableCell>
                  <TableCell>{env.konfigurasjon}</TableCell>
                  <TableCell>{env.status}</TableCell>
                  <TableCell
                    style={{ cursor: "pointer", color: "blue" }}
                    onClick={() => toggleEnvironmentStatus(env.id)}
                  >
                    {env.status === "Aktiv" ? "Stopp" : "Start"}
                  </TableCell>
                  <TableCell
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => confirmDelete(env.id)}
                  >
                    Slett
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>Ingen miljøer finnes enda.</p>
      )}
      {/* Progress Bar */}
      <div style={{ marginTop: '20px' }}>
        <LinearProgress variant="determinate" value={progress} />
        <p>{progress}% av ressurskvote brukt</p>
      </div>
    </Container>
  );
}

export default Dashboard;
