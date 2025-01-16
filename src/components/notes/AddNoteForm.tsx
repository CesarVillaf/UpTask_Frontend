import { useForm } from "react-hook-form";
import { NoteFormData } from "@types";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/api/Note.API";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export default function AddNoteForm() {
  const initialValues: NoteFormData = {
    content: ''
  };

  const params = useParams();
  const projectId = params.projectId!;

  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get('viewTaskId')!;

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createNote,
    onError: error => toast.error(error.message),
    onSuccess: data => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ['task', taskId] })
      reset();
    }
  });

  const handleAddNote = (formData: NoteFormData) => {
    const data = {
      projectId,
      taskId,
      formData
    };
    mutate(data);
  };

  return (
    <form 
      onSubmit={handleSubmit(handleAddNote)} 
      className="space-y-3" 
      noValidate
    >
      <div className="flex flex-col gap-2">
        <label className="font-bold" htmlFor="content"></label>
        <input
          id="content"
          type="text"
          placeholder="Contenido de la nota"
          className="w-full p-3 border border-gray-300"
          {...register('content', {
            required: 'El contenido de la nota es obligatorio'
          })}
        />
        {errors.content && (<ErrorMessage>{errors.content.message}</ErrorMessage>)}
      </div>

      <input
        type="submit"
        value="Crear Nota"
        className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-white font-black cursor-pointer"
      />
    </form>
  );
}
