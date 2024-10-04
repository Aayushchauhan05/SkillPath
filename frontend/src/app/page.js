"use client"

import Marquee from "react-fast-marquee";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [image, setImage] = useState(1)
  
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const accessKey = 'C_xvbgf6MfzMfmiNDsHU0J4NpbgCnNal-fFuqVOGouI'; 

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(`https://api.unsplash.com/photos?&client_id=${accessKey}`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setPhotos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [accessKey]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImage((prev) => {
        if (prev == 8) {
          return 1;
        } else {
          return prev + 1;
        }
      });
    }, 1600);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-gradient-to-tr from-[#101828] to-[#3C288A] text-white">
      <section className=" flex justify-around h-full w-[100%] bg-gradient-to-b from-[#111a2b] via-[#3d269a]  to-[#6938EF] pt-20">
        <div className="flex flex-col w-2/6 justify-around min-h-[100vh] ml-[-2vw]">
          <h1 className="text-6xl font-bold ">Grow your <br />startup smarter with advice from mentors</h1>
          <p className="font-sans text-xl font-thin">Book unlimited 1:1 video calls with hundreds of different mentors for a single flat-rate subscription.</p>
          <div className="flex justify-evenly ml-[-3vw]"> <button className="  w-56 bg-[#6952c4] h-16 rounded-3xl">Explore Membership</button> <button className="w-56 h-16 border-2 border-white rounded-3xl"> How it works</button></div>
          {/* <div className="flex flex-col h-48 w-80 justify-evenly">
            <div className="flex justify-evenly"><RiCheckboxCircleFill className="w-6 h-6 " /> <span className="text-lg">Validate ideas before executing</span></div>
            <div className="flex justify-evenly"><RiCheckboxCircleFill className="w-6 h-6 " /> <span className="text-lg">Validate ideas before executing</span></div>
            <div className="flex justify-evenly"><RiCheckboxCircleFill className="w-6 h-6 " /> <span className="text-lg">Validate ideas before executing</span></div>
            <div className="flex justify-evenly"><RiCheckboxCircleFill className="w-6 h-6 " /> <span className="text-lg">Validate ideas before executing</span></div>
          </div> */}
          <div className="flex justify-evenly ml-[-3vw] mt-6">
            <div className="flex flex-col h-14 "><h1 className="text-xl font-bold">48000+</h1>
              <p className="text-gray-400">session boked</p>
            </div>
            <div className="flex flex-col h-14 "><h1 className="text-xl font-bold">700+</h1>
              <p className="text-gray-400">vetted members</p>
            </div>
            <div className="flex flex-col h-14 "><h1 className="text-xl font-bold">4.2/5</h1>
              <p className="text-gray-400">average session rating</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center h-screen">
      <div className="relative w-full p-10 bg-[url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/96269ce8-4a07-4702-936a-6860e1b5594f/ddajeo2-9ab662db-d982-4f92-a04a-3dc934175f75.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzk2MjY5Y2U4LTRhMDctNDcwMi05MzZhLTY4NjBlMWI1NTk0ZlwvZGRhamVvMi05YWI2NjJkYi1kOTgyLTRmOTItYTA0YS0zZGM5MzQxNzVmNzUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.XaPgMhm6IzCLF-u804n8jPRmKfY4AqwIyjdyEZQbyCA')] bg-center bg-no-repeat bg-cover">
        <Image
          src={`/images/download (${image}).png`}
          width={700}
          height={700}
          alt="Dynamic Image"
          
        />
      </div>
    </div>
      </section>
      <section className="bg-[#101828] max-h-full w-full flex flex-col items-center justify-center relative">
  <Marquee className="absolute left-0 w-full min-h-[50vh]  max-h-[70vh]top-32 ">
    <div className="grid grid-cols-7 grid-rows-4 gap-x-4 gap-y-6 min-h-[50vh]  max-h-[70vh]">
      {photos.map((elem, index) => (
       <div className="w-56 h-56 " key={index}>
        <Image 
          key={index} 
          src={elem.urls.small} 
          width={300} 
          height={300} 
          alt={`Company logo ${index + 1}`} 
          className="object-cover aspect-square"
        />
        </div>
      ))}
    </div>
  </Marquee>

  <div className="relative h-[40vh] w-[30vw] bottom-52 flex flex-col justify-around p-6 rounded-md shadow-xl ite z-10 bg-[#101828]">
    <h1 className="mb-4 text-lg font-semibold">
      “It’s insane how I’m able to hop on Zoom calls with hundreds of experts that work at some seriously impressive companies!”
    </h1>
    <div className="flex items-center space-x-4">
      <Image 
        src="https://www.growthmentor.com/wp-content/uploads/2024/05/testimonial-photo.png" 
        alt="Jean-Patrick Bisson" 
        className="rounded-full" 
        height={50} 
        width={50} 
      />
      <div className="flex flex-col">
        <h2 className="font-semibold">Jean-Patrick Bisson</h2>
        <p className="text-sm text-gray-500">CEO & Founder at Geonode.com</p>
      </div>
    </div>
  </div>

</section>
<section className="bg-[#101828] max-h-full w-full flex flex-col items-center justify-center">

<h1 className="text-[7vh] font-semibold text-white ">Built for founders, marketers, <br/>and product people</h1>
<div className="grid grid-cols-3 "><div className="h-[50vh] w-60 bg-[#6536E7]"></div></div>
</section>
    </div>
  );
}