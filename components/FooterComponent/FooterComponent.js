import React from "react";
import styles from "./FooterComponent.module.css";
const FooterComponent = () => {
  return (
    <>
      <footer className={`mt-4 mb-3 ${styles.footer}`}>
        <a
          href="https://gironafilmfestival.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Girona Film Festival - 34
        </a>
      </footer>
    </>
  );
};

export default FooterComponent;
