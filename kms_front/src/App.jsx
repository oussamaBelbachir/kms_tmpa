import {Routes,Route} from "react-router-dom";
import './App.css'
import Articles from "./routes/Articles/Articles.component";
import MainLayout from "./layouts/MainLayout/MainLayout.component";
import SignIn from "./routes/SignIn/SignIn.component";
import CheckUser from "./components/CheckUser.component";
import RedirectIfAuthenticated from "./permissions/RedirectIfAuthenticated.component";
import RequireAuth from "./permissions/RequireAuth.component";
import PageNotFound from "./routes/PageNotFound/PageNotFound.component";

function App() {

  // const direction_departments = JSON.parse(import.meta.env.VITE_DIRECTION_DEPARTMENTS);
  // console.log(direction_departments);

  return (
    <div className='app'>
          <Routes>

          <Route path="/connexion" element={<RedirectIfAuthenticated />}>
            <Route index element={<SignIn />}/>
          </Route>
            

            <Route path="/" element={<RequireAuth />}>
              <Route path="/" element={<MainLayout />}>
                <Route path="/articles/*" element={<Articles />} />

                <Route path="*" element={<PageNotFound />}/>
              </Route>
            </Route>


          </Routes>
    </div>
  )
}

export default CheckUser(App);
