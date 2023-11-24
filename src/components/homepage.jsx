import { useEffect, useState } from "react";
import { supabase } from "../service/supabase";

const Homepage = () => {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUserEmail(user.user_metadata.full_name);
        console.log(user);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h1>Welcome, {userEmail}</h1>
    </div>
  );
};

export default Homepage;
