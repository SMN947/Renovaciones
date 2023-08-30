import React, { Component } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './TranferencesHelper.css';

class StepperForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      currentStep: '4ovpsx23fphykh', //'null',
      selectionHistory: ['Inicio', 'Activo', 'Nube', 'Estado de cuenta'], //[],
      selectionHistoryIds: [
        'cpr3oi5mjqzgar',
        'n7yc7kdj95rlgu',
        'catp1rt2f5a9ql',
        '4ovpsx23fphykh',
      ], //[],
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
        };
      } else {
        result[node.key] = {
          transfer: node.title,
        };
      }
    }

    return result;
  };

  handleOptionChange = (event) => {
    this.state.formData[this.state.currentStep].transfer;
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
        {/* <p>{JSON.stringify(this.state.selectionHistory)}</p>
        <p>{JSON.stringify(this.state.selectionHistoryIds)}</p>
        <p>{JSON.stringify(this.state.currentStep)}</p> */}
        <Card variant="outlined" className="formBody">
          <div>
            {this.state.formData[this.state.currentStep] != undefined ? (
              <>
                <h2>Matriz de Transferencias</h2>
                <hr />
                <h3 class="breadcrumb-container">
                  <span class="breadcrumb-item">
                    {this.state.selectionHistory.map((item, index) => {
                      const isLastItem =
                        index === this.state.selectionHistory.length - 1;
                      return (
                        <React.Fragment key={item}>
                          {isLastItem ? (
                            <span className="breadcrumb-item active">
                              {item}
                            </span>
                          ) : (
                            <React.Fragment>
                              <a
                                className="breadcrumb-item"
                                href="#"
                                onClick={() => this.navigateTo(index)}
                              >
                                {item}
                              </a>
                              <span className="breadcrumb-separator"></span>
                            </React.Fragment>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </span>
                </h3>
                <h1>{this.state.formData[this.state.currentStep].title}</h1>
                <div>
                  {this.state.formData[this.state.currentStep].options ? (
                    <div>
                      {Object.entries(
                        this.state.formData[this.state.currentStep].options
                      ).map(([key, value]) => (
                        <div key={key}>
                          <input
                            type="radio"
                            id={key}
                            value={key}
                            checked={this.state.currentStep === key}
                            onChange={this.handleOptionChange}
                          />
                          <label htmlFor={key}>{value}</label>
                        </div>
                      ))}
                    </div>
                  ) : this.state.formData[this.state.currentStep].transfer ? (
                    <>
                      <p>
                        Transfiere al siguiente skil, esperamos haberte ayudado
                        ! 😁 : <br />
                        <b>
                          {this.state.formData[this.state.currentStep].transfer}
                        </b>
                      </p>
                      <button
                        onClick={() => {
                          this.reset();
                        }}
                      >
                        Reiniciar
                      </button>
                    </>
                  ) : null}
                </div>
              </>
            ) : (
              'NO existe un formulario'
            )}
          </div>
        </Card>
      </>
    );
  }
}

export default StepperForm;
import React, { Component } from 'react';
import Card from '@mui/material/Card';
import axios from 'axios';
import './TranferencesHelper.css';
import { Button, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@material-ui/core/Grid';

import { GridCard, CardContent, Breadcrumb, FormOptions, Wrapper } from './Components';

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
      // axios.get(`/api/siignalGetTRansferencesTree`).then(res => {
      //   console.log(res.data[0])
      //   let requestData = res.data[0];
      //   const storedData = requestData.shapes;//localStorage.getItem('flowchart');
  
      //   let JSONData = this.parseShapesToFlow(storedData);
      //   this.setState({
      //     formData: JSONData,
      //     currentStep: Object.keys(JSONData)[0],
      //     selectionHistory: ['Inicio'],
      //     selectionHistoryIds: [Object.keys(JSONData)[0]],
      //   }, () => {
  
      //     this.setState({ loading: false });
      //   });
      // }).catch(err => {
      //   console.log(err)
  
      //   this.setState({ loading: false });
      // })
  
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
                    documentation: node.documentation || 'Aun no hay recursos disponibles',
                };
            } else {
                if (node.title == 'nuevo') {
                    console.log(node)
                }
                result[node.key] = {
                    transfer: node.title,
                    schedule: node.schedule || '00:00 - 00:00',
                    documentation: node.documentation || 'Aun no hay recursos disponibles',
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
                <GridCard variant="outlined">
                    <Grid container spacing={3} >
                        <GridCard item xs={12}>
                            <Typography variant="h4" component="div">
                                Asistente de transferencias
                            </Typography>
                        </GridCard>
                        {/* {
                            (!this.state.loading) ? <>
                                <GridCard item xs={12}>
                                    <CardContent>
                                        <Breadcrumb
                                            selectionHistory={this.state.selectionHistory}
                                            navigateTo={this.navigateTo.bind(this)}
                                        />
                                    </CardContent>
                                </GridCard>
                                {
                                    (!this.state.formData[this.state.currentStep].transfer) ? <>
                                        <GridCard item xs={12} >
                                            <CardContent sx={{ height: "20vh" }}>
                                                <Typography variant="h5">
                                                    {this.state.formData[this.state.currentStep].title}
                                                </Typography>
                                            </CardContent>
                                        </GridCard>
                                    </> : <></>
                                }

                                <FormOptions
                                    currentStep={this.state.currentStep}
                                    formData={this.state.formData}
                                    handleOptionChange={this.handleOptionChange}
                                    reset={this.reset.bind(this)} />
                            </> : <>

                                <GridCard item xs={12}>
                                    <CardContent>
                                        <Typography variant='body2' align='center'>
                                            Estamos cargando la mejor experiencia para ti...
                                        </Typography>
                                        <Wrapper>
                                            <CircularProgress sx={{ padding: 3 }} />
                                        </Wrapper>
                                    </CardContent>
                                </GridCard>
                            </>
                        } */}
                    </Grid>
                </GridCard>
            </>
        );
    }
}

export default StepperForm;
