import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import fetchData, { API_ENDPOINTS } from "../API/Api";

function MenuBox(props) {
    const [projectinfo, setprojectinfo] = useState([])
    const navigate = useNavigate();

    const handleRowClick = (index) => {
        navigate(`?${props.menu.category}&page=1&index=${index}`);
        // `?${props.menu.category}&index=${projectinfo.id}`
        window.location.reload();
    };

    // console.log(projectinfo.id)
    useEffect(() => {
        const loadData_projectinfo = async () => {
            try {
                const data = await fetchData(API_ENDPOINTS.projectinfo, props.menu.category);
                setprojectinfo([...data]);
                // console.log(data);
            } catch (error) {
                // 오류 처리
            }
        };

        loadData_projectinfo();
    }, [props.menu.category])

    return (
        <div className="w-1/2 h-1/2 p-5">
            <div className="shadow-xl flex flex-col h-full">
                <div className="bg-blue-500 rounded-t-lg h-12 text-white content-center px-3 font-bold flex items-center justify-between">
                    <p>{props.menu.category}</p>
                    <Link to={`/?${props.menu.category}`}>
                        <p>more</p>
                    </Link>
                </div>
                <div className="flex-1 bg-white text-xs font-normal">
                    {/* 반복문 */}
                    {projectinfo.slice(0, 10).map((projectinfo, index) => (
                        // <Link key={index} to={`?${props.menu.category}&index=${projectinfo.id}`}>
                            <div key={index} onClick={() => handleRowClick(projectinfo.id)} className="w-full h-8 hover:text-blue-500 hover:bg-slate-100 border-b flex justify-bewteen">
                                <div className="w-10 h-full px-3 py-2 text-center border-r">
                                    <p className="bg_color1 w-4 h-4">{index + 1}</p>
                                </div>
                                <div className="w-full py-2 px-2 h-full text-left border-r">
                                    <p className="">{projectinfo.name}</p>
                                </div>
                                <div className="w-20 h-full px-2 py-2 text-center border-r">
                                    <p className="">{projectinfo.day}</p>
                                </div>
                            </div>
                        // </Link>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default MenuBox;
