import React, { useEffect } from 'react';
import { GridLayout, GridLayoutItem } from '@progress/kendo-react-layout';
import Tablero from '../Tablero';
import { Button } from '@mui/material';
import { OptionSelection } from './OptionSelection';


export const GeneralCase = ({ currentStep, formData, handleOptionChange, reset }) => {
    const [currentStepData, setCurrentStepData] = React.useState(undefined);
    const [hasNotes, setHasNotes] = React.useState(undefined);
    const [hasTablero, setHasTablero] = React.useState(undefined);
    const [hasInputs, setHasInputs] = React.useState(undefined);
    const [hasOptions, setHasOptions] = React.useState(undefined);
    // const currentStepData = formData[currentStep].data;
    const renderSettings = [
        {
            id: "notasGenerales",
            renderType: "richText",
            className: "renewals-tree-notas",
            label: "Notas Generales:",
            colSpan: 5
        }, {
            id: "actionsSinergy",
            renderType: "richText",
            className: "renewals-tree-notas",
            label: "Acciones en Synergy:",
            colSpan: 5
        }, {
            id: "actionsFive9",
            renderType: "richText",
            className: "renewals-tree-notas",
            label: "Acciones en Five9:",
            colSpan: 5
        },
    ]

    const checkIfHtmlIsEmpty = (html) => {
        const withoutEmptyTags = html.replace(/<[^\/>]*>\s*<\/[^>]+>|<[^>]+>\s*<\/[^>]+>/g, '');
        const content = withoutEmptyTags.replace(/\s/g, '');
        return content.length === 0;
    }

    // const hasTablero = (currentStepData.Tablero != null && currentStepData.Tablero != "");

    useEffect(() => {
        console.clear()
        const tempCurrentStepData = formData[currentStep].data;

        console.log(formData["3m1qhkzmzieqrx"])

        console.log(tempCurrentStepData.options)

        let tempHasNotes = renderSettings.find((setting) => {
            return !checkIfHtmlIsEmpty(tempCurrentStepData[setting.id])
        });

        setCurrentStepData(tempCurrentStepData);
        setHasNotes(tempHasNotes);
        setHasTablero(tempCurrentStepData.Tablero == true)
        setHasInputs(tempCurrentStepData.inputs.length != 0);
        setHasOptions(tempCurrentStepData.options != undefined && tempCurrentStepData.options.length != 0);
    }, [currentStep])

    return (
        (currentStepData != undefined) ? <>
            <GridLayout
                className='renewals-tree-card-container generalCase'
                style={{ margin: '10px' }}
                align={{ horizontal: 'center', }}
                gap={{ rows: 5, cols: 0, }}>


                {/* TITULO */}
                <GridLayoutItem className={`renewals-tree-title siignal-w100`} colSpan={10}>
                    {currentStepData.title}
                </GridLayoutItem>

                {/* NOTAS */}
                {
                    (hasNotes != undefined) ? <>
                        <GridLayoutItem className={`siignal-w100`} colSpan={(hasInputs || hasTablero) ? 3 : 10}>
                            <GridLayout
                                style={{ margin: '10px' }}
                                align={{ horizontal: 'center', }}
                                cols={[{ width: "auto" }]}
                                gap={{ rows: 5, cols: 0, }}>
                                {
                                    renderSettings.map((setting) => {
                                        if (setting.renderType == "richText" && !checkIfHtmlIsEmpty(currentStepData[setting.id])) {
                                            return (
                                                <GridLayoutItem className='siignal-box-shadow' colSpan={setting.colSpan} key={`renewals-notes${setting.id}`}>
                                                    <span className='renewals-tree-card-title'>{setting.label}</span>
                                                    <hr />
                                                    <div dangerouslySetInnerHTML={{ __html: currentStepData[setting.id] }}></div>
                                                </GridLayoutItem>
                                            )
                                        }
                                    })
                                }
                            </GridLayout>
                        </GridLayoutItem>
                    </> : null
                }
                {/* INPUTS | TABLERO */}
                {
                    (hasInputs || hasTablero) ? <>
                        <GridLayoutItem className={`siignal-w100`} colSpan={(hasNotes) ? 7 : 10}>
                            {
                                (hasInputs) ? <>
                                    <GridLayout
                                        style={{ margin: '10px' }}
                                        align={{ horizontal: 'center', }}
                                        cols={[{ width: "100%" }]}
                                        gap={{ rows: 5, cols: 0, }}>
                                        {
                                            currentStepData.inputs.map((input) => {
                                                return (
                                                    <>
                                                        <label className='siignal-w100'>{input.name}</label>
                                                        <input
                                                            className='siignal-w100'
                                                            placeholder={input.name}
                                                            style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '5px' }}
                                                            name={input.name} />
                                                    </>
                                                )
                                            })
                                        }
                                    </GridLayout>
                                </> : null
                            }

                            {
                                (hasTablero) ? <>
                                    <GridLayoutItem>
                                        <Tablero />
                                    </GridLayoutItem>
                                </> : null
                            }
                        </GridLayoutItem>
                    </> : null
                }


                {
                    hasOptions != 0 ?
                        <GridLayoutItem className={`siignal-w100`} colSpan={10}>
                            <OptionSelection
                                currentStep={currentStep}
                                formData={formData}
                                handleOptionChange={handleOptionChange}
                                reset={reset} />
                        </GridLayoutItem>
                        : null
                }
                {
                    currentStepData.Finalizar == true ? <>
                        <GridLayoutItem className={`siignal-w100`} colSpan={10}>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2, mb: 2 }}
                                onClick={() => {
                                    alert("Crear promesa de pago, guardar datos y redirigir a la pagina de inicio");
                                    reset();
                                }}
                            >
                                Guardar
                            </Button>
                        </GridLayoutItem>
                    </> : null
                }
            </GridLayout >
        </> : null
    )
}