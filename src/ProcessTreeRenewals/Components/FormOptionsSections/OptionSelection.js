import React from 'react';
import { GridLayout, GridLayoutItem } from '@progress/kendo-react-layout';


export const OptionSelection = ({ currentStep, formData, handleOptionChange, reset }) => {
    return (
        <GridLayout
            className='grid'
            style={{ margin: '20px' }}
            // align={{ horizontal: 'center', }}
            cols={[{ width: "50%" }, { width: "auto" }]}
            gap={{ rows: 10, cols: 10, }}>

            {
                (formData[currentStep].options != undefined) ?
                    (formData[currentStep].options?.length != 0) ? <>
                        <GridLayoutItem className={`renewals-tree-subtitle siignal-w100`} colSpan={2}>
                            Selecciona de manera correcta:
                        </GridLayoutItem>

                        {
                            Object.entries(formData[currentStep].options).map(([key, value]) => (
                                <GridLayoutItem className='siignal-box-shadow renewals-OptionElement'>
                                    <input
                                        type="radio"
                                        id={key}
                                        value={key}
                                        className="renewals-optionInput"
                                        checked={currentStep === key}
                                        onChange={handleOptionChange}
                                    />
                                    <label htmlFor={key} className="renewals-optionLabel">
                                        {value}
                                    </label>
                                </GridLayoutItem>
                            ))
                        }
                    </> : null
                    : null
            }

        </GridLayout>
    )
}