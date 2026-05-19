export async function fetchTasks() {

  // FETCH API

  const response = await fetch(

    "https://jsonplaceholder.typicode.com/todos"

  );

  // CONVERT RESPONSE TO JSON

  const data = await response.json();

  // TRANSFORM DATA

  const transformedTasks = data.map((item) => ({

    id: item.id,

    task: item.title,

    status: item.completed

      ? "Completed"

      : "In Progress",

    assignedTo: "",

  }));

  return transformedTasks;

}