import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"








export default function Dashboard() {

    const navigate = useNavigate();

    useEffect(() => {
        if (Cookies.get("token") == null) {
            navigate("/")
        }
    }, [])


    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
        
    const username = currentUser.username

    return (
        <>

            <h1>Bienvenido , {username}.</h1>
            <div className="grid grid-cols-1 gap-4 p-5">
                <Button onClick={() => navigate("/administer")}>Administrar</Button>
                <Button onClick={() => navigate("/map")}>Mapa</Button>
                <Button >En construccion</Button>
            </div>
            <Button onClick={() => { localStorage.clear(); Cookies.remove('token'); navigate("/") }}>Logout</Button>
        </>

    );

}