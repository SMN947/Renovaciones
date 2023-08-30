import React from 'react';
import { Typography } from '@material-ui/core';
import { Grid } from '@mui/material';
const { styled } = require('@mui/material/styles');
import { GridTransfer, Wrapper } from './Extras';
import { CardContentNormal } from './Extras';
import { Button } from '@mui/material';

const FormOptions = ({ currentStep, formData, handleOptionChange, reset }) => {
  console.log(currentStep);
  return (
    <>
      {formData[currentStep].options ? (
        <Grid container spacing={3} mt={2} mx={2} rowSpacing={1} rowGap={2}>
          {Object.entries(formData[currentStep].options).map(([key, value]) => (
            <Grid
              className="OptionElement"
              key={key}
              xs={6}
              sx={{ height: '15vh' }}
            >
              <input
                type="radio"
                id={key}
                value={key}
                className="optionInput"
                checked={currentStep === key}
                onChange={handleOptionChange}
              />
              <label htmlFor={key} className="optionLabel">
                {value}
              </label>
            </Grid>
          ))}
        </Grid>
      ) : formData[currentStep].transfer ? (
        <Grid item xs={12} mx={2}>
          <CardContentNormal sx={{ height: '300px' }} pt={2}>
            <Grid>
              <Grid
                xs={12}
                md={12}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '40px',
                }}
              >
                <Typography variant="h5">
                  Transfiere al siguiente skil, esperamos habderte ayudado ! 😁
                </Typography>
              </Grid>
              <Grid container spacing={2} rowSpacing={2} columnGap={2}>
                <Grid item xs={12} md={1} />
                <GridTransfer item xs={12} md={2}>
                  <Grid container>
                    <Grid
                      xs={12}
                      md={12}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="h5" xs={12} md={12}>
                        {formData[currentStep].schedule}
                      </Typography>
                    </Grid>
                    <Grid
                      xs={12}
                      md={12}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px',
                      }}
                    >
                      <Typography variant="caption" xs={12} md={12}>
                        Horario de atención
                      </Typography>
                    </Grid>
                  </Grid>
                </GridTransfer>

                <GridTransfer item xs={12} md={8}>
                  <Grid container>
                    <Grid
                      xs={12}
                      md={12}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="h5" xs={12} md={12}>
                        {formData[currentStep].transfer}
                      </Typography>
                    </Grid>
                    <Grid
                      xs={12}
                      md={12}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px',
                      }}
                    >
                      <Typography variant="caption" xs={12} md={12}>
                        Skill de destino
                      </Typography>
                    </Grid>
                  </Grid>
                </GridTransfer>
              </Grid>
            </Grid>
            <Grid mt={3}>
              <Wrapper>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, mb: 2 }}
                  onClick={() => {
                    reset();
                  }}
                >
                  Reiniciar
                </Button>
              </Wrapper>
            </Grid>
          </CardContentNormal>
        </Grid>
      ) : null}
    </>
  );
};

export default FormOptions;
