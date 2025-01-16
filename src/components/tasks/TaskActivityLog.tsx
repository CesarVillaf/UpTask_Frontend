import { useExpandableList } from "@/hooks/useExpandableList";
import { statusTranslations } from "@/locales/es";
import { Task } from "@/types";
import { formatFullDate } from "@/utils";


type TaskActivityLogProps = {
  completedBy: Task['completedBy']
}

export default function TaskActivityLog({ completedBy }: TaskActivityLogProps) {
  const { itemsToShow, showAll, handleToggleShowAll, canShowMore } = useExpandableList(completedBy);

  return (
    <>
      <p className="font-bold text-2xl text-slate-600 mb-2">
        Historial de Cambios
      </p>

      <ul className="list-decimal pl-5">
        {itemsToShow?.map((activityLog) => (
          <li key={activityLog._id}>
            <div className="flex justify-between">
              <p className="text-slate-600">
                <span className="font-bold">
                  {statusTranslations[activityLog.status]} por:{" "}
                </span>
                {activityLog.user.name}
              </p>
              <p className="text-xs text-slate-500">
                <span>{formatFullDate(activityLog.updatedAt)}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>

      {canShowMore && (
        <button onClick={handleToggleShowAll} className="mt-2 text-blue-500">
          {showAll ? "Ver menos" : "Ver todos"}
        </button>
      )}
    </>
  );
}
