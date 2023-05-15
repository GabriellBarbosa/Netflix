import React, { ReactElement } from 'react';

interface ChildrenContext {
  open: boolean;
  id: string;
  type: string;
  mediaType: string;
  setOpen: (value: boolean) => void;
  setId: (id: string) => void;
  setType: (type: string) => void;
  setMediaType: (mediaType: string) => void;
}

export const GlobalContext = React.createContext<ChildrenContext | null>(null);

export const MovieContext = ({ children }: { children: ReactElement }) => {
  const [type, setType] = React.useState<string>('');
  const [id, setId] = React.useState<string>('');
  const [mediaType, setMediaType] = React.useState<string>('');
  const [open, setOpen] = React.useState<boolean>(false);
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