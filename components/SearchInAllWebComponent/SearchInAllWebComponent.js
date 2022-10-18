import React from "react";
import TextField from "@mui/material/TextField";
import styles from "./SearchInAllWebComponent.module.css";

const SearchInAllWebComponent = () => {
  const [textoaBuscar, setTextoABuscar] = React.useState("");

  return (
    <div
      className={`${styles.searchComponent} mt-3 pt-2 d-flex align-items-center bg-white p-2 br-2 rounded w-100`}
    >
      <TextField
        id="standard-basic"
        label="Buscar"
        variant="outlined"
        size="small"
        value={textoaBuscar}
        onChange={(e) => {
          setTextoABuscar(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            window.find(textoaBuscar);
          }
        }}
      />

      <div
        className="btn btn-sm btn-success ms-2"
        onClick={() => {
          window.find(textoaBuscar);
        }}
      >
        Buscar
      </div>
    </div>
  );
};

export default SearchInAllWebComponent;
