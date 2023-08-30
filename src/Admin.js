import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Rect, Line, Group } from 'react-konva';
import { DynamicRect } from './DynamicRect';
import Button from '@mui/material/Button';
// import axios from 'axios';

const Admin = () => {
  const generateRandomId = () => {
    return (
      Math.random().toString(36).slice(2, 9) +
      Math.random().toString(36).slice(2, 9)
    );
  };

  const [shapes, setShapes] = useState([]);
  const stageRef = useRef(null);
  const [editPopUp, setEditPopUp] = useState(false);
  const [editingShape, setEditingShape] = useState({});
  // const [editingShape, setEditingShape] = useState({
  //   x: 180,
  //   y: 35.79999542236328,
  //   width: 300,
  //   height: 64,
  //   id: 'Nuevo',
  //   title: 'Inicio',
  //   options: [
  //     {
  //       name: 'Opción 1',
  //       target: 'r3l80ph06vzrt0',
  //       key: '5g6normbaumr0n',
  //       x: {
  //         global: 480,
  //         local: 20,
  //       },
  //       y: {
  //         global: 135.79999542236328,
  //         local: 24,
  //       },
  //       isDrawingLine: false,
  //     },
  //   ],
  //   key: 'gnf41mgfmof923',
  //   schedule: 'schedule',
  //   link: 'link',
  //   actionsFive9: 'actionsFive9',
  //   actionsSinergy: 'actionsSinergy',
  //   Notes: 'Notes',
  //   NotesFE: 'NotesFE',
  //   Tablero: true,
  //   gestionPromesas: false,
  //   index: 0,
  //   isDragging: false,
  //   isDrawingLine: false,
  // });
  const [editPopUpOption, setEditPopUpOption] = useState(0);
  const [editingOption, setEditingOption] = useState(null);
  const [lineShapes, setLineShapes] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isDrawingLine, setIsDrawingLine] = useState(false);
  const [scale, setScale] = useState(1);
  const [isRemovinOption, setIsRemovingOption] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.table(editingShape);
  }, editingShape);

  useEffect(() => {
    // axios.get(`/api/siignalGetTRansferencesTree`).then(res => {
    //   console.log(res.data[0])
    //   let requestData = res.data[0];
    //   const storedData = requestData.shapes;//localStorage.getItem('flowchart');
    //   const storedLines = requestData.lines//localStorage.getItem('flowchartLines');
    //   if (storedData) {
    //     const shapes = storedData;
    //     setShapes(shapes);

    //     if (storedLines) {
    //       const lines = storedLines;
    //       setLineShapes(lines);
    //     }
    //     setLoading(false);
    //   }
    // }).catch(err => {
    //   console.log(err)
    // })
    const storedData = localStorage.getItem('flowchart');
    const storedLines = localStorage.getItem('flowchartLines');
    if (storedData) {
      const shapes = JSON.parse(storedData);
      setShapes(shapes);

      if (storedLines) {
        const lines = JSON.parse(storedLines);
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
    localStorage.setItem('flowchart', JSON.stringify(shapes));
    localStorage.setItem('flowchartLines', JSON.stringify(lineShapes));
    // let data = {
    //   shapes: shapes,
    //   lines: lineShapes,
    //   timestamp: new Date().getTime()
    // }

    // fetch('/api/transferencesHelperSave', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // }).then(
    //   (response) => response.json()
    // ).then((data) => {
    //   console.log('Success:', data);
    // }).catch((error) => {
    //   console.error('Error:', error);
    // });
  };

  const addShape = () => {
    const stage = stageRef.current;
    const pointerPos = stage.getPointerPosition();
    const scale = stage.scaleX();
    const x = (pointerPos.x - stage.x()) / scale;
    const y = (pointerPos.y - stage.y()) / scale;
    setShapes([
      ...shapes,
      {
        x,
        y,
        width: 100,
        height: 50,
        id: 'Nuevo',
        title: 'nuevo',
        options: [],
        key: generateRandomId(),
        schedule: '-',
        link: 'link',
        actionsFive9: 'actionsFive9',
        actionsSinergy: 'actionsSinergy',
        Notes: 'Notes',
        NotesFE: 'NotesFE',
        Tablero: true,
        gestionPromesas: false,
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

  const closePopUp = () => {
    setEditPopUp(false);
  };

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
    console.log(shape);
    setEditPopUp(true);
  };

  const handleClickAddOption = (shape, index) => {
    const newShapes = [...shapes];
    newShapes[index] = shape;
    setShapes(newShapes);
  };

  const saveShapeInformation = () => {
    const newShapes = [...shapes];
    newShapes[editingShape.index] = editingShape;
    setShapes(newShapes);
    closePopUp();
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
      <div className="full">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            addShape();
          }}
        >
          {' '}
          Añadir Elemento
        </Button>{' '}
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            saveTreeToDB();
          }}
        >
          Guardar Arbol
        </Button>
        <hr />
        <Stage
          ref={stageRef}
          width={window.innerWidth}
          height={window.innerHeight}
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
      {editPopUp ? (
        <div className="editCard">
          <h4> Editando</h4>
          <hr />
          <div>
            <label htmlFor="title">Título</label>
            <br />
            <input
              type="text"
              name="title"
              id="title"
              value={editingShape.title}
              onChange={(event) =>
                setEditingShape({ ...editingShape, title: event.target.value })
              }
            />
            <label htmlFor="schedule">Horario</label>
            <br />
            <input
              type="text"
              name="schedule"
              id="schedule"
              value={editingShape.schedule}
              onChange={(event) =>
                setEditingShape({
                  ...editingShape,
                  schedule: event.target.value,
                })
              }
            />
            <label htmlFor="link">Recurso (Enlace)</label>
            <br />
            <input
              type="text"
              name="link"
              id="link"
              value={editingShape.link}
              onChange={(event) =>
                setEditingShape({
                  ...editingShape,
                  link: event.target.value,
                })
              }
            />
            <label htmlFor="actionsFive9">Acciones en Five9</label>
            <br />
            <textarea
              type="text"
              name="actionsFive9"
              id="actionsFive9"
              value={editingShape.actionsFive9}
              onChange={(event) =>
                setEditingShape({
                  ...editingShape,
                  actionsFive9: event.target.value,
                })
              }
            />

            <label htmlFor="actionsSinergy">Acciones en Sinergy</label>
            <br />
            <textarea
              type="text"
              name="actionsSinergy"
              id="actionsSinergy"
              value={editingShape.actionsSinergy}
              onChange={(event) =>
                setEditingShape({
                  ...editingShape,
                  actionsSinergy: event.target.value,
                })
              }
            />

            <label htmlFor="Notes">Notas Informativas</label>
            <br />
            <textarea
              type="text"
              name="Notes"
              id="Notes"
              value={editingShape.dummy}
              onChange={(event) =>
                setEditingShape({
                  ...editingShape,
                  Notes: event.target.value,
                })
              }
            />
            <label htmlFor="NotesFE">Notas Producto FE</label>
            <br />
            <textarea
              type="text"
              name="NotesFE"
              id="NotesFE"
              value={editingShape.NotesFE}
              onChange={(event) =>
                setEditingShape({
                  ...editingShape,
                  NotesFE: event.target.value,
                })
              }
            />
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
                <label for="gestionPromesas">Gestion de promesas</label>
                <input
                  type="checkbox"
                  id="gestionPromesas"
                  checked={editingShape.gestionPromesas}
                  onChange={(event) =>
                    setEditingShape({
                      ...editingShape,
                      gestionPromesas: event.target.checked,
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
          <div className="close" onClick={() => closePopUp()}>
            X
          </div>
        </div>
      ) : null}

      {/* PopUp Edit Option */}
      {editPopUpOption ? (
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
      ) : null}
    </>
  );
};

export default Admin;