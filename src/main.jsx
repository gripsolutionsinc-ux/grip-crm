
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import GRIPCRM from "./GRIP-CRM.jsx";
import Login from "./Login.jsx";
import { supabase } from "./supabase";

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) console.error(error);
      setSession(data?.session ?? null);
      setLoading(false);
    });

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <p style={{ padding: 30 }}>Loading GRIP CRM...</p>;
  }

  return session ? <GRIPCRM /> : <Login />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
