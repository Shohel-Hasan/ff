import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, Route, Routes } from "react-router-dom";
import MainPost from "./Pages/Main Post/MainPost";
import GroupProfile from "./Pages/GroupProfile/GroupProfile";
import ThoughtPost from "./Pages/ThoughtPost/ThoughtPost";
import SummaryPost from "./Pages/SummaryPost/SummaryPost";
import UserAboutPost from "./Pages/UserAboutPost/UserAboutPost";
import SingleCourse from "./Pages/SingleCourse/SingleCourse";
import Welcome from "./components/Welcome"
import MyCourses from "./Pages/My Courses/MyCourses";
import MyGroups from "./Pages/My Groups/MyGroups";
import CreateCourse from "./Pages/CreateCourse/CreateCourse";
import UserProfile from "./Pages/UserProfile/UserProfile";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import Navbar from "./components/Navbar";
import CrousePage from "./Pages/CrousePage/CrousePage";
import { useState } from "react";
import AllCourses from "./Pages/AllCourses/AllCourses";
import Home from "./Pages/Home/Home";
import AboutUs from "./Pages/About Us/AboutUs";
import DataPolicy from "./Pages/DataPolicy/DataPolicy";
import CookiePolicy from "./Pages/CookiePolicy/CookiePolicy";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import ProductPolicy from "./Pages/ProductPolicy/ProductPolicy";
import GroupsHome from "./Pages/GroupsHome/GroupsHome";
import { useNavigate } from 'react-router-dom';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  

  function checkLoggedIn() {
    let token = '';

    if (localStorage.auth_token) {
        token = localStorage.getItem('auth_token')
    } else {
        token = 'edthnrijrhg5g353gv3';
    }

    const header = {
        mode: 'cors',
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: token
        })
    };

    fetch('http://127.0.0.1:8000/user/token-check', header)
        .then(response => response.json())
        .then(data => {
            // console.log(data.message)
            if (data.message) {
                setIsLoggedIn(true);
            } else {
              navigate('/')
              setIsLoggedIn(false)
            }
            // console.log(isLoggedIn);
        })
        .catch(error => console.log(error))

      return isLoggedIn;
  }

  checkLoggedIn();

  return (
    <div className="body">
        { isLoggedIn && <Navbar triggerCheckLoggedIn={checkLoggedIn} />}
        <Routes>

        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home triggerCheckLoggedIn={checkLoggedIn}/>} />

        {/* Nested Routing Start */}
        <Route path="user/:userId" element={<UserProfile triggerCheckLoggedIn={checkLoggedIn}/>}>
          <Route path="thoughtPost" element={<ThoughtPost triggerCheckLoggedIn={checkLoggedIn} />} />
          {/* <Route path="name/about" element={<About triggerCheckLoggedIn={checkLoggedIn} />} /> */}
          <Route path="mainPost" element={<MainPost triggerCheckLoggedIn={checkLoggedIn} />} />
          <Route path="summaryPost" element={<SummaryPost triggerCheckLoggedIn={checkLoggedIn} />} />
        </Route>
        {/* Nested Routing End */}
        
       
        {/* Params Routes start */}
        <Route path="course/:courseId/details" element={<SingleCourse triggerCheckLoggedIn={checkLoggedIn} />} />
        <Route path="group/:groupId/details" element={<GroupProfile triggerCheckLoggedIn={checkLoggedIn} />} />
        {/* Params Routes end */}

        {/* Terms & Condition start */}

      

        <Route path="about-us" element={<AboutUs triggerCheckLoggedIn={checkLoggedIn} />} />
        <Route path="data-policy" element={<DataPolicy triggerCheckLoggedIn={checkLoggedIn}/>}/>
        <Route path="cookie-policy" element={<CookiePolicy triggerCheckLoggedIn={checkLoggedIn}/>}/>
        <Route path="privacy-policy" element={<PrivacyPolicy triggerCheckLoggedIn={checkLoggedIn}/>}/>
        <Route path="product-policy" element={<ProductPolicy triggerCheckLoggedIn={checkLoggedIn}/>}/>
        <Route path="not-found" element={<PageNotFound triggerCheckLoggedIn={checkLoggedIn} />} />

        {/* Terms & Condition end */}

        <Route path="/:groupId/my-courses" element={<MyCourses triggerCheckLoggedIn={checkLoggedIn} />} />
        <Route path="my-groups" element={<MyGroups triggerCheckLoggedIn={checkLoggedIn} />} />
        <Route path="groups-home" element={<GroupsHome triggerCheckLoggedIn={checkLoggedIn} />} />
        <Route path="/:groupId/create-course" element={<CreateCourse triggerCheckLoggedIn={checkLoggedIn} />} />
        <Route path="user/:userId/user-profile-post" element={<UserAboutPost triggerCheckLoggedIn={checkLoggedIn} />} />
        <Route path="/all-courses" element={<AllCourses triggerCheckLoggedIn={checkLoggedIn} />} />

        {/* Route not added in navbar*/}
        <Route path="/course-page" element={<CrousePage triggerCheckLoggedIn={checkLoggedIn} />} />
    

      </Routes>

     
      

    </div>
  );
}

export default App;
