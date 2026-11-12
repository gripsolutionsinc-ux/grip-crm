import React, { useState } from "react";
import { supabase } from "./supabase";

export default function Login() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
        });
        if (error) throw error;
        setMessage(
          "Registration submitted. Please check your email to confirm your account."
        );
      } else {
        const { error } =
          await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
          });
        if (error) throw error;
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f4f8f8",
      padding: 20,
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{
        width: "100%",
        maxWidth: 400,
        background: "white",
        padding: 30,
        borderRadius: 12,
        boxShadow: "0 8px 30px #00000012"
      }}>
        <h1 style={{
          color: "#131c42",
          textAlign: "center"
        }}>
          GRIP CRM
        </h1>

        <p style={{
          textAlign: "center",
          color: "#64748b"
        }}>
          {mode === "login"
            ? "Sign in to your account"
            : "Create your account"}
        </p>

        <form onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

         
<label>Password</label>
<div style={{ position: "relative" }}>
  <input
    type={showPassword ? "text" : "password"}
    required
    minLength={mode === "signup" ? 12 : undefined}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    style={{ ...inputStyle, paddingRight: 75 }}
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    aria-label={showPassword ? "Hide password" : "Show password"}
    aria-pressed={showPassword}
    style={{
      position: "absolute",
      right: 12,
      top: 18,
      background: "none",
      border: "none",
      color: "#008b8b",
      cursor: "pointer",
      fontSize: 13,
      fontWeight: "bold"
    }}
  >
    {showPassword ? "Hide" : "Show"}
  </button>
</div>

          {error && (
            <p role="alert" style={{ color: "#b91c1c" }}>
              {error}
            </p>
          )}

          {message && (
            <p role="status" style={{ color: "#087f75" }}>
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: 13,
              background: "#008b8b",
              color: "white",
              border: 0,
              borderRadius: 8,
              cursor: "pointer",
              marginTop: 12
            }}
          >
            {loading
              ? "Please wait..."
              : mode === "login"
                ? "Sign In"
                : "Create Account"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 20 }}>
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          {" "}
          <button
            type="button"
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setError("");
              setMessage("");
            }}
            style={{
              background: "none",
              border: 0,
              color: "#008b8b",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            {mode === "login" ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: 12,
  marginTop: 8,
  marginBottom: 18,
  border: "1px solid #cbd5e1",
  borderRadius: 8,
  fontSize: 15
};
