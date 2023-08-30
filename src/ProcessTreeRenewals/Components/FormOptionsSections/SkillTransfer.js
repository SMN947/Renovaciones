import React from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { CardContentNormal, GridTransfer, Wrapper } from '../Extras';


export const SkillTransfer = ({ currentStep, formData, handleOptionChange, reset }) => {
    console.log(formData[currentStep].data.notasGenerales);
    return (
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
                            Transfiere al siguiente skil, esperamos haberte ayudado ! 😁
                        </Typography>
                    </Grid>
                    <Grid container spacing={2} rowSpacing={2} columnGap={2}>
                        {(formData[currentStep].data.notasGenerales.length != 0) ? <>
                            <Grid item xs={12} md={1} />
                            <GridTransfer item xs={12} md={10}>
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
                                        <div className='neutralize-css'
                                            style={{ padding: '20px' }}
                                            dangerouslySetInnerHTML={{
                                                __html: formData[currentStep].data.notasGenerales
                                            }}>

                                        </div>
                                    </Grid>
                                </Grid>
                            </GridTransfer>
                        </> : null}
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
    )
}