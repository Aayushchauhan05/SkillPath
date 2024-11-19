"use client";

import Marquee from "react-fast-marquee";
import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar from "./component/Navbar";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

export default function Home() {
  const [image, setImage] = useState(1);

  const feedbacks = [
    {
      name: "Alice Johnson",
      feedback: "Absolutely amazing service! I've learned so much from the mentors.",
      rating: 5,
    },
    {
      name: "Mark Lee",
      feedback: "Great platform to connect with industry experts. Highly recommend!",
      rating: 4.5,
    },
    {
      name: "Sophia Brown",
      feedback: "The mentorship sessions have been truly transformative for my career.",
      rating: 4,
    },
    {
      name: "James Carter",
      feedback: "An incredible resource for personal and professional growth!",
      rating: 4.8,
    },
  ];

  const imageUrls = [
    "/images/image1.jpg",
    "/images/image2.jpg",
    "/images/image3.jpg",
    "/images/image4.jpg",
    "/images/image5.jpg",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImage((prev) => (prev === 8 ? 1 : prev + 1));
    }, 1600);
    return () => clearInterval(intervalId);
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) stars.push(<BsStarFill key={i} className="text-yellow-500" />);
      else if (rating >= i - 0.5) stars.push(<BsStarHalf key={i} className="text-yellow-500" />);
      else stars.push(<BsStar key={i} className="text-gray-400" />);
    }
    return stars;
  };

  return (
    <div className="bg-gradient-to-tr from-[#101828] to-[#3C288A] text-white">
      <Navbar />

      {/* Main Section */}
      <section className="flex justify-around h-full w-full bg-gradient-to-b from-[#111a2b] via-[#3d269a] to-[#6938EF] pt-20">
        <div className="flex flex-col w-2/6 justify-around min-h-[100vh] ml-[-2vw]">
          <h1 className="text-6xl font-bold ">
            Grow your
            <br />
            skills with advice from mentors
          </h1>
          <p className="font-sans text-xl font-thin">
            Book unlimited 1:1 video calls with hundreds of different mentors for a single flat-rate subscription.
          </p>
          <div className="flex justify-evenly ml-[-3vw]">
            <button className="w-56 bg-[#6952c4] h-16 rounded-3xl">Explore Membership</button>
            <button className="w-56 h-16 border-2 border-white rounded-3xl">How it works</button>
          </div>
          <div className="flex justify-evenly ml-[-3vw] mt-6">
            <div className="flex flex-col h-14 ">
              <h1 className="text-xl font-bold">48000+</h1>
              <p className="text-gray-400">session booked</p>
            </div>
            <div className="flex flex-col h-14 ">
              <h1 className="text-xl font-bold">700+</h1>
              <p className="text-gray-400">vetted mentors</p>
            </div>
            <div className="flex flex-col h-14 ">
              <h1 className="text-xl font-bold">4.2/5</h1>
              <p className="text-gray-400">average session rating</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center h-screen">
          <div className="relative w-full p-10 bg-center bg-no-repeat bg-cover">
            <Image
              src={`/images/download (${image}).png`}
              width={700}
              height={700}
              alt="Dynamic Image"
            />
          </div>
        </div>
      </section>

      {/* Feedback Section with Marquee */}
      <section className="bg-[#101828] max-h-full w-full flex flex-col items-center justify-center py-20">
        <h1 className="mb-10 text-4xl font-semibold text-white">What Our Users Say</h1>
        <Marquee gradient={false} speed={50}>
          {feedbacks.map((feedback, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center bg-[#252f3d] text-white mx-5 p-6 rounded-lg shadow-lg min-w-[300px]"
            >
              <h2 className="mb-4 text-xl font-bold">{feedback.name}</h2>
              <p className="mb-4 text-center">{feedback.feedback}</p>
              <div className="flex">{renderStars(feedback.rating)}</div>
            </div>
          ))}
        </Marquee>
      </section>

      {/* Image Marquee */}
      {/* <section className="bg-[#3C288A] w-full py-10">
        <Marquee gradient={false} speed={60}>
          {imageUrls.map((url, index) => (
            <div
              key={index}
              className="mx-5 rounded-lg shadow-lg overflow-hidden min-w-[300px]"
            >
              <Image
                src={url}
                alt={`Marquee Image ${index + 1}`}
                width={300}
                height={200}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </Marquee>
      </section> */}

      {/* Footer Section */}
      <footer className="bg-[#111a2b] w-full py-10 text-gray-400">
        <div className="container grid grid-cols-1 gap-8 px-10 mx-auto sm:grid-cols-3">
          <div>
            <h2 className="mb-4 text-xl font-bold text-white">Company</h2>
            <ul>
              <li>About Us</li>
              <li>Careers</li>
              <li>Blog</li>
              <li>Press</li>
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-xl font-bold text-white">Support</h2>
            <ul>
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-xl font-bold text-white">Follow Us</h2>
            <div className="flex space-x-4">
              <FaFacebookF />
              <FaTwitter />
              <FaLinkedinIn />
              <FaInstagram />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
