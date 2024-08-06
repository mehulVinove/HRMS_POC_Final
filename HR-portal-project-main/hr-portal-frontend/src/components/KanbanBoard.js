// src/components/KanbanBoard.js
import React, { useState } from 'react';
import './KanbanBoard.css'; // Custom styles for the Kanban board

const KanbanBoard = () => {
  const [tasks, setTasks] = useState({
    "To Do": [],
    "In Progress": [],
    "Done": []
  });

  return (
    <div className="kanban-board">
      {Object.keys(tasks).map((status, index) => (
        <div key={index} className="kanban-column">
          <h2>{status}</h2>
          {/* Map through tasks of this status */}
          <div className="kanban-tasks">
            {tasks[status].map((task, i) => (
              <div key={i} className="kanban-task">
                {task}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
