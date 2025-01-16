import { useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { formatFullDate } from "@utils";
import { Note } from "@types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/api/Note.API";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

type NoteDetailProps = {
  note: Note;
};

export default function NoteDetail({ note }: NoteDetailProps) {
  const { data, isLoading } = useAuth();
  const canDelete = useMemo(() => data?._id === note.createdBy._id, [data, note]);

  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get('viewTaskId')!;

  const params = useParams();
  const projectId = params.projectId!;

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onError: error => toast.error(error.message),
    onSuccess: data => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ['task', taskId] })
    }
  });

  if (isLoading) return 'Cargando..';
  return (
    <div className="p-3 flex justify-between items-center">
      <div>
        <p>
          {note.content} por:{" "}
          <span className="font-bold">{note.createdBy.name}</span>
        </p>
        <p className="text-xs text-slate-500">
          {formatFullDate(note.createdAt)}
        </p>
      </div>

      {canDelete && (
        <button
          type="button"
          className="bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer transition-colors"
          onClick={() => mutate({ projectId, taskId, noteId: note._id })}
        >Eliminar</button>
      )}
    </div>
  );
}
