import React, { useEffect } from 'react';
import './App.css';
import './rootColor.css'
import { Redirect, Route, Switch } from 'react-router-dom';
// import { NotFoundPage } from './pages/NotFoundPage';
import LoginPage from '../pages/LoginPages/LoginPage';
import { CreatorLeftBar } from '../components/LeftBar/CreatorLeftBar';
import { Footer } from '../components/HeadAndFooter/Footer';
import { Header } from '../components/HeadAndFooter/Header';
import { AddEvent } from '../pages/AddEvent/CreatorAddEvent';
import { PublicLeftBar } from '../components/LeftBar/PublicLeftBar';
import { CreatorCalendar } from '../pages/Calendar/CreatorCalendar';
import { CreatorContact } from '../pages/Contact/CreatorContact';
import { CreatorFansManagement } from '../pages/FansManagement/CreatorFansManagement';
import { CreatorOnlineStore } from '../pages/OnlineStore/CreatorOnlineStore';
import { CreatorPublicFansZone } from '../pages/FansZone/CreatorPublicFansZone';
import { CreatorMain } from '../pages/Main/CreatorMain';
import { PublicCalendar } from '../pages/Calendar/PublicCalendar';
import { PublicContact } from '../pages/Contact/PublicContact';
import { PublicMain } from '../pages/Main/PublicMain';
import { PublicOnlineStore } from '../pages/OnlineStore/PublicOnlineStore';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import EditPage from '../pages/EditPage/EditPage';
import { CreatorInbox } from '../pages/Inbox/CreatorInbox';
import { PublicInbox } from '../pages/Inbox/PublicInbox';
import { Deployment } from '../pages/DeployDoc/deployment';
import RegAsCreator from '../pages/LoginPages/LoginForms/RegAsCreatorForm'
import { login, loginSuccess, fetchIsCreator } from '../redux/Login/LoginAction';
import { fetchUser, fetchCreators, fetchFan } from '../redux/CurUser/CurUSerAction';
import { push } from 'connected-react-router';
import '../socket'
import urljoin from 'url-join'

function App() {
  const isAuth = useSelector((state: RootState) => state.login.isAutheticated)
  const isCreator = useSelector((state: RootState) => state.login.isCreator);
  const creators = useSelector((state: RootState) => state.creators.creators);
  const curUser = useSelector((state: RootState) => state.curUser);
  const themes = useSelector((state: RootState) => state.curUser.TA);
  const CUColour = curUser.colour_theme;
  // const [showMenu, setShowMenu] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCreators());
    const token = localStorage.getItem('token');
    if (token !== null) {
      dispatch(fetchIsCreator(token));
      dispatch(fetchFan(token))
    }

    if (token !== null) {
      dispatch(fetchFan(token))
    }

    dispatch(fetchUser());
  }, [])

  return (

    <Switch>
      <Route path="/LoginPage" exact><LoginPage /></Route>
      <Route path="/deployment" ><Deployment /></Route>
      <Route path="/RegisterPage" ><RegAsCreator onCLick={() => {
        dispatch(push("/LoginPage"))
      }} /></Route>
      <div className="App" >
        <Header />
        <div className="main"
          style={{
            background: `linear-gradient(to right top, ${themes[CUColour][2].colour
              }, ${themes[CUColour][0].colour
              })`
          }}
        >
          <div className="middle-section"
            style={{
              background: `linear-gradient(to right bottom, ${themes[CUColour][4].colour
                }, ${themes[CUColour][2].colour
                })`,
              opacity: 0.8
            }}
          >
            {isCreator ? <CreatorLeftBar /> : <PublicLeftBar />}
            <div className="left-bar-flex">
              <Route path="/main" exact>{isCreator ? <CreatorMain /> : <PublicMain />}</Route>
                <Route path="/oninestore">{isCreator? <CreatorOnlineStore />:<PublicOnlineStore /> }</Route>
                <Route path="/calendar">{isCreator? <CreatorCalendar />:<PublicCalendar />}</Route>
                <Route path="/contact">{isCreator?<CreatorContact />:<PublicContact />}</Route>
                <Route path="/inbox">{isCreator?<CreatorInbox />:<PublicInbox />}</Route>
              {/* <Route path="/creator-onlinestore" exact><CreatorOnlineStore /></Route> */}
              {/* <Route path="/creator-calendar" exact><CreatorCalendar /></Route> */}
              <Route path="/fanszone" exact><CreatorPublicFansZone /></Route>
              <Route path="/creator-fansmanagement" exact><CreatorFansManagement /></Route>
              {/* <Route path="/creator-contact" exact><CreatorContact /></Route> */}
              <Route path="/creatorAddEvent" exact><AddEvent /></Route>
              {/* <Route path="/creator-inbox" exact><CreatorInbox /></Route> */}
              {/* <Route path="/creator-main" exact><CreatorMain /></Route> */}
              {/* <Route path="/main" exact><PublicMain /></Route> */}
              {/* <Route path="/onlinestore" exact><PublicOnlineStore /></Route> */}
              {/* <Route path="/calendar" exact><PublicCalendar /></Route> */}
              {/* <Route path="/contact" exact><PublicContact /></Route> */}
              {/* <Route path="/inbox" exact><PublicInbox /></Route> */}
              <Route path="/edit" exact><EditPage /></Route>
            </div>
            <div className='circle1'
              style={{
                background: `linear-gradient(to right bottom, ${themes[CUColour][3].colour
                  }, ${themes[CUColour][2].colour
                  })`,
                opacity: 0.8
              }}
            >

            </div>
            <div className='circle2'
              style={{
                background: `linear-gradient(to right bottom, ${themes[CUColour][3].colour
                  }, ${themes[CUColour][2].colour
                  })`,
                opacity: 0.8
              }}

            ></div>

          </div>

        </div>
        <Footer />
      </div>
    </Switch >

  );
}

export default App;
