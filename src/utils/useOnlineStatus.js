import { useEffect, useState } from "react";
const useOnlineStatus = () => {
  const [onLineStatus, setOnlineStatus] = useState(true);
  useEffect(() => {
    window.addEventListener("offline", () => {
      setOnlineStatus(false);
    });
    window.addEventListener("online", () => {
      setOnlineStatus(true);
    });
  }, []);

  return onLineStatus;
};
export default useOnlineStatus;
