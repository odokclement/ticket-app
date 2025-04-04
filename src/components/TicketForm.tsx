"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Ticket {
  _id: string;
  title?: string;
  description?: string;
  category?: string;
  priority?: number;
  progress?: number;
  status?: string;
}

const TicketForm =  ({ticket}: { ticket: Ticket }) => {
  const EDITMODE = ticket._id ==="new"?false :true;
    const router = useRouter();
  const startingTicketData = {
    title: "",
    description: "",
    category: "",
    priority: 1,
    progress: 0,
    status: "not started",
  };

  if(EDITMODE){
    startingTicketData["title"] = ticket.title || "";
    startingTicketData["description"] = ticket.description || "";
    startingTicketData["priority"] = ticket.priority ?? 1;
    startingTicketData["progress"] = ticket.progress ?? 0;
    startingTicketData["status"] = ticket.status || "not started";
    startingTicketData["category"] = ticket.category || "";
  }

  const [formData, setFormData] = useState(startingTicketData);

  interface TicketData {
    title: string;
    description: string;
    category: string;
    priority: number;
    progress: number;
    status: string;
  }

  interface ChangeEvent {
    target: {
      name: string;
      value: string;
    };
  }

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prevData: TicketData) => ({
      ...prevData,
      [name]: value,
    }));
  };
interface TicketResponse {
    ok: boolean;
}

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if(EDITMODE){
      const response: TicketResponse = await fetch(`/api/Tickets/${ticket._id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ formdata: formData }),
    });

    if (!response.ok) {
        console.log("Error updating ticket");
    }

    }else{
    const response: TicketResponse = await fetch("/api/Tickets", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ formdata: formData }),
    });

    if (!response.ok) {
        console.log("Error creating ticket");
    }
    }

    router.refresh();
    router.push("/");
};
  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col w-full max-w-md rounded-md shadow-lg p-4 m-2"
        method="POST"
        onSubmit={handleSubmit}
      >
        <label htmlFor="title">Title</label>
        <input
          className="border border-gray-300 rounded-md p-2 mb-4 bg-slate-200 text-black"
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <textarea
          className="border border-gray-300 rounded-md p-2 mb-4 bg-slate-200 text-black"
          rows={4}
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
        />
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category"
          className="border border-gray-300 rounded-md p-2 mb-4 bg-slate-200 text-black "
          onChange={handleChange}
          value={formData.category}
        >
          <option value="hardware">Hardware</option>
          <option value="software">Software</option>
          <option value="network">Network</option>
          <option value="other">Other</option>
        </select>
        <div>
        <label htmlFor="priority">Priority</label>
        <input
        id="priority-1"
        name="priority"
        type="radio"
        value={1}
        onChange={handleChange}
        checked={formData.priority == 1}
        />
        <label htmlFor="priority-1">1</label>
        <input
        id="priority-2"
        name="priority"
        type="radio"
        value={2}
        onChange={handleChange}
        checked={formData.priority == 2}
        />
        <label htmlFor="priority-2">2</label>
        <input
        id="priority-3"
        name="priority"
        type="radio"
        value={3}
        onChange={handleChange}
        checked={formData.priority == 3}
        />
        <label htmlFor="priority-3">3</label>
        <input
        id="priority-4"
        name="priority"
        type="radio"
        value={4}
        onChange={handleChange}
        checked={formData.priority == 4}
        />
        <label htmlFor="priority-2">4</label>
        <input
        id="priority-5"
        name="priority"
        type="radio"
        value={5}
        onChange={handleChange}
        checked={formData.priority == 5}
        />
        <label htmlFor="priority-3">5</label>
        </div>
        <label htmlFor="progress">Progress</label>
        <input
        type="range"
        name="progress"
        id="progress"
        min={0}
        max={100}
        value={formData.progress}
        onChange={handleChange}
        />
        <label htmlFor="status">Status</label>
        <select
            name="status"
            id="status"
            value={formData.status}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 mb-4 bg-slate-200 text-black "
            >
            <option value="not started">Not Started</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
            </select>
            <input
            type="submit"
            value={ EDITMODE?"Update Ticket":"Create Ticket"}
            className="btn"
            />
      </form>
    </div>
  );
};

export default TicketForm;
