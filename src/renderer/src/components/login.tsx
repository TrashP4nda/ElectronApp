import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast"
import Cookies from "js-cookie";





export default function Login() {

    const { toast } = useToast()

    const navigate = useNavigate();

    const { handleSubmit,  getValues, register, formState: { errors }, clearErrors } = useForm();

    

    const login = async () => axios.post("http://localhost:5009/api/usuarios/login", {
        Username: getValues("Username"),
        Password: getValues("Password")
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }

    }).then(response => { Cookies.set("token", response.data["token"], { expires: 7 });localStorage.setItem("currentUser",JSON.stringify(response.data["user"])); navigate("/Dashboard") }).catch(function (error) {
        if (error.response) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "El Usuario no existe",
            })
        }
    });


    const onSubmit = () => {
        login()
    };

    useEffect(() => {
        setTimeout(() => clearErrors(["Username"]), 3000);
    }, [errors.Username]);

    useEffect(() => {
        setTimeout(() => clearErrors(["Password"]), 3000);
    }, [errors.Password]);


    return (

        <div className="flex flex-col gap-4 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
            <form className="flex gap-4 flex-col" onSubmit={handleSubmit(onSubmit)}>
                <Input placeholder="Username" type="text" id="username" {...register("Username", { required: true, maxLength: 20 })} />
                {errors.Username && <p style={{ color: 'red' }}>This field is required!</p>}
                <Input placeholder="Password" type="password" id="password" {...register("Password", { required: true })} />
                {errors.Password && <p style={{ color: 'red' }}>This field is required!</p>}
                {errors ? <Button type="submit"  >Login</Button> : <Button type="submit" disabled >Login</Button>}
            </form>
            <Button >Register</Button>
        </div>
    )
}
