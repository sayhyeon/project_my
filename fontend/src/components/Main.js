import MenuBox from "./MenuBox"
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import fetchData, { API_ENDPOINTS, postSearch } from "../API/Api";
import Slide from "./Slide";
import Swal from 'sweetalert2'


function Main(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const [projectinfo, setprojectinfo] = useState([])
    const [projectinfo2, setprojectinfo2] = useState([])
    const [viewset, setviewset] = useState(true)
    const [page, setpage] = useState()
    const [search, setsearch] = useState("")
    const [currentpage, setcurrentpage] = useState(1)
    const view_page = Array(page).fill(null);
    const [filter, setfilter] = useState([])

    const searchClick = () => {
        if (search) {
            const postData = async () => {
                try {
                    let num = 0
                    if (location.search.substring(1).split("&")[0] === "project") { num = 1 }
                    if (location.search.substring(1).split("&")[0] === "code") { num = 2 }
                    if (location.search.substring(1).split("&")[0] === "nonamed") { num = 3 }

                    await postSearch(API_ENDPOINTS.searchtitle, num, search);
                    // setprojectinfo([...data]);
                    // console.log(data);
                } catch (error) {
                    // 오류 처리
                }
            };

            postData();

            setfilter(projectinfo.filter(item => item.name === search))

            Swal.fire({
                title: search,
                text: `검색 결과 ${projectinfo.filter(item => item.name === search).length}개`,
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "검색어 초기화"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "검색어 초기화",
                        text: "완료.",
                        icon: "success"
                    });
                    setsearch('');
                    setfilter([]);
                }
            });
        }
        else {
            Swal.fire("검색어를 입력하시오.");
        }
    }

    const handleRowClick = (index) => {
        navigate(`?${location.search.substring(1).split("&")[0]}&page=${currentpage}&index=${index}`);
        window.location.reload();
    };

    const startProject = () => {
        Swal.fire("아직 없다");
    };

    const nextPage = () => {

        if (currentpage === page || page === 1) {
            Swal.fire("마지막 페이지입니다");
        }
        else {
            setcurrentpage(currentpage + 1)
            // navigate(`?${location.search.substring(1).split("&")[0]}&page=${currentpage}`);
        }
    };

    const prePage = (index) => {
        if (currentpage === 1) {
            Swal.fire("첫 페이지입니다");
        }
        else {
            setcurrentpage(currentpage - 1)
            // navigate(`?${location.search.substring(1).split("&")[0]}&page=${currentpage}`);
        }
    };

    useEffect(() => {
        if (location.search.substring(1).split("&")[0]) {

            const loadData_projectinfo = async () => {
                try {
                    const data = await fetchData(API_ENDPOINTS.projectinfo, location.search.substring(1).split("&")[0]);
                    setprojectinfo([...data]);
                    // console.log(data);
                } catch (error) {
                    // 오류 처리
                }
            };

            loadData_projectinfo();

            if (location.search.split("&")[2]) {

                const loadData_projectinfo2 = async () => {
                    try {
                        const data = await fetchData(API_ENDPOINTS.slideimg, location.search.split("=")[2]);
                        setprojectinfo2([data]);
                        // console.log(data);
                        // console.log(location.search.split("=")[1]);
                    } catch (error) {
                        // 오류 처리
                        console.log(error);
                    }
                };

                loadData_projectinfo2();

            }
        }


    }, [location])


    useEffect(() => {
        if (viewset) {
            setpage(Math.ceil(projectinfo.length / 10))
        }
        else {
            setpage(Math.ceil(projectinfo.length / 3))
        }

        setcurrentpage(1)
    }, [projectinfo, viewset])


    // console.log(page)

    if (!location.search) {
        return <div className="h-full w-full flex bg-gray-100">
            <div className="w-4/5 h-full flex flex-col">
                <div className="h-full w-full flex flex-wrap">
                    {/* 반복문 */}
                    {props.menu.map((menu, index) => (
                        <MenuBox key={index} menu={menu}></MenuBox>
                    ))}

                </div>
            </div>
            <div className="flex-1 p-3">
                <div className="w-full h-full bg-white shadow-xl">미구현</div>
            </div>
        </div>
    }

    // console.log(location.search.split("&")[1])



    if (location.search.split("?")[1]) {
        if (location.search === "?profile&page=1") {
            return (
                <div className="w-full h-full flex">
                    <div className="w-1/3 flex flex-col">
                        <div className="h-1/3 flex items-center">
                            <img className="w-24 h-36 m-auto" src="https://dummyimage.com/100x140" alt="login_image"></img>
                        </div>
                        <div className="flex-1 flex flex-col">
                            <div className="h-1/3 p-2">
                                <p className="font-bold text-sm">기본사항</p>
                                <div className="mt-1 flex">
                                    <span className="text-xs mr-2">이름</span>
                                    <input className="h-4 text-xs flex-1 p-1 border-2 border-blue-200 rounded whitespace-nowrap  overflow-hidden text-ellipsis" placeholder="ex) 2000.20.20" />
                                </div>
                                <div className="mt-1 flex">
                                    <span className="text-xs mr-2">생년</span>
                                    <input className="h-4 text-xs flex-1 p-1 border-2 border-blue-200 rounded whitespace-nowrap  overflow-hidden text-ellipsis" placeholder="ex) 2000.20.20" />
                                </div>
                                <div className="mt-1 flex">
                                    <span className="text-xs mr-2">번호</span>
                                    <input className="h-4 text-xs flex-1 p-1 border-2 border-blue-200 rounded whitespace-nowrap  overflow-hidden text-ellipsis" placeholder="ex) 010-0101-0101" />
                                </div>
                                <div className="mt-1 flex">
                                    <span className="text-xs mr-2">주소</span>
                                    <input className="h-4 text-xs flex-1 p-1 border-2 border-blue-200 rounded whitespace-nowrap  overflow-hidden text-ellipsis" placeholder="ex) 전라남도 여수시 아파트 200동 2000호" />
                                </div>
                                <div className="mt-1 flex">
                                    <span className="text-xs mr-2">메일</span>
                                    <input className="h-4 text-xs flex-1 p-1 border-2 border-blue-200 rounded whitespace-nowrap  overflow-hidden text-ellipsis" placeholder="ex) id@naver.com" />
                                </div>
                            </div>
                            <div className="h-1/3 p-2">
                                <p className="font-bold text-sm">학력사항</p>
                                <div className="mt-1 flex">
                                    <input className="h-4 text-xs flex-1 p-1 border-2 border-blue-200 rounded whitespace-nowrap  overflow-hidden text-ellipsis" placeholder="ex) 2000.20.20" />
                                </div>
                                <div className="mt-1 flex">
                                    <input className="h-4 text-xs flex-1 p-1 border-2 border-blue-200 rounded whitespace-nowrap  overflow-hidden text-ellipsis" placeholder="ex) 2000.20.20" />
                                </div>
                            </div>
                            <div className="flex-1 p-2">
                                <p className="font-bold text-sm">자격증</p>
                                <div className="flex mt-1 w-full">
                                    <p className="text-xs mr-1">2021.06</p>
                                    <p className="text-xs whitespace-nowrap  overflow-hidden text-ellipsis mr-1 w-2/5">사회조사분석사 2급</p>
                                    <p className="text-xs whitespace-nowrap  overflow-hidden text-ellipsis mr-1 text-gray-400">한국산업인력공단</p>
                                </div>
                                <div className="flex mt-1 w-full">
                                    <p className="text-xs mr-1">2023.03</p>
                                    <p className="text-xs whitespace-nowrap  overflow-hidden text-ellipsis mr-1 w-2/5">데이터분석준전문가(ADsP)</p>
                                    <p className="text-xs whitespace-nowrap  overflow-hidden text-ellipsis mr-1 text-gray-400">한국데이터베이스진흥원</p>
                                </div>
                                <div className="flex mt-1 w-full">
                                    <p className="text-xs mr-1">2024.06</p>
                                    <p className="text-xs whitespace-nowrap  overflow-hidden text-ellipsis mr-1 w-2/5">정보처리기사</p>
                                    <p className="text-xs whitespace-nowrap  overflow-hidden text-ellipsis mr-1 text-gray-400">한국산업인력공단</p>
                                </div>
                                <div className="flex mt-1 w-full">
                                    <p className="text-xs mr-1">2024.07</p>
                                    <p className="text-xs whitespace-nowrap  overflow-hidden text-ellipsis mr-1 w-2/5">빅데이터분석기사</p>
                                    <p className="text-xs whitespace-nowrap  overflow-hidden text-ellipsis mr-1 text-gray-400">한국데이터베이스진흥원</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="flex-1 flex flex-col">
                        <div className="h-1/3 w-full p-3 flex flex-col">
                            <p className="font-bold text-sm p-3 bg-blue-200">자서소1</p>
                            <input className="flex-1 p-3 border-2"></input>
                        </div>
                        <div className="h-1/3 w-full p-3 flex flex-col">
                            <p className="font-bold text-sm p-3 bg-blue-200">자서소2</p>
                            <input className="flex-1 p-3 border-2"></input>
                        </div>
                        <div className="h-1/3 w-full p-3 flex flex-col">
                            <p className="font-bold text-sm p-3 bg-blue-200">자서소3</p>
                            <input className="flex-1 p-3 border-2"></input>
                        </div>
                    </div>
                </div>
            )
        }

        // console.log(projectinfo2)
        if (location.search.split("&")[1]) {
            if (location.search.split("=")[2]) {
                return (
                    <div className="w-full h-full p-3 flex flex-col">
                        <div className="text-base font-medium h-12 px-1 py-3">
                            {projectinfo2[0] && projectinfo2[0].name && (
                                <p>{projectinfo2[0].name}</p>
                            )}
                        </div>
                        <div className="flex-1 flex flex-col">
                            <div className="flex-1">
                                <Slide projectinfo2={projectinfo2}></Slide>
                            </div>
                            <div className="h-20 flex items-center justify-center">
                                <button onClick={startProject} className="text-xl font-bold text-white bg-blue-600 rounded-lg w-40 h-12 hover:bg-blue-300 hover:border-black hover:border-2">시작하기</button>
                            </div>
                        </div>
                    </div>
                )
            }
            return (
                <div className="w-full h-full flex flex-col bg-gray-100">
                    <div className="h-20 flex justify-between">
                        <div className="w-1/4 flex items-center p-3">
                            <input className="w-4/5 h-8 border-blue-500 border-2 rounded-l-lg p-3" onChange={(event) => setsearch(event.target.value)} value={search}></input>
                            <button onClick={searchClick} className="w-1/5 h-8">
                                <p className="w-full h-full rounded-r-lg bg-blue-500 text-center pt-1 text-white" >검색</p>
                            </button>
                        </div>
                        <div className="flex items-center p-3">
                            <button>
                                <img onClick={() => setviewset(!viewset)} className="w-10 h-10" src="https://dummyimage.com/40x40" alt="login_image" />
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 p-3">
                        {viewset ? (
                            <table className="w-full h-full border-collapse ">
                                <thead className="bg-white">
                                    <tr className="h-12 text-sm font-bold table w-full border-t-2 border-y border-black border-solid">
                                        <th className="w-16">순번</th>
                                        <th className="">제목</th>
                                        <th className="w-16 del_400px">조회</th>
                                        <th className="w-28 del_400px">날짜</th>
                                    </tr>
                                </thead>
                                <tbody className="block bg-slate-50 h-full">
                                    {/* 반복문 */}
                                    {filter.length !== 0 ? (
                                        filter.slice(0 + ((currentpage - 1) * 10), 10 + ((currentpage - 1) * 10)).map((projectinfo, index) => (
                                            <tr key={index} className={`h-12 text-base text-slate-500 font-normal table w-full text-center border-b cursor-pointer hover:bg-slate-200 hover:border-l-4 hover:border-l-blue-400`} onClick={() => handleRowClick(projectinfo.id)}>
                                                <td className="w-16 border-r">{index + 1 + ((currentpage - 1) * 10)}</td>
                                                <td className="text-left p-3 border-r text-black font-bold whitespace-nowrap  overflow-hidden text-ellipsis">{projectinfo.name}</td>
                                                <td className="w-16 border-r del_400px">{projectinfo.viewcount}</td>
                                                <td className="w-28 del_400px">{projectinfo.day}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        projectinfo.slice(0 + ((currentpage - 1) * 10), 10 + ((currentpage - 1) * 10)).map((projectinfo, index) => (
                                            <tr key={index} className={`h-12 text-base text-slate-500 font-normal table w-full text-center border-b cursor-pointer hover:bg-slate-200 hover:border-l-4 hover:border-l-blue-400`} onClick={() => handleRowClick(projectinfo.id)}>
                                                <td className="w-16 border-r">{index + 1 + ((currentpage - 1) * 10)}</td>
                                                <td className="text-left p-3 border-r text-black font-bold whitespace-nowrap  overflow-hidden text-ellipsis">{projectinfo.name}</td>
                                                <td className="w-16 border-r del_400px">{projectinfo.viewcount}</td>
                                                <td className="w-28 del_400px">{projectinfo.day}</td>
                                            </tr>
                                        ))
                                    )}

                                </tbody>
                            </table>
                        ) : (
                            <div className="w-full h-full flex">
                                {filter.length !== 0 ? (
                                    filter.slice(0 + ((currentpage - 1) * 3), 3 + ((currentpage - 1) * 3)).map((projectinfo, index) => (
                                        <div key={index} className="w-1/3 h-full p-3">
                                            <div className="flex flex-col h-full shadow-xl cursor-pointer" onClick={() => handleRowClick(projectinfo.id)}>
                                                <div className="h-4/6 flex bg-blue-100">
                                                    <div className="aspect-square h-4/6 m-auto margin_550px width100_550px height100_550px">
                                                        <img className="w-full h-full" src="https://dummyimage.com/180x180" alt="image_test" />
                                                    </div>
                                                </div>
                                                <div className="h-2/6 bg-slate-100 flex items-center m-auto">
                                                    <p>{index + 1 + ((currentpage - 1) * 3)}</p>
                                                    <p>{projectinfo.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    projectinfo.slice(0 + ((currentpage - 1) * 3), 3 + ((currentpage - 1) * 3)).map((projectinfo, index) => (
                                        <div key={index} className="w-1/3 h-full p-3">
                                            <div className="flex flex-col h-full shadow-xl cursor-pointer" onClick={() => handleRowClick(projectinfo.id)}>
                                                <div className="h-4/6 flex bg-blue-100">
                                                    <div className="aspect-square h-4/6 m-auto margin_550px width100_550px height100_550px">
                                                        <img className="w-full h-full" src="https://dummyimage.com/180x180" alt="image_test" />
                                                    </div>
                                                </div>
                                                <div className="h-2/6 bg-slate-100 flex items-center m-auto">
                                                    <p>{index + 1 + ((currentpage - 1) * 3)}</p>
                                                    <p>{projectinfo.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                    </div>
                    <div className="p-4 flex items-center flex-wrap justify-center del_400px">
                        <nav aria-label="Page navigation">
                            <ul className="inline-flex">
                                <li>
                                    <button onClick={() => prePage(projectinfo.id)} className="h-10 px-5 text-blue-600 transition-colors duration-150 rounded-l-lg focus:shadow-outline hover:bg-blue-100">
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                            <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd"></path>
                                        </svg>
                                    </button>
                                </li>
                                {/* { console.log(currentpage<3?0:0 + currentpage -2,currentpage<3?3:3 + currentpage -2, currentpage)} */}
                                {view_page.slice(currentpage < 3 ? 0 : 0 + currentpage - 2, currentpage < 3 ? 3 : 3 + currentpage - 2).map((_, index) => {
                                    return (
                                        <li key={index} onClick={() => setcurrentpage(currentpage < 3 ? index + 1 : index + currentpage - 1)}>
                                            <button className={`h-10 px-5 text-blue-600 transition-colors duration-150 focus:shadow-outline hover:bg-blue-100  ${currentpage < 3 ? currentpage === index + 1 ? "bg-blue-600 text-white" : "" : index === 1 ? "bg-blue-600 text-white" : ""}`}>{currentpage < 3 ? index + 1 : index + currentpage - 1}</button>
                                        </li>
                                    )
                                })}
                                {/* <li>
                                    <button className="h-10 px-5 text-blue-600 transition-colors duration-150 focus:shadow-outline hover:bg-blue-100">1</button>
                                </li>
                                <li>
                                    <button className="h-10 px-5 text-white transition-colors duration-150 bg-blue-600 border border-r-0 border-blue-600 focus:shadow-outline">2</button>
                                </li>
                                <li>
                                    <button className="h-10 px-5 text-blue-600 transition-colors duration-150 focus:shadow-outline hover:bg-blue-100">3</button>
                                </li> */}
                                <li>
                                    <button onClick={() => nextPage(projectinfo.id)} className="h-10 px-5 text-blue-600 transition-colors duration-150 bg-white rounded-r-lg focus:shadow-outline hover:bg-blue-100">
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                            <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" fillRule="evenodd"></path>
                                        </svg>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            )
        }

        // if (projectinfo2.length > 0) {
        //     return (
        //         <div className="w-full h-full p-3 flex flex-col">
        //             <div className="text-base font-medium h-12 px-1 py-3">
        //                 <p>{projectinfo2[0].name}</p>
        //             </div>
        //             <div className="flex-1 flex flex-col">
        //                 <div className="flex-1">
        //                     <Slide projectinfo2={projectinfo2}></Slide>
        //                 </div>
        //                 <div className="h-20 flex items-center justify-center">
        //                     <button onClick={startProject} className="text-xl font-bold text-white bg-blue-600 rounded-lg w-40 h-12 hover:bg-blue-300 hover:border-black hover:border-2">시작하기</button>
        //                 </div>
        //             </div>
        //         </div>
        //     )
        // }


    }



    return (
        <div>good</div>
    );
}

export default Main;
