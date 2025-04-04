"use client"
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

interface DeleteBlockProps {
        id: string;

}

const DeleteBlock = ({ id }: DeleteBlockProps) => {
    const router = useRouter();
    const deleteTicket = async() => {
        const res = await fetch(`/api/Tickets/${id}`, {
            method: "DELETE",
            cache: "no-store",
        });
        if (!res.ok) {
            throw new Error("Failed to delete data");
        }
        router.refresh();
    }

    return ( 
        <FontAwesomeIcon  icon={faX} className="text-red-400 hover:text-red-200 hover:cursor-pointer" onClick={deleteTicket}/>
     );
}
 
export default DeleteBlock;