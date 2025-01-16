import { statusTranslations } from "@/locales/es";
import { Task } from "@/types";
import { formatFullDate } from "@/utils";

type TaskActivityLogDetailProps = {
  itemsToShow: Task['completedBy']
}

export default function TaskActivityLogDetail({ itemsToShow }: TaskActivityLogDetailProps) {
  
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
    </>
  );
}
