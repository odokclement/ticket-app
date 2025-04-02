import { faHome, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Navbar = () => {
    return (  
     <nav className="flex justify-between items-center bg-[#18222f] p-4">
        <div className="flex items-center space-x-4">
            <Link href={"/"}>
                <FontAwesomeIcon icon={faHome} className="icon"/>
            </Link>
            <Link href={"/TicketPage/new"}>
                <FontAwesomeIcon icon={faTicket} className="icon"/>
            </Link>

        </div>
        <div>
            <p className="text-[#f1f3f5]">@odockclement</p>
        </div>
     </nav>
    );
}
 
export default Navbar;