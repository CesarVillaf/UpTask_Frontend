import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import TaskCard from "@components-tasks/TaskCard";
import { Project, TaskProject, TaskStatus } from "@/types";
import { statusTranslations } from "@locales/es";
import DropTask from "@/components/tasks/DropTask";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatus } from "@/api/TaskAPI";

type TaskListProps = {
  tasks: TaskProject[];
  canEdit: boolean;
};

type GroupTask = {
  [key: string]: TaskProject[];
};

const initialStatusGroups: GroupTask = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: [],
};

const statusStyles: { [key: string]: string } = {
  pending: "border-t-slate-500",
  onHold: "border-t-red-500",
  inProgress: "border-t-blue-500",
  underReview: "border-t-amber-500",
  completed: "border-t-emerald-500",
};


export default function TaskList({ tasks, canEdit }: TaskListProps) {
  const groupedTasks = tasks.reduce((acc, task) => {
    const { status } = task; // pending onHold pending
    let currentGroup = acc[status] ? [...acc[status]] : []; // [], [], [{task1}]
    currentGroup = [...currentGroup, task]; // [{task1}], [{task2}], [ {task1}, {task3} ]
    return { ...acc, [status]: currentGroup }; // {[ pending: [{task1}] ]} = {[ pending: [{task1}], onHold: [{task2} ]}
  }, initialStatusGroups); // = {[ pending: [{task1}], onHold: [{task2} ]}
  // = {[ pending: [{task1}, {task3}], onHold: [{task2} ]}

  const params = useParams();
  const projectId = params.projectId!;
  const queryCliente = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateStatus,
    onError: error => {
      toast.error(error.message);
    },
    onSuccess: data => {
      queryCliente.invalidateQueries({ queryKey: ['project', projectId] });
      toast.success(data);
    }
  });


  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
 
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const handleDragEnd = (e: DragEndEvent) => {
    const { over, active } = e

    if (over && over.id) {
      const taskId = active.id.toString();
      const status = over.id as TaskStatus;
      mutate({ projectId, taskId, status })
      queryCliente.setQueryData(['project', projectId], (prevData: Project) => {
        const updatedTask = prevData.tasks.map(task => {
          if (task._id === taskId) {
            return {
              ...task,
              status
            }
          }
          return task
        })

        return {
          ...prevData,
          tasks: updatedTask
        }
      })
    }
  }

  return (
    <>
      <h2 className="text-5xl font-black my-10">Tareas</h2>

      <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32">
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          {Object.entries(groupedTasks).map(([status, tasks]) => (
            <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
              <h3
                className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 ${statusStyles[status]}`}
              >{statusTranslations[status]}</h3>

              <DropTask status={status} />

              <ul className="mt-5 space-y-5">
                {tasks.length === 0 ? (
                  <li className="text-gray-500 text-center pt-3">
                    No Hay tareas
                  </li>
                ) : (
                  tasks.map((task) => <TaskCard key={task._id} task={task} canEdit={canEdit} />)
                )}
              </ul>
            </div>
          ))}
        </DndContext>
      </div>
    </>
  );
}
