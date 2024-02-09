import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios";


export default function Profile() {

    const navigate = useNavigate();

    useEffect(() => {
        if (Cookies.get("token") == null) {
            navigate("/")
        }
    }, [])


    const { handleSubmit, register ,  getValues } = useForm();

    const login = async () => axios.post("http://localhost:5009/api/usuarios/login", {
        Username: getValues("Username"),
        Password: getValues("Password")
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }

    }).then(response => { Cookies.set("token", response.data["token"], { expires: 7 }); localStorage.setItem("currentUser", JSON.stringify(response.data["user"])); navigate("/Dashboard") });


    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);

    const onSubmit = () => {
        login()
    };



    return (
        <>

            <h1>UserProfile</h1>
            <h2>Here you can change your profile thingies</h2>
            <div className="flex flex-col gap-4 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
                <form className="flex gap-4 flex-col" onSubmit={handleSubmit(onSubmit)}>
                    <Input placeholder={currentUser.username} type="text" id="username" {...register("Username", { required: true, maxLength: 20 })} />
                    <Input  type="email" id="email" placeholder={currentUser.email} {...register("Email", { required: true })} />
                    <Button type="submit" >Save Changes</Button>
                    <Button >Reset Password</Button>
                </form>

                <Button onClick={() => navigate("/dashboard")}>Back</Button>
            </div>
            
        </>

    );

}