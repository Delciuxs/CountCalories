import Layout from "../components/Layout";
import ItemTrackedList from "../components/ItemTrackedList";
import { useState, useEffect, useRef, useReducer } from "react";

const ACTIONS = {
  CHECK_INPUT_VALUES: "check_input_values",
};

const reducer = (stateForm, action) => {
  switch (action.type) {
    case ACTIONS.CHECK_INPUT_VALUES:
      return {
        inputServing: action.payload.inputServing,
      };
    default:
      return stateForm;
  }
};

export default function Items({ details, setDetails }) {
  const [items, setItems] = useState([]);
  const [itemsFromSearch, setItemsFromSearch] = useState([]);
  const [showModalTrackItem, setShowModalTrackItem] = useState(false);
  const [itemToBeTracked, setItemToBeTracked] = useState(null);
  const [itemsTracked, setItemsTracked] = useState([]);
  const searchRef = useRef();
  const inputServingRef = useRef();

  const [formInputs, dispatchFormInputs] = useReducer(reducer, {
    inputServing: "is-info",
  });

  useEffect(() => {
    const itemsStr = localStorage.getItem("items");
    if (itemsStr && itemsStr.length > 0) {
      const items = JSON.parse(itemsStr);
      setItems(items);
    }
    const itemsTrackedStr = localStorage.getItem("tracked-items");
    if (itemsTrackedStr && itemsTrackedStr.length > 0) {
      const itemsTracked = JSON.parse(itemsTrackedStr);
      setItemsTracked(itemsTracked);
    }
  }, []);

  const deleteTrackedItem = (index) => {
    const itemToBeDeleted = itemsTracked[index];
    console.log(itemToBeDeleted);

    const fatEatenToDelete = itemToBeDeleted.fat;
    const proteinEatenToDelete = itemToBeDeleted.protein;
    const carbsEatenToDelete = itemToBeDeleted.carbs;

    const detailsStr = localStorage.getItem("details");
    if (detailsStr && detailsStr.length > 0) {
      const details = JSON.parse(detailsStr);
      const lastFatGEaten = details.fatGEaten;
      const lastProteinGEaten = details.proteinGEaten;
      const lastCarbsGEaten = details.carbsGEaten;

      const newDetails = {
        ...details,
        fatGEaten: lastFatGEaten - fatEatenToDelete,
        proteinGEaten: lastProteinGEaten - proteinEatenToDelete,
        carbsGEaten: lastCarbsGEaten - carbsEatenToDelete,
      };

      updateDetails(newDetails);
    }

    const itemsTrackedAux = [...itemsTracked];
    itemsTrackedAux.splice(index, 1);
    updateTrackedItems(itemsTrackedAux);
  };

  const updateDetails = (details) => {
    setDetails(details);
    updateLocalStorageDetails(details);
  };

  const updateLocalStorageDetails = (details) => {
    localStorage.setItem("details", JSON.stringify(details));
  };

  const handleChangeSearch = () => {
    let searchParam = searchRef.current.value.toLowerCase();
    let itemsSearchMatched = [];

    if (searchParam.length < 3) {
      setItemsFromSearch([]);
      return;
    }

    items.forEach((item) => {
      const name = item.name.toLowerCase();
      if (name.includes(searchParam)) {
        itemsSearchMatched.push(item);
      }
    });

    setItemsFromSearch(itemsSearchMatched);
  };

  const deleteSearch = () => {
    searchRef.current.value = "";
    setItemsFromSearch([]);
  };

  const openModalTrackItem = (item) => {
    deleteSearch();
    setShowModalTrackItem(true);
    setItemToBeTracked(item);
  };

  const trackItem = () => {
    const serving = inputServingRef.current.value;
    if (serving !== "") {
      const defServingItem = parseFloat(itemToBeTracked.serving);
      const defFatItem = parseFloat(itemToBeTracked.fat);
      const defProteinItem = parseFloat(itemToBeTracked.protein);
      const defCarbsItem = parseFloat(itemToBeTracked.carbs);
      const defCalItem = parseFloat(itemToBeTracked.cal);

      let servingEaten = parseFloat(serving);
      let fatEaten = (servingEaten * defFatItem) / defServingItem;
      let proteinEaten = (servingEaten * defProteinItem) / defServingItem;
      let carbsEaten = (servingEaten * defCarbsItem) / defServingItem;
      let calEaten = (servingEaten * defCalItem) / defServingItem;

      let itemsTrackedAux = [...itemsTracked];
      itemsTrackedAux.push({
        name: itemToBeTracked.name,
        serving: servingEaten,
        fat: fatEaten,
        protein: proteinEaten,
        carbs: carbsEaten,
        cal: calEaten,
      });

      const detailsStr = localStorage.getItem("details");
      if (detailsStr && detailsStr.length > 0) {
        const details = JSON.parse(detailsStr);
        const lastFatGEaten = details.fatGEaten;
        const lastProteinGEaten = details.proteinGEaten;
        const lastCarbsGEaten = details.carbsGEaten;

        const newDetails = {
          ...details,
          fatGEaten: lastFatGEaten + fatEaten,
          proteinGEaten: lastProteinGEaten + proteinEaten,
          carbsGEaten: lastCarbsGEaten + carbsEaten,
        };

        updateDetails(newDetails);
      }

      updateTrackedItems(itemsTrackedAux);
      setShowModalTrackItem(false);
    } else {
      dispatchFormInputs({
        type: ACTIONS.CHECK_INPUT_VALUES,
        payload: {
          inputServing: serving !== "" ? "is-success" : "is-danger",
        },
      });
    }
  };

  const updateTrackedItems = (items) => {
    setItemsTracked(items);
    updateLocalStorageTrackedItems(items);
  };

  const clearTrackedItems = () => {
    const detailsStr = localStorage.getItem("details");
    if (detailsStr && detailsStr.length > 0) {
      const details = JSON.parse(detailsStr);
      const newDetails = {
        ...details,
        fatGEaten: 0,
        proteinGEaten: 0,
        carbsGEaten: 0,
      };
      localStorage.setItem("details", JSON.stringify(newDetails));
    }

    setItemsTracked([]);
    updateLocalStorageTrackedItems([]);
  };

  const updateLocalStorageTrackedItems = (items) => {
    localStorage.setItem("tracked-items", JSON.stringify(items));
  };

  return (
    <Layout>
      <h1 className="title is-2">Track</h1>
      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            ref={searchRef}
            onChange={() => handleChangeSearch()}
            autoComplete="off"
            className="input is-widescreen"
            type="text"
            placeholder="Search an item"
          />
        </div>
        <div className="control">
          <a className="button is-info" onClick={() => deleteSearch()}>
            <i style={{ color: "white" }} className="fas fa-times-circle"></i>
          </a>
        </div>
      </div>

      {itemsFromSearch.length !== 0 && (
        <>
          {itemsFromSearch.map((itemSearch, index) => (
            <div
              className="box p-2 mb-1"
              key={index}
              onClick={() => openModalTrackItem(itemSearch)}
            >
              {itemSearch.name}
            </div>
          ))}
        </>
      )}

      {showModalTrackItem && (
        <div className={`modal ${showModalTrackItem && "is-active"}`}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Track Item</p>
              <button
                onClick={() => setShowModalTrackItem(false)}
                className="delete"
                aria-label="close"
              ></button>
            </header>
            <section className="modal-card-body">
              <p>
                How much you ate for: <strong>{itemToBeTracked.name}</strong>
              </p>
              <label className="label">Serving (g)</label>
              <div className="control has-icons-left">
                <input
                  ref={inputServingRef}
                  className={`input ${formInputs.inputServing}`}
                  type="number"
                  placeholder="Enter the serving for this item in g"
                  name="serving"
                  autoComplete="off"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-balance-scale"></i>
                </span>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button onClick={() => trackItem()} className="button is-success">
                Track
              </button>
              <button
                onClick={() => setShowModalTrackItem(false)}
                className="button"
              >
                Cancel
              </button>
            </footer>
          </div>
        </div>
      )}
      {itemsTracked.length !== 0 ? (
        <ItemTrackedList
          itemsTracked={itemsTracked}
          clearTrackedItems={clearTrackedItems}
          deleteTrackedItem={deleteTrackedItem}
        />
      ) : (
        <p>
          Start tracking the food you eat during the day from your inventory.
        </p>
      )}
    </Layout>
  );
}
