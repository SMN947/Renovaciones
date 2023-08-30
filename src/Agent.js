import React, { Component } from 'react';
import Card from '@mui/material/Card';
// import axios from 'axios';
import './TranferencesHelper.css';
import { Button, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FormOptions, Wrapper } from './Components';

const CardContent = styled(Grid)({
  padding: '10px',
  boxShadow: '8px 8px 8px rgba(0, 0, 0, 0.2)',
  borderRadius: '5px',
  border: '1px solid #e0e0e0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    boxShadow: '8px 8px 8px rgba(0, 0, 0, 0.4)',
  },
});

class StepperForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      currentStep: 'null',
      selectionHistory: [],
      selectionHistoryIds: [],
      loading: true,
    };
  }

  componentDidMount() {
    const storedData = localStorage.getItem('flowchart');
    if (storedData) {
      let JSONData = this.parseShapesToFlow(JSON.parse(storedData));
      this.setState({
        formData: JSONData,
        currentStep: Object.keys(JSONData)[0],
        selectionHistory: ['Inicio'],
        selectionHistoryIds: [Object.keys(JSONData)[0]],
      });
    }

    this.setState({ loading: false });
  }

  parseShapesToFlow = (json) => {
    console.log(json);
    const result = {};

    for (let i = 0; i < json.length; i++) {
      const node = json[i];

      if (node.options.length > 0) {
        const options = {};
        for (const option of node.options) {
          options[option.target] = option.name;
        }
        result[node.key] = {
          title: node.title,
          options: options,
          documentation:
            node.documentation || 'Aun no hay recursos disponibles',
        };
      } else {
        if (node.title == 'nuevo') {
          console.log(node);
        }
        result[node.key] = {
          transfer: node.title,
          schedule: node.schedule || '00:00 - 00:00',
          documentation:
            node.documentation || 'Aun no hay recursos disponibles',
        };
      }
    }

    return result;
  };

  handleOptionChange = (event) => {
    console.log(event.target.value);
    console.log(this.state.formData[event.target.value]);
    this.setState({ currentStep: event.target.value });

    let selecedOPtionForBreadcrumb =
      this.state.formData[this.state.currentStep].options[event.target.value];
    this.setState((prevState) => ({
      ...prevState,
      selectionHistory: [
        ...prevState.selectionHistory,
        selecedOPtionForBreadcrumb,
      ],
      selectionHistoryIds: [
        ...prevState.selectionHistoryIds,
        event.target.value,
      ],
    }));
  };
  reset() {
    let firstStep = Object.keys(this.state.formData)[0];
    this.setState({ currentStep: firstStep });
    this.setState((prevState) => ({
      ...prevState,
      selectionHistory: [],
    }));
  }

  navigateTo(index) {
    console.log(index);
    this.setState({
      selectionHistory: this.state.selectionHistory.slice(0, index + 1),
      selectionHistoryIds: this.state.selectionHistoryIds.slice(0, index + 1),
      currentStep: this.state.selectionHistoryIds[index],
    });
  }

  render() {
    return (
      <>
        <Grid variant="outlined">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4" component="div">
                Asistente de transferencias
              </Typography>
            </Grid>
            {!this.state.loading ? (
              <>
                <Grid item xs={12}>
                  <CardContent>
                    {/* <Breadcrumb
                      selectionHistory={this.state.selectionHistory}
                      navigateTo={this.navigateTo.bind(this)}
                    /> */}
                  </CardContent>
                </Grid>
                {!this.state.formData[this.state.currentStep].transfer ? (
                  <>
                    <Grid item xs={12}>
                      <CardContent sx={{ height: '20vh' }}>
                        <Typography variant="h5">
                          {this.state.formData[this.state.currentStep].title}
                        </Typography>
                      </CardContent>
                    </Grid>
                  </>
                ) : (
                  <></>
                )}

                <FormOptions
                  currentStep={this.state.currentStep}
                  formData={this.state.formData}
                  handleOptionChange={this.handleOptionChange}
                  reset={this.reset.bind(this)}
                />
              </>
            ) : (
              <>
                <Grid item xs={12}>
                  <CardContent>
                    <Typography variant="body2" align="center">
                      Estamos cargando la mejor experiencia para ti.c..
                    </Typography>
                    <Wrapper>
                      <CircularProgress sx={{ padding: 3 }} />
                    </Wrapper>
                  </CardContent>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </>
    );
  }
}

export default StepperForm;
