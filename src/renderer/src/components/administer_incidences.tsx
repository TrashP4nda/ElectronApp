import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tablilla from './table';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import axios from 'axios'; // Import Axios

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const fetchIncidences = async (token: String) => {
  try {
    const response = await axios.get('http://192.168.1.136:5009/api/incidencias', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data; // Axios automatically parses the JSON
  } catch (error) {
    console.error('Failed to fetch incidences:', error);
    return [];
  }
};

const deleteIncidence = async (token: string, incidenceId: string) => {
  try {
    const url = `http://192.168.1.136:5009/api/incidencias/${incidenceId}`;
    await axios.delete(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      
      },
    });
  } catch (error) {
    console.error('Failed to delete incidence:', error);
    throw error;
  }
};

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Administer() {
  const [value, setValue] = React.useState(0);
  const [incidences, setIncidences] = useState([]);

  useEffect(() => {
    if (value === 0) {
      const token = Cookies.get('token')
      if (token) {
        fetchIncidences(token).then(data => {
          setIncidences(data);
        });
      }
    }
  }, [value]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleDelete = async (ids: string[]) => {
  
    const token = Cookies.get('token');
    if (token) {
      for (let index = 0; index < ids.length; index++) {
        await deleteIncidence(token, ids[index]);
      }
      window.location.reload();
    }
  };

  return (
    <Box sx={{ width: '100%',height:"100%" , marginTop:'3.5rem' , marginBottom:'3.5rem'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Editar Incidencias Favoritas" {...a11yProps(0)}/>
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Tablilla rows={incidences} onDelete={handleDelete}></Tablilla>
      </CustomTabPanel>
    </Box>
  );
}
