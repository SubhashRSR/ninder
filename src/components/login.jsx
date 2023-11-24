import { useState } from "react";
import { supabase } from "../service/supabase";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message === "Invalid login credentials") {
          setErrorMessage("Invalid username or password.");
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
        setLoading(false);
      } else {
        console.log(user);
        navigate("/homepage");
      }
    } catch (error) {
      console.error("Error signing in:", error.message);
      setErrorMessage("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    //TO BE DONE
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Log in to your account
          </h2>
        </div>
        {errorMessage && (
          <div className="text-red-500 text-center">{errorMessage}</div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm mt-3"
          />
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <FaSpinner className="animate-spin mr-2" />
              </div>
            ) : (
              "Log in"
            )}
          </button>
          <p className="text-center text-sm mt-4">
            <button
              type="button"
              className="text-blue-500"
              onClick={handleForgotPassword} // Call handleForgotPassword on button click
            >
              Forgot password?
            </button>
            <span className="text-gray-500"> (Not available yet) </span>
          </p>
        </form>
        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <button
            type="button"
            className="text-blue-500"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
