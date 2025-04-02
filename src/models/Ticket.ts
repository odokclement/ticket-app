import mongoose,{Schema} from "mongoose";

if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in the environment variables");
}
mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

interface Ticket {
    title: string;
    description: string;
    category: string;
    priority: number;
    progress: number;
    status: string;
    active: boolean;
}

const ticketSchema = new Schema<Ticket>(
    {
        title: { type: String },
        description: { type: String },
        category: { type: String },
        priority: { type: Number },
        progress: { type: Number },
        status: { type: String },
        active: { type: Boolean },
    },
    {
        timestamps: true,
    }
);

const Ticket = mongoose.models.Ticket || mongoose.model<Ticket>("Ticket", ticketSchema);
export default Ticket;