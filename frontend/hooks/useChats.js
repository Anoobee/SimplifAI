import { useEffect, useState } from "react";
import apiClient from "../utils/apiClient.js";

const useChats = (endpoint) => {
  const [chats, setChats] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const fetchChats = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(endpoint);
      setChats(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);
//   useEffect(() => {
//     console.log(chats);
//   }, [chats]);
  return {
    chats,
    error,
    isLoading,
  };
};

export default useChats;
