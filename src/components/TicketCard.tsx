import DeleteBlock from "./DeleteBlock";
import PriorityDisplay from "./PriorityDisplay";
import ProgressBar from "./ProgressBar";
import StatusDisplay from "./StatusDisplay";

// Define the Ticket interface
interface Ticket {
  id: number;
  category: string;
  title?: string;
  description?: string;
  priority?: number ;
  progress?: number;
  status?: string | undefined;
  createdAt?: string;
  [key: string]: string | number | boolean | object | null | undefined;
}

// Add props to the component
const TicketCard = ({ ticket }: { ticket: Ticket }) => {
  return (
    <div className="flex flex-col bg-[#47566a] hover:bg-[#4f5e74] rounded-md shadow-lg p-4 m-2">
      <div className="flex mb-3 ">
        <PriorityDisplay priority={ticket.priority ?? 0} />
        <div className="ml-auto">
          <DeleteBlock id={ticket.id} />
        </div>
      </div>
      <h4>{ticket.title || "Ticket Title"}</h4>
      <hr className="h-px border-0 mb-2 bg-[#2b3441]" />
      <p className="whitespace-pre-wrap">
        {ticket.description || "No description provided."}
      </p>
      <div className="flex-grow"></div>
      <div className="flex mt-2">
        <div className="flex flex-col">
          <p className="text-xs my-1">{ticket.createdAt || "01/04/2025 10:45PM"}</p>
          <ProgressBar progress={ticket.progress} />
        </div>
        <div className="ml-auto flex items-end">
          <StatusDisplay status={ticket.status} />
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
