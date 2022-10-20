import React from "react";
import TextField from "@mui/material/TextField";
import styles from "./SearchInAllWebComponent.module.css";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
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
      <small className="mx-2 ms-3">
        <Link href="/bydates" className="me-2">
          <React.Fragment>
            <SearchIcon fontSize="inherit" /> Por Fechas
          </React.Fragment>
        </Link>
      </small>
      <small className="mx-2 ms-1">
        <Link href="/bysesion" className="me-2">
          <React.Fragment>
            <SearchIcon fontSize="inherit" /> Por Sesión{" "}
          </React.Fragment>
        </Link>
      </small>
    </div>
  );
};

export default SearchInAllWebComponent;
