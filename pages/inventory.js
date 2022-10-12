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
    console.log("copied to clip board");
    navigator.clipboard.writeText(localStorage.getItem("items"));
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
        <section className="container is-widescreen mt-4">
          <button
            onClick={openModalRegisterItem}
            className="button is-link is-fullwidth mb-1"
          >
            Register Item
          </button>
          <button
            onClick={copyInventoryToClipBoard}
            className="button is-dark is-fullwidth"
          >
            <span className="icon is-small is-left">
            <i class="fas fa-clipboard mr-4"></i>
            </span>
            Copy Inventory
          </button>
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
