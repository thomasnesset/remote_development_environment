import React, { useState, useEffect } from "react";

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
  DialogActions,
  LinearProgress,
  TextField, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Select
} from "@mui/material";

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';

function Dashboard() {
  const lightStyle = {
    height: '10px',
    width: '10px',
    borderRadius: '50%',
    display: 'inline-block',
    marginLeft: '10px',
    marginRight: '10px'
  };
  
  const greenLight = { ...lightStyle, backgroundColor: 'green' };
  const redLight = { ...lightStyle, backgroundColor: 'red' };
  
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

  const [openDialog, setOpenDialog] = useState(false);

  const [progress, setProgress] = useState(0);

  const [newEnvironment, setNewEnvironment] = useState({ id: 0, fagkode: '', konfigurasjon: '', status: 'Stoppet' });

  const handleFagkodeChange = (event) => {
    setNewEnvironment({ ...newEnvironment, fagkode: event.target.value });
  };

  const handleKonfigurasjonChange = (event) => {
    setNewEnvironment({ ...newEnvironment, konfigurasjon: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setNewEnvironment({ ...newEnvironment, id: environments.length + 1 });
    setEnvironments([...environments, newEnvironment]);
    handleCloseDialog();
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    // Update progress when environments change
    const newProgress = Math.min(Math.max(environments.length * 10, 0), 100);
    setProgress(newProgress);
  }, [environments]);

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
          <form onSubmit={handleSubmit}>
            <TextField
              label="Fagkode"
              value={newEnvironment.fagkode}
              onChange={handleFagkodeChange}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Konfigurasjon</InputLabel>
              <Select
                value={newEnvironment.konfigurasjon}
                label="Konfigurasjon"
                onChange={handleKonfigurasjonChange}
              >
                <MenuItem value="C++">C++</MenuItem>
                <MenuItem value="Python">Python</MenuItem>
                <MenuItem value="Java">Java</MenuItem>
                <MenuItem value="JavaScript">JavaScript</MenuItem>
                <MenuItem value="Ruby">Ruby</MenuItem>
              </Select>
            </FormControl>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Avbryt</Button>
              <Button type="submit" color="primary">Legg til</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      {environments.length > 0 ? (
        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Fagkode</TableCell>
                <TableCell>Konfigurasjon</TableCell>
                <TableCell>Handling</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {environments.map((env) => (
                <TableRow key={env.id}>
                  <TableCell>
                    <span style={env.status === 'Aktiv' ? greenLight : redLight} />
                    {env.fagkode}
                  </TableCell>
                  <TableCell>{env.konfigurasjon}</TableCell>
                  <TableCell
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleEnvironmentStatus(env.id)}
                  >
                    {env.status === "Aktiv" ? <StopIcon /> : <PlayArrowIcon />}
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
