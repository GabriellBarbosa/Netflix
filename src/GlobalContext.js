import React from 'react';

export const GlobalContext = React.createContext();

export const MovieContext = ({ children }) => {
  const [type, setType] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [mediaType, setMediaType] = React.useState(null);
  React.useEffect(() => {
  }, [id, open])
  return (
    <GlobalContext.Provider value={{
        setOpen, 
        open, 
        setId, 
        id, 
        setType, 
        type, 
        setMediaType, 
        mediaType
      }}>
      {children}
    </GlobalContext.Provider>
  )
}