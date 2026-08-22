import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import App from "./App";
import { api } from "./services/api";
import "./index.css";

function Page({ title, children }) {
  return <div className="container"><div className="page-title"><h1>{title}</h1></div>{children}</div>;
}

function Trips() {
  const [trips, setTrips] = React.useState([]);
  const [error, setError] = React.useState("");
  React.useEffect(() => {
    api.getTrips().then(setTrips).catch(() =>
      setError("Backend API is not connected yet. Start Spring Boot on port 8080.")
    );
  }, []);
  const data = trips.length ? trips : [
    { id: 1, title: "Sample Trip", description: "Connect the backend to load your trips.", status: "PLANNING" }
  ];
  return <Page title="My Trips">
    {error && <p className="error">{error}</p>}
    <div className="grid">
      {data.map(t => <article className="card" key={t.id}>
        <h3>{t.title}</h3><p className="muted">{t.description || "No description"}</p>
        <p>Status: {t.status || "PLANNING"}</p>
      </article>)}
    </div>
  </Page>;
}

function Destinations() {
  const [items, setItems] = React.useState([]);
  React.useEffect(() => { api.getDestinations().then(setItems).catch(() => {}); }, []);
  const data = items.length ? items : [
    { name: "Hyderabad", country: "India", description: "Culture, food and heritage." },
    { name: "Goa", country: "India", description: "Beaches and coastal experiences." },
    { name: "Bengaluru", country: "India", description: "Technology, parks and city life." }
  ];
  return <Page title="Destinations"><div className="grid">
    {data.map((d, i) => <article className="card" key={d.id || i}>
      <h3>{d.name}</h3><p>{d.country}</p><p className="muted">{d.description}</p>
    </article>)}
  </div></Page>;
}

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const data = await api.login({ email, password });
      if (data.token) localStorage.setItem("tripnest_token", data.token);
      nav("/trips");
    } catch {
      setError("Login API is not available yet.");
    }
  }

  return <Page title="Login"><form className="form" onSubmit={submit}>
    <div className="field"><label>Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></div>
    <div className="field"><label>Password</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} required /></div>
    <button className="btn">Login</button>
    {error && <p className="error">{error}</p>}
    <p className="muted">New user? <Link to="/register">Create an account</Link></p>
  </form></Page>;
}

function Register() {
  return <Page title="Create Account"><form className="form" onSubmit={e => e.preventDefault()}>
    <div className="field"><label>Full name</label><input required /></div>
    <div className="field"><label>Email</label><input type="email" required /></div>
    <div className="field"><label>Password</label><input type="password" required /></div>
    <button className="btn">Register</button>
    <p className="muted">Connect this form to POST /api/auth/register.</p>
  </form></Page>;
}

function NotFound() {
  return <Page title="Page not found"><Link className="btn" to="/">Go home</Link></Page>;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
