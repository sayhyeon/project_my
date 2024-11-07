import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from "../API/Api";
import { fetchImg } from '../API/Api';
import Swal from 'sweetalert2'

function Slide(props) {
    // console.log(props.projectinfo2[0].name)
    const [projectimg, setprojectimg] = useState([])
    const [currentSlide, setCurrentSlide] = useState(0);

    // 순서가 뒤죽박죽 되서 아래로 수정
    // useEffect(() => {
    //     const loadData_projectimg = async () => {
    //         const imageUrls = [];

    //         try {
    //             // 각 이미지 필드에 대해 비동기적으로 이미지 URL을 가져옴
                
    //             if (props.projectinfo2[0]) {
    //                 // reduce를 사용하여 순차적으로 이미지를 처리
    //                 const imgPromises = props.projectinfo2[0].map(async (field) => {
    //                     // console.log(field)
    //                     if (field.slide_img) {
    //                         // console.log(field)
    //                         const img = await fetchImg(API_ENDPOINTS.mediaimg, field.slide_img);
    //                         const imgUrl = URL.createObjectURL(img);
    //                         imageUrls.push(imgUrl); // 이미지 URL을 배열에 추가
    //                     }
    //                 });
    //                 // 모든 이미지 URL을 병렬로 받아오기
    //                 await Promise.all(imgPromises);
    //             }
    //             // 이미지 URL 리스트를 상태로 업데이트
    //             setprojectimg([...imageUrls]);
                
    //         } catch (error) {
    //             // 오류 처리
    //             console.error(error);
    //         }

    //     };

    //     loadData_projectimg();
    //     // console.log(projectimg2)
    // }, [props.projectinfo2])

    useEffect(() => {
        const loadData_projectimg = async () => {
            const imageUrls = [];
    
            try {
                // props.projectinfo2[0]이 존재하는지 확인
                if (props.projectinfo2[0]) {
                    // reduce를 사용하여 순차적으로 이미지를 처리
                    await props.projectinfo2[0].reduce(async (promise, field) => {
                        await promise;
                        if (field.slide_img) {
                            const img = await fetchImg(API_ENDPOINTS.mediaimg, field.slide_img);
                            const imgUrl = URL.createObjectURL(img);
                            imageUrls.push(imgUrl); // 순차적으로 URL을 배열에 추가
                        }
                    }, Promise.resolve());
                }
    
                // 이미지 URL 리스트를 상태로 업데이트
                setprojectimg([...imageUrls]);
    
            } catch (error) {
                console.error(error);
            }
        };
    
        loadData_projectimg();
    }, [props.projectinfo2]);
    

    const nextSlide = () => {
        
        if (projectimg.length === 0 && (projectimg)) {
            Swal.fire("슬라이드 없음");
        }
        if (currentSlide === projectimg.length - 1) {
            setCurrentSlide(projectimg.length - 1);
            Swal.fire("슬라이드 끝");
        }

        else {
            setCurrentSlide((prev) => (prev + 1) % projectimg.length);
        }

    };
    const preSlide = () => {
        if (projectimg.length === 0 && (projectimg)) {
            Swal.fire("슬라이드 없음");
        }
        if (currentSlide === 0 && projectimg.length !== 0) {
            setCurrentSlide(0);
            Swal.fire("슬라이드 시작");
        }
        else {
            setCurrentSlide((prev) => (prev - 1 + projectimg.length) % projectimg.length);
        }
    };
    // const selectmenu = document.getElementById(location.search.substring(1).split("&")[0]);

    return (
        <div className="w-full h-full flex items-center border-2 ">
            <button className="w-12 h-full flex items-center" onClick={preSlide}>
                <p className='w-full'>이전</p>
            </button>
            <div className="flex-1 h-full relative">
                {(projectimg.length !== 0) && (projectimg) &&
                    <img className="w-full h-full absolute" src={projectimg[currentSlide]} alt={`slide_image_${currentSlide}`} />
                }

            </div>
            <button className="w-12 h-full flex items-center" onClick={nextSlide}>
                <p className='w-full'>다음</p>
            </button>
        </div>
    );
}

export default Slide;
