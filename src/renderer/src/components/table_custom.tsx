import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button } from "@/components/ui/button"
import EditFile from './editFile';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'autonomousRegion', headerName: 'Autonomous Region', width: 150 },
    { field: 'carRegistration', headerName: 'Car Registration', width: 130 },
    { field: 'cause', headerName: 'Cause', width: 130 },
    { field: 'cityTown', headerName: 'City/Town', width: 120 },
    { field: 'direction', headerName: 'Direction', width: 120 },
    { field: 'endDate', headerName: 'End Date', width: 110 },
    { field: 'incidenceDescription', headerName: 'Description', width: 200 },
    { field: 'incidenceId', headerName: 'Incidence ID', width: 120 },
    { field: 'incidenceLevel', headerName: 'Incidence Level', width: 130 },
    { field: 'longitude', headerName: 'Longitude', width: 120 },
    { field: 'latitude', headerName: 'Latitude', width: 130 },
];



interface DataTableProps {
    rows: any[]; 
    onDelete?: (selectedIds: string[]) => void; 
}


export default function Tablilla(props: DataTableProps) {
    const navigate = useNavigate();
    const { rows } = props;
    const [selectionModel, setSelectionModel] = React.useState<string[]>([]);
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    const [selectedIncidence, setSelectedIncidence] = useState(null);

    const handleEditClick = () => {
        const incidenceToEdit = rows.find(row => row.incidenceId === selectionModel[0]);
        if (incidenceToEdit) {
            setSelectedIncidence(incidenceToEdit);
            setIsEditFormOpen(true);
        }
    };

    const handleCloseEditForm = () => {
        setIsEditFormOpen(false);
        setSelectedIncidence(null);
    };

    const handleDelete = () => {
       
        if (props.onDelete) {
            props.onDelete(selectionModel);
        }

        
    };


    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                getRowId={(row) => row.incidenceId} // Specify the unique identifier field
                onRowSelectionModelChange={(newSelectionModel) => {
                    setSelectionModel(newSelectionModel as string[]);
                }}
                rowSelectionModel={selectionModel}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
            // ... other DataGrid properties if any
            />
            <div style={{padding:'10px' ,gap:'10px', display:'flex'}}>
            <Button onClick={handleEditClick} >Editar seleccionada</Button>

            <EditFile
                open={isEditFormOpen}
                onClose={handleCloseEditForm}
                incidenceData={selectedIncidence}
            />
            <Button onClick={handleDelete} >Eliminar seleccionadas</Button>
            <Button onClick={() => navigate("/dashboard")} >Volver</Button>
            </div>
        </div>
    );
}