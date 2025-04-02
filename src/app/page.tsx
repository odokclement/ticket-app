import TicketCard from "@/components/TicketCard";



interface Ticket {
  id: number;
  category: string;
  [key: string]: string | number | boolean | object | null | undefined; // For additional dynamic properties
}

const getTickets = async (): Promise<{ tickets: Ticket[] }> => {
  const res = await fetch("http://localhost:3000/api/Tickets", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home() {
  const { tickets } = await getTickets();

  const uniqueCategories = [
    ...new Set(tickets?.map((ticket) => ticket.category) || []),
  ];

  return (
    <div className="p-5">
      <div>
        {tickets?.length > 0 ? (
          uniqueCategories.map((uniqueCategory, categoryIndex) => (
            <div key={categoryIndex} className="mb-5">
              <h2 className="text-xl font-bold mb-3">{uniqueCategory}</h2>
              <div className="lg:grid lg:grid-cols-2 xl:grid-cols-4 gap-4">
                {tickets
                  .filter((ticket) => ticket.category === uniqueCategory)
                  .map((filteredTicket) => (
                    <TicketCard key={filteredTicket.id} ticket={filteredTicket} />
                  ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-10">No tickets found</p>
        )}
      </div>
    </div>
  );
}
