import React, { useContext } from 'react';
import styles from "./languageSelector.module.css"

import { languageOptions } from '../../international/languages';
import { LanguageContext } from '../../international/language';

export default function LanguageSelector() {
  const { userLanguage, userLanguageChange } = useContext(LanguageContext);

  // set selected language by calling context method
  const handleLanguageChange = e => userLanguageChange(e.target.value);

  return (
    <select
      onChange={handleLanguageChange}
      value={userLanguage}
      className={styles.languageSelector}
    >
      {Object.entries(languageOptions).map(([id, name]) => (
        <option key={id} value={id}>{name}</option>
      ))}
    </select>
  );
};