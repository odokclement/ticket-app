import Ticket from "@/models/Ticket";
import { NextResponse } from "next/server";



export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;

  try {
    await Ticket.findByIdAndDelete(id);
    return NextResponse.json({ message: "Ticket Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
};

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;

  try {
    const foundTicket = await Ticket.findOne({ _id: id });
    return NextResponse.json({ foundTicket}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
}
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;

  try {
    const body = await request.json();
    const ticketData = body.formdata;
    await Ticket.findByIdAndUpdate(id, {...ticketData});
    return NextResponse.json({ message: "Ticket Updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
}

