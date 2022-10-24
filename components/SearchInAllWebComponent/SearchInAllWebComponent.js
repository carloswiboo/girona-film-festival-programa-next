import React from "react";
import TextField from "@mui/material/TextField";
import styles from "./SearchInAllWebComponent.module.css";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from '@mui/icons-material/Download';
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
          <a
            style={{
              color: "black",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            <SearchIcon fontSize="inherit" /> Por Fechas
          </a>
        </Link>
      </small>
      <small className="mx-2 ms-1">
        <Link href="/bysesion" className="me-2">
          <a
            style={{
              color: "black",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            <SearchIcon fontSize="inherit" /> Por Sesión{" "}
          </a>
        </Link>
      </small>
      <small className="mx-2 ms-3">
        <a
          href="https://drive.google.com/file/d/1Gmz-mejnKTF6x3lQq6RgyiFVDrq4vvHE/view?usp=sharing"
          style={{ color: "black", textDecoration: "none", fontWeight: "bold" }}
        >
         <DownloadIcon fontSize="inherit" /> Descargar Programa{" "}
        </a>
      </small>
    </div>
  );
};

export default SearchInAllWebComponent;
