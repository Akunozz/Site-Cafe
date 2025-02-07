import NavBar from "../NavBar/navbar"
import { Toaster } from "sonner"

function Layout() {
    return (

        <div className="navbar">
            <Toaster position="top-right" richColors duration={5000} />
            <NavBar />
        </div>

    )
}
export default Layout