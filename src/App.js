import React from "react";
import { Box, Card, Button, Alert, TextField, Typography, TableContainer, TableHead, TableRow, TableCell, TableBody, Table, Grid } from "@mui/material";
import { store } from 'host/store';
import { useSelector, useDispatch } from 'react-redux';

export default function () {
  const [userName, setUserName] = React.useState('');
  const countryName = 'United States'; // Example country name, can be dynamic
  const dispatch = useDispatch();
  store.subscribe(() => console.log(store.getState()));
  const { countryData, user } = useSelector((state) => state);
  const { country, populationCounts } = countryData[countryName] || {};

  return (
    <Grid xs={12} sm={4} md={4} lg={4} xl={4} item>
      <Card sx={{ backgroundColor: '#f5f5f5', padding: '10px' }}>
        <Alert severity="info">{'MFE 2 getting data from Host'}</Alert>
        <Box>
          <TextField
            label="Enter Name"
            variant="outlined"
            value={userName ?? ''}
            sx={{ marginBottom: '10px', width: '100%' }}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Button sx={{ backgroundColor: 'DarkGreen', color: 'white', '&:hover': { backgroundColor: 'Green' } }} onClick={() => {
            dispatch({ type: 'SET_USER', payload: { name: userName } })
          }}>
            {'Set Username'}
          </Button>
          <Typography>{'Hello : ' + user?.name}</Typography>
        </Box>
        <Box>
          {countryData[countryName] && (
            <div className="united-states-population-container">
              <h1>Population of {country}</h1>
              <div className="population-cards-container">
                <TableContainer sx={{ border: '1px solid #ccc', borderRadius: 2 }}>
                  <Table sx={{ minWidth: 300 }} size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ border: '1px solid #ccc', fontWeight: 'bold' }}>Year</TableCell>
                        <TableCell sx={{ border: '1px solid #ccc', fontWeight: 'bold' }}>Population</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {[...populationCounts]
                        .sort((a, b) => b.year - a.year)
                        .slice(0, 3)
                        .map((yearData) => (
                          <TableRow key={yearData.year}>
                            <TableCell sx={{ border: '1px solid #ccc' }}>{yearData.year}</TableCell>
                            <TableCell sx={{ border: '1px solid #ccc' }}>
                              {yearData.value.toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <p className="source-info">Source: World Bank (or specify actual source)</p>
            </div>
          )}
        </Box>
      </Card>
    </Grid>
  );
}

