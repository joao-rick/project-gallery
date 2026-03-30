import React, { useMemo, useState } from 'react';
import { useI18n } from '../i18n';

const initialTasks = [
  {
    id: 1,
    title: 'Review roadmap',
    dueDate: '2026-04-05',
    completed: false,
  },
  {
    id: 2,
    title: 'Send proposal to client',
    dueDate: '2026-04-06',
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
  const { t } = useI18n();

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
      prev.map((task) => (task.id === id ? { ...task, title: trimmed } : task))
    );
    setEditingId(null);
    setEditingValue('');
  };

  return (
    <div className="demo-page">
      <header className="demo-header">
        <div>
          <h2>{t('demos.tasksTitle')}</h2>
          <p>{t('demos.tasksSubtitle')}</p>
        </div>
      </header>

      <section className="demo-form">
        <input
          type="text"
          placeholder={t('demos.newTask')}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
        />
        <button type="button" onClick={addTask}>
          {t('demos.addTask')}
        </button>
      </section>

      <section className="demo-tabs">
        <button
          type="button"
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          {t('demos.all')}
        </button>
        <button
          type="button"
          className={filter === 'open' ? 'active' : ''}
          onClick={() => setFilter('open')}
        >
          {t('demos.open')}
        </button>
        <button
          type="button"
          className={filter === 'done' ? 'active' : ''}
          onClick={() => setFilter('done')}
        >
          {t('demos.done')}
        </button>
      </section>

      <section className="demo-panel">
        {visibleTasks.length === 0 ? (
          <p>{t('demos.noTasks')}</p>
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
                    <strong className={task.completed ? 'demo-done' : undefined}>
                      {task.title}
                    </strong>
                  )}
                  <span>
                    {t('demos.dueDate')} {task.dueDate}
                  </span>
                </div>
                <div className="demo-actions">
                  <button type="button" onClick={() => toggleTask(task.id)}>
                    {task.completed ? t('demos.reopen') : t('demos.complete')}
                  </button>
                  {editingId === task.id ? (
                    <button type="button" onClick={() => saveEdit(task.id)}>
                      {t('demos.save')}
                    </button>
                  ) : (
                    <button type="button" onClick={() => startEdit(task)}>
                      {t('demos.edit')}
                    </button>
                  )}
                  <button type="button" onClick={() => deleteTask(task.id)}>
                    {t('demos.remove')}
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
