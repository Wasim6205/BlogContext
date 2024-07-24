import { createContext, useState } from "react";
import { baseUrl } from "../baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const navigate = useNavigate()

  // data filling
  const fetchBlogPosts = async (page = 1, tag=null, category) => {
    setLoading(true);
    let url = `${baseUrl}?page=${page}`
    if(tag) {
        url += `&tag=${tag}`
    }
    if(category) {
        url += `&category=${category}`
    }
    try {
      axios.get(url).then((data) => {
        console.log(data.data);
        setPage(data.data.page);
        setPosts(data.data.posts);
        setTotalPages(data.data.totalPages);
      });
    } catch (error) {
      console.log("Error in fetching data");
      setPage(1);
      setPosts([]);
      setTotalPages(null);
    }
    setLoading(false);
  };

  const handlePageChange = (page) => {
    navigate( {search: `?page=${page}`} )
    setPage(page);
  };

  const value = {
    posts,
    setPosts,
    loading,
    setLoading,
    page,
    setPage,
    totalPages,
    setTotalPages,
    fetchBlogPosts,
    handlePageChange,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
