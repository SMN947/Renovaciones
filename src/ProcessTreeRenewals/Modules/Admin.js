import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Rect, Line, Group } from 'react-konva';
import Button from '@mui/material/Button';
import DynamicRect from './../Components/DynamicRect';
import { Splitter } from '@progress/kendo-react-layout'
import { MultilineInput } from '../Components/FormOptionsSections/MultilineInput';
import { EditorUtils } from '@progress/kendo-react-editor';

const Admin = () => {
  const generateRandomId = () => {
    return (
      Math.random().toString(36).slice(2, 9) +
      Math.random().toString(36).slice(2, 9)
    );
  };

  const [shapes, setShapes] = useState([]);
  const stageRef = useRef(null);
  const [editPopUp, setEditPopUp] = useState(true);
  const [editingShape, setEditingShape] = useState(null);
  const [editPopUpOption, setEditPopUpOption] = useState(0);
  const [editingOption, setEditingOption] = useState(null);
  const [lineShapes, setLineShapes] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isDrawingLine, setIsDrawingLine] = useState(false);
  const [scale, setScale] = useState(1);
  const [isRemovinOption, setIsRemovingOption] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stageParent, setStageParent] = useState(null);
  const [editingEditorRefs, setEditingEditorRefs] = useState({
    actionsFive9: {
      id: 'actionsFive9',
      editorRef: useRef(null),
    },
    actionsSinergy: {
      id: 'actionsSinergy',
      editorRef: useRef(null),
    },
    notasGenerales: {
      id: 'notasGenerales',
      editorRef: useRef(null),
    },
  });
  const editingCardSettings = [
    {
      label: 'Titulo',
      id: 'title',
      type: 'text'
    }, {
      label: 'Horario',
      id: 'schedule',
      type: 'text'
    }, {
      label: 'Recurso (Enlace)',
      id: 'link',
      type: 'text'
    }, {
      label: 'Acciones en Five9',
      id: 'actionsFive9',
      type: 'textarea'
    }, {
      label: 'Acciones en Sinergy',
      id: 'actionsSinergy',
      type: 'textarea'
    }, {
      label: 'Notas Generales',
      id: 'notasGenerales',
      type: 'textarea'
    }
  ]
  const [panes, setPanes] = React.useState([
    {
      size: "70%",
      min: "20px",
      collapsible: true,
    },
    {},
    {
      size: "20%",
      min: "20px",
      collapsible: true,
    },
  ]);

  useEffect(() => {
    setScale(scale + 0.001);
  }, [editPopUp])

  useEffect(() => {
    // console.table(editingShape);
  }, editingShape);

  useEffect(() => {
    const storedData = [
      {
        "x": 394.938394938395,
        "y": 82.25108098078678,
        "width": 300,
        "height": 64,
        "id": "Nuevo",
        "title": "Que tipo de factura tiene?",
        "link": "",
        "options": [
          {
            "name": "F94 - Ventas Nuevas",
            "target": "b4hsw0jeu55tuu",
            "key": "fzl1j96bhapsfo",
            "x": {
              "global": 694.938394938395,
              "local": 20
            },
            "y": {
              "global": 182.25108098078678,
              "local": 24
            },
            "isDrawingLine": false
          },
          {
            "name": "F95 - RENOVACION",
            "target": "c0fkgzeyefico5",
            "key": "lsj4ne8ptvbayv",
            "x": {
              "global": 694.938394938395,
              "local": 20
            },
            "y": {
              "global": 202.25108098078678,
              "local": 44
            },
            "isDrawingLine": false
          },
          {
            "name": "No tiene Factura",
            "target": "ro07kc5jywf05b",
            "key": "e2oao90mwlx5vy",
            "x": {
              "global": 694.938394938395,
              "local": 20
            },
            "y": {
              "global": 222.25108098078678,
              "local": 64
            },
            "isDrawingLine": false
          }
        ],
        "key": "hf3j2pczu68wxs",
        "schedule": "",
        "actionsFive9": "<p></p>",
        "actionsSinergy": "<p></p>",
        "notasGenerales": "<p></p>",
        "Tablero": false,
        "Finalizar": false,
        "inputs": [],
        "links": [],
        "index": 0,
        "isDragging": false,
        "isDrawingLine": false
      },
      {
        "x": -5.661005661005632,
        "y": -26.640027910322146,
        "width": 300,
        "height": 64,
        "id": "Nuevo",
        "title": "Skill de ventas nuevas",
        "link": "",
        "options": [],
        "key": "b4hsw0jeu55tuu",
        "schedule": "L-V 08:00 - 16:00",
        "actionsFive9": "<p>dfdsfdsfdsfdsf<b>gfgdfg</b>dfbdfbdfbdfb</p>",
        "actionsSinergy": "<p></p>",
        "notasGenerales": "<p><strong><u>Debes tener en cuenta el horario de atencion. </u></strong><a href=\"https://lucid.app/lucidchart/bb1e7fb7-0396-4e77-94e3-4f014483e25a/edit?invitationId=inv_dda9c81f-f829-430b-b125-3fc6e08faa0c&amp;page=BTzUAS6FvUHa#\" target=\"_blank\" title=\"sdfsdf\"><strong><u>linkx</u></strong></a></p>",
        "Tablero": false,
        "Finalizar": false,
        "inputs": [],
        "links": [],
        "index": 1,
        "isDragging": false,
        "isDrawingLine": false
      },
      {
        "x": 592.7405927405928,
        "y": 391.9413906710963,
        "width": 300,
        "height": 64,
        "id": "Nuevo",
        "title": "El cliente no tiene factura, procede de esta manera:",
        "link": "",
        "options": [],
        "key": "ro07kc5jywf05b",
        "schedule": "",
        "actionsFive9": "<ul><li><p><span style=\"color:#333333;\">Tipifica su llamada en Five9 según su gestión: Avance 80% Avance 30%</span></p></li></ul>",
        "actionsSinergy": "<ul><li><p>Crea seguimiento comercial</p></li><li><p>Crea cotización</p></li><li><p><span style=\"color:#333333;\">Tipifica llamada como Verificar Pago</span></p></li></ul>",
        "notasGenerales": "<p><span style=\"color:#333333;\">Informa los planes de conversión según la necesidad del cliente.</span></p>",
        "Tablero": true,
        "Finalizar": true,
        "inputs": [],
        "links": [],
        "index": 2,
        "isDragging": false,
        "isDrawingLine": false
      },
      {
        "x": -16.4502164502168,
        "y": 273.7595724892783,
        "width": 300,
        "height": 64,
        "id": "Nuevo",
        "title": "El cliente contesta la llamada?",
        "link": "",
        "options": [
          {
            "name": "Si",
            "target": "14s7ryi5mssssg",
            "key": "e8ueo1ft87n4cg",
            "x": {
              "global": 283.5497835497832,
              "local": 20
            },
            "y": {
              "global": 373.7595724892783,
              "local": 24
            },
            "isDrawingLine": false
          },
          {
            "name": "No",
            "target": "3m1qhkzmzieqrx",
            "key": "k8tudql2k9maiu",
            "x": {
              "global": 283.5497835497832,
              "local": 20
            },
            "y": {
              "global": 393.7595724892783,
              "local": 44
            },
            "isDrawingLine": false
          }
        ],
        "key": "c0fkgzeyefico5",
        "schedule": "",
        "actionsFive9": "<p></p>",
        "actionsSinergy": "<p></p>",
        "notasGenerales": "<p></p>",
        "Tablero": false,
        "Finalizar": false,
        "inputs": [],
        "links": [],
        "index": 3,
        "isDragging": false,
        "isDrawingLine": false
      },
      {
        "x": -500.59780794014665,
        "y": 515.9875753281965,
        "width": 300,
        "height": 64,
        "id": "Nuevo",
        "title": "El cliente no contesto, procede de la siguiente manera:",
        "link": "",
        "options": [],
        "key": "3m1qhkzmzieqrx",
        "schedule": "",
        "actionsFive9": "<ol><li><p>Registra como <strong><u>Buzon</u></strong></p></li></ol>",
        "actionsSinergy": "<ol><li><p>Tipifica la llamada en su seguimiento de cobranza como <strong><u>No Contesta</u></strong></p></li><li><p>Registra fecha de compromiso dia de marcacion</p></li></ol>",
        "notasGenerales": "<p></p>",
        "Tablero": false,
        "Finalizar": true,
        "inputs": [],
        "links": [],
        "index": 4,
        "isDragging": false,
        "isDrawingLine": false
      },
      {
        "x": -485.84748584748587,
        "y": 189.81018981018983,
        "width": 300,
        "height": 64,
        "id": "Nuevo",
        "title": "El cliente contesto, procede de la siguiente manera:",
        "link": "",
        "options": [
          {
            "name": "SI - Desea renovar",
            "target": "vgypg99tcphcod",
            "key": "t8thhudfklb1hx",
            "x": {
              "global": -185.84748584748587,
              "local": 20
            },
            "y": {
              "global": 289.81018981018985,
              "local": 24
            },
            "isDrawingLine": false
          },
          {
            "name": "NO - Desea renovar",
            "target": "v4a2fvb27vwvsk",
            "key": "gk3mvnmtdt731d",
            "x": {
              "global": -185.84748584748587,
              "local": 20
            },
            "y": {
              "global": 309.81018981018985,
              "local": 44
            },
            "isDrawingLine": false
          }
        ],
        "key": "14s7ryi5mssssg",
        "schedule": "",
        "actionsFive9": "<p></p>",
        "actionsSinergy": "<ol><li><p>Valida NIT y saldo en cartera</p></li></ol>",
        "notasGenerales": "<ol><li><p><strong>Asegurate </strong>de solicitar la informacion</p></li><li><p><strong>Confirma</strong> el recibido de la factura</p></li><li><p><strong>Aclara </strong>valores cobrados</p></li></ol>",
        "Tablero": false,
        "Finalizar": false,
        "inputs": [
          {
            "name": "Nombre del cliente",
            "id": "Nombre_del_cliente"
          },
          {
            "name": "NIT",
            "id": "NIT"
          },
          {
            "name": "Cargo",
            "id": "Cargo"
          },
          {
            "name": "Contacto",
            "id": "Contacto"
          }
        ],
        "links": [],
        "index": 5,
        "isDragging": false,
        "isDrawingLine": false
      },
      {
        "x": -877.2771067013261,
        "y": 91.13917296418511,
        "width": 300,
        "height": 64,
        "id": "Nuevo",
        "title": "El cliente no desea renovar, procede de esta manera:",
        "link": "",
        "options": [
          {
            "name": "Continua sin querer renovar",
            "target": "2ex6cpy5gky98s",
            "key": "qot18j7k2y2n4g",
            "x": {
              "global": -577.2771067013261,
              "local": 20
            },
            "y": {
              "global": 191.1391729641851,
              "local": 24
            },
            "isDrawingLine": false
          }
        ],
        "key": "v4a2fvb27vwvsk",
        "schedule": "",
        "actionsFive9": "<p></p>",
        "actionsSinergy": "<p></p>",
        "notasGenerales": "<ol><li><p>Consulta este enlace <a href=\"https://example.com/\" target=\"_blank\" title=\"Arbol de Objeciones\"><strong>Arbol de Objeciones</strong></a></p></li><li><p>Si es de facturación electrónica:</p><ol><li><p>Puedes usar <a href=\"https://example.com/\" target=\"_blank\" title=\"Opciones FE\"><strong>estas opciones</strong></a></p></li><li><p>Comparte los <a href=\"https://example.com/\" target=\"_blank\" title=\"Beneficios de FE\"><strong>beneficios de FE</strong></a></p></li></ol></li></ol>",
        "Tablero": false,
        "Finalizar": false,
        "inputs": [],
        "links": [],
        "index": 6,
        "isDragging": false,
        "isDrawingLine": false
      },
      {
        "x": -882.053424571012,
        "y": 338.82537106360627,
        "width": 300,
        "height": 64,
        "id": "Nuevo",
        "title": "Puede pagar el valor total de su factura",
        "link": "",
        "options": [
          {
            "name": "Si",
            "target": "6u8kgbg0r3qs4h",
            "key": "a6g2b8z1wnifu6",
            "x": {
              "global": -582.053424571012,
              "local": 20
            },
            "y": {
              "global": 438.82537106360627,
              "local": 24
            },
            "isDrawingLine": false
          },
          {
            "name": "No, Cambia Plan",
            "target": "vzegdikkrld6wy",
            "key": "owgwgxol5kogxa",
            "x": {
              "global": -582.053424571012,
              "local": 20
            },
            "y": {
              "global": 458.82537106360627,
              "local": 44
            },
            "isDrawingLine": false
          },
          {
            "name": "No, Mantiene plan",
            "target": "uyhkqcurtpxng4",
            "key": "tw25o03q1oyyge",
            "x": {
              "global": -582.053424571012,
              "local": 20
            },
            "y": {
              "global": 478.82537106360627,
              "local": 64
            },
            "isDrawingLine": false
          }
        ],
        "key": "vgypg99tcphcod",
        "schedule": "",
        "actionsFive9": "<p></p>",
        "actionsSinergy": "<p></p>",
        "notasGenerales": "<p></p>",
        "Tablero": false,
        "Finalizar": false,
        "inputs": [],
        "links": [],
        "index": 7,
        "isDragging": false,
        "isDrawingLine": false
      },
      {
        "x": -1288.3282004603375,
        "y": 84.73674856592152,
        "width": 300,
        "height": 64,
        "id": "Nuevo",
        "title": "Consulta la razon de la negativa:",
        "link": "",
        "options": [],
        "key": "2ex6cpy5gky98s",
        "schedule": "",
        "actionsFive9": "<p></p>",
        "actionsSinergy": "<p></p>",
        "notasGenerales": "<p></p>",
        "Tablero": false,
        "Finalizar": true,
        "inputs": [
          {
            "name": "Razon del cliente",
            "id": "Razon_del_cliente"
          }
        ],
        "links": [],
        "index": 8,
        "isDragging": false,
        "isDrawingLine": false
      },
      {
        "x": -1313.1312145723732,
        "y": 598.7040075558621,
        "width": 300,
        "height": 64,
        "id": "Nuevo",
        "title": "El cliente no puede pagar, mantiene el plan:",
        "link": "",
        "options": [],
        "key": "uyhkqcurtpxng4",
        "schedule": "",
        "actionsFive9": "<p></p>",
        "actionsSinergy": "<ul><li><p><span style=\"color:#333333;\">Copia y pega la informacion del tablero en el seguimiento de cobranza</span></p></li><li><p><span style=\"color:#333333;\">Tipifica correctamente la gestión</span></p></li></ul>",
        "notasGenerales": "<ul><li><p>Si logras acuerdo <span style=\"color:#333333;\">indica al cliente que por el valor del descuento genera la NC una vez ingrese el pago</span></p></li><li><p>En caso contrario genera opciones de pago a cuotas.</p></li><li><p><span style=\"color:#333333;\">Conoce como tipificar correctamente (LINK PDF)</span></p></li></ul>",
        "Tablero": true,
        "Finalizar": true,
        "inputs": [],
        "links": [],
        "index": 9,
        "isDragging": false,
        "isDrawingLine": false
      },
      {
        "x": -1315.8557627514667,
        "y": 481.54843585483576,
        "width": 300,
        "height": 64,
        "id": "Nuevo",
        "title": "El cliente quiere cambiar el plan:",
        "link": "",
        "options": [],
        "key": "vzegdikkrld6wy",
        "schedule": "",
        "actionsFive9": "<ul><li><p><span style=\"color:#333333;\">Tipifica su llamada en Five9 según su gestión: Avance 80% Avance 30%</span></p></li></ul>",
        "actionsSinergy": "<ul><li><p><span style=\"color:#333333;\">Seguimiento comercial</span></p></li><li><p><span style=\"color:#333333;\">Crea cotización</span></p></li><li><p><span style=\"color:#333333;\">Copia y Pega información del tablero al seguimiento de Cobranza</span></p></li><li><p><span style=\"color:#333333;\">Tipifica llamada como Verificar Pago</span></p></li></ul>",
        "notasGenerales": "<h2><span style=\"font-family: Impact, Charcoal, sans-serif;\">TENsjfn ljksbl kjgljzbglñzkjglsjgljkh</span></h2><ul><li><p>Comparte<a href=\"https://www.siigo.com/precios-siigo/\" target=\"_blank\" title=\"Precios Siigo\"> precios de planes</a></p></li><li><p>Ten en cuenta los<a href=\"https://siigosa-my.sharepoint.com/:x:/g/personal/faja13613_siigo_com/Ee8wNiLuehdIjTjY_UNprMIBPAWVLBLw96Ei45QFMOAVBg?e=XzJ7xZ\" target=\"_blank\" title=\"Codigos de conversiones\"> códigos de conversiones</a></p></li><li><p><span style=\"color:#333333;\">Informa los planes de conversión según la necesidad del cliente</span></p></li></ul>",
        "Tablero": true,
        "Finalizar": true,
        "inputs": [],
        "links": [],
        "index": 10,
        "isDragging": false,
        "isDrawingLine": false
      },
      {
        "x": -1312.9333385463433,
        "y": 362.7150119193013,
        "width": 300,
        "height": 64,
        "id": "Nuevo",
        "title": "El ciente puede pagar todo, procede de la siguiente manera:",
        "link": "",
        "options": [],
        "key": "6u8kgbg0r3qs4h",
        "schedule": "",
        "actionsFive9": "<ul><li><p><span style=\"color:#333333;\">Tipifica su llamada en Five9 según su gestión: Avance 80% Avance 30%</span></p></li></ul>",
        "actionsSinergy": "<ul><li><p><span style=\"color:#333333;\">Copia y Pega información del tablero al seguimiento de Cobranza</span></p></li><li><p><span style=\"color:#333333;\">Tipifica llamada como Verificar Pago</span></p></li></ul>",
        "notasGenerales": "<ul><li><p><span style=\"color:#333333;\">Informa medios de pago PSE</span></p></li></ul>",
        "Tablero": true,
        "Finalizar": true,
        "inputs": [],
        "links": [],
        "index": 11,
        "isDragging": false,
        "isDrawingLine": false
      }
    ]
    const storedLines = [
      {
        "start": "fzl1j96bhapsfo",
        "end": "b4hsw0jeu55tuu"
      },
      {
        "start": "e2oao90mwlx5vy",
        "end": "ro07kc5jywf05b"
      },
      {
        "start": "lsj4ne8ptvbayv",
        "end": "c0fkgzeyefico5"
      },
      {
        "start": "k8tudql2k9maiu",
        "end": "3m1qhkzmzieqrx"
      },
      {
        "start": "e8ueo1ft87n4cg",
        "end": "14s7ryi5mssssg"
      },
      {
        "start": "gk3mvnmtdt731d",
        "end": "v4a2fvb27vwvsk"
      },
      {
        "start": "t8thhudfklb1hx",
        "end": "vgypg99tcphcod"
      },
      {
        "start": "qot18j7k2y2n4g",
        "end": "2ex6cpy5gky98s"
      },
      {
        "start": "a6g2b8z1wnifu6",
        "end": "6u8kgbg0r3qs4h"
      },
      {
        "start": "owgwgxol5kogxa",
        "end": "vzegdikkrld6wy"
      },
      {
        "start": "tw25o03q1oyyge",
        "end": "uyhkqcurtpxng4"
      }
    ]

    if (storedData) {
      const shapes = storedData;
      setShapes(shapes);

      if (storedLines) {
        const lines = storedLines;
        setLineShapes(lines);
      }
      setLoading(false);
    }
  }, []);

  const parseShapesToFlow = (json) => {
    const result = {};

    const producto = json[0];
    result.producto = {
      title: producto.title,
      options: {},
    };

    for (const option of producto.options) {
      result.producto.options[option.name] = option.name;
    }

    for (let i = 1; i < json.length; i++) {
      const node = json[i];

      if (node.options.length > 0) {
        const options = {};
        for (const option of node.options) {
          options[option.name] = option.title;
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

  const saveTreeToDB = () => {
    localStorage.setItem('flowchartRenovaciones', JSON.stringify(shapes));
    localStorage.setItem('flowchartLinesRenovaciones', JSON.stringify(lineShapes))
    let data = {
      shapes: shapes,
      lines: lineShapes,
      timestamp: new Date().getTime()
    }

    fetch('/api/processTreeRenewalsSave', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(
      (response) => response.json()
    ).then((data) => {
      console.log('Success:', data)
    }).catch((error) => {
      console.error('Error:', error);
    });
  };

  const addShape = () => {
    const stage = stageRef.current;
    const pointerPos = stage.getPointerPosition();
    console.log(pointerPos)
    console.log({ x: stage.x(), y: stage.y() })

    const scale = stage.scaleX();
    const x = ((window.innerWidth / 3) - stage.x()) / scale;
    const y = (pointerPos.y - stage.y()) / scale;
    setShapes([
      ...shapes,
      {
        x,//
        y,//
        width: 100,//
        height: 50,//
        id: 'Nuevo',//
        title: 'nuevo',//
        link: '',
        options: [],
        key: generateRandomId(),//
        schedule: '',//
        actionsFive9: '',//
        actionsSinergy: '',//
        notasGenerales: '',//
        Tablero: false,
        Finalizar: false,
        inputs: [],
        links: []
      },
    ]);
  };

  const handleWheel = (e) => {
    e.evt.preventDefault(); // Prevent the default zoom behavior of the browser

    const scaleBy = 1.1; // Set the amount of scaling for each mouse scroll
    const oldScale = stageRef.current.scaleX();
    const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy; // Determine the new scale factor

    // Set the new scale factor within the limits of the minimum and maximum values
    const MIN_SCALE = 0.05;
    const MAX_SCALE = 1.5;
    if (newScale >= MIN_SCALE && newScale <= MAX_SCALE) {
      setScale(newScale);

      // Adjust the position of the stage to zoom in/out around the mouse position
      const pointerPos = stageRef.current.getPointerPosition();
      const mousePointTo = {
        x: (pointerPos.x - stageRef.current.x()) / oldScale,
        y: (pointerPos.y - stageRef.current.y()) / oldScale,
      };
      const newPos = {
        x: pointerPos.x - mousePointTo.x * newScale,
        y: pointerPos.y - mousePointTo.y * newScale,
      };
      stageRef.current.position(newPos);
    }
  };

  const slicerScaleController = (ev) => {
    console.log(ev.taget.value)
  }

  const closePopUpOption = () => {
    setEditPopUpOption(false);
  };

  const flowchart =
    shapes != null
      ? shapes.reduce((acc, shape, i) => {
        acc[`element${i + 1}`] = {
          title: shape.title,
          options: {},
        };
        return acc;
      }, {})
      : null;

  const optionsList =
    shapes != null
      ? shapes.reduce((acc, item) => {
        if (item.options) {
          acc.push(...item.options);
        }
        return acc;
      }, [])
      : null;

  const updateShape = (index, newShape) => {
    if (isRemovinOption) {
      setIsRemovingOption(false);
      return;
    } else {
      setShapes((prevShapes) => {
        const updatedShapes = [...prevShapes];
        updatedShapes[index] = newShape;
        return updatedShapes;
      });
    }
  };

  const handleClickEdit = (shape, index) => {
    shape.index = index;
    setEditingShape(shape);
    setEditPopUp(true);
  };

  const handleClickAddOption = (shape, index) => {
    console.log("Llego")
    console.log(shape)
    const newShapes = [...shapes];
    console.log("actual", shapes)
    newShapes[index] = shape;
    console.log("nuevo", newShapes)
    setShapes(newShapes);
  };

  const saveShapeInformation = () => {
    const newShapes = [...shapes];
    // Get html from editor refs
    Object.keys(editingEditorRefs).map((editorKey) => {
      let editorElement = editingEditorRefs[editorKey]
      let editorRef = editorElement.editorRef
      if (editorRef.current) {
        let view = editorRef.current.view;
        let content = EditorUtils.getHtml(view.state);
        editingShape[editorElement.id] = content;
      }
    })

    newShapes[editingShape.index] = editingShape;
    setShapes(newShapes);
  };
  const saveOptionInformation = () => {
    let newShapes = [...shapes];
    let optionToUpdate = newShapes.find((obj) =>
      obj.options.find((option) => option.key === editingOption.key)
    );
    let updatedShapes = newShapes.map((obj) => {
      if (obj.id === optionToUpdate?.id) {
        let updatedOptions = obj.options?.map((option) => {
          if (option.key === editingOption.key) {
            return { ...option, ...editingOption };
          }
          return option;
        });
        return { ...obj, options: updatedOptions };
      }
      return obj;
    });
    setEditPopUpOption(false);
    setEditingOption(null);
    setShapes(updatedShapes);
  };

  const handleOptionLine = (shapeSelected, type) => {
    if (selectedOptions.length == 0 && type == 'option') {
      setSelectedOptions([shapeSelected]);
    } else if (selectedOptions.length == 1 && type == 'card') {
      // check that selectedOptions[0].key is not in shapeSelected.options
      let optionExists = shapeSelected.options.find(
        (option) => option.key == selectedOptions[0].key
      );
      if (optionExists) {
        return;
      }

      let lineShape = {
        start: selectedOptions[0].key,
        end: shapeSelected.key,
      };

      let targetKey = selectedOptions[0].key;
      let targetValue = shapeSelected.key;

      const updatedShapes = shapes.map((item) => {
        const options = item.options || [];

        const updatedOptions = options.map((option) => {
          if (option.key === targetKey) {
            return { ...option, target: targetValue };
          }
          return option;
        });

        return { ...item, options: updatedOptions };
      });

      // Update the state with the new copy
      setShapes(updatedShapes);
      setLineShapes([...lineShapes, lineShape]);
      setSelectedOptions([]);
    }
  };

  const getLineCoordinates = (line) => {
    let lineStart = getOptionByKey(line.start);
    let lineEnd = getOptionByKey(line.end);
    let startX = lineStart.x.global;
    let startY = lineStart.y.global;
    let endX = lineEnd.x;
    let endY = lineEnd.y;

    //Adjustement Position
    startX = startX > endX + 300 ? startX - 300 : startX;

    const nodeWidth = 300;
    const nodeHeight = 120;

    const deltaX = endX - startX;
    const absDeltaX = Math.abs(deltaX);
    const signX = deltaX > 0 ? 1 : -1;

    const controlPoint1 = {
      x:
        startX +
        ((signX * nodeWidth) / 2) *
        (absDeltaX > nodeWidth ? 1 : absDeltaX / nodeWidth),
      y: startY,
    };

    const controlPoint2 = {
      x:
        endX -
        ((signX * nodeWidth) / 2) *
        (absDeltaX > nodeWidth ? 1 : absDeltaX / nodeWidth),
      y: endY - (endY > startY ? nodeHeight / 2 : -nodeHeight / 2), // shift control point vertically based on the relative positions of the nodes
    };
    let coords = [startX, startY + 5, endX + 150, endY];
    let controlPoints = [controlPoint1, controlPoint2];
    return [coords, controlPoints];
  };

  const getOptionByKey = (key) => {
    let thisOption = null;
    shapes.map((item) => {
      if (item.key == key) {
        thisOption = item;
      }
      const options = item.options || [];
      return options.filter((option) => {
        if (option.key === key) {
          thisOption = option;
          return option;
        }
      });
    });

    return thisOption;
  };

  const handleClickEditOption = (option, index) => {
    setEditingOption(option);
    setEditPopUpOption(true);
  };

  // a method to remove a shape from shapes and remove any lines connected to it
  const handleClickRemoveShape = (shapeKey, index) => {
    let linesToRemove = [shapeKey.key];
    shapeKey.options?.map((option) => {
      linesToRemove.push(option.key);
    });
    setLineShapes(
      lineShapes.filter(
        (line) =>
          !linesToRemove.includes(line.start) &&
          !linesToRemove.includes(line.end)
      )
    );
    shapeKey = shapeKey.key;
    setIsRemovingOption(true);
    const newShapes = [...shapes];
    const shapeToRemove = newShapes.find((obj) => obj.key === shapeKey);
    if (shapeToRemove) {
      const updatedShapes = newShapes.filter((obj) => obj.key !== shapeKey);

      setTimeout(() => {
        setShapes(updatedShapes);
      }, 500);
    }
  };

  const handleClickRemoveOption = (optionKey, index) => {
    setIsRemovingOption(true);
    optionKey = optionKey.key;
    const newShapes = [...shapes];
    const optionToRemove = newShapes.find((obj) =>
      obj.options?.find((option) => option.key === optionKey)
    );
    if (optionToRemove) {
      const updatedOptions = optionToRemove.options.filter(
        (option) => option.key !== optionKey
      );
      const updatedShapes = newShapes.map((obj) => {
        if (obj.key === optionToRemove.key) {
          return { ...obj, options: updatedOptions };
        }
        return obj;
      });

      setLineShapes(
        lineShapes.filter(
          (line) => line.start !== optionKey && line.end !== optionKey
        )
      );
      setShapes(updatedShapes);
    }
  };

  return (
    <>
      <Splitter
        panes={panes}
        orientation={'horizontal'}
        className='admin-renewals-splitter'
        onChange={(event) => { setPanes(event.newState) }}>
        <div className='canvasContainer'
          container
          ref={(node) => {
            setStageParent(node);
          }}>
          <Stage
            ref={stageRef}
            width={stageParent?.clientWidth}
            height={window.innerHeight - 80}
            className='kendoCanvasContainer'
            onWheel={handleWheel}
            draggable={true}
            scaleX={scale}
            scaleY={scale}
          >
            <Layer>
              {shapes != null
                ? shapes.map((shape, i) => (
                  <DynamicRect
                    key={shape.key}
                    shape={shape}
                    index={i}
                    onUpdate={(newShape) => updateShape(i, newShape)}
                    editFields={() => handleClickEdit(shape, i)}
                    addOption={(newShape) => handleClickAddOption(newShape, i)}
                    isDrawingLine={isDrawingLine}
                    optionLineAdd={(selectedOption, type) =>
                      handleOptionLine(selectedOption, type)
                    }
                    editOption={(option, index) =>
                      handleClickEditOption(option, index)
                    }
                    removeOption={(option, index) =>
                      handleClickRemoveOption(option, index)
                    }
                    removeCard={(card, index) =>
                      handleClickRemoveShape(card, index)
                    }
                  />
                ))
                : null}

              {lineShapes.map((el, i) => {
                let points = getLineCoordinates(el)[0];
                return (
                  <Group key={'lineMarker' + i}>
                    <Line key={i} points={points} stroke="#000000" />
                    <Rect
                      fill="#C0FF00"
                      width={10}
                      height={10}
                      x={points[0] - 5}
                      y={points[1] - 5}
                    />
                    <Rect
                      fill="#FF0000"
                      width={10}
                      height={10}
                      x={points[2] - 5}
                      y={points[3] - 5}
                    />
                  </Group>
                );
              })}
            </Layer>
            <Layer id="grid-layer" />
          </Stage>
        </div>

        <div>
          <div className="editCard siignal-box-shadow">
            <h4> Editando</h4>
            <div className='row'>
              <div className='col-6'>
                <Button
                  sx={{ width: '100%' }}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    addShape();
                  }}
                >
                  Añadir Elemento
                </Button>
              </div>
              <div className='col-6'>
                <Button
                  sx={{ width: '100%' }}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    saveTreeToDB();
                  }}
                >
                  Guardar Arbol
                </Button>
              </div>
            </div>
            {
              editingShape ? <>
                <hr />
                {
                  editingCardSettings.map((setting, index) => {
                    if (setting.type == "text") {
                      return (
                        <div>
                          <label htmlFor={setting.id}>{setting.label}:</label>
                          <br />
                          <input
                            type={setting.type}
                            name={setting.id}
                            id={setting.id}
                            value={editingShape[setting.id]}
                            onChange={(event) => {
                              let tempNewValues = { ...editingShape };
                              tempNewValues[setting.id] = event.target.value;
                              setEditingShape(tempNewValues)
                            }}
                          />
                        </div>
                      )
                    } else if (setting.type == 'textarea') {
                      return (
                        <div>
                          <MultilineInput editorContent={editingShape[setting.id]} editorRef={editingEditorRefs[setting.id].editorRef} setting={setting} />
                        </div>
                      )
                    }
                  })
                }
                <hr />

                <div>
                  {/* Inputs */}
                  <label htmlFor="documentation">Inputs
                    <button onClick={() => {
                      let currentInputs = editingShape.inputs || [];
                      setEditingShape({
                        ...editingShape,
                        // inputs: currentInputs.concat({ name: '', id: '', type: '', regex: '' })
                        inputs: currentInputs.concat({ name: '', id: '' })
                      })
                    }}>Añadir</button>
                  </label>
                  <br />
                  {
                    editingShape.inputs && editingShape.inputs.map((input, index) => {
                      return (
                        <div key={'input' + index} className='siignal-box-shadow'>

                          {
                            Object.keys(input).map((key, subIndex) => {
                              if (key != "id") {
                                return (
                                  <div key={'input' + subIndex}>
                                    <label htmlFor={key}>{key}</label>
                                    <br />
                                    <input
                                      type="text"
                                      disabled={key == "id"}
                                      name={key}
                                      id={key}
                                      value={input[key]}
                                      onChange={(event) => {
                                        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
                                        console.log(editingShape.inputs)
                                        let currentInputs = editingShape.inputs;
                                        currentInputs[index][key] = event.target.value;
                                        if (key == "name") {
                                          currentInputs[index]["id"] = event.target.value.split(" ").join("_");
                                        }

                                        setEditingShape({
                                          ...editingShape,
                                          inputs: currentInputs
                                        })
                                      }}
                                    />
                                  </div>
                                )
                              }
                            })
                          }

                          <button onClick={() => {
                            let currentInputs = editingShape.inputs;
                            currentInputs.splice(index, 1);
                            setEditingShape({
                              ...editingShape,
                              inputs: currentInputs
                            })
                          }}>Eliminar</button>
                        </div>
                      )
                    }
                    )
                  }


                  <label htmlFor="documentation">Herramientas</label>
                  <br />
                  <div className="inline-checkbox-group">
                    <div className="inline-checkbox">
                      <label for="Tablero">Tablero</label>
                      <input
                        type="checkbox"
                        id="Tablero"
                        checked={editingShape.Tablero}
                        onChange={(event) =>
                          setEditingShape({
                            ...editingShape,
                            Tablero: event.target.checked,
                          })
                        }
                      />
                    </div>

                    <div className="inline-checkbox">
                      <label for="Tablero">Finalizar</label>
                      <input
                        type="checkbox"
                        id="Tablero"
                        checked={editingShape.Finalizar}
                        onChange={(event) =>
                          setEditingShape({
                            ...editingShape,
                            Finalizar: event.target.checked,
                          })
                        }
                      />
                    </div>
                  </div>

                  <hr />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => saveShapeInformation()}
                  >
                    Guardar
                  </Button>
                </div>
              </> : <>
                <div className='admin-renewals-noediting'>
                  Selecciona una tarjeta para ver y editar sus propiedades
                </div>
              </>
            }
          </div>
        </div>

      </Splitter >

      {/* PopUp Edit Option */}
      {
        editPopUpOption ? (
          <div className="edit">
            <h4> Editando Opcion</h4>
            <hr />
            <div>
              <label htmlFor="name">Título</label>
              <hr />
              <input
                type="text"
                name="name"
                id="name"
                value={editingOption.name}
                onChange={(event) =>
                  setEditingOption({ ...editingOption, name: event.target.value })
                }
              />
              <hr />
              <button onClick={() => saveOptionInformation()}>Guardar</button>
            </div>
            <div className="close" onClick={() => closePopUpOption()}>
              X
            </div>
          </div>
        ) : null
      }
    </>
  );
};

export default Admin;
