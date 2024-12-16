
import './App.css';
import VerticalNav from './Components/VerticalNav/VerticalNav';
import HorizontalNav from './Components/HorizontalNav/HorizontalNav';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  const [userProfile, setUserProfile] = useState([]);
  const [techStack, setTechStack] = useState([])
  const [projectPortfolio, setProjectPortfolio] = useState([])
  const [projectStack, setProjectStack] = useState([])
  const [projectPoints, setProjectPoints] = useState([])
  const [loggedUser, setLoggedUser] = useState()

  const [viewCv, setViewCv] = useState(false)

  // Fetch user info
  useEffect(() => {
    fetch("/profile")
      .then(r => {
        if (r.ok) {
          return r.json(); // Return the parsed JSON
        }
        throw new Error(`HTTP error! Status: ${r.status}`);
      })
      .then(profile => {
        setUserProfile(profile); // Update the state
      })
      .catch(error => {
        console.error("Fetch error:", error); // Log any errors
      });
  }, []);  

  //Fetch tech stack info
  useEffect(() => {
    fetch("/technologies")
      .then(r => {
        if(r.ok) {
          return r.json();
        }
        throw new Error(`HTTP error! Status: ${r.status}`);
      })
      .then(tech => {
        setTechStack(tech)
      })
      .catch(error => {
        console.error("Fetch error:", error)
      })
  }, [])

  //Fetch project portfolio
  useEffect(() => {
    fetch("/projects")
      .then(r => {
        if(r.ok) {
          return r.json()
        }
        throw new Error(`HTTP error! Status: ${r.status}`);
      })
      .then(project => {
        setProjectPortfolio(project)
      })
      .catch(error => {
        console.error("Fetch error:", error)
      })
  }, [])

  //Fetch project stack
  useEffect(() => {
    fetch("projecttech")
      .then(r => {
        if(r.ok) {
          return r.json()
        }
        throw new Error(`HTTP error! Status: ${r.status}`)
      })
      .then(projectStack => {
        setProjectStack(projectStack)
      })
      .catch(error => {
        console.error("Fetch error:", error)
      })
  }, [])

  //Fetch project points
  useEffect(() => {
    fetch("/points")
      .then(r => {
        if(r.ok) {
          return r.json()
        }
        throw new Error(`HTTP error! Status: ${r.status}`)
      })
      .then(projectPoints => {
        setProjectPoints(projectPoints)
      })
      .catch(error => {
        console.error("Fetch error:", error)
      })
  }, [])
  
  //Fetch logged user
  useEffect(() => {
    fetch("/check_session")
    .then(r => {
      if(r.ok) {
        return r.json()
        .then(loggedUser => {
          if(loggedUser.message === "Unauthorized user"){
            setLoggedUser(null)
          } else {
            setLoggedUser(loggedUser)
          }
        })
      }
    })
  }, [])

  console.log(loggedUser)

  return (
    <div id="app-layout">
      {/* Horizontal Navigation */}
      <HorizontalNav 
        userProfile={userProfile} 
        setViewCv={setViewCv}
      />

      <div id="main-layout">
        {/* Vertical Navigation */}
        <VerticalNav userProfile={userProfile} loggedUser={loggedUser}/>

        {/* Outlet for child components */}
        <main id="content">
          <Outlet context={{
            userProfile: userProfile,
            setUserProfile: setUserProfile,

            techStack: techStack, 
            setTechStack: setTechStack,

            projectPortfolio: projectPortfolio,
            setProjectPortfolio: setProjectPortfolio,

            projectStack: projectStack,
            setProjectStack: setProjectStack,

            projectPoints: projectPoints,
            setProjectPoints: setProjectPoints,

            viewCv: viewCv,
            setViewCv: setViewCv,

            loggedUser: loggedUser,
            setLoggedUser: setLoggedUser
          }}/>
        </main>
      </div>
    </div>
  );
}

export default App;

