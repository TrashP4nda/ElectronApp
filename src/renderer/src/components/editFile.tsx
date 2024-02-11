
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, Stack } from '@mui/material';
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Cookies from 'js-cookie';
import axios from 'axios';
import { useForm } from "react-hook-form"

interface IncidenceData {
    autonomousRegion: string;
    carRegistration: string;
    cause: string;
    cityTown: string;
    direction: string;
    endDate: string;
    incidenceDescription: string;
    incidenceID: string;
    incidenceLevel: string;
}

interface EditIncidenceFormProps {
    open: boolean;
    onClose: () => void;
    incidenceData: IncidenceData | null;
}




  



const EditIncidenceForm: React.FC<EditIncidenceFormProps> = ({ open, onClose, incidenceData }) => {

    const [formData, setFormData] = useState<IncidenceData>({
        autonomousRegion: '',
        carRegistration: '',
        cause: '',
        cityTown: '',
        direction: '',
        endDate: '',
        incidenceDescription: '',
        incidenceID: '',
        incidenceLevel: '',
    });


    const { handleSubmit,  getValues, register } = useForm({
        defaultValues: {
            AutonomousRegion: formData.autonomousRegion,
            CarRegistration: formData.carRegistration,
            Cause: formData.cause,
            CityTown: formData.cityTown,
            Direction : formData.direction,
            endDate: formData.endDate,
            incidenceDescription: formData.incidenceDescription,
            incidenceID: formData.incidenceID,
            IncidenceLevel: formData.incidenceLevel
        }
      })


    const updateIncidence = async (token: string, IncidenceID: string) => axios.put(`http://192.168.1.136:5009/api/incidencias/${IncidenceID}`, {
        AutonomousRegion: getValues("AutonomousRegion"),
        CarRegistration: getValues("CarRegistration"),
        Cause: getValues("Cause"),
        Citytown : getValues("CityTown"),
        Direction : getValues("Direction"),
        endDate: getValues("endDate"),
        incidenceDescription: getValues("incidenceDescription"),
        incidenceID: IncidenceID,
        IncidenceLevel: getValues("IncidenceLevel")
    }, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    
    }).then(response => { Cookies.set("token", response.data["token"], { expires: 7 });localStorage.setItem("currentUser",JSON.stringify(response.data["user"])); }) 
      
    




    useEffect(() => {
        if (incidenceData) {
            setFormData({ ...incidenceData });
        }
    }, [incidenceData]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

   

    const onSubmit = async () => {
        try {
            const token = Cookies.get('token')
            if (!token) {
                console.error('No token found');
                return;
            }

           

            updateIncidence(token,formData.incidenceID);
            

            onClose(); // Close the dialog after a successful update
        } catch (error) {
            console.error('Error updating incidence:', error);
        }
    };
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" >
            <DialogTitle>Edit Incidence</DialogTitle>
            <DialogContent>
                <Stack spacing={2} direction={'column'}>
                    <form  onSubmit={handleSubmit(onSubmit)} >
                <Label htmlFor="autonomousRegion">AutonomousRegion</Label>
                    <Input
                    {...register("AutonomousRegion")}
                        id="autonomousRegion"
                        name="autonomousRegion"
                        value={formData.autonomousRegion}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Label htmlFor="carRegistration">CarRegistration</Label>
                    <Input
                    {...register("CarRegistration")}
                        id="carRegistration"
                        name="carRegistration"
                        value={formData.carRegistration}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Label htmlFor="cause">Cause</Label>
                    <Input
                    {...register("Cause")}
                        id="cause"
                        name="cause"
                        value={formData.cause}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Label htmlFor="cititoun">City/Town</Label>
                    <Input
                    {...register("CityTown")}
                        id="cititoun"
                        name="cityTown"
                        value={formData.cityTown}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Label htmlFor="direction">Direction</Label>
                    <Input
                    {...register("Direction")}
                        id="direction"
                        name="direction"
                        value={formData.direction}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Label htmlFor="enddate">EndDate</Label>
                    <Input
                    {...register("endDate")}
                        id="enddate"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        fullWidth
                    // Shadcn UI might have a different prop for managing input label shrink behavior
                    />
                    <Label htmlFor="Description">Description</Label>
                    <Textarea
                    {...register("incidenceDescription")}
                        id="Description"
                        name="incidenceDescription"
                        value={formData.incidenceDescription}
                        onChange={handleChange}
                        fullWidth
                        rows={4}
                    />
                    <Label htmlFor="incID">IncidenceID</Label>
                    <Input
                    {...register("incidenceID")}
                        id="incID"
                        name="incidenceID"
                        value={formData.incidenceID}
                        onChange={handleChange}
                        fullWidth
                     
                    />
                    <Label htmlFor="IncidenceLevel">IncidenceLevel</Label>
                    <Input
                    {...register("IncidenceLevel")}
                        id="IncidenceLevel"
                        name="incidenceLevel"
                        value={formData.incidenceLevel}
                        onChange={handleChange}
                        fullWidth
                    // Options prop might be needed here to list down the incidence levels if Shadcn UI supports it
                    />


                    {/* Repeat for other fields */}
                    <Button type="submit"  >
                        Save Changes
                    </Button>
                    </form>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default EditIncidenceForm;


/* <TextField
                        label="Autonomous Region"
                        name="autonomousRegion"
                        value={formData.autonomousRegion}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Car Registration"
                        name="carRegistration"
                        value={formData.carRegistration}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Cause"
                        name="cause"
                        value={formData.cause}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="City/Town"
                        name="cityTown"
                        value={formData.cityTown}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Direction"
                        name="direction"
                        value={formData.direction}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="End Date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Description"
                        name="incidenceDescription"
                        value={formData.incidenceDescription}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                    />
                    <TextField
                        label="Incidence ID"
                        name="incidenceID"
                        value={formData.incidenceID}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        disabled // Assuming this is an ID and should not be editable
                    />
                    <TextField
                        label="Incidence Level"
                        name="incidenceLevel"
                        value={formData.incidenceLevel}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />

*/