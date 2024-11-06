import React, { useState, useEffect } from 'react';
import fetchData, { API_ENDPOINTS } from "../API/Api";
import { fetchImg } from '../API/Api';
import Swal from 'sweetalert2'

function Slide(props) {

    // console.log(props.projectinfo2[0].name)


    const [projectimg, setprojectimg] = useState([])
    const [projectimg2, setprojectimg2] = useState([])
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const loadData_projectimg = async () => {
            try {
                // console.log(props.projectinfo2[0])
                if (props.projectinfo2[0] && props.projectinfo2[0].id){
                    const data = await fetchData(API_ENDPOINTS.projectimg, props.projectinfo2[0].id);
                    setprojectimg(data[0]);
                }

                // console.log(data[0].img1);
                // console.log(location.search.split("=")[1]);

            } catch (error) {
                // 오류 처리
                console.log(error);
                // console.log(props.projectinfo2);
            }
        };

        loadData_projectimg();
    }, [props.projectinfo2])

    // console.log(projectimg);

    useEffect(() => {
        // console.log(projectimg)

        const loadData_projectimg2 = async () => {
            const imageFields = ['img1', 'img2', 'img3', 'img4', 'img5'];
            const imageUrls = [];

            // if (projectimg.img1) {
            //     try {
            //         const img = await fetchImg(API_ENDPOINTS.mediaimg, projectimg.img1);
            //         const imgUrl = URL.createObjectURL(img);
            //         setprojectimg2(imgUrl);
            //         // console.log(location.search.split("=")[1]);

            //     } catch (error) {
            //         // 오류 처리
            //         console.log(error);
            //     }
            // }
            try {
                // 각 이미지 필드에 대해 비동기적으로 이미지 URL을 가져옴
                const imgPromises = imageFields.map(async (field) => {
                    if (projectimg){
                        if (projectimg[field]) {
                            // console.log("1")/
                            const img = await fetchImg(API_ENDPOINTS.mediaimg, projectimg[field]);
                            const imgUrl = URL.createObjectURL(img);
                            imageUrls.push(imgUrl); // 이미지 URL을 배열에 추가
                        }
                    }
          
                });

                // 모든 이미지 URL을 병렬로 받아오기
                await Promise.all(imgPromises);

                // 이미지 URL 리스트를 상태로 업데이트
                setprojectimg2(imageUrls);


            } catch (error) {
                // 오류 처리
                console.error(error);
            }


        };

        loadData_projectimg2();
        // console.log(projectimg2)
    }, [projectimg])

    const nextSlide = () => {
        if (projectimg2.length === 0 && (projectimg2)) {
            Swal.fire("슬라이드 없음");
        }
        if (currentSlide === projectimg2.length - 1) {
            setCurrentSlide(projectimg2.length - 1);
            Swal.fire("슬라이드 끝");
        }

        else {
            setCurrentSlide((prev) => (prev + 1) % projectimg2.length);
        }

    };
    const preSlide = () => {
        if (projectimg2.length === 0 && (projectimg2)) {
            Swal.fire("슬라이드 없음");
        }
        if (currentSlide === 0 && projectimg2.length !== 0) {
            setCurrentSlide(0);
            Swal.fire("슬라이드 시작");
        }
        else {
            setCurrentSlide((prev) => (prev - 1 + projectimg2.length) % projectimg2.length);
        }
    };
    // const selectmenu = document.getElementById(location.search.substring(1).split("&")[0]);

    return (
        <div className="w-full h-full flex items-center border-2 ">
            <button className="w-12 h-full flex items-center" onClick={preSlide}>
                <p className='w-full'>이전</p>
            </button>
            <div className="flex-1 h-full relative">
                {(projectimg2.length !== 0) && (projectimg2) &&
                    <img className="w-full h-full absolute" src={projectimg2[currentSlide]} alt={`slide_image_${currentSlide}`} />
                }

            </div>
            <button className="w-12 h-full flex items-center" onClick={nextSlide}>
                <p className='w-full'>다음</p>
            </button>
        </div>
    );
}

export default Slide;
