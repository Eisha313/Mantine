import { useNavigate, Link } from "react-router-dom";
function Home(){


    
        const navigate=useNavigate();
        // const handlepage1Click=()=>{
        //   navigate("/Page1")
      
        // }
        // const handlepage2Click=()=>{
        //   navigate("/Page2")
      
        // }
        // const handlebackClick=()=>{
        //   navigate("/")
      
        // }

        const handleNavigate = (url) =>{
            navigate(url)
        }

return (
<div>
        <button className="Page1" onClick={()=>handleNavigate('/page1')}>GAME1</button>
        {/* <button className="Page2" onClick={()=>handleNavigate('/page2')}>GAME2</button> */}
        <Link to="/page2" className="page2" >GAME2 </Link>
       
        {/* <button className="back" onClick={()=>handleNavigate('/')}>Back</button> */}
        </div>
)
}
 export default Home;