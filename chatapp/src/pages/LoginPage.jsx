import React, { useContext, useState } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false); // ✅ New checkbox state

  const { login } = useContext(AuthContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!agreed) {
      toast.error("You must agree to the terms and privacy policy.");
      return;
    }

    if (currState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }

    await login(currState === "Sign up" ? "signup" : "login", {
      fullName,
      email,
      password,
      bio,
    });
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      {/* Left */}
      <img src={assets.logo_big} className="w-[min(40vw,250px)]" alt="Logo" />

      {/* Right */}
      <form
        onSubmit={onSubmitHandler}
        className="border-2 bg-white/8 text-white border-gray-600 p-6 flex flex-col gap-6 rounded-lg shadow-lg"
      >
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {currState}
          {isDataSubmitted && (
            <img
              onClick={() => setIsDataSubmitted(false)}
              src={assets.arrow_icon}
              alt="Back"
              className="w-5 cursor-pointer"
            />
          )}
        </h2>

        {currState === "Sign up" && !isDataSubmitted && (
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            className="p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Full Name"
            required
          />
        )}

        {!isDataSubmitted && (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email Address"
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </>
        )}

        {currState === "Sign up" && isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Provide a short bio..."
            required
          ></textarea>
        )}

        <button
          type="submit"
          className="py-3 bg-gradient-to-r from-sky-500 to-sky-200 text-white rounded-md cursor-pointer hover:text-black"
        >
          {currState === "Sign up" ? "Create Account" : "Login Now"}
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-800">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            className="cursor-pointer"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <label htmlFor="terms">
            Agree to the terms of use & privacy policy.
          </label>
        </div>

        <div className="flex flex-col gap-2">
          {currState === "Sign up" ? (
            <p className="text-sm text-gray-900">
              Already have an account?{" "}
              <span
                onClick={() => {
                  setCurrState("Login");
                  setIsDataSubmitted(false);
                }}
                className="font-medium text-gray-300 cursor-pointer hover:text-white"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-800">
              Create an account{" "}
              <span
                onClick={() => setCurrState("Sign up")}
                className="font-medium text-gray-300 cursor-pointer hover:text-white"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
