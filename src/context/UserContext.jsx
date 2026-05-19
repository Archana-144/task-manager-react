import { createContext, useState } from "react";

export const UserContext = createContext();

function UserProvider({ children }) {

  const [user, setUser] = useState(null);

  const [addedTasks, setAddedTasks] = useState([]);

  const addTask = (task) => {

    setAddedTasks([...addedTasks, task]);

  };

  return (

    <UserContext.Provider
      value={{
        user,
        setUser,
        addedTasks,
        addTask,
      }}
    >

      {children}

    </UserContext.Provider>

  );

}

export default UserProvider;