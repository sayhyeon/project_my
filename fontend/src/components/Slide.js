import React, { useState, useEffect } from 'react';
import fetchData, { API_ENDPOINTS } from "../API/Api";
import { fetchImg } from '../API/Api';

const slides = [
    'https://dummyimage.com/1500x700',
    'https://dummyimage.com/1400x600',
    'https://dummyimage.com/1300x500',
];

function Slide(props) {

    // console.log(props.projectinfo2[0].name)


    const [projectimg, setprojectimg] = useState([])
    const [projectimg2, setprojectimg2] = useState([])
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const loadData_projectimg = async () => {
            try {
                const data = await fetchData(API_ENDPOINTS.projectimg, props.projectinfo2[0].name);
                setprojectimg(data[0]);
                // console.log(data[0].img1);
                // console.log(location.search.split("=")[1]);

            } catch (error) {
                // 오류 처리
                console.log(error);
            }
        };

        loadData_projectimg();
    }, [props.projectinfo2])

    // console.log(projectimg);

    useEffect(() => {
        const loadData_projectimg2 = async () => {
            if (projectimg.img1) {
                try {
                    const img = await fetchImg(API_ENDPOINTS.mediaimg, projectimg.img1);
                    const imgUrl = URL.createObjectURL(img);
                    setprojectimg2(imgUrl);
                    // console.log(location.search.split("=")[1]);
    
                } catch (error) {
                    // 오류 처리
                    console.log(error);
                }
            }

        };

        loadData_projectimg2();
    }, [projectimg])



    const nextSlide = () => {
        if (currentSlide === slides.length - 1) {
            setCurrentSlide(slides.length - 1);
        }
        else {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }

    };
    const preSlide = () => {
        if (currentSlide === 0) {
            setCurrentSlide(0);
        }
        else {
            setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        }
    };
    // const selectmenu = document.getElementById(location.search.substring(1).split("&")[0]);

    return (
        <div className="w-full h-full flex items-center border-2 ">
            <button className="w-12 h-full flex items-center" onClick={preSlide}>
                <p className='w-full'>이전</p>
            </button>
            <div className="flex-1 h-full relative">
                {projectimg2 && (
                    <img className={`w-full h-full absolute`} src={projectimg2} alt="slide_image" />
                )}
            </div>
            <button className="w-12 h-full flex items-center" onClick={nextSlide}>
                <p className='w-full'>다음</p>
            </button>
        </div>
    );
}

export default Slide;
