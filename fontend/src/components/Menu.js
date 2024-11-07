import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";


function Menu(props) {
  const [slide, setslide] = useState(true)
  const location = useLocation();

  useEffect(() => {
    props.slide(slide)
  }, [props, slide])


  // if (slide) {
  //   return <div className="w-full h-full flex flex-col justify-between border-2">
  //     <div className="">
  //       <div className="h-20 px-4 py-4">
  //         <Link to="/">
  //           <img className="w-52" src="https://dummyimage.com/250x60" alt="login_image" />
  //         </Link>
  //       </div>
  //       {/* 반복문 */}
  //       {props.menu.map((menu, index) => (
  //         <Link key={index} to={`/?${menu.category}`} >
  //           <div className={`h-14 flex px-4 py-2 hover:bg-blue-100 ${(location.search.substring(1).split("&")[0] === menu.category) ? "border-blue-600 bg-blue-100 border-r-4" : ""}`} id={menu.category}>
  //             <img className="w-10 h-10" src="https://dummyimage.com/40x40" alt="login_image" />
  //             <div className="w-40 p-2">
  //               <p className="text-base font-medium">{menu.category}</p>
  //             </div>
  //           </div>
  //         </Link>
  //       ))}
  //     </div>
  //     <div className="h-14 border-y-2">
  //       <button onClick={() => setslide(!slide)} className="w-full h-full flex justify-center items-center">
  //         <img className="w-10 h-10" src="https://dummyimage.com/40x40" alt="login_image" />
  //       </button>
  //     </div>
  //   </div>
  // }

    return (
      // <div className="w-16 h-full flex flex-col justify-between border-2">
      //   <div className="">
      //     <div className="h-20 p-2">
      //       <Link to="/">
      //         <img className="w-10 h-10" src="https://dummyimage.com/40x40" alt="login_image" />
      //       </Link>
      //     </div>
      //     {/* 반복문 */}
      //     {props.menu.map((menu, index) => (
      //       <Link key={index} to={`/?${menu.category}`}>
      //         <div className={`h-14 flex p-2 hover:bg-blue-100 ${(location.search.substring(1).split("&")[0] === menu.category) ? "border-blue-600 bg-blue-100 border-r-4" : ""}`} id={menu.category}>
      //           <img className="w-10 h-10" src="https://dummyimage.com/40x40" alt="login_image" />
      //         </div>
      //       </Link>
      //     ))}

      //   </div>
      //   <div className="h-14 border-y-2">
      //     <button onClick={() => setslide(!slide)} className="w-full h-full flex justify-center items-center">
      //       <img className="w-10 h-10" src="https://dummyimage.com/40x40" alt="login_image" />
      //     </button>
      //   </div>
      // </div>
      <div className={`w-full h-full flex flex-col justify-between border-2 ${slide? "w-full": "w-16"}`}>
        <div className="">
          <div className={`h-20 ${slide ? "px-4 py-4" : "p-2"}`}>
            <Link to="/">
              <img className={`${slide ? "w-52" : "w-10 h-10"}`} src={`${slide ? "https://dummyimage.com/250x60" : "https://dummyimage.com/40x40"}`} alt="login_image" />
            </Link>
          </div>
          {/* 반복문 */}
          {props.menu.map((menu, index) => (
            <Link key={index} to={`/?${menu.category}&page=1`}>
              <div className={`h-14 flex ${slide? "px-4 py-2": "p-2"} hover:bg-blue-100 ${(location.search.substring(1).split("&")[0] === menu.category) ? "border-blue-600 bg-blue-100 border-r-4" : ""}`} id={menu.category}>
                <img className="w-10 h-10" src="https://dummyimage.com/40x40" alt="login_image" />
                {slide && (
                  <div className="w-40 p-2">
                    <p className="text-base font-medium">{menu.category}</p>
                  </div>
                  )
                }
              </div>
            </Link>
          ))}
        </div>
        <div className="h-14 border-y-2">
          <button onClick={() => setslide(!slide)} className="w-full h-full flex justify-center items-center">
            <img className="w-10 h-10" src="https://dummyimage.com/40x40" alt="login_image" />
          </button>
        </div>
      </div>
    );
  }

  export default Menu;
