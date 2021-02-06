import React, { 
  createContext, 
  useState, 
  useContext 
} from 'react';

export const UpdateListContext = createContext();

export default function UpdateListProvider({ children }) {
  const [updateList, setUpdateList] = useState(0)
  const [ativesPorc, setPorcAtive] = useState();
  const [passivesPorc, setPorcPassive] = useState();
  const [varMonth, setVarMonth] = useState();
  const [varYear, setVarYear] = useState();

  return (
      <UpdateListContext.Provider value={{
        updateList,
        setUpdateList,

        ativesPorc,
        setPorcAtive,

        passivesPorc,
        setPorcPassive,

        varMonth,
        setVarMonth,

        varYear,
        setVarYear,
      }}
    >
      {children}
    </UpdateListContext.Provider>
  );
}

export function useUpdateList() {
  const context = useContext(UpdateListContext);
  const { updateList, setUpdateList } = context;
  return { updateList, setUpdateList};
}

export function useAtivePorc() {
  const context = useContext(UpdateListContext);
  const { ativesPorc, setPorcAtive } = context;
  return { ativesPorc, setPorcAtive }
}

export function usePassivePorc() {
  const context = useContext(UpdateListContext);
  const { passivesPorc, setPorcPassive } = context;
  return { passivesPorc, setPorcPassive }
}

export function useVarMonth() {
  const context = useContext(UpdateListContext);
  const { varMonth, setVarMonth } = context;
  return { varMonth, setVarMonth }
}

export function useVarYear() {
  const context = useContext(UpdateListContext);
  const { varYear, setVarYear } = context;
  return { varYear, setVarYear }
}