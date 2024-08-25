"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  Bell,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ImagesSlider } from "../ui/images-slider";
import { motion } from "framer-motion";

const Landingpage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    { src: "/landingpage/gallery/g1.png", caption: "" },
    { src: "/landingpage/gallery/g2.png", caption: "" },
    { src: "/landingpage/gallery/g3.png", caption: "" },
    { src: "/landingpage/gallery/g4.png", caption: "" },
    { src: "/landingpage/gallery/g5.png", caption: "" },
    { src: "/landingpage/gallery/g6.png", caption: "" },
    { src: "/landingpage/gallery/g7.png", caption: "" },
    { src: "/landingpage/gallery/g8.png", caption: "" },
  ];

  const heroImages = [
    "/landingpage/hero1.png",
    "/landingpage/hero2.png",
    "/landingpage/hero3.png",
  ];

  const nextImage = () => setCurrentImage((currentImage + 1) % images.length);
  const prevImage = () =>
    setCurrentImage((currentImage - 1 + images.length) % images.length);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="pr-4 lg:px-6 h-14 md:h-16 flex items-center">
        <Link href="/" className="inline-block w-14 md:w-full">
          <Image
            alt="logo"
            src="/logo.png"
            width={1000}
            height={1000}
            priority
            className="min-w-14 md:w-16"
          />
        </Link>

        <nav className="ml-auto flex gap-4 sm:gap-6 text-xs sm:text-sm">
          <Link
            className="font-medium hover:underline underline-offset-4"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="font-medium hover:underline underline-offset-4"
            href="#advantages"
          >
            Advantages
          </Link>
          <Link
            className="font-medium hover:underline underline-offset-4"
            href="#testimonials"
          >
            Testimonials
          </Link>
          <Link
            className="font-medium hover:underline underline-offset-4"
            href="#gallery"
          >
            Gallery
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <ImagesSlider className="h-[40rem]" images={heroImages}>
          <motion.div
            initial={{
              opacity: 0,
              y: -80,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{ duration: 0.6 }}
            className="z-50 flex flex-col justify-center items-center"
          >
            <div className="flex flex-col items-center space-y-10 md:space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Streamline Hospital Appointments with HABMS
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                  Effortless scheduling, improved efficiency, and enhanced
                  patient satisfaction - all in one platform.
                </p>
              </div>
              <Link
                target="_blank"
                href={process.env.NEXT_PUBLIC_APP_URL + "/auth/signup"}
              >
                <Button className="bg-white text-[#9b045c] hover:bg-gray-100">
                  Sign Up
                </Button>
              </Link>
            </div>
          </motion.div>
        </ImagesSlider>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Clock className="w-12 h-12 text-[#9b045c] mb-4" />
                  <CardTitle>24/7 Appointment Booking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Allow patients to book appointments anytime, reducing
                    administrative workload and improving accessibility.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Calendar className="w-12 h-12 text-[#9b045c] mb-4" />
                  <CardTitle>Real-time Schedule Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Instantly update and sync schedules across the system,
                    preventing double bookings and optimizing time slots.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Bell className="w-12 h-12 text-[#9b045c] mb-4" />
                  <CardTitle>Automated Reminders</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Send timely notifications to patients, reducing no-shows and
                    improving overall appointment adherence.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section
          id="advantages"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Advantages of HABMS
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <li className="flex items-start space-x-4">
                <Shield className="w-6 h-6 text-[#9b045c] mt-1" />
                <div>
                  <h3 className="font-bold">Improved Operational Efficiency</h3>
                  <p>
                    Streamline your appointment process and reduce
                    administrative overhead.
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <Shield className="w-6 h-6 text-[#9b045c] mt-1" />
                <div>
                  <h3 className="font-bold">Enhanced Patient Experience</h3>
                  <p>
                    Provide a seamless booking experience and reduce wait times.
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <Shield className="w-6 h-6 text-[#9b045c] mt-1" />
                <div>
                  <h3 className="font-bold">Better Resource Utilization</h3>
                  <p>
                    Optimize staff and facility schedules to maximize
                    productivity.
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <Shield className="w-6 h-6 text-[#9b045c] mt-1" />
                <div>
                  <h3 className="font-bold">Secure Data Management</h3>
                  <p>
                    Ensure patient information is protected with robust security
                    measures.
                  </p>
                </div>
              </li>
            </ul>
            <div className="text-center">
              <Link
                target="_blank"
                href={process.env.NEXT_PUBLIC_APP_URL + "/auth/signup"}
              >
                <Button className="bg-[#9b045c] text-white hover:bg-[#7d0349]">
                  Sign Up Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              What Our Users Say
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <Image
                src="/placeholder.svg?height=200&width=200"
                alt="Dr. Jane Smith"
                width={200}
                height={200}
                className="rounded-full"
              />
              <blockquote className="italic text-xl">
                HABMS is set to transformed the way we manage appointments.
                We&apos;ve could should see dramatic reduction in no-shows, and
                that will enable me to devote more time to actually caring for
                my patients
                <footer className="text-right mt-2">
                  <cite className="not-italic font-bold">
                    - Dr. Sylvia Fafali K., Physician Assistant
                  </cite>
                </footer>
              </blockquote>
            </div>
          </div>
        </section>
        <section
          id="gallery"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Gallery
            </h2>
            <div className="relative">
              <Image
                src={images[currentImage].src}
                alt={images[currentImage].caption}
                width={1000}
                height={1000}
                className="mx-auto rounded-lg shadow-lg"
              />
              <p className="text-center mt-4">{images[currentImage].caption}</p>
              <Button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-[#9b045c] hover:bg-gray-100"
                onClick={prevImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-[#9b045c] hover:bg-gray-100"
                onClick={nextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#9b045c]">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white mb-4">
              Ready to Transform Your Appointment Management?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Join HABMS today and experience the difference.
            </p>
            <Link
              target="_blank"
              href={process.env.NEXT_PUBLIC_APP_URL + "/auth/signup"}
            >
              <Button className="bg-white text-[#9b045c] hover:bg-gray-100">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <footer className="py-6 bg-[#9b045c]">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white">
            <div className="text-center md:text-left">
              <p>
                &copy; {new Date().getFullYear()} HABMS. All rights reserved.
              </p>
            </div>
            <nav className="flex gap-4">
              <Link className="hover:underline" href="#">
                Privacy Policy
              </Link>
              <Link className="hover:underline" href="#">
                Terms of Service
              </Link>
              <Link
                className="hover:underline"
                href="mailto:destinydinam1@gmail.com"
              >
                Contact Us
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landingpage;
