import Ticket from "@/models/Ticket";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    try {
        const body = await request.json();
        const ticketData = body.formdata;
        await Ticket.create(ticketData);
        return NextResponse.json({ message: "Ticket Created" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "error", error}, { status: 500 });
    }
}
export async function GET() {
    try {
        const tickets = await Ticket.find();
        return NextResponse.json({ tickets }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "error", error}, { status: 500 });
    }
}

