import Layout from "../components/Layout";
import ItemList from "../components/ItemList";
import { useState, useEffect, useRef, useReducer } from "react";

const ACTIONS = {
  CHECK_INPUT_VALUES: "check_input_values",
};

const reducer = (stateForm, action) => {
  switch (action.type) {
    case ACTIONS.CHECK_INPUT_VALUES:
      return {
        inputName: action.payload.inputName,
        inputServing: action.payload.inputServing,
        inputFat: action.payload.inputFat,
        inputProtein: action.payload.inputProtein,
        inputCarbs: action.payload.inputCarbs,
        inputCal: action.payload.inputCal,
      };
    default:
      return stateForm;
  }
};

export default function Items() {
  const [items, setItems] = useState([]);
  const [showModalNewItem, setShowModalNewItem] = useState(false);
  const [showModalLoadInventory, setShowModalLoadInventory] = useState(false);
  const [showSuccessInventoryCopied, setShowSuccessInventoryCopied] = useState(false);
  const [showHelpInventory, setShowHelpInventory] = useState(false);
  const [jsonInputColor, setJsonInputColor] = useState("is-info");
  const inputInventoryRef = useRef();
  const inputNameRef = useRef();
  const inputServingRef = useRef();
  const inputFatRef = useRef();
  const inputProteinRef = useRef();
  const inputCarbsRef = useRef();
  const inputCalRef = useRef();

  const [formInputs, dispatchFormInputs] = useReducer(reducer, {
    inputName: "is-info",
    inputServing: "is-info",
    inputFat: "is-info",
    inputProtein: "is-info",
    inputCarbs: "is-info",
    inputCal: "is-info",
  });

  const inventoryExample = [{
      name: "oats (raw)",
      serving: "100",
      fat: "5.50",
      protein: "12.60",
      carbs: "58.80",
      cal: "335.50"
    },
    {
      name: "almonds",
      serving: "10",
      fat: "5.20",
      protein: "2.10",
      carbs: "1.80",
      cal: "62.00"
    },
  ]

  useEffect(() => {
    const itemsStr = localStorage.getItem("items");
    if (itemsStr && itemsStr.length > 0) {
      const items = JSON.parse(itemsStr);
      setItems(items);
    }
  }, []);

  const openModalRegisterItem = () => {
    setShowModalNewItem(true);
    dispatchFormInputs({
      type: ACTIONS.CHECK_INPUT_VALUES,
      payload: {
        inputName: "is-info",
        inputServing: "is-info",
        inputFat: "is-info",
        inputProtein: "is-info",
        inputCarbs: "is-info",
        inputCal: "is-info",
      },
    });
  };

  const copyInventoryToClipBoard = () => {
    setShowSuccessInventoryCopied(true);
    setTimeout(() => setShowSuccessInventoryCopied(false), 1500);
    navigator.clipboard.writeText(localStorage.getItem("items"));
  };

  const saveInventory = () => {
    try {
      const inventoryObj = JSON.parse(inputInventoryRef.current.value);
      updateItems(inventoryObj);
      setShowModalLoadInventory(false);
    } catch {
      setJsonInputColor('is-danger');
    }
  }

  const deleteItem = (index) => {
    const itemsAux = [...items];
    itemsAux.splice(index, 1);
    updateItems(itemsAux);
  };

  const saveItem = () => {
    const name = inputNameRef.current.value;
    const serving = inputServingRef.current.value;
    const fat = inputFatRef.current.value;
    const protein = inputProteinRef.current.value;
    const carbs = inputCarbsRef.current.value;
    const cal = inputCalRef.current.value;

    if (
      name !== "" &&
      serving !== "" &&
      fat !== "" &&
      protein !== "" &&
      carbs !== "" &&
      cal !== ""
    ) {
      let itemsAux = [
        ...items,
        {
          name: name,
          serving: serving,
          fat: fat,
          protein: protein,
          carbs: carbs,
          cal: cal,
        },
      ];
      updateItems(itemsAux);
      setShowModalNewItem(false);
    } else {
      dispatchFormInputs({
        type: ACTIONS.CHECK_INPUT_VALUES,
        payload: {
          inputName: name !== "" ? "is-success" : "is-danger",
          inputServing: serving !== "" ? "is-success" : "is-danger",
          inputFat: fat !== "" ? "is-success" : "is-danger",
          inputProtein: protein !== "" ? "is-success" : "is-danger",
          inputCarbs: carbs !== "" ? "is-success" : "is-danger",
          inputCal: cal !== "" ? "is-success" : "is-danger",
        },
      });
    }
  };

  const updateItems = (items) => {
    setItems(items);
    updateLocalStorageItems(items);
  };

  const updateLocalStorageItems = (items) => {
    localStorage.setItem("items", JSON.stringify(items));
  };

  return (
    <div>
      <Layout>
        <h1 className="title is-2">Inventory</h1>
        {showSuccessInventoryCopied && (
          <div class="notification is-success is-light">
            <button class="delete" onClick={() => setShowSuccessInventoryCopied(false)}></button>
            Copied to clipboard
          </div>
        )}
        <section className="container is-widescreen mt-4">
          <button
              onClick={() => setShowModalLoadInventory(true)}
              className="button is-success is-fullwidth mb-1"
            >
            <span className="icon is-small is-left">
            <i className="fas fa-cloud-upload-alt mr-4"></i>
            </span>
            Load Inventory
          </button>
          <button
            onClick={copyInventoryToClipBoard}
            className="button is-dark is-fullwidth mb-1"
          >
            <span className="icon is-small is-left">
            <i className="fas fa-clipboard mr-4"></i>
            </span>
            Copy Inventory
          </button>
          <button
            onClick={openModalRegisterItem}
            className="button is-link is-fullwidth"
          >
            <span className="icon is-small is-left">
            <i className="fas fa-pencil-alt mr-4"></i>
            </span>
            Add Item
          </button>
          {showModalLoadInventory && (
            <div className={`modal ${showModalLoadInventory && "is-active"}`}>
              <div className="modal-background"></div>
              <div className="modal-card">
                <header className="modal-card-head">
                  <p className="modal-card-title">Load Inventory</p>
                  <button
                    onClick={() => setShowModalLoadInventory(false)}
                    className="delete"
                    aria-label="close"
                  ></button>
                </header>
                <section className="modal-card-body">
                  <form autoComplete="off">
                    <div className="field">
                      <label className="label">
                        Inventory in json format
                        <span className="has-text-info ml-2" onClick={() => setShowHelpInventory(true)}>
                          <i className="fas fa-info-circle"></i>
                        </span>
                      </label>
                      {showHelpInventory && (
                        <div class="notification is-info is-light">
                          <button class="delete" onClick={() => setShowHelpInventory(false)}></button>
                          <div>Example on how the json must look like for the following inventory:</div>
                          <div>
                            <table className="table mt-5 is-striped is-narrow is-bordered">
                              <thead>
                                <tr>
                                  <th>name</th>
                                  <th>serving</th>
                                  <th>fat</th>
                                  <th>protein</th>
                                  <th>carbs</th>
                                  <th>cal</th>
                                </tr>
                              </thead>
                              <tbody>
                              {inventoryExample.map((item, index) => (
                                <tr key={index}>
                                  <th>{item.name}</th>
                                  <td>{item.serving}</td>
                                  <td>{item.fat}</td>
                                  <td>{item.protein}</td>
                                  <td>{item.carbs}</td>
                                  <td>{item.cal}</td>
                                </tr>
                              ))}
                              </tbody>
                            </table>
                          </div>
                          <div className="mt-4">
                            {JSON.stringify(inventoryExample, null, '\t')}
                          </div>
                          <div className="mt-4">
                            The json is an array of objects with the following fields:
                          </div>
                          <div className="mt-4">
                            <ul>
                              <li><i>name</i></li>
                              <li><i>serving</i></li>
                              <li><i>fat</i></li>
                              <li><i>protein</i></li>
                              <li><i>carbs</i></li>
                              <li><i>cal</i></li>
                            </ul> 
                          </div>
                          <div className="mt-4">
                            <strong>Note:</strong> The value of the fields are string type!
                          </div>
                        </div>
                      )}
                      <div className="control has-icons-left">
                        <input
                          ref={inputInventoryRef}
                          className={`input ${jsonInputColor}`}
                          type="text"
                          placeholder="json"
                          name="inventory"
                        />
                        <span className="icon is-small is-left">
                          <i className="fas fa-scroll"></i>
                        </span>
                      </div>
                    </div>
                  </form>
                </section>
                <footer className="modal-card-foot">
                  <button
                    onClick={() => saveInventory()}
                    className="button is-success"
                  >
                    Save Inventory
                  </button>
                  <button
                    onClick={() => setShowModalLoadInventory(false)}
                    className="button"
                  >
                    Cancel
                  </button>
                </footer>
              </div>
            </div>
          )}
          {showModalNewItem && (
            <div className={`modal ${showModalNewItem && "is-active"}`}>
              <div className="modal-background"></div>
              <div className="modal-card">
                <header className="modal-card-head">
                  <p className="modal-card-title">Register Item</p>
                  <button
                    onClick={() => setShowModalNewItem(false)}
                    className="delete"
                    aria-label="close"
                  ></button>
                </header>
                <section className="modal-card-body">
                  <form autoComplete="off">
                    <div className="field">
                      <label className="label">Name</label>
                      <div className="control has-icons-left">
                        <input
                          ref={inputNameRef}
                          className={`input ${formInputs.inputName}`}
                          type="text"
                          placeholder="A decriptive name for the item"
                          name="name"
                        />
                        <span className="icon is-small is-left">
                          <i className="fas fa-pencil-alt"></i>
                        </span>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Serving (g)</label>
                      <div className="control has-icons-left">
                        <input
                          ref={inputServingRef}
                          className={`input ${formInputs.inputServing}`}
                          type="number"
                          placeholder="Enter the serving for this item in g"
                          name="serving"
                        />
                        <span className="icon is-small is-left">
                          <i className="fas fa-balance-scale"></i>
                        </span>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Fat (g)</label>
                      <div className="control has-icons-left">
                        <input
                          ref={inputFatRef}
                          className={`input ${formInputs.inputFat}`}
                          type="number"
                          placeholder="Enter the fat for this item in g"
                          name="fat"
                        />
                        <span className="icon is-small is-left">
                          <i className="fas fa-pizza-slice"></i>
                        </span>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Protein (g)</label>
                      <div className="control has-icons-left">
                        <input
                          ref={inputProteinRef}
                          className={`input ${formInputs.inputProtein}`}
                          type="number"
                          placeholder="Enter the protein for this item in g"
                          name="protein"
                        />
                        <span className="icon is-small is-left">
                          <i className="fas fa-fish"></i>
                        </span>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Carbs (g)</label>
                      <div className="control has-icons-left">
                        <input
                          ref={inputCarbsRef}
                          className={`input ${formInputs.inputCarbs}`}
                          type="number"
                          placeholder="Enter the carbs for this item in g"
                          name="carbs"
                        />
                        <span className="icon is-small is-left">
                          <i className="fas fa-bread-slice"></i>
                        </span>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Calories (kcal)</label>
                      <div className="control has-icons-left">
                        <input
                          ref={inputCalRef}
                          className={`input ${formInputs.inputCal}`}
                          type="number"
                          placeholder="Enter the calories for this item in kcal"
                          name="cal"
                        />
                        <span className="icon is-small is-left">
                          <i className="fas fa-star"></i>
                        </span>
                      </div>
                    </div>
                  </form>
                </section>
                <footer className="modal-card-foot">
                  <button
                    onClick={() => saveItem()}
                    className="button is-success"
                  >
                    Save Item
                  </button>
                  <button
                    onClick={() => setShowModalNewItem(false)}
                    className="button"
                  >
                    Cancel
                  </button>
                </footer>
              </div>
            </div>
          )}
        </section>
        {items.length !== 0 ? (
          <ItemList items={items} setItems={setItems} deleteItem={deleteItem} />
        ): <p className="mt-4">
          Here is where you are adding your inventory of items.
          </p>}
      </Layout>
    </div>
  );
}
