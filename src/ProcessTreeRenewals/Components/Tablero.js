import React, { useState, StrictMode } from 'react';
import Button from '@mui/material/Button';
import { GridLayout, GridLayoutItem } from '@progress/kendo-react-layout';
import './Tablero.css';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
// import Checkbox from '@mui/material/Checkbox ';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: '8px',
    margin: '5px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.3)', // Add box shadow here
}));

const Tablero = ({ selectionHistory, navigateTo }) => {
    const [formData, setFormData] = useState({
        fechaGestion: new Date().toISOString().slice(0, 16).replace('T', ' '),
        tipoGestion: '',
        nit: '',
        contacto: '',
        cargo: '',
        telefono: '',
        pagos: [
            [1000, false],
            [0, false],
            [0, false],
        ],
        tipoGestion2: 'General',
        fechaCompromiso: new Date().toISOString().split('T')[0],
        descuento: '10',
        cuotas: [
            [50, new Date().toISOString().split('T')[0]],
            [50, new Date().toISOString().split('T')[0]],
            [0, new Date().toISOString().split('T')[0]],
        ],
        terceraCuotaPorLider: true,
        aplicaNC: 'No',
        tipoNC: '',
        motivoNC: '',
        valorNC: 0,
        notas: '',
    });

    const selectOptions = {
        tipoGestion: [
            'Renov. Telefónica',
            'Renov. Whatsapp',
            'Renov. Correo',
            'Renov. Chat',
        ],
        tipoGestion2: ['General', 'Descuento', 'Cuotas', 'Posible Perdida'],
        aplicaNC: ['Si', 'No'],
        tipoNC: ['', 'Modifica Contrato', 'No Modifica Contrato'],
        motivoNC: [
            'Cambio de contador/personal',
            'Casa Matriz exige cambio',
            'Desiste de Modulo/Usuarios',
            'Empresa en liquidación',
            'Falta de Dinero le parece costoso',
            'Falta de funcionalidad',
            'Ilocalizado/No aprece',
            'Nunca pago primera cuota/Anulado',
            'Problemas de Servicio',
            'Refacturado/Cesion de Licencia',
            'Conversión a otro producto Siigo',
            'Usa otro serial',
            'Error digitacion / Comercial',
            'Refacturado',
            'Cambio de Vigencia',
            'Usa programa (no quiere pagar mantenimiento)',
        ],
    };

    const calculatePagoTotal = () => {
        let subTotal = formData.pagos.reduce((acc, curr) => {
            let thisEl = curr[1] ? parseFloat(curr[0]) * 1.19 : parseFloat(curr[0]);
            acc = parseFloat(acc) + thisEl;
            return acc;
        }, 0);

        switch (formData.tipoGestion2) {
            case 'Cuotas':
                return (
                    subTotal *
                    (1 - formData.descuento / 100) *
                    (formData.cuotas[0][0] / 100)
                );
                break;
            case 'Descuento':
                return subTotal * (1 - formData.descuento / 100);
                break;
            default:
                return subTotal;
                break;
        }
    };

    const calculateHash = (data) => {
        const text = JSON.stringify(data);
        let hash = 0;

        if (text.length === 0) {
            return hash;
        }

        for (let i = 0; i < text.length; i++) {
            const char = text.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash |= 0;
        }

        return hash.toString();
    };

    return (
        <StrictMode>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing="3px">
                    <Grid item xs={9}>
                        <Item>
                            {formData.tipoGestion2 == 'Descuento' ? (
                                <>
                                    <Box>
                                        <Grid item xs={12}>
                                            <TextField
                                                className="AlertText"
                                                fullWidth
                                                id="fullWidth"
                                                sx={{
                                                    border: 2,
                                                    borderColor: 'red',
                                                    color: 'red',
                                                    textAlign: 'center',
                                                }}
                                                value={
                                                    formData.tipoGestion2 == 'Descuento'
                                                        ? 'Importante !!! Realiza Nota Credito de Descuento'
                                                        : null
                                                }
                                                onChange={() => { }}
                                            />
                                        </Grid>
                                    </Box>
                                </>
                            ) : null}

                            <Box>
                                <Grid container spacing={2} sx={{ pt: 2 }}>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            disabled
                                            label="Fecha de gestion"
                                            id="fullWidth"
                                            value={formData.fechaGestion}
                                            onChange={() => { }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="tipoGestion" className="labelInputCustom">
                                                Canal de atención
                                            </InputLabel>
                                            <Select
                                                labelId="tipoGestion"
                                                value={formData.tipoGestion}
                                                onChange={(ev) => {
                                                    setFormData({
                                                        ...formData,
                                                        tipoGestion: ev.target.value,
                                                    });
                                                }}
                                            >
                                                {selectOptions.tipoGestion.map((el, index) => {
                                                    return (
                                                        <MenuItem key={'tipoGestion1' + index} value={el}>
                                                            {el}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Item>

                        <Item>
                            <TableContainer component={Paper}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Total antes de IVA</TableCell>
                                            <TableCell align="left">Aplica IVA</TableCell>
                                            <TableCell align="right">Total</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {formData.pagos.map((pago, index) => {
                                            return (
                                                <TableRow key={'fila' + index}>
                                                    <TableCell component="th" scope="row">
                                                        <TextField
                                                            fullWidth
                                                            id="fullWidth"
                                                            type="number"
                                                            value={formData.pagos[index][0]}
                                                            onChange={(ev) => {
                                                                let currentData = formData.pagos;
                                                                currentData[index][0] = ev.target.value;
                                                                setFormData({
                                                                    ...formData,
                                                                    pagos: currentData,
                                                                });
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <input type='checkbox'
                                                            checked={formData.pagos[index][1]} // Set the initial checked state accordingly
                                                            onChange={(ev) => {
                                                                let currentData = formData.pagos;
                                                                currentData[index][1] = ev.target.checked;
                                                                setFormData({
                                                                    ...formData,
                                                                    pagos: currentData,
                                                                });
                                                            }}
                                                        />{' '}
                                                        Aplica Iva
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        $ {pago[1] ? parseFloat(pago[0]) * 1.19 : pago[0]}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                <b>
                                                    ${' '}
                                                    {formData.pagos.reduce((acc, curr) => {
                                                        acc = parseFloat(acc) + parseFloat(curr[0]);
                                                        return acc;
                                                    }, 0)}
                                                </b>
                                            </TableCell>
                                            <TableCell align="right"></TableCell>
                                            <TableCell align="right">
                                                <b>
                                                    $
                                                    {formData.pagos.reduce((acc, curr) => {
                                                        let thisEl = curr[1]
                                                            ? parseFloat(curr[0]) * 1.19
                                                            : parseFloat(curr[0]);
                                                        acc = parseFloat(acc) + thisEl;
                                                        return acc;
                                                    }, 0)}
                                                </b>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Item>

                        {/* DINAMICOS */}
                        <Item>
                            {/* <h3>Detalles</h3> */}

                            <Box>
                                <Grid container spacing={2} sx={{ pt: 2 }}>
                                    <Grid item xs>
                                        <FormControl fullWidth>
                                            <InputLabel id="tipoGestion" className="labelInputCustom">
                                                Tipo de Gestion
                                            </InputLabel>
                                            <Select
                                                value={formData.tipoGestion2}
                                                onChange={(ev) => {
                                                    setFormData({
                                                        ...formData,
                                                        tipoGestion2: ev.target.value,
                                                        descuento:
                                                            ev.target.value == 'Descuento'
                                                                ? formData.descuento
                                                                : 0,
                                                    });
                                                }}
                                            >
                                                {selectOptions.tipoGestion2.map((el, index) => {
                                                    return (
                                                        <MenuItem key={'tipoGestion2' + index} value={el}>
                                                            {el}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    {formData.tipoGestion2 == 'Descuento' ? (
                                        <>
                                            <Grid item xs>
                                                <FormControl fullWidth>
                                                    <InputLabel id="tipoGestion">% Descuento</InputLabel>
                                                    <Select
                                                        value={formData.descuento}
                                                        onChange={(ev) => {
                                                            setFormData({
                                                                ...formData,
                                                                descuento: ev.target.value,
                                                            });
                                                        }}
                                                    >
                                                        {Array.from({ length: 15 }, (_, index) => {
                                                            const el = index + 1;
                                                            return (
                                                                <MenuItem key={'descuento' + index} value={el}>
                                                                    {el}%
                                                                </MenuItem>
                                                            );
                                                        })}
                                                        <MenuItem value="20">15% + 5% Aprov Lider</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>

                                            <Grid item xs>
                                                <TextField
                                                    fullWidth
                                                    disabled
                                                    label="Valor Descontado"
                                                    value={
                                                        formData.pagos.reduce((acc, curr) => {
                                                            let thisEl = curr[1]
                                                                ? parseFloat(curr[0]) * 1.19
                                                                : parseFloat(curr[0]);
                                                            acc = parseFloat(acc) + thisEl;
                                                            return acc;
                                                        }, 0) *
                                                        (formData.descuento / 100)
                                                    }
                                                    onChange={(ev) => { }}
                                                />
                                            </Grid>
                                        </>
                                    ) : null}

                                    <Grid item xs>
                                        <TextField
                                            fullWidth
                                            label="Fecha Compromiso"
                                            id="fullWidth"
                                            type="date"
                                            value={formData.fechaCompromiso}
                                            onChange={(ev) => {
                                                setFormData({
                                                    ...formData,
                                                    fechaCompromiso: ev.target.value,
                                                });
                                            }}
                                        />
                                    </Grid>

                                    {formData.tipoGestion2 == 'Cuotas' ? (
                                        <Grid item xs={2}>
                                            <FormControlLabel
                                                control={
                                                    <input type='checkbox'
                                                        checked={formData.terceraCuotaPorLider}
                                                        onChange={(ev) => {
                                                            setFormData({
                                                                ...formData,
                                                                terceraCuotaPorLider: ev.target.checked,
                                                            });
                                                        }}
                                                    />
                                                }
                                                label="3ra Cuota Aprobada por Lider"
                                            />
                                        </Grid>
                                    ) : null}

                                    {formData.tipoGestion2 == 'Cuotas' ? (
                                        <>
                                            <Grid item xs={12}>
                                                <Grid container spacing={2} sx={{ pt: 2 }}>
                                                    {/* CUOTA1 */}
                                                    <Grid item xs>
                                                        <span>Cuota 1</span>
                                                        <TextField
                                                            sx={{ mb: 2 }}
                                                            fullWidth
                                                            label="Cuota"
                                                            id="fullWidth"
                                                            value={formData.cuotas[0][0]}
                                                            onBlur={(ev) => {
                                                                let valor = ev.target.value;
                                                                if (!isNaN(valor) && parseFloat(valor) >= 50) {
                                                                    setFormData({
                                                                        ...formData,
                                                                        fechaCompromiso: valor,
                                                                    });
                                                                } else {
                                                                    alert(
                                                                        'El valor de la cuota no debe ser menor al 50%'
                                                                    );
                                                                    let current = formData.cuotas;
                                                                    current[0][0] = 50;
                                                                    current[1][0] = 50;
                                                                    setFormData({
                                                                        ...formData,
                                                                        cuotas: current,
                                                                    });
                                                                }
                                                            }}
                                                            onChange={(ev) => {
                                                                let current = formData.cuotas;
                                                                current[0][0] = ev.target.value;
                                                                current[1][0] = 100 - ev.target.value;
                                                                setFormData({
                                                                    ...formData,
                                                                    cuotas: current,
                                                                });
                                                            }}
                                                        />
                                                        <TextField
                                                            sx={{ mb: 2 }}
                                                            fullWidth
                                                            disabled
                                                            label="Monto"
                                                            id="fullWidth"
                                                            value={
                                                                formData.pagos.reduce((acc, curr) => {
                                                                    let thisEl = curr[1]
                                                                        ? parseFloat(curr[0]) * 1.19
                                                                        : parseFloat(curr[0]);
                                                                    acc = parseFloat(acc) + thisEl;
                                                                    return acc;
                                                                }, 0) *
                                                                (1 - formData.descuento / 100) *
                                                                (formData.cuotas[0][0] / 100)
                                                            }
                                                            onChange={(ev) => { }}
                                                        />
                                                        <TextField
                                                            fullWidth
                                                            label="Fecha"
                                                            id="fullWidth"
                                                            type="date"
                                                            value={formData.cuotas[0][1]}
                                                            onChange={(ev) => {
                                                                let current = formData.cuotas;
                                                                current[0][1] = ev.target.value;
                                                                setFormData({
                                                                    ...formData,
                                                                    cuotas: current,
                                                                });
                                                            }}
                                                        />
                                                    </Grid>

                                                    {/* CUOTA2 */}
                                                    <Grid item xs>
                                                        <span>Cuota 2</span>
                                                        <TextField
                                                            sx={{ mb: 2 }}
                                                            fullWidth
                                                            disabled
                                                            label="Cuota"
                                                            id="fullWidth"
                                                            value={formData.cuotas[1][0]}
                                                            onChange={(ev) => { }}
                                                        />
                                                        <TextField
                                                            sx={{ mb: 2 }}
                                                            fullWidth
                                                            disabled
                                                            label="Monto"
                                                            id="fullWidth"
                                                            value={
                                                                formData.pagos.reduce((acc, curr) => {
                                                                    let thisEl = curr[1]
                                                                        ? parseFloat(curr[0]) * 1.19
                                                                        : parseFloat(curr[0]);
                                                                    acc = parseFloat(acc) + thisEl;
                                                                    return acc;
                                                                }, 0) *
                                                                (1 - formData.descuento / 100) *
                                                                (formData.cuotas[1][0] / 100)
                                                            }
                                                            onChange={(ev) => { }}
                                                        />
                                                        <TextField
                                                            fullWidth
                                                            label="Fecha"
                                                            id="fullWidth"
                                                            type="date"
                                                            value={formData.cuotas[1][1]}
                                                            onChange={(ev) => {
                                                                let current = formData.cuotas;
                                                                current[1][1] = ev.target.value;
                                                                setFormData({
                                                                    ...formData,
                                                                    cuotas: current,
                                                                });
                                                            }}
                                                        />
                                                    </Grid>

                                                    {/* CUOTA3 */}
                                                    {formData.terceraCuotaPorLider ? (
                                                        <>
                                                            <Grid item xs>
                                                                <span>Cuota 3</span>
                                                                <TextField
                                                                    sx={{ mb: 2 }}
                                                                    fullWidth
                                                                    label="Cuota"
                                                                    id="fullWidth"
                                                                    value={formData.cuotas[2][0]}
                                                                    onChange={(ev) => {
                                                                        let current = formData.cuotas;
                                                                        current[2][0] = ev.target.value;
                                                                        current[1][0] =
                                                                            100 - ev.target.value - current[0][0];
                                                                        setFormData({
                                                                            ...formData,
                                                                            cuotas: current,
                                                                        });
                                                                    }}
                                                                />
                                                                <TextField
                                                                    sx={{ mb: 2 }}
                                                                    fullWidth
                                                                    disabled
                                                                    label="Monto"
                                                                    id="fullWidth"
                                                                    value={
                                                                        formData.pagos.reduce((acc, curr) => {
                                                                            let thisEl = curr[1]
                                                                                ? parseFloat(curr[0]) * 1.19
                                                                                : parseFloat(curr[0]);
                                                                            acc = parseFloat(acc) + thisEl;
                                                                            return acc;
                                                                        }, 0) *
                                                                        (1 - formData.descuento / 100) *
                                                                        (formData.cuotas[2][0] / 100)
                                                                    }
                                                                    onChange={(ev) => { }}
                                                                />
                                                                <TextField
                                                                    fullWidth
                                                                    label="Fecha"
                                                                    id="fullWidth"
                                                                    type="date"
                                                                    value={formData.cuotas[2][1]}
                                                                    onChange={(ev) => {
                                                                        let current = formData.cuotas;
                                                                        current[2][1] = ev.target.value;
                                                                        setFormData({
                                                                            ...formData,
                                                                            cuotas: current,
                                                                        });
                                                                    }}
                                                                />
                                                            </Grid>
                                                        </>
                                                    ) : null}
                                                </Grid>
                                            </Grid>
                                        </>
                                    ) : null}
                                </Grid>
                            </Box>
                        </Item>

                        {/* NOTA CREDITO */}
                        <Item>
                            <h3>Nota Credito</h3>

                            <Box>
                                <Grid container spacing={2} sx={{ pt: 2 }}>
                                    <Grid item xs>
                                        <FormControl fullWidth>
                                            <InputLabel id="tipoGestion" className="labelInputCustom">
                                                Aplica NC
                                            </InputLabel>
                                            <Select
                                                value={formData.aplicaNC}
                                                onChange={(ev) => {
                                                    setFormData({
                                                        ...formData,
                                                        aplicaNC: ev.target.value,
                                                    });
                                                }}
                                            >
                                                {selectOptions.aplicaNC.map((el, index) => {
                                                    return (
                                                        <MenuItem key={'aplicaNC' + index} value={el}>
                                                            {el}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs>
                                        <FormControl fullWidth>
                                            <InputLabel id="tipoGestion" className="labelInputCustom">
                                                Tipo
                                            </InputLabel>
                                            <Select
                                                value={formData.tipoNC}
                                                onChange={(ev) => {
                                                    setFormData({
                                                        ...formData,
                                                        tipoNC: ev.target.value,
                                                    });
                                                }}
                                            >
                                                {selectOptions.tipoNC.map((el, index) => {
                                                    return (
                                                        <MenuItem key={'tipoNC' + index} value={el}>
                                                            {el}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs>
                                        <FormControl fullWidth>
                                            <InputLabel id="tipoGestion" className="labelInputCustom">
                                                Motivo
                                            </InputLabel>
                                            <Select
                                                value={formData.motivoNC}
                                                onChange={(ev) => {
                                                    setFormData({
                                                        ...formData,
                                                        motivoNC: ev.target.value,
                                                    });
                                                }}
                                            >
                                                {selectOptions.motivoNC.map((el, index) => {
                                                    return (
                                                        <MenuItem key={'motivoNC' + index} value={el}>
                                                            {el}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs>
                                        <TextField
                                            fullWidth
                                            label="Valor"
                                            id="fullWidth"
                                            valor={formData.valorNC}
                                            onChange={(ev) => {
                                                setFormData({
                                                    ...formData,
                                                    valorNC: ev.target.value,
                                                });
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Item>
                    </Grid>

                    <Grid item xs={3}>
                        <Item>
                            <textarea
                                placeholder="Notas adicionales"
                                value={formData.notas}
                                onChange={(ev) => {
                                    setFormData({
                                        ...formData,
                                        notas: ev.target.value,
                                    });
                                }}
                            />
                        </Item>
                        <Item>
                            <TextField
                                fullWidth
                                disabled
                                label="Compromiso de pago"
                                id="fullWidth"
                                value={calculatePagoTotal()}
                                onChange={() => { }}
                            />
                        </Item>
                        <Item>
                            <TextField
                                fullWidth
                                disabled
                                label="Fecha de compromiso"
                                id="fullWidth"
                                value={
                                    formData.tipoGestion2 == 'Cuotas'
                                        ? formData.cuotas[0][1]
                                        : formData.fechaCompromiso
                                }
                                onChange={() => { }}
                            />
                        </Item>
                        <Item>
                            <textarea
                                className="detalles"
                                value={JSON.stringify(formData, null, 4)}
                                onChange={() => { }}
                            />
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </StrictMode>
    );
};

export default Tablero;
