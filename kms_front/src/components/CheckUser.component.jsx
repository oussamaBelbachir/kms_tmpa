import React,{ useEffect ,useState} from 'react';
import { useDispatch} from 'react-redux';
import { setCurrentUser } from '../store/user/user.actions';
import {checkUser} from "../Api/auth";
import Loading from './Loading/Loading.component';

const CheckUser = (OriginalComponent) => {

    function NewComponent(props) {
      
      const [loading,setLoading] = useState(true);
      const dispatch = useDispatch();
  
      useEffect(() => {
          (async () => {

            try{
                const {data : {data}} = await checkUser();
                const {user} = data;
                dispatch(setCurrentUser(user));
                setLoading(false);

            }catch(err){
              console.log(err);
            }
          })();
        },[]);
  
    // console.log("App user ==> ",user);
      
    if(loading){
        return <div className="app"><Loading full/></div>
      }

      return <OriginalComponent />;
    }
    return NewComponent;
}


export default CheckUser;