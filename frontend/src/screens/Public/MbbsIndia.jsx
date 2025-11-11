import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Typography, IconButton, useTheme, Card, CardContent, CardHeader, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AboutImage from "../../assets/AboutImage.png";
import image from "../../assets/india-banners/mbbs-banner.jpg"
import poster from "../../assets/india-banners/Untitled-design (2).webp"
import { useCountryAllFetchMutation, useFetchBlogMutation } from '../../slices/adminApiSlice';
import { useInView } from 'react-intersection-observer';

import { FetchBlogs } from '../../slices/blogSlice';
const faq = [
  {
    question: 'Is MBBS in India provides medical education of good quality?',
    answer: 'Yes, medical colleges in India are known for offering world-class education.',
  },
  {
    question: 'Which is the Indian medical college that is at the top preference for students?',
    answer: 'AIIMS (All India Institute for Medical Sciences) is considered one of the top-notch medical colleges in India.',
  },
  {
    question: 'Is MBBS in India cheap or expensive?',
    answer: 'Govt medical colleges in India provide low-cost and economical MBBS. However, private colleges are expensive.',
  },
  {
    question: 'Is the NEET exam challenging for students to qualify?',
    answer: 'It usually depends on the student’s ability and his/her hard work and concentration towards studying for the NEET exam.',
  },
  {
    question: 'Is it possible to get admission in India without getting a good Score in NEET?',
    answer: 'Students can approach the private colleges in India if they cannot score well in NEET.',
  },
  {
    question: 'Is it possible to practice in India after completing MBBS from abroad?',
    answer: 'Yes, the candidate has to clear the Exit test before practicing in India.',
  },
];
// Sample data for recent blogs
const blogs = [
  {
    title: "Blog Post 1",
    description: "Summary of blog post 1.",
    link: "#"
  },
  {
    title: "Blog Post 2",
    description: "Summary of blog post 2.",
    link: "#"
  },
  {
    title: "Blog Post 3",
    description: "Summary of blog post 3.",
    link: "#"
  },
];

