import React from 'react';
import { LanguageProvider } from "./international/language"
import LanguageSelector from "./features/language/languageSelecor"
import './App.css';
import { Form } from "./features/form/Form"
import { Stepper } from "./features/stepper/Stepper"


function App() {
  return (
    <LanguageProvider>
        <div className="App">
          <header className="App-header">
            <LanguageSelector />
            <Stepper 
              totalStep={3}
              descriptions={["step1", "step2", "step3"]}
            />
            <Form />
          </header>
        </div>
    </LanguageProvider>
  );
}

export default App;
