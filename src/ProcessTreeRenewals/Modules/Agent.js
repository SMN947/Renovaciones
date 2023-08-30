import React, { useEffect, useState } from 'react';
import { GridLayout, GridLayoutItem } from '@progress/kendo-react-layout';
import { FormOptions, Wrapper, Breadcrumb } from './../Components';
import './Agent.css';

export default function StepperForm() {
  const [loading, setLoading] = useState(true)
  const [renewalsData, setRenewalsData] = useState({
    FormData: null,
    // currentStep: "3m1qhkzmzieqrx",
    currentStep: null,
    selectionHistory: null,
    selectionHistoryIds: null,
  })

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
    let JSONData = parseShapesToFlow(storedData);
    console.log("============================================")
    console.log(JSONData)
    setRenewalsData({
      formData: JSONData,
      currentStep: Object.keys(JSONData)[0],
      // currentStep: "3m1qhkzmzieqrx",
      selectionHistory: ['Inicio'],
      selectionHistoryIds: [Object.keys(JSONData)[0]],
    })
  }, [])

  useEffect(() => {
    if (renewalsData.formData) {
      console.log("@@@@@@@@")
      console.log(renewalsData)
      setLoading(false)
    }
  }, [renewalsData])

  const parseShapesToFlow = (json) => {
    console.log("####")
    console.log(json)
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
          data: node
        };
      } else {
        if (node.title == 'nuevo') {
          // 
        }
        result[node.key] = {
          transfer: node.title,
          schedule: node.schedule,
          documentation:
            node.documentation || 'Aun no hay recursos disponibles',
          data: node
        };
      }
    }
    return result;
  };

  const handleOptionChange = (event) => {
    let selecedOPtionForBreadcrumb = renewalsData.formData[renewalsData.currentStep].options[event.target.value];

    setRenewalsData({
      ...renewalsData,
      currentStep: event.target.value,
      selectionHistory: [
        ...renewalsData.selectionHistory,
        selecedOPtionForBreadcrumb
      ],
      selectionHistoryIds: [
        ...renewalsData.selectionHistoryIds,
        event.target.value
      ]
    })
  };

  const reset = () => {
    setRenewalsData({
      ...renewalsData,
      selectionHistory: ['Inicio'],
      currentStep: Object.keys(renewalsData.formData)[0]
    })
  }

  const navigateTo = (index) => {
    console.log(index);
    setRenewalsData({
      ...renewalsData,
      selectionHistory: renewalsData.selectionHistory.slice(0, index + 1),
      selectionHistoryIds: renewalsData.selectionHistoryIds.slice(0, index + 1),
      currentStep: renewalsData.selectionHistoryIds[index]
    })
  }

  return (
    <GridLayout
      className='siignal-w100'
      align={{ horizontal: 'center', }}
      cols={[{ width: "auto" }]}
      gap={{ rows: 10, cols: 10, }}>

      <GridLayoutItem className='siignal-w100'>
        <span className='agent-renewals-title'>Renewal Flow Pro</span> -
        <span className='agent-renewals-subtitle'>Renovaciones sin complicaciones, con innovación.</span>
        <span className='agent-renewals-version'>Versión 1.0</span>
      </GridLayoutItem>

      {
        loading ? <>
          Cargando...
        </> : <>
          <GridLayoutItem className='siignal-box-shadow'>
            <Breadcrumb
              selectionHistory={renewalsData.selectionHistory}
              navigateTo={(index) => { navigateTo(index) }}
            />
          </GridLayoutItem>


          <GridLayoutItem className='siignal-box-shadow'>
            <FormOptions
              currentStep={renewalsData.currentStep}
              formData={renewalsData.formData}
              handleOptionChange={handleOptionChange}
              reset={reset}
            />
          </GridLayoutItem>
        </>
      }
    </GridLayout>
  )
}
