import { Link } from "react-router-dom";

function MenuBox() {
    return (
        <div className="w-1/2 h-1/2 p-5">
            <div className="shadow-xl flex flex-col h-full">
                <div className="bg-blue-500 rounded-t-lg h-12 text-white content-center px-3 font-bold flex items-center justify-between">
                    <p>project</p>
                    <Link to="/?project">
                        <p>more</p>
                    </Link>
                </div>
                <div className="flex-1 bg-white text-xs font-normal overflow-y-scroll">
                    {/* 반복문 */}
                    <Link to="?project&index=1">
                    <div className="w-full h-8 hover:text-blue-500 hover:bg-slate-100 border-b flex justify-bewteen">
                        <div className="w-10 h-full px-3 py-2 text-center border-r">
                            <p className="bg_color1 w-4 h-4">1</p>
                        </div>
                        <div className="w-full py-2 px-2 h-full text-left border-r">
                            <p className="">제목</p>
                        </div>
                        <div className="w-20 h-full px-2 py-2 text-center border-r">
                            <p className="">날짜</p>
                        </div>
                    </div>
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default MenuBox;
