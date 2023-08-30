import React from 'react';
import { Grid } from '@mui/material';
import { GridLayout, GridLayoutItem } from '@progress/kendo-react-layout';
import { GridTransfer, Wrapper } from './Extras';
import { CardContentNormal } from './Extras';
import { Button } from '@mui/material';
import Tablero from './Tablero';
import { styled } from '@mui/material/styles';
import { SkillTransfer } from './FormOptionsSections/SkillTransfer';
import { OptionSelection } from './FormOptionsSections/OptionSelection';
import { GeneralCase } from './FormOptionsSections/GeneralCase';

const FormOptions = ({ currentStep, formData, handleOptionChange, reset }) => {
  console.log("currentStep", currentStep)
  console.log("formData", formData)

  if ((formData[currentStep].transfer && formData[currentStep].schedule.length > 2)) {
    console.log("Skill Transfer")
  } else {
    console.log("General Case")
  }
  return (
    <>
      {(formData[currentStep].transfer && formData[currentStep].schedule.length > 2) ? (
        <SkillTransfer
          currentStep={currentStep}
          formData={formData}
          handleOptionChange={handleOptionChange}
          reset={reset} />
      ) : <>
        <GeneralCase
          currentStep={currentStep}
          formData={formData}
          handleOptionChange={handleOptionChange}
          reset={reset} />
      </>
      }
    </>
  );
};

export default FormOptions;
