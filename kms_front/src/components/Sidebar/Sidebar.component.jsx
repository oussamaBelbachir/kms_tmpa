import React from 'react'
import SubMenu from '../SubMenu/SubMenu.component';
import "./Sidebar.styles.scss";
import Logo from "../Logo/Logo.component";
import {Link} from "react-router-dom";
import { useSelector } from 'react-redux';
import {selectCurrentUser} from "../../store/user/user.selectors";
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from "react-router-dom";
import {logout} from "../../Api/auth";

import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../store/user/user.actions';

function Sidebar() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const user = useSelector(selectCurrentUser);


  const direction_departments = user ? user.direction_departments : JSON.parse(import.meta.env.VITE_DIRECTION_DEPARTMENTS);

  const menuItems = Object.keys(direction_departments).map(el => {

  const submenu = direction_departments[el].map(dep => ({title : dep,url : "/"+dep}));
    return {
        title : el,
        url : "/"+el,
        submenu
    }
  });

  const handleLogout  = async  () => {
    const res = await logout();
    dispatch(setCurrentUser(null));
    navigate("/connexion");
  }

  return (
    <div className='sidebar'>
      <div>
        <div className='sidebar__logo'>
          <Link to={"/articles"}><Logo /></Link>
        </div>

        <div className='sidebar__menu'>
            {
              menuItems.map(item => <SubMenu key={item.title} item={item}/>)
            }
        </div>
      </div>


        <div className='logout' onClick={handleLogout}><LogoutIcon />deconnexion</div>
    </div>
  )
}

export default Sidebar