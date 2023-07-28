import React ,{Fragment,useState}from 'react'
import "./Header.styles.scss";
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from "react-router-dom";
import Button from '../Button/Button.component';
import AddIcon from '@mui/icons-material/Add';

import { useSelector } from 'react-redux';
import {selectCurrentUser} from "../../store/user/user.selectors";

function Header() {

  const navigate = useNavigate();
  const [search,setSearch] = useState("");

  const {first_name,last_name,role} = useSelector(selectCurrentUser);
  


  const handleSubmit = e => {
    e.preventDefault();
    if(search) navigate(`/articles?search=${search}`);
  }

  return (
    <Fragment>
      <div className='header__height'></div>
      <div className='header flex-between'>
        <div>
          {role === "admin" && (<Link to={"/articles/ajouter"}><Button nomargin fitContent><AddIcon />Ajouter un article</Button></Link>)}
        
        </div>
        
        {/* <Link to={"/articles"}><Logo /></Link> */}

          <div className='user flex-between'>
            <div className='search'>
                <form onSubmit={handleSubmit}>
                  <div className='search__group'>
                    <SearchIcon />
                    <input 
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      placeholder='Tapez pour rechercher ...'
                    />
                  </div>
                </form>
            </div>

            <div className='avatar'>
                <Avatar alt="Oussama belbachir" src="https://us.123rf.com/450wm/deagreez/deagreez1607/deagreez160700297/60465015-portrait-of-attractive-happy-young-man-in-glasses-on-gray-background.jpg?ver=6" />
                <span className='full__name'>{first_name} {last_name}</span>
            </div>

          </div>
      </div>
    </Fragment>
  )
}

export default Header