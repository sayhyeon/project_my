import Menu from "../components/Menu"
import Head from "../components/Head";
import Main from "../components/Main"
import { useState, useEffect } from "react";
import axios from "axios";



function Project() {
    const [slide, setslide] = useState(true)
    const [menu, setmenu] = useState([])
    

    const changeslide = (newslide) => {
        setslide(newslide);
    }

    useEffect(() => {
        axios
            .get("http://192.168.0.205:8000/")
            .then((response) => {
                setmenu([...response.data]);
                // 정상 가동
                // console.log(response.data);
            })
            .catch(function (error) {
		            // 오류 시 
                // console.log(error);
            });
    }, [menu])

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
