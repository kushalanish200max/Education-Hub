import { useState } from "react";
import { MoreHorizontal, CheckCircle2, RefreshCw } from "lucide-react";

/* ==========================================================================
   MOCK DATA
   Matches the structure and content of your reference image exactly.
   ========================================================================== */
const initialBoard = {
  todo: {
    id: "todo",
    title: "To Do",
    tasks: [
      {
        id: "t1",
        title: "Combinatorics and validity",
        tag: "Working with data",
        count: 5,
      },
      { id: "t2", title: "Hypothesis Testing", tag: "Research", count: 3 },
      {
        id: "t3",
        title: "Time Series Analysis",
        tag: "Working with data",
        count: 6,
      },
      {
        id: "t4",
        title: "Clustering Algorithms",
        tag: "Programming",
        count: 2,
      },
    ],
  },
  inProgress: {
    id: "inProgress",
    title: "In Progress",
    tasks: [
      {
        id: "t5",
        title: "A/B Testing: Designing and Analyzing Experiments",
        tag: "Working with data",
        count: 3,
      },
      { id: "t6", title: "Data Visualization", tag: "Research", count: 5 },
    ],
  },
  approval: {
    id: "approval",
    title: "Approval",
    icon: (
      <RefreshCw className="w-5 h-5 text-orange-400 bg-orange-400/10 p-1 rounded-full" />
    ),
    tasks: [
      {
        id: "t7",
        title: "Principal Component Analysis",
        tag: "Working with data",
        count: 5,
      },
      {
        id: "t8",
        title: "Linear, Logistic, and Poisson Regression",
        tag: "Programming",
        count: 1,
      },
      {
        id: "t9",
        title: "One-Sample Test",
        tag: "Working with data",
        count: 2,
      },
    ],
  },
  completed: {
    id: "completed",
    title: "Completed",
    icon: (
      <CheckCircle2 className="w-5 h-5 text-cyan-400 bg-cyan-400/10 p-1 rounded-full" />
    ),
    tasks: [
      { id: "t10", title: "Exponential Smoothing", tag: "Research", count: 4 },
      {
        id: "t11",
        title: "Real-world Dataset",
        tag: "Working with data",
        count: 6,
      },
      {
        id: "t12",
        title: "Support Vector Machines",
        tag: "Research",
        count: 2,
      },
    ],
  },
};

/* ==========================================================================
   MAIN COMPONENT
   ========================================================================== */
export const TasksPage = () => {
  const [columns, setColumns] = useState(initialBoard);
  const [activeDragCol, setActiveDragCol] = useState(null);

  // --- Drag and Drop Handlers ---
  const handleDragStart = (e, taskId, sourceColId) => {
    // Store the task ID and where it came from in the drag event data
    e.dataTransfer.setData("taskId", taskId);
    e.dataTransfer.setData("sourceColId", sourceColId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, targetColId) => {
    // Prevent default to allow dropping
    e.preventDefault();
    setActiveDragCol(targetColId);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setActiveDragCol(null);
  };

  const handleDrop = (e, targetColId) => {
    e.preventDefault();
    setActiveDragCol(null);

    const taskId = e.dataTransfer.getData("taskId");
    const sourceColId = e.dataTransfer.getData("sourceColId");

    // If dropped in the same column it started in, do nothing
    if (sourceColId === targetColId) return;

    setColumns((prev) => {
      const sourceCol = prev[sourceColId];
      const targetCol = prev[targetColId];

      // Find the task being moved
      const taskToMove = sourceCol.tasks.find((t) => t.id === taskId);

      // Remove from source array
      const newSourceTasks = sourceCol.tasks.filter((t) => t.id !== taskId);

      // Add to target array
      const newTargetTasks = [...targetCol.tasks, taskToMove];

      return {
        ...prev,
        [sourceColId]: { ...sourceCol, tasks: newSourceTasks },
        [targetColId]: { ...targetCol, tasks: newTargetTasks },
      };
    });
  };

  return (
    // Outer scrollable container perfectly sized for your main layout
    <div
      className="
      flex h-screen bg-[#1A1D2D] text-white font-sans p-10 
      [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2
      [&::-webkit-scrollbar-track]:bg-transparent
      [&::-webkit-scrollbar-track]:rounded-full
      [&::-webkit-scrollbar-thumb]:bg-slate-700/50
      [&::-webkit-scrollbar-thumb]:rounded-full
      hover:[&::-webkit-scrollbar-thumb]:bg-[#6C5DD3]/50
      transition-colors
    "
    >
      <div className="min-w-max pb-10">
        <h1 className="text-3xl font-bold mb-8 text-white">Homework</h1>

        {/* Kanban Board Grid */}
        <div className="flex gap-6 items-start">
          {Object.values(columns).map((column) => (
            <div
              key={column.id}
              // Set up the drop zone on the entire column
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column.id)}
              className={`
                w-4/19 bg-[#25283B] rounded-2xl p-3.5 flex flex-col shrink-0 
                border-2 transition-colors duration-200 max-h-[80vh]
                ${activeDragCol === column.id ? "border-[#6C5DD3]/50 bg-[#25283B]/80" : "border-white/5"}
              `}
            >
              {/* Column Header */}
              <div className="flex justify-between items-center px-1">
                <h2 className="text-lg font-bold text-slate-200">
                  {column.title}
                </h2>
                {column.icon && <div>{column.icon}</div>}
              </div>

              {/* Task Cards */}
              <div
                className="flex flex-col gap-4 flex-1 mt-6 overflow-auto
                            [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2
                            [&::-webkit-scrollbar-track]:bg-transparent
                            [&::-webkit-scrollbar-track]:rounded-full
                          [&::-webkit-scrollbar-thumb]:bg-slate-700/50
                            [&::-webkit-scrollbar-thumb]:rounded-full
                            hover:[&::-webkit-scrollbar-thumb]:bg-[#6C5DD3]/50"
              >
                {column.tasks.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id, column.id)}
                    className="
                      bg-[#1A1D2D] p-5 rounded-xl cursor-grab active:cursor-grabbing 
                      border border-white/5 hover:border-[#6C5DD3]/50 
                      shadow-lg shadow-black/10 transition-colors
                    "
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-white/5 text-slate-300">
                        {task.tag}
                      </span>
                      <button className="text-slate-500 hover:text-white transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>

                    <h3 className="text-[15px] font-semibold text-slate-100 leading-snug mb-3">
                      {task.title}
                    </h3>

                    <p className="text-xs text-slate-400 font-medium">
                      {task.count} tasks
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
