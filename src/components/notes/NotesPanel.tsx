import AddNoteForm from "@/components/notes/AddNoteForm";
import NoteDetail from "@/components/notes/NoteDetail";
import { useExpandableList } from "@/hooks/useExpandableList";
import { Note } from "@/types";

type NotesPanelProps = {
  notes: Note[];
};

export default function NotesPanel({ notes }: NotesPanelProps) {
  const { itemsToShow, showAll, handleToggleShowAll, canShowMore } = useExpandableList(notes, 3);

  return (
    <>
      <AddNoteForm />

      <div className="divide-y divide-gray-100 mt-10">
        {notes.length ? (
          <>
            <p className="font-bold text-2xl text-slate-600 my-5">
              Notas: <span className="block text-xs text-slate-500">Total de notas: {notes.length}</span>
            </p>
            
            {itemsToShow.map((note) => (
              <NoteDetail key={note._id} note={note} />
            ))}
          </>
        ) : (
          <p className="text-gray-500 text-center pt-3">No hay notas</p>
        )}
      </div>
      {canShowMore && (
        <button onClick={handleToggleShowAll} className="mt-2 text-blue-500">
          {showAll ? "Ver menos" : "Ver todos"}
        </button>
      )}
    </>
  );
}
