
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
    incidenceId: string;
    incidenceLevel: string;
    latitude:string;
    longitude:string;
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
        incidenceId: '',
        incidenceLevel: '',
        latitude:'',
        longitude:'',
    });


    const { handleSubmit,  getValues, register , reset } = useForm({
        defaultValues: {
            AutonomousRegion: formData.autonomousRegion,
            CarRegistration: formData.carRegistration,
            Cause: formData.cause,
            CityTown: formData.cityTown,
            Direction : formData.direction,
            endDate: formData.endDate,
            incidenceDescription: formData.incidenceDescription,
            incidenceId: formData.incidenceId,
            IncidenceLevel: formData.incidenceLevel,
            latitude : formData.latitude,
            longitude : formData.longitude,}
      })


    const updateIncidence = async (token: string, IncidenceID: string) => axios.put(`http://192.168.137.1:5009/api/customIncidencias/${IncidenceID}`, {
        AutonomousRegion: getValues("AutonomousRegion"),
        CarRegistration: getValues("CarRegistration"),
        Cause: getValues("Cause"),
        Citytown : getValues("CityTown"),
        Direction : getValues("Direction"),
        endDate: getValues("endDate"),
        incidenceDescription: getValues("incidenceDescription"),
        incidenceId: IncidenceID,
        IncidenceLevel: getValues("IncidenceLevel"),
        latitude : getValues('latitude'),
        longitude : getValues("longitude")
    }, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    
    })
      
    




    useEffect(() => {
        if (incidenceData) {
            // Use reset to update form values dynamically
            reset({
                AutonomousRegion: incidenceData.autonomousRegion,
                CarRegistration: incidenceData.carRegistration,
                Cause: incidenceData.cause,
                CityTown: incidenceData.cityTown,
                Direction: incidenceData.direction,
                endDate: incidenceData.endDate,
                incidenceDescription: incidenceData.incidenceDescription,
                incidenceId: incidenceData.incidenceId,
                IncidenceLevel: incidenceData.incidenceLevel,
                latitude: incidenceData.latitude,
                longitude: incidenceData.longitude,
            });
        }
    }, [incidenceData, reset]);

  
   

    const onSubmit = async () => {
        try {
            const token = Cookies.get('token');
            if (!token) {
                console.error('No token found');
                return;
            }
    
            // Check if incidenceData is not null
            if (!incidenceData) {
                console.error('Incidence data is null');
                return; // Abort the operation or handle accordingly
            }
    
            // Proceed with the update since incidenceData is not null
            await updateIncidence(token, incidenceData.incidenceId);
    
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
                        id="AutonomousRegion"
                        name="AutonomousRegion"
                        
                        
                        fullWidth
                    />
                    <Label htmlFor="carRegistration">CarRegistration</Label>
                    <Input
                    {...register("CarRegistration")}
                        id="carRegistration"
                        name="CarRegistration"
                       
                       
                        fullWidth
                    />
                    <Label htmlFor="cause">Cause</Label>
                    <Input
                    {...register("Cause")}
                        id="cause"
                        name="Cause"
                       
                        
                        fullWidth
                    />
                    <Label htmlFor="cititoun">City/Town</Label>
                    <Input
                    {...register("CityTown")}
                        id="cititoun"
                        name="cityTown"
                       
                      
                        fullWidth
                    />
                    <Label htmlFor="direction">Direction</Label>
                    <Input
                    {...register("Direction")}
                        id="Direction"
                        name="Direction"
                       
                       
                        fullWidth
                    />
                    <Label htmlFor="enddate">EndDate</Label>
                    <Input
                    {...register("endDate")}
                        id="enddate"
                        name="endDate"
                      
                      
                        fullWidth
                    // Shadcn UI might have a different prop for managing input label shrink behavior
                    />
                    <Label htmlFor="Description">Description</Label>
                    <Textarea
                    {...register("incidenceDescription")}
                        id="Description"
                        name="incidenceDescription"
                        
                       
                        fullWidth
                        rows={4}
                    />
                    <Label htmlFor="incID">IncidenceID</Label>
                    <Input
                    {...register("incidenceId")}
                        id="incID"
                        name="incidenceId"
                        
                      
                        fullWidth
                     
                    />
                    <Label htmlFor="IncidenceLevel">IncidenceLevel</Label>
                    <Input
                    {...register("IncidenceLevel")}
                        id="IncidenceLevel"
                        name="IncidenceLevel"
                        
                        
                        fullWidth
                    // Options prop might be needed here to list down the incidence levels if Shadcn UI supports it
                    />
                     <Label htmlFor="latitude">Latitude</Label>
                    <Input
                    {...register("latitude")}
                        id="latitude"
                        name="latitude"
                       
                     
                        fullWidth
                    // Options prop might be needed here to list down the incidence levels if Shadcn UI supports it
                    />
                     <Label htmlFor="longitude">Longitude</Label>
                    <Input
                    {...register("longitude")}
                        id="longitude"
                        name="longitude"
                       
                       
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
