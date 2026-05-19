import { useEffect, useState } from "react";

import { fetchTasks } from "../services/taskService";

function useFetchTasks() {

  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadTasks() {

      try {

        const data = await fetchTasks();

        setTasks(data);

        setLoading(false);

      }

      catch (error) {

        console.log(error);

        setLoading(false);

      }

    }

    loadTasks();

  }, []);

  return {

    tasks,

    setTasks,

    loading

  };

}

export default useFetchTasks;