import Menu from "../components/Menu"
import Head from "../components/Head";
import Main from "../components/Main"
import { useState, useEffect } from "react";
import fetchData, { API_ENDPOINTS } from "../API/Api";



function Project() {
    const [slide, setslide] = useState(true)
    const [menu, setmenu] = useState([])

    const changeslide = (newslide) => {
        setslide(newslide);
    }

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchData(API_ENDPOINTS.menu);
                setmenu([...data]);
                // console.log(data);
            } catch (error) {
                // 오류 처리
            }
        };

        loadData();
    }, []);

    return (
        <div className="w-full h-screen flex">
            <div className="flex w-full">
                {slide ? (
                    <div className="w-60 h-full">
                        <Menu slide={changeslide} menu={menu} />
                    </div>
                ) : (
                    <div className="w-16 h-full">
                    <Menu slide={changeslide} menu={menu} />
                </div>
                )}
                <div className="flex-1 h-full flex flex-col">
                    <div className="h-12 w-full">
                        <Head></Head>
                    </div>
                    <div className="flex-1 w-full p-3">
                        <Main menu={menu}></Main>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Project;
