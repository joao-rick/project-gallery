import React, { useMemo, useState } from 'react';

const initialTasks = [
  {
    id: 1,
    title: 'Revisar roadmap',
    dueDate: '2026-02-05',
    completed: false,
  },
  {
    id: 2,
    title: 'Enviar proposta ao cliente',
    dueDate: '2026-02-06',
    completed: true,
  },
];

const TaskManagerDemo = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState('');

  const visibleTasks = useMemo(() => {
    if (filter === 'done') {
      return tasks.filter((task) => task.completed);
    }
    if (filter === 'open') {
      return tasks.filter((task) => !task.completed);
    }
    return tasks;
  }, [tasks, filter]);

  const addTask = () => {
    const trimmed = title.trim();
    if (!trimmed || !dueDate) {
      return;
    }
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: trimmed,
        dueDate,
        completed: false,
      },
    ]);
    setTitle('');
    setDueDate('');
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditingValue(task.title);
  };

  const saveEdit = (id) => {
    const trimmed = editingValue.trim();
    if (!trimmed) {
      return;
    }
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title: trimmed } : task
      )
    );
    setEditingId(null);
    setEditingValue('');
  };

  return (
    <div className="demo-page">
      <header className="demo-header">
        <div>
          <h2>Organizador de Tarefas</h2>
          <p>Crie, edite e acompanhe suas tarefas diárias.</p>
        </div>
      </header>

      <section className="demo-form">
        <input
          type="text"
          placeholder="Nova tarefa"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
        />
        <button type="button" onClick={addTask}>
          Adicionar
        </button>
      </section>

      <section className="demo-tabs">
        <button
          type="button"
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          Todas
        </button>
        <button
          type="button"
          className={filter === 'open' ? 'active' : ''}
          onClick={() => setFilter('open')}
        >
          Pendentes
        </button>
        <button
          type="button"
          className={filter === 'done' ? 'active' : ''}
          onClick={() => setFilter('done')}
        >
          Concluídas
        </button>
      </section>

      <section className="demo-panel">
        {visibleTasks.length === 0 ? (
          <p>Nenhuma tarefa encontrada.</p>
        ) : (
          <div className="demo-list">
            {visibleTasks.map((task) => (
              <div key={task.id} className="demo-list-row">
                <div>
                  {editingId === task.id ? (
                    <input
                      type="text"
                      value={editingValue}
                      onChange={(event) => setEditingValue(event.target.value)}
                    />
                  ) : (
                    <strong
                      className={task.completed ? 'demo-done' : undefined}
                    >
                      {task.title}
                    </strong>
                  )}
                  <span>Vence em {task.dueDate}</span>
                </div>
                <div className="demo-actions">
                  <button type="button" onClick={() => toggleTask(task.id)}>
                    {task.completed ? 'Reabrir' : 'Concluir'}
                  </button>
                  {editingId === task.id ? (
                    <button type="button" onClick={() => saveEdit(task.id)}>
                      Salvar
                    </button>
                  ) : (
                    <button type="button" onClick={() => startEdit(task)}>
                      Editar
                    </button>
                  )}
                  <button type="button" onClick={() => deleteTask(task.id)}>
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default TaskManagerDemo;
