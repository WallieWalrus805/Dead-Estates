import { useState } from 'react'
import { TextContext } from './TextContext'

export function TextProvider({ children }) {
  const [text, setText] = useState({
    currentText: ""
  })

  return (
    <TextContext.Provider value={{ text, setText }}>
      {children}
    </TextContext.Provider>
  );
}