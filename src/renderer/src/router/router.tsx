
import Login from '@renderer/components/login';
import Dashboard from '@renderer/components/dashboard';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Administer from '@renderer/components/administer_incidences';
import Profile from '@renderer/components/profile';
import SimpleMap from '@renderer/components/map';





export default function UserRoutes() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/administer" element={<Administer />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/map" element={<SimpleMap />} />
            </Routes>
        </BrowserRouter>
    );

}


//<Route path="/profile" element = {<UserProfile/>}/>


