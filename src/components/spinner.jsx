import { FaSpinner } from "react-icons/fa";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center mt-10">
      <FaSpinner className="animate-spin text-blue-500" />
    </div>
  );
};

export default LoadingSpinner;
