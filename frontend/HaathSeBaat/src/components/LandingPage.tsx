"use client"
import React from "react"
import PropTypes from "prop-types"
import CallToAction from "./CallToAction"
import Features from "./features"
import Footer from "./footer"
import HeroSection from "./Hero-Section"
import Navbar from "./Navbar"
import SignOfTheDay from "./SignOfDay"
import Testimonials from "./testimonials"
import AboutUs from "./AboutUs"

// import Navbar from "@/components/navbar"
// import HeroSection from "@/components/hero-section"
// import SignOfTheDay from "@/components/sign-of-the-day"
// import Features from "@/components/features"
// import Testimonials from "@/components/testimonials"
// import CallToAction from "@/components/call-to-action"
// import Footer from "./components/footer"

const socialLinks = [
  {
    label: "Instagram",
    url: "https://www.instagram.com/petofyindia/",
    icon: "https://example.com/instagram-icn.svg",
    external: true,
  },
  {
    label: "Twitter",
    url: "https://x.com/petofyindia",
    icon: "https://example.com/twitter-icon.svg",
    external: true,
  },
];

const aboutLinks = [
  { label: "Our Mission", url: "/mission", external: false },
  { label: "Careers", url: "/careers", external: false },
  { label: "Privacy Policy", url: "/privacy", external: false },
];

const contactLinks = [
  { label: "Contact Support", url: "/support", external: false },
  { label: "Email Us", url: "mailto:support@pawfect.com", external: true },
  { label: "Location", url: "/location", external: false },
];

function LandingPage() {
  return (
    <div className="bg-gradient-to-b from-success to-primary">
      {/* <Navbar />
      <HeroSection />
      <SignOfTheDay />
      <Features />
      <Testimonials />
      <CallToAction />
      <Footer /> */}
      <Navbar></Navbar>
      <HeroSection></HeroSection>
      <SignOfTheDay></SignOfTheDay>
      <Features></Features>
      <Testimonials></Testimonials>
      <CallToAction></CallToAction>
      <Footer links={socialLinks} aboutLinks={aboutLinks} contactLinks={contactLinks} tagline="We are tagging you par kyu ??" title="HaathSeBaat"></Footer>
    </div>
  )
}

export default LandingPage