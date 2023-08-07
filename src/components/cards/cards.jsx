import React from 'react';
import Image from "next/image";
import { GiArchiveRegister, GiWaxTablet, GiVillage } from "react-icons/gi";
import styles from "./styles.module.css";

const Cards = ({ header, span, src, text1, text2, icon }) => {
  const renderIcon = () => {
    switch (icon) {
      case "GiArchiveRegister":
        return <GiArchiveRegister className="text-5xl" />;
      case "GiWaxTablet":
        return <GiWaxTablet className="text-5xl" />;
      case "GiVillage":
        return <GiVillage className="text-5xl" />;
      default:
        return null; 
  };
}

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.imgBox}>
          <div className="flex flex-col justify-around p-6 bg-[#213555] w-full h-full">
            {renderIcon()} 
            <div className="font-semibold text-3xl">{text1}</div>
            <div className="font-light text-xl">{text2}</div>
          </div>
        </div>
        <div className={styles.content}>
          <h2>
            {header}
            <br />
            <span>{span}</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Cards;
