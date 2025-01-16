import { addMemberById } from "@/api/TeamAPI"
import { TeamMember } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

type SearchResultProps = {
    user: TeamMember
    reset: () => void
}

export default function SearchResult({ user, reset }: SearchResultProps) {
  const params = useParams();
  const projectId = params.projectId!;
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addMemberById,
    onError: error => {
      toast.error(error.message);
    },
    onSuccess: data => {
      toast.success(data);
      reset();
      queryClient.invalidateQueries({ queryKey: ['projectTeam', projectId] });
    }
  });

  const handleAddMemberToProject = () => {
    const data = { projectId, id: user._id }
    mutate(data)
  }

  return (
    <>
      <p className="mt-10 text-center font-bold">Resultado:</p>
      <div className="flex justify-between items-center">
        <p>{user.name}</p>
        <button
          className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer"
          onClick={handleAddMemberToProject}
        >Agregar al Proyecto</button>
      </div>


    </>
  )
}
