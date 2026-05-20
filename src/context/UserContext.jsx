import {

  createContext,

  useState,

  useEffect

} from "react";

export const UserContext = createContext();

function UserProvider({ children }) {

  const [user, setUser] = useState(null);

  const [tasks, setTasks] = useState([]);

  // LOAD TASKS

  useEffect(() => {

    const storedTasks = JSON.parse(

      localStorage.getItem("tasks")

    );

    if (storedTasks) {

      setTasks(storedTasks);

    }

  }, []);

  // SAVE TASKS

  useEffect(() => {

    localStorage.setItem(

      "tasks",

      JSON.stringify(tasks)

    );

  }, [tasks]);

  // ADD TASK

  function addTask(task) {

    setTasks((prev) => [

      ...prev,

      task,

    ]);

  }

  // UPDATE TASK

  function updateTask(updatedTask) {

    const updatedTasks = tasks.map((task) =>

      task.id === updatedTask.id

        ? updatedTask

        : task

    );

    setTasks(updatedTasks);

  }

  return (

    <UserContext.Provider

      value={{

        user,

        setUser,

        tasks,

        setTasks,

        addTask,

        updateTask,

      }}

    >

      {children}

    </UserContext.Provider>

  );

}

export default UserProvider;