
import './App.css';
import VerticalNav from './Components/VerticalNav/VerticalNav';
import HorizontalNav from './Components/HorizontalNav/HorizontalNav';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  const [userProfile, setUserProfile] = useState([]);
  const [techStack, setTechStack] = useState([])

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

  return (
    <div id="app-layout">
      {/* Horizontal Navigation */}
      <HorizontalNav userProfile={userProfile} />

      <div id="main-layout">
        {/* Vertical Navigation */}
        <VerticalNav userProfile={userProfile} />

        {/* Outlet for child components */}
        <main id="content">
          <Outlet context={{
            userProfile: userProfile,
            setUserProfile: setUserProfile,

            techStack: techStack, 
            setTechStack: setTechStack
          }}/>
        </main>
      </div>
    </div>
  );
}

export default App;