const MbbsIndia = () => {
  const [expanded, setExpanded] = React.useState(null);
  const [bookmarks, setBookmarks] = React.useState({});
  const theme = useTheme();

  const [FetchBlog] = useFetchBlogMutation();
  const [refBanner, inViewBanner] = useInView({ triggerOnce: true });

  const [blog, setblog] = useState()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FetchBlog().unwrap(); // assuming this is an API call that returns { data: [...] }

        console.log(response, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

        // dispatch(FetchBlogs(response.data)); // Dispatching the blog data to Redux or context
        setblog(response); // Setting it in local state
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, []);
  const getTruncatedContent = (text, maxChars = 50) => {
    if (!text) return '';
    return text.length > maxChars ? text.substring(0, maxChars) + '...' : text;
  };

  React.useEffect(() => {
    setExpanded(0);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const handleBookmark = (section) => {
    setBookmarks((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleExpansion = (section) => {
    setExpanded(expanded === section ? null : section);
  };

  const sections = [

    {
      title: "SEAT MATRIX",
      content: (
        <div className="overflow-x-auto mt-4 rounded-lg shadow-lg">
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 border-gray-300 p-2 text-white text-left bg-gold-main">State or Union Territory</th>
                <th className="border-b-2 border-gray-300 p-2 text-white text-left bg-gold-main">Government Colleges</th>
                <th className="border-b-2 border-gray-300 p-2 text-left text-white bg-gold-main">Government Seats</th>
                <th className="border-b-2 border-gray-300 p-2 text-left text-white bg-gold-main">Private Colleges</th>
                <th className="border-b-2 border-gray-300 p-2 text-left text-white bg-gold-main">Private Seats</th>
                <th className="border-b-2 border-gray-300 p-2 text-left text-white bg-gold-main">Total Colleges</th>
                <th className="border-b-2 border-gray-300 p-2 text-left text-white bg-gold-main">Total Number of Seats</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-blue-50 transition-colors duration-200">
                <td className="border-b border-gray-300 p-2">Andaman and Nicobar Islands</td>
                <td className="border-b border-gray-300 p-2">1</td>
                <td className="border-b border-gray-300 p-2">100</td>
                <td className="border-b border-gray-300 p-2">0</td>
                <td className="border-b border-gray-300 p-2">0</td>
                <td className="border-b border-gray-300 p-2">1</td>
                <td className="border-b border-gray-300 p-2">100</td>
              </tr>

              <tr className="hover:bg-blue-50 transition-colors duration-200">
                <td className="border-b border-gray-300 p-2">Andhra Pradesh</td>
                <td className="border-b border-gray-300 p-2">13</td>
                <td className="border-b border-gray-300 p-2">2485</td>
                <td className="border-b border-gray-300 p-2">18</td>
                <td className="border-b border-gray-300 p-2">2850</td>
                <td className="border-b border-gray-300 p-2">31</td>
                <td className="border-b border-gray-300 p-2">5335</td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors duration-200">
                <td className="border-b border-gray-300 p-2">Arunachal Pradesh</td>
                <td className="border-b border-gray-300 p-2">1</td>
                <td className="border-b border-gray-300 p-2">50</td>
                <td className="border-b border-gray-300 p-2">0</td>
                <td className="border-b border-gray-300 p-2">0</td>
                <td className="border-b border-gray-300 p-2">1</td>
                <td className="border-b border-gray-300 p-2">50</td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors duration-200">
                <td className="border-b border-gray-300 p-2">Assam</td>
                <td className="border-b border-gray-300 p-2">9</td>
                <td className="border-b border-gray-300 p-2">1150</td>
                <td className="border-b border-gray-300 p-2">0</td>
                <td className="border-b border-gray-300 p-2">0</td>
                <td className="border-b border-gray-300 p-2">9</td>
                <td className="border-b border-gray-300 p-2">1150</td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors duration-200">
                <td className="border-b border-gray-300 p-2">Bihar</td>
                <td className="border-b border-gray-300 p-2">12</td>
                <td className="border-b border-gray-300 p-2">1515</td>
                <td className="border-b border-gray-300 p-2">8</td>
                <td className="border-b border-gray-300 p-2">900</td>
                <td className="border-b border-gray-300 p-2">20</td>
                <td className="border-b border-gray-300 p-2">2415</td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors duration-200">
                <td className="border-b border-gray-300 p-2">Chandigarh</td>
                <td className="border-b border-gray-300 p-2">1</td>
                <td className="border-b border-gray-300 p-2">150</td>
                <td className="border-b border-gray-300 p-2">0</td>
                <td className="border-b border-gray-300 p-2">0</td>
                <td className="border-b border-gray-300 p-2">1</td>
                <td className="border-b border-gray-300 p-2">150</td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors duration-200">
                <td className="border-b border-gray-300 p-2">Chhattisgarh</td>
                <td className="border-b border-gray-300 p-2">8</td>
                <td className="border-b border-gray-300 p-2">965</td>
                <td className="border-b border-gray-300 p-2">4</td>
                <td className="border-b border-gray-300 p-2">600</td>
                <td className="border-b border-gray-300 p-2">12</td>
                <td className="border-b border-gray-300 p-2">1565</td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors duration-200">
                <td className="border-b border-gray-300 p-2">Dadra and Nagar Haveli</td>
                <td className="border-b border-gray-300 p-2">1</td>
                <td className="border-b border-gray-300 p-2">150</td>
                <td className="border-b border-gray-300 p-2">0</td>
                <td className="border-b border-gray-300 p-2">0</td>
                <td className="border-b border-gray-300 p-2">1</td>
                <td className="border-b border-gray-300 p-2">150</td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors duration-200">
                <td className="border-b border-gray-300 p-2">Delhi</td>
                <td className="border-b border-gray-300 p-2">8</td>
                <td className="border-b border-gray-300 p-2">1247</td>
                <td className="border-b border-gray-300 p-2">2</td>
                <td className="border-b border-gray-300 p-2">250</td>
                <td className="border-b border-gray-300 p-2">10</td>
                <td className="border-b border-gray-300 p-2">1497</td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors duration-200">
                <td className="border-b border-gray-300 p-2">Goa</td>
                <td className="border-b border-gray-300 p-2">1</td>
                <td className="border-b border-gray-300 p-2">180</td>
                <td className="border-b border-gray-300 p-2">0</td>
                <td className="border-b border-gray-300 p-2">0</td>
                <td className="border-b border-gray-300 p-2">1</td>
                <td className="border-b border-gray-300 p-2">180</td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors duration-200">
                <td className="border-b border-gray-300 p-2">Gujarat</td>
                <td className="border-b border-gray-300 p-2">18</td>
                <td className="border-b border-gray-300 p-2">3700</td>
                <td className="border-b border-gray-300 p-2">11</td>
                <td className="border-b border-gray-300 p-2">1940</td>
                <td className="border-b border-gray-300 p-2">29</td>
                <td className="border-b border-gray-300 p-2">5640</td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors duration-200">
                <td className="border-b border-gray-300 p-2">Haryana</td>
                <td className="border-b border-gray-300 p-2">7</td>
                <td className="border-b border-gray-300 p-2">1407</td>
                <td className="border-b border-gray-300 p-2">10</td>
                <td className="border-b border-gray-300 p-2">1175</td>
                <td className="border-b border-gray-300 p-2">17</td>
                <td className="border-b border-gray-300 p-2">2582</td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors duration-200">
                <td className="border-b border-gray-300 p-2">Himachal Pradesh</td>
                <td className="border-b border-gray-300 p-2">5</td>
                <td className="border-b border-gray-300 p-2">425</td>
                <td className="border-b border-gray-300 p-2">3</td>
                <td className="border-b border-gray-300 p-2">690</td>
                <td className="border-b border-gray-300 p-2">8</td>
                <td className="border-b border-gray-300 p-2">1115</td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors duration-200">
                <td className="border-b border-gray-300 p-2">Jammu and Kashmir</td>
                <td className="border-b border-gray-300 p-2">4</td>
                <td className="border-b border-gray-300 p-2">475</td>
                <td className="border-b border-gray-300 p-2">2</td>
                <td className="border-b border-gray-300 p-2">150</td>
                <td className="border-b border-gray-300 p-2">6</td>
                <td className="border-b border-gray-300 p-2">625</td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors duration-200">
                <td className="border-b border-gray-300 p-2">Jharkhand</td>
                <td className="border-b border-gray-300 p-2">7</td>
                <td className="border-b border-gray-300 p-2">940</td>
                <td className="border-b border-gray-300 p-2">4</td>
                <td className="border-b border-gray-300 p-2">500</td>
                <td className="border-b border-gray-300 p-2">11</td>
                <td className="border-b border-gray-300 p-2">1440</td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors duration-200">
                <td className="border-b border-gray-300 p-2">Karnataka</td>
                <td className="border-b border-gray-300 p-2">18</td>
                <td className="border-b border-gray-300 p-2">3470</td>
                <td className="border-b border-gray-300 p-2">14</td>
                <td className="border-b border-gray-300 p-2">3050</td>
                <td className="border-b border-gray-300 p-2">32</td>
                <td className="border-b border-gray-300 p-2">6520</td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors duration-200">
                <td className="border-b border-gray-300 p-2">Kerala</td>
                <td className="border-b border-gray-300 p-2">14</td>
                <td className="border-b border-gray-300 p-2">2500</td>
                <td className="border-b border-gray-300 p-2">6</td>
                <td className="border-b border-gray-300 p-2">1050</td>
                <td className="border-b border-gray-300 p-2">20</td>
                <td className="border-b border-gray-300 p-2">3550</td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors duration-200">
                <td className="border-b border-gray-300 p-2">Ladakh</td>
                <td className="border-b border-gray-300 p-2">1</td>
                <td className="border-b border-gray-300 p-2">65</td>
                <td className="border-b border-gray-300 p-2">0</td>
                <td className="border-b border-gray-300 p-2">0</td>
                <td className="border-b border-gray-300 p-2">1</td>
                <td className="border-b border-gray-300 p-2">65</td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors duration-200">
                <td className="border-b border-gray-300 p-2">Lakshadweep</td>
                <td className="border-b border-gray-300 p-2">1</td>
                <td className="border-b border-gray-300 p-2">50</td>
                <td className="border-b border-gray-300 p-2">0</td>
                <td className="border-b border-gray-300 p-2">0</td>
                <td className="border-b border-gray-300 p-2">1</td>
                <td className="border-b border-gray-300 p-2">50</td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors duration-200">
                <td className="border-b border-gray-300 p-2">Ladakh</td>
                <td className="border-b border-gray-300 p-2">1</td>
                <td className="border-b border-gray-300 p-2">65</td>
                <td className="border-b border-gray-300 p-2">0</td>
                <td className="border-b border-gray-300 p-2">0</td>
                <td className="border-b border-gray-300 p-2">1</td>
                <td className="border-b border-gray-300 p-2">65</td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors duration-200">
                <td className="border-b border-gray-300 p-2">Madhya Pradesh</td>
                <td className="border-b border-gray-300 p-2">16</td>
                <td className="border-b border-gray-300 p-2">2495</td>
                <td className="border-b border-gray-300 p-2">7</td>
                <td className="border-b border-gray-300 p-2">1230</td>
                <td className="border-b border-gray-300 p-2">23</td>
                <td className="border-b border-gray-300 p-2">3725</td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors duration-200">
                <td className="border-b border-gray-300 p-2">Maharashtra</td>
                <td className="border-b border-gray-300 p-2">16</td>
                <td className="border-b border-gray-300 p-2">3300</td>
                <td className="border-b border-gray-300 p-2">11</td>
                <td className="border-b border-gray-300 p-2">2280</td>
                <td className="border-b border-gray-300 p-2">27</td>
                <td className="border-b border-gray-300 p-2">5580</td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors duration-200">
                <td className="border-b border-gray-300 p-2">Manipur</td>
                <td className="border-b border-gray-300 p-2">2</td>
                <td className="border-b border-gray-300 p-2">145</td>
                <td className="border-b border-gray-300 p-2">2</td>
                <td className="border-b border-gray-300 p-2">190</td>
                <td className="border-b border-gray-300 p-2">4</td>
                <td className="border-b border-gray-300 p-2">335</td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors duration-200">
                <td className="border-b border-gray-300 p-2">Meghalaya</td>
                <td className="border-b border-gray-300 p-2">5</td>
                <td className="border-b border-gray-300 p-2">640</td>
                <td className="border-b border-gray-300 p-2">2</td>
                <td className="border-b border-gray-300 p-2">130</td>
                <td className="border-b border-gray-300 p-2">7</td>
                <td className="border-b border-gray-300 p-2">770</td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors duration-200">
                <td className="border-b border-gray-300 p-2">Mizoram</td>
                <td className="border-b border-gray-300 p-2">2</td>
                <td className="border-b border-gray-300 p-2">185</td>
                <td className="border-b border-gray-300 p-2">2</td>
                <td className="border-b border-gray-300 p-2">440</td>
                <td className="border-b border-gray-300 p-2">4</td>
                <td className="border-b border-gray-300 p-2">625</td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors duration-200">
                <td className="border-b border-gray-300 p-2">Nagaland</td>
                <td className="border-b border-gray-300 p-2">2</td>
                <td className="border-b border-gray-300 p-2">185</td>
                <td className="border-b border-gray-300 p-2">2</td>
                <td className="border-b border-gray-300 p-2">440</td>
                <td className="border-b border-gray-300 p-2">4</td>
                <td className="border-b border-gray-300 p-2">625</td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors duration-200">
                <td className="border-b border-gray-300 p-2">Odisha</td>
                <td className="border-b border-gray-300 p-2">6</td>
                <td className="border-b border-gray-300 p-2">825</td>
                <td className="border-b border-gray-300 p-2">2</td>
                <td className="border-b border-gray-300 p-2">340</td>
                <td className="border-b border-gray-300 p-2">8</td>
                <td className="border-b border-gray-300 p-2">1165</td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors duration-200">
                <td className="border-b border-gray-300 p-2">Puducherry</td>
                <td className="border-b border-gray-300 p-2">3</td>
                <td className="border-b border-gray-300 p-2">480</td>
                <td className="border-b border-gray-300 p-2">0</td>
                <td className="border-b border-gray-300 p-2">0</td>
                <td className="border-b border-gray-300 p-2">3</td>
                <td className="border-b border-gray-300 p-2">480</td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors duration-200">
                <td className="border-b border-gray-300 p-2">Punjab</td>
                <td className="border-b border-gray-300 p-2">8</td>
                <td className="border-b border-gray-300 p-2">1235</td>
                <td className="border-b border-gray-300 p-2">8</td>
                <td className="border-b border-gray-300 p-2">1030</td>
                <td className="border-b border-gray-300 p-2">16</td>
                <td className="border-b border-gray-300 p-2">2265</td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors duration-200">
                <td className="border-b border-gray-300 p-2">Rajasthan</td>
                <td className="border-b border-gray-300 p-2">22</td>
                <td className="border-b border-gray-300 p-2">4385</td>
                <td className="border-b border-gray-300 p-2">7</td>
                <td className="border-b border-gray-300 p-2">925</td>
                <td className="border-b border-gray-300 p-2">29</td>
                <td className="border-b border-gray-300 p-2">5310</td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors duration-200">
                <td className="border-b border-gray-300 p-2">Sikkim</td>
                <td className="border-b border-gray-300 p-2">3</td>
                <td className="border-b border-gray-300 p-2">185</td>
                <td className="border-b border-gray-300 p-2">1</td>
                <td className="border-b border-gray-300 p-2">115</td>
                <td className="border-b border-gray-300 p-2">4</td>
                <td className="border-b border-gray-300 p-2">300</td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors duration-200">
                <td className="border-b border-gray-300 p-2">Tamil Nadu</td>
                <td className="border-b border-gray-300 p-2">21</td>
                <td className="border-b border-gray-300 p-2">4100</td>
                <td className="border-b border-gray-300 p-2">8</td>
                <td className="border-b border-gray-300 p-2">1610</td>
                <td className="border-b border-gray-300 p-2">29</td>
                <td className="border-b border-gray-300 p-2">5710</td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors duration-200">
                <td className="border-b border-gray-300 p-2">Telangana</td>
                <td className="border-b border-gray-300 p-2">5</td>
                <td className="border-b border-gray-300 p-2">1045</td>
                <td className="border-b border-gray-300 p-2">6</td>
                <td className="border-b border-gray-300 p-2">1420</td>
                <td className="border-b border-gray-300 p-2">11</td>
                <td className="border-b border-gray-300 p-2">2465</td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors duration-200">
                <td className="border-b border-gray-300 p-2">Tripura</td>
                <td className="border-b border-gray-300 p-2">2</td>
                <td className="border-b border-gray-300 p-2">260</td>
                <td className="border-b border-gray-300 p-2">2</td>
                <td className="border-b border-gray-300 p-2">490</td>
                <td className="border-b border-gray-300 p-2">4</td>
                <td className="border-b border-gray-300 p-2">750</td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors duration-200">
                <td className="border-b border-gray-300 p-2">Uttar Pradesh</td>
                <td className="border-b border-gray-300 p-2">35</td>
                <td className="border-b border-gray-300 p-2">5900</td>
                <td className="border-b border-gray-300 p-2">23</td>
                <td className="border-b border-gray-300 p-2">4300</td>
                <td className="border-b border-gray-300 p-2">58</td>
                <td className="border-b border-gray-300 p-2">10200</td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors duration-200">
                <td className="border-b border-gray-300 p-2">Uttarakhand</td>
                <td className="border-b border-gray-300 p-2">8</td>
                <td className="border-b border-gray-300 p-2">1470</td>
                <td className="border-b border-gray-300 p-2">4</td>
                <td className="border-b border-gray-300 p-2">620</td>
                <td className="border-b border-gray-300 p-2">12</td>
                <td className="border-b border-gray-300 p-2">2090</td>
              </tr>
              <tr className="hover:bg-gold-50 transition-colors duration-200">
                <td className="border-b border-gray-300 p-2">West Bengal</td>
                <td className="border-b border-gray-300 p-2">15</td>
                <td className="border-b border-gray-300 p-2">2330</td>
                <td className="border-b border-gray-300 p-2">8</td>
                <td className="border-b border-gray-300 p-2">1220</td>
                <td className="border-b border-gray-300 p-2">23</td>
                <td className="border-b border-gray-300 p-2">3550</td>
              </tr>


            </tbody>
          </table>
        </div>
      )
    },
    {
      title: "MBBS in India at a Glance",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 ">
          <Card
            className="bg-yellow-100 border border-yellow-300 rounded-lg
                     transform transition-transform duration-300 hover:scale-105 
                     animate-fadeIn"
          >
            <CardHeader
              title="Key Information"
              className="bg-yellow-400 text-yellow-900 font-semibold text-xl rounded-t-lg p-4
                       transition-shadow duration-300 cursor-default"
            />
            <CardContent className="p-6">
              <ul className="list-disc pl-6 space-y-3 text-yellow-900 text-base leading-relaxed">
                {[
                  "Intake: September",
                  "Minimum Percentage: 60% in PCB for General, 40% for SC/ST and Reserve Categories",
                  "NEET: Yes With Qualifying Marks",
                  "IELTS / TOEFL: Not Required",
                  "Processing Time: 45-60 Days",
                  "Lowest Fees: 4,00,000 INR Per Year (Pvt. Colleges)",
                  "Maximum Fees: 15,00,000 INR Per Year (Pvt. Colleges)",
                  "Living Cost: 7500 INR Per Month",
                  "Duration: 4.5 Years",
                  "Medium: English, Hindi and Regional",
                  "Top Universities: All Government University",
                  "Recognition: NMC and WHO approved",
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="hover:animate-bounce cursor-pointer transition-transform duration-300"
                  >
                    <strong>{item.split(":")[0]}:</strong>{item.split(":").slice(1).join(":")}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card
            className="bg-blue-100 border border-blue-300 rounded-lg shadow-md
                     transform transition-transform duration-300 hover:scale-105 hover:shadow-xl
                     animate-fadeIn"
          >
            <CardHeader
              title="Eligibility Criteria"
              className="bg-blue-400 text-blue-900 font-semibold text-xl rounded-t-lg p-4
                       transition-shadow duration-300 cursor-default"
            />
            <CardContent className="p-6">
              <ol className="list-decimal pl-6 space-y-3 text-blue-900 text-base leading-relaxed">
                {[
                  "The candidate must be of 17 years of age at the time of MBBS admission in India.",
                  "The candidate must not exceed the age of 25 years.",
                  "The medical candidate needs to score 50% marks in 12th grade for general category students. Reserved category candidates must achieve a minimum of 40%.",
                  "A medical candidate must have the primary subjects in 12th grade should be Physics, Chemistry, and Biology.",
                  "To get admission to India Medical College, students need to clear the NEET entrance test with a good score.",
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="hover:animate-bounce cursor-pointer transition-transform duration-300"
                  >
                    {item}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>

      ),
    },
    {
      title: 'Recognition of Indian Medical Universities',
      content: (
        <ul className="list-decimal list-inside space-y-3  text-gray-800 text-2xl ">
          <li className="flex items-center gap-3 hover:text-gold-main transition-colors duration-300 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-500 mt-1  flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4 -4" />
            </svg>
            National Medical Commission (NMC)
          </li>
          <li className="flex items-center gap-3 hover:text-gold-main transition-colors duration-300 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-500 mt-1  flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4 -4" />
            </svg>
            World Health Organization (WHO)
          </li>
          <li className="flex items-center gap-3 hover:text-gold-main transition-colors duration-300 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-500 mt-1  flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4 -4" />
            </svg>
            United Nations Educational, Scientific and Cultural Organization (UNESCO)
          </li>
        </ul>
      ),
    },
    {
      title: 'Documents Required for MBBS in India',
      content: (
        <ul className="list-none pl-0 space-y-3 text-gray-800 text-base sm:text-2xl ">
          {[
            'Valid mark sheets of class 10th and 12th',
            'NEET scorecard',
            'School transfer certificate, code of conduct certificate, medical certificate, health check-up certificate, and no criminal record certificate',
            'Passport and passport-size photocopies',
            'Caste certificate (if applicable)',
            'Parents’ bank statement showing ability to pay fees',
          ].map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 hover:text-gold-main transition-colors duration-300"
            >

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-500 mt-1  flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4 -4" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Process of Admission for MBBS in India',
      content: (
        <ul className="list-none pl-0 space-y-3 text-gray-800 text-base sm:text-2xl    ">
          {[
            'Complete Class XII with Physics, Chemistry, and Biology',
            'Qualify NEET for MBBS admission',
            'Appear for counseling',
            'Other exams like AIIMS and JIPMER may also be required',
            'Entrance exams for AIIMS',
          ].map((step, index) => (
            <li
              key={index}
              className="flex items-start gap-3 hover:text-gold-main transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-500 mt-1  flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4 -4" />
              </svg>
              <span>{step}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Imperative Dates for MBBS in India',
      content: (
        <ul className="list-none pl-0 space-y-3 text-gray-800 text-base sm:text-2xl ">
          {[
            'NEET Entrance Test: National Eligibility cum Entrance Test',
            'AIIMS Entrance Test: Entrance exam for All India Institute of Medical Sciences',
            'JIPMER Entrance Test: Jawaharlal Institute of PG Medical Education and Research',
            'Application period: June and July',
            'Academic year starts in September or October',
          ].map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 hover:text-gold-main transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5  text-green-500  mt-1 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4 -4" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ),
    }
    ,
    {
      title: 'Advantages of MBBS in India',
      content: (
        <ul className="list-none pl-0 space-y-3 text-gray-800 text-base sm:text-2xl ">
          {[
            'India ranks among top medical education facilities worldwide',
            'Exposure to tropical and rare diseases',
            'Real-life experience during internships',
            'State-funded medical universities in every state',
            'Indian MBBS degree accepted globally',
            'No requirement for IELTS or TOEFL',
            'Increasing demand for doctors in India',
            'Access to modern medical technologies',
            'Excellent postgraduate and specialization opportunities',
          ].map((advantage, index) => (
            <li
              key={index}
              className="flex items-start gap-3 hover:text-gold-main transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-500 mt-1  flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4 -4" />
              </svg>
              <span>{advantage}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Teaching Methodology Adopted for MBBS in India',
      content: (
        <ul className="list-none pl-0 space-y-3 text-gray-800 text-base sm:text-2xl ">
          {[
            'Academic year begins in September',
            'English is the medium of instruction',
            'Local languages are also used; Hindi is commonly known',
            'NMC lists medical colleges offering English-medium education',
          ].map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 hover:text-gold-main transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-500 mt-1  flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4 -4" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Disadvantages of MBBS in India',
      content: (
        <ul className="list-none pl-0 space-y-3 text-gray-800 text-base sm:text-2xl ">
          {[
            'Limited seats in government colleges; excellent NEET results required',
            'Limited global exposure',
            'Mandatory entrance exams; difficulty if not cleared',
            'High fees in private medical colleges',
            'Additional donations or capitation fees in private colleges',
            'Limited opportunity to explore new cultures or languages',
            'Infrastructure in Indian universities may be less compared to abroad',
            'High demand and limited seats in government medical colleges',
          ].map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 hover:text-gold-main transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 text-green-500 mt-2 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ),
    }
    ,
    {
      title: 'Economical MBBS in India',
      content: (
        <ul className="list-none pl-0 space-y-3 text-gray-800 text-base sm:text-2xl ">
          {[
            'Economical if NEET is cleared; private college fees range from 50 to 60 lakhs',
            'Abroad universities may offer more economical options',
            'Fees structure may vary for NRI students',
            'Contact Indian Embassy for detailed information',
            'Insurance costs: 5,000 to 15,000 INR/year',
            'Medical check-up: 20,000 to 30,000 INR/year',
            'Food expenses: 10,000 to 20,000 INR/year',
            'Hostel fees: 70,000 to 1,00,000 INR/year',
          ].map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 hover:text-gold-main transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-500 mt-1  flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4 -4" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ),
    }
    ,
    {
      title: 'Syllabus for MBBS in India',
      content: (
        <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-200 text-left text-gray-700 text-sm sm:text-base">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-4 py-3 font-semibold">Year</th>
                <th className="px-4 py-3 font-semibold">Semesters</th>
                <th className="px-4 py-3 font-semibold">Subjects Covered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-blue-50 transition duration-300">
                <td className="px-4 py-3 font-semibold">Phase I</td>
                <td className="px-4 py-3 ">1ST – 2ND Semester</td>
                <td className="px-4 py-3">
                  Pre-Clinical Subjects – Human Anatomy, Biochemistry, Physiology, Bio-Physics, Introduction to Community Medicine, Humanities
                </td>
              </tr>
              <tr className="hover:bg-blue-50 transition duration-300">
                <td className="px-4 py-3 font-semibold">Phase II</td>
                <td className="px-4 py-3">3rd, 4th & 5th Semester</td>
                <td className="px-4 py-3">
                  Para-clinical and Clinical subjects – Community Medicine, Forensic Medicine, Clinical postings in wards, OPDs, Pathology, Pharmacology, Microbiology
                </td>
              </tr>
              <tr className="hover:bg-blue-50 transition duration-300">
                <td className="px-4 py-3 font-semibold">Phase III</td>
                <td className="px-4 py-3">6th – 9th Semester</td>
                <td className="px-4 py-3">
                  Continuation of clinical subjects – Community Medicine, Obstetrics and Gynaecology, Medicine and Allied subjects (Psychiatry, Dermatology), Surgery and Allied subjects (Anesthesiology, ENT, Ophthalmology, Orthopedics), Paediatrics, Clinical Postings
                </td>
              </tr>
              <tr className="hover:bg-blue-50 transition duration-300">
                <td className="px-4 py-3 font-semibold">Internship</td>
                <td className="px-4 py-3">—</td>
                <td className="px-4 py-3">
                  Community Medicine, Surgery including Orthopaedics, Medicine, Welfare Planning, Paediatrics, Obstetrics/Gynaecology including Family, Ophthalmology, Otorhinolaryngology, Casualty
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    }

  ];

  return (
    <div className=" mx-auto ">
    
        <motion.div
          ref={refBanner}
          initial={{ opacity: 0 }}
          animate={inViewBanner ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <div className="w-full h-[200px] sm:h-[100%] md:h-[100%] lg:h-[100%] overflow-hidden">
            <img
              src={image}
              alt="Country Banner"
              className="w-full h-full object-cover object-center"
            />
          </div>


        </motion.div>


      {/* Expandable Sections */}
      <div className="flex flex-col md:flex-row mx-auto space-y-6 md:space-x-6 md:space-y-0">
        <section className="mt-5 w-full w-2/3">
          <div className="mt-12">
            <img className="shadow-lg w-[1300px] ml-2 " src={poster} alt="" />
          </div>
          <div className="mb-10 flex items-center justify-center">

            <div>
              <h1 className="pl-4 text-5xl text-gold-main font-semibold mt-12"> <span className="text-blue-main">MBBS In</span> India</h1>
              {/* <CardHeader
                title="MBBS in India?"
                subheader="UG Counselling Seat Quota Distribution by MCC or DGHS"
                className="text-blue-main text-center"
              /> */}
              <CardContent>
                <p className="text-gray-700 text-2xl">
                  MBBS in India is one of the highly preferred courses by medical aspirants worldwide. The strong education structure, sincere professors, and top-hole medical universities in India are paving the way for success. To secure admission for MBBS courses in India, the aspirants are required to appear in NEET. A healthy and peaceful environment in India helps the students to acquire knowledge more quickly. MBBS in India demands a student to get at least 50% in the 10+2 examinations. The duration of MBBS courses in India is of 5.5 years. The first 4.5 years is allotted for the classroom training, and the rest is for the internship course. If you are thinking of earning an MBBS degree from a recognized university, India is a great choice. WHO, NMC, and UNESCO approve all the top medical colleges in India. To apply for MBBS courses in India, the aspirants are advised to pay keen attention to the critical dates. In India, the academic year for MBBS courses starts in September or October, and students can start applying in June and July. </p>
                {/* <p className="mt-4  text-gray-700">
                  A healthy and peaceful environment in India helps the students to acquire knowledge more quickly. MBBS in India demands a student to get at least 50% in the 10+2 examinations. The duration of MBBS courses in India is 5.5 years.
                </p> */}
              </CardContent>
            </div>
          </div>

          {/* Toggleable Sections */}
          {sections.map((section, index) => (
            <div
              key={index}
              className="mb-8 rounded-xl bg-white px-6"
            >
              {/* Section Title */}
              <h2 className="text-3xl font-bold pb-3">
                <span className="text-blue-main">
                  {section.title.split(' ').slice(0, 3).join(' ')}
                </span>{' '}
                <span className="text-gold-main">
                  {section.title.split(' ').slice(3).join(' ')}
                </span>
              </h2>


              {/* Section Content */}
              <div className="overflow-x-auto custom-list">{section.content}</div>
            </div>
          ))}



        </section>

        {/* Right Section: Quick Form & Recent Blogs */}
        <div className="w-full md:w-1/3 p-4 space-y-6">
          {/* Quick Contact Form */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl text-blue-main font-semibold mb-4">Quick Contact Form</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Your Name"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Your Email"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Your Message"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send
              </button>
            </form>
          </div>

          {/* Recent Blogs Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl text-blue-main font-semibold mb-4">Recent Blogs</h2>
            <ul className="space-y-4">
              {blog?.slice(0, 7).map((blog) => (
                <div
                  onClick={() => navigate(`/blog/${blog._id}`)} key={blog._id} className='hover:cursor-pointer flex gap-3 pb-2'>
                  <img
                    src={blog.thumbnailURL}
                    className='rounded-xl w-[90px] h-[85px] object-cover'
                    alt={blog.title}
                  />
                  <div className='flex flex-col'>
                    <p className='text-sm text-gold-main font-semibold'>Feb 28, 2025</p>
                    <div
                      className="prose max-w-none text-sm pt-1 text-gray-700"
                      dangerouslySetInnerHTML={{ __html: getTruncatedContent(blog?.content) }}
                    />
                  </div>
                </div>
              ))}
            </ul>
          </div>

          {/* FAQ Section */}
          <div className="mt-10">
            <Typography variant="h5" gutterBottom>
              Frequently Asked Questions (FAQ)
            </Typography>

            {faq.map((item, index) => (
              <Accordion
                key={index}
                expanded={expanded === index + sections.length}
                onChange={() => toggleExpansion(index + sections.length)}
                TransitionComponent={motion.div}
                sx={{ mb: 2 }}
              >
                <AccordionSummary
                  expandIcon={<BookmarkIcon />}
                  aria-controls={`faq-panel${index}-content`}
                  id={`faq-panel${index}-header`}
                >
                  <Typography>{item.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{item.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </div>

  );
};

export default MbbsIndia;
