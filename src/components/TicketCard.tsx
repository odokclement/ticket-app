import Link from "next/link";
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
  priority?: number;
  progress?: number;
  status?: string | undefined;
  createdAt?: string;
  [key: string]: string | number | boolean | object | null | undefined;
}

// Add props to the component
const TicketCard = ({ ticket }: { ticket: Ticket }) => {
  const formatTimestamp = (timestamp: string) => {
    const options = {
      year: "numeric" as const,
      month: "2-digit" as const,
      day: "2-digit" as const,
      hour: "2-digit" as const,
      minute: "2-digit" as const,
      hour12: true,
    };
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString("en-US", options);
    return formattedDate;
  };

  return (
    <div className="flex flex-col bg-[#47566a] hover:bg-[#4f5e74] rounded-md shadow-lg p-4 m-2">
      <div className="flex mb-3 ">
        <PriorityDisplay priority={ticket.priority ?? 0} />
        <div className="ml-auto">
          <DeleteBlock id={String(ticket._id)} />
        </div>
      </div>
      <Link href={`/TicketPage/${ticket._id}`}  style={{display:"contents"}}>
      <h4>{ticket.title || "Ticket Title"}</h4>
      <hr className="h-px border-0 mb-2 bg-[#2b3441]" />
      <p className="whitespace-pre-wrap">
        {ticket.description || "No description provided."}
      </p>
      <div className="flex-grow"></div>
      <div className="flex mt-2">
        <div className="flex flex-col">
          <p className="text-xs my-1">
            {ticket.createdAt
              ? formatTimestamp(ticket.createdAt)
              : "Unknown date"}
          </p>
          <ProgressBar progress={ticket.progress ?? 0} />
        </div>
        <div className="ml-auto flex items-end">
          <StatusDisplay status={ticket.status ?? "Unknown"} />
        </div>
      </div>
      </Link>
    </div>
  );
};

export default TicketCard;
