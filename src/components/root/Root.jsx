import { Outlet } from "react-router-dom";
import '../../App.css';
import Header from "../Header";

export default function Root() {
    return (
        <>
            {/* all the other elements */}
            <div id="detail" className="inter p-0 m-0">
                <div className="containar">
                    <Header></Header>
                <Outlet />
                </div>
               

                {/* <Footer></Footer> */}



            </div>
        </>
    );
}