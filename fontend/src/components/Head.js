import { useLocation } from "react-router-dom";

function Head() {
    const location = useLocation();

    return (
        <div className="h-full w-full flex justify-between items-center border-b-2">
            <div className="ml-3">
                <p className="font-bold text-xl color_text del_950px text-blue-600">{location.search.substring(1).split("&")[0]}</p>
            </div>
            {/* 필요 시 기능 추가 */}
        </div>
    );
}

export default Head;
