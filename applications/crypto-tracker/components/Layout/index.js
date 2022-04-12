import Navbar from "../Navbar";
import NavMobileDrop from "../NavMobileDrop";
import NavMobile from "../NavMobile";

export default function Layout({ children }) {
    return (
        <div>
            <Navbar/>
            
            <NavMobile>
         
                    <NavMobileDrop/>
                
                </NavMobile>
            {children}
        </div>
    )
}