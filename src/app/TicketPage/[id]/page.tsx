import TicketForm from "@/components/TicketForm";

interface Ticket {
  _id: string;
  title?: string;
  description?: string;
  category?: string;
  priority?: number;
  progress?: number;
  status?: string;
}

interface TicketResponse {
  foundTicket: Ticket;
}

const getTicketById = async (id: string): Promise<Ticket> => {
  try {
    const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch ticket: ${res.statusText}`);
    }

    const data: TicketResponse = await res.json();
    return data.foundTicket;
  } catch (error) {
    console.error("Error fetching ticket data:", error);
    // Return empty ticket object with just the ID in case of error
    return { _id: id };
  }
};

interface TicketPageParams {
  id: string;
}

const TicketPage = async ({ params }: { params: TicketPageParams }) => {
  const { id } = await params;
  const EDITMODE = id !== "new";

  let ticketData: Ticket = { _id: "new" };

  if (EDITMODE) {
    try {
      ticketData = await getTicketById(id);
    } catch (error) {
      console.error("Error loading ticket:", error);
      // You might want to redirect or show an error message here
    }
  }

  return <TicketForm ticket={ticketData} />;
};

export default TicketPage;
