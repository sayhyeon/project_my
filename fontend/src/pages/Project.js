import Menu from "../components/Menu"
import Head from "../components/Head";
import Main from "../components/Main"
import { useState } from "react";

function Project() {
    const [slide, setslide] = useState(true)

    const changeslide = (newslide) => {
        setslide(newslide);
    }

    return (
        <div className="w-full h-screen flex">
            <div className="flex w-full">
                {slide ? (
                    <div className="w-60 h-full">
                        <Menu slide={changeslide} />
                    </div>
                ) : (
                    <div className="w-16 h-full">
                    <Menu slide={changeslide} />
                </div>
                )}
                <div className="flex-1 h-full flex flex-col">
                    <div className="h-12 w-full">
                        <Head></Head>
                    </div>
                    <div className="flex-1 w-full p-3">
                        <Main ></Main>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Project;
