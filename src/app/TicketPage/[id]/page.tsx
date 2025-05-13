import TicketForm from "@/components/TicketForm";

const getTicketById = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch ticket data");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching ticket data:", error);
  }
};

interface TicketPageParams {
  id: string;
}

const TicketPage = async ({ params }: { params: TicketPageParams }) => {
  const EDITMODE =  (await params).id === "new" ? false : true;

  let updateTicketData = {_id: " new"};

  if (EDITMODE) {
    const ticketData = await getTicketById(( await params).id);
    updateTicketData = ticketData.foundTicket;
  }

  return <TicketForm  ticket={updateTicketData}/>;
};

export default TicketPage;
