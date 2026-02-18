import { useState } from 'react';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {
  // Стейт для списка задач
  const [todos, setTodos] = useState<Todo[]>([]);
  
  // Стейт для инпута
  const [inputValue, setInputValue] = useState("");

  // Функция добавления
  function handleAdd() {
    // Проверяем что не пусто
    if (inputValue.trim() === "") {
      return;
    }

    // Создаём объект, который соответствует типу Todo
    const newTodo: Todo = {
      id: Date.now(), // уникальный id (текущее время в миллисекундах)
      text: inputValue,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue(""); // очищаем инпут после добавления
  }


  // Функция переключения completed
  function handleToggle(id: number) {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  // Функция удаления
  function handleDelete(id: number) {
    setTodos(todos.filter(todo => todo.id !== id));
  }


  return (
    <div>
      <input 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Введи задачу"
      />
      <button onClick={handleAdd}>Добавить</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
          <span 
            onClick={() => handleToggle(todo.id)}
            style={{ 
              textDecoration: todo.completed ? "line-through" : "none",
              cursor: "pointer"
            }}
          >
            {todo.text}
          </span>
            <button onClick={() => handleDelete(todo.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;