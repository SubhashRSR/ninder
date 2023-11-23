import { useState } from "react";
import { supabase } from "../service/supabase";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Use the navigate hook

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Set loading to true when starting signup
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error(error);
      } else {
        console.log(user);
        navigate("/login"); // Redirect to login page after successful signup
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
    } finally {
      setLoading(false); // Set loading back to false when signup finishes (success or error)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
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
            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm mt-3"
          />
          <button
            type="submit"
            disabled={loading} // Disable button when loading is true
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading ? ( // Show spinner if loading, else show "Sign Up"
              <div className="flex items-center justify-center">
                <FaSpinner className="animate-spin mr-2" />
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500">
            Log in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
