import MenuBox from "./MenuBox"
// import { useState, useEffect } from "react";/
import { useLocation, useNavigate } from "react-router-dom";

function Main(props) {
    const location = useLocation();
    const navigate = useNavigate();

    const handleRowClick = () => {
        navigate("?project&index1");
    };


    if (!location.search) {
        return <div className="h-full w-full flex bg-gray-100">
            <div className="w-4/5 h-full flex flex-col">
                <div className="h-full w-full flex flex-wrap">
                    {/* 반복문 */}
                    {props.menu.map((menu,index)=>(
                        <MenuBox key={index} menu={menu}></MenuBox>
                    ))}
                    
                </div>
            </div>
            <div className="flex-1 p-3">
                <div className="w-full h-full bg-white shadow-xl">미구현</div>
            </div>
        </div>
    }

    if (location.search === "?profile") {
        return <div className="w-full h-full flex">
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
    }

    return (
        <div className="w-full h-full flex flex-col bg-gray-100">
            <div className="h-20 flex justify-between">
                <div className="w-1/4 flex items-center p-3">
                    <input className="w-4/5 h-8 border-blue-500 border-2 rounded-l-lg p-3"></input>
                    <button className="w-1/5 h-8">
                        <p className="w-full h-full rounded-r-lg bg-blue-500 text-center pt-1 text-white">검색</p>
                    </button>
                </div>
                <div className="flex items-center p-3">
                    <button>
                        <img className="w-10 h-10" src="https://dummyimage.com/40x40" alt="login_image" />
                    </button>
                </div>
            </div>
            <div className="flex-1 p-3">
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
                        <tr className="h-12 text-base text-slate-500 font-normal table w-full text-center border-b cursor-pointer hover:bg-slate-200 hover:border-l-4 hover:border-l-blue-400" onClick={handleRowClick}>
                                <td className="w-16 border-r">1</td>
                                <td className="text-left p-3 border-r text-black font-bold whitespace-nowrap  overflow-hidden text-ellipsis">테스트</td>
                                <td className="w-16 border-r del_400px">table</td>
                                <td className="w-28 del_400px">t</td>
                        </tr>

                    </tbody>
                </table>
            </div>
            <div className="p-4 flex items-center flex-wrap justify-center del_400px">
                <nav aria-label="Page navigation">
                    <ul className="inline-flex">
                        <li>
                            <button className="h-10 px-5 text-blue-600 transition-colors duration-150 rounded-l-lg focus:shadow-outline hover:bg-blue-100">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                    <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd"></path>
                                </svg>
                            </button>
                        </li>
                        <li>
                            <button className="h-10 px-5 text-blue-600 transition-colors duration-150 focus:shadow-outline hover:bg-blue-100">1</button>
                        </li>
                        <li>
                            <button className="h-10 px-5 text-white transition-colors duration-150 bg-blue-600 border border-r-0 border-blue-600 focus:shadow-outline">2</button>
                        </li>
                        <li>
                            <button className="h-10 px-5 text-blue-600 transition-colors duration-150 focus:shadow-outline hover:bg-blue-100">3</button>
                        </li>
                        <li>
                            <button className="h-10 px-5 text-blue-600 transition-colors duration-150 bg-white rounded-r-lg focus:shadow-outline hover:bg-blue-100">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                    <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" fillRule="evenodd"></path>
                                </svg>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Main;
