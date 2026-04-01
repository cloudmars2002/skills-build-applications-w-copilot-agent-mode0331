import { BrowserRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  const linkClassName = ({ isActive }) =>
    `nav-link px-3 ${isActive ? 'active fw-semibold' : ''}`;

  return (
    <BrowserRouter>
      <div className="app-shell py-4 py-md-5">
        <div className="container">
          <section className="card border-0 shadow-sm mb-4 app-hero">
            <div className="card-body p-4 p-md-5 d-flex flex-wrap justify-content-between align-items-start gap-3">
              <div className="d-flex align-items-center gap-3">
                <img
                  src="/octofitapp-small.png"
                  alt="OctoFit logo"
                  className="app-logo"
                />
                <div>
                  <h1 className="display-6 fw-bold mb-2">OctoFit Tracker</h1>
                <p className="lead mb-0 text-secondary">
                  Track activities, compare team progress, and explore workout data.
                </p>
                </div>
              </div>
              <a
                className="link-primary fw-semibold"
                href="/api/"
                target="_blank"
                rel="noreferrer"
              >
                Open API Root
              </a>
            </div>
          </section>

          <ul className="nav nav-pills nav-fill app-nav mb-4">
              <li className="nav-item">
                <NavLink to="/" end className={linkClassName}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/users" className={linkClassName}>
                  Users
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/teams" className={linkClassName}>
                  Teams
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/activities" className={linkClassName}>
                  Activities
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/leaderboard" className={linkClassName}>
                  Leaderboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/workouts" className={linkClassName}>
                  Workouts
                </NavLink>
              </li>
          </ul>

          <Routes>
            <Route path="/" element={<Activities />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
