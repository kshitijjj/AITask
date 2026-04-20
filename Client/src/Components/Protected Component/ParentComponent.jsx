import { useNavigate } from "react-router-dom";

function ParentComponent({children}){
    const navigate=useNavigate();
    const accessToken=()=>{
        const cookies = document.cookie.split("; ");
        const found = cookies.find((c) => c.startsWith("accessToken="));
        return found ? found.split("=")[1] : null;
    };

    const refershToken=()=>{
        const cookies = document.cookie.split("; ");
        const found = cookies.find((c) => c.startsWith("refreshToken="));
        return found ? found.split("=")[1] : null;
    };

    useEffect(() => {
    const checkAuth = async () => {
      if (!accessToken() && !refershToken()) {
        navigate("/auth");  
      } else if (!accessToken() && refershToken()) {
        const res = await axios.post("http://localhost:3000/auth/refresh", {
          refreshToken: refershToken()
        });
        document.cookie = `accessToken=${res.data.accessToken}; path=/; max-age=${60 * 60}`;
      }
    };
    checkAuth();
  }, []);
    
}