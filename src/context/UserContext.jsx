import {

  createContext,

  useState,

  useEffect

} from "react";

import { fetchTasks } from "../services/taskService";

export const UserContext = createContext();

function UserProvider({ children }) {

  // USER STATE

  const [user, setUser] = useState(null);

  // TASK STATE

  const [tasks, setTasks] = useState([]);

  // LOAD TASKS

  useEffect(() => {

    async function loadTasks() {

      // FETCH API TASKS

      const apiTasks = await fetchTasks();

      // LOCAL STORAGE TASKS

      const localTasks =

        JSON.parse(

          localStorage.getItem("tasks")

        ) || [];

      // MERGE BOTH

      setTasks([

        ...localTasks,

        ...apiTasks

      ]);

    }

    loadTasks();

  }, []);

  // ADD TASK

  function addTask(newTask) {

    const updatedTasks = [

      newTask,

      ...tasks

    ];

    // UPDATE STATE

    setTasks(updatedTasks);

    // SAVE ONLY CUSTOM TASKS

    localStorage.setItem(

      "tasks",

      JSON.stringify(

        updatedTasks.filter(

          (task) => task.id > 200

        )

      )

    );

  }

  return (

    <UserContext.Provider

      value={{

        user,

        setUser,

        tasks,

        setTasks,

        addTask

      }}

    >

      {children}

    </UserContext.Provider>

  );

}

export default UserProvider;