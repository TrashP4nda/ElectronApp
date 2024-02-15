import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Assuming there's a Textarea component for descriptions
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import Cookies from "js-cookie";
import axios from "axios";


export default function IntroducirCustom() {

    const { toast } = useToast()

    const navigate = useNavigate();

    const { handleSubmit,  getValues, register, formState: { errors }, clearErrors } = useForm();

    

   const send = async (token: String) => axios.post("http://192.168.137.1:5009/api/customIncidencias", {
   
   AutonomousRegion: getValues("AutonomousRegion"), // Corrected the field name here
   CarRegistration: getValues("CarRegistration"),
   Cause: getValues("Cause"),
   CityTown: getValues("CityTown"),
   Direction: getValues("Direction"),
   endDate: getValues("EndDate"),
   incidenceDescription: getValues("Description"),
   IncidenceId: getValues("IncidenceId"),
   IncidenceLevel: getValues("IncidenceLevel"),
   Latitude: getValues("Latitude"),
   Longitude: getValues("Longitude"),
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`,
        }

    })


    const onSubmit = () => {
        const token = Cookies.get('token');
        if (token) {
        send(token)}
    };

    useEffect(() => {
        setTimeout(() => clearErrors(), 3000);
    }, [errors.Username]);




    return (
        <div className="flex flex-col gap-4 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <Input
                    placeholder="Autonomous Region"
                    {...register("AutonomousRegion", { required: true })}
                />
                {errors.AutonomousRegion && <p style={{ color: 'red' }}>This field is required!</p>}


                <Input
                    placeholder="Car Registration"
                    {...register("CarRegistration", { required: true })}
                />
                {errors.CarRegistration && <p style={{ color: 'red' }}>This field is required!</p>}



                <Input
                    placeholder="Cause"
                    {...register("Cause", { required: true })}
                />
                {errors.Cause && <p style={{ color: 'red' }}>This field is required!</p>}

                <Input
                    placeholder="Description"
                    {...register("Description", { required: true })}
                />
                {errors.Description && <p style={{ color: 'red' }}>This field is required!</p>}

                <Input
                    placeholder="City/Town"
                    {...register("CityTown", { required: true })}
                />
                {errors.CityTown && <p style={{ color: 'red' }}>This field is required!</p>}

                <Input
                    placeholder="Direction"
                    {...register("Direction")}
                />

                <Input
                    placeholder="End Date"
                  
                    {...register("EndDate", { required: true })}
                />
                {errors.EndDate && <p style={{ color: 'red' }}>This field is required!</p>}

              

                <Input
                    placeholder="Incidence ID"
                    {...register("IncidenceId")}
                />

                <Input
                    placeholder="Incidence Level"
                    {...register("IncidenceLevel", { required: true })}
                />
                {errors.IncidenceLevel && <p style={{ color: 'red' }}>This field is required!</p>}

                <Input
                    placeholder="Latitude"
                   
                    {...register("Latitude")}
                />

                <Input
                    placeholder="Longitude"
                    
                    {...register("Longitude")}
                />

                <Button type="submit">Introducir Incidencia</Button>
            </form>
        </div>
    );
}
