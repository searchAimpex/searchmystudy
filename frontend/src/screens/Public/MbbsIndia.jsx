import React from "react";
import { motion } from "framer-motion";
import { Typography, IconButton, useTheme, Card, CardContent, CardHeader, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AboutImage from "../../assets/AboutImage.png";



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
                  <th className="border-b-2 border-gray-300 p-2 text-left bg-blue-100">State or Union Territory</th>
                  <th className="border-b-2 border-gray-300 p-2 text-left bg-blue-100">Government Colleges</th>
                  <th className="border-b-2 border-gray-300 p-2 text-left bg-blue-100">Government Seats</th>
                  <th className="border-b-2 border-gray-300 p-2 text-left bg-blue-100">Private Colleges</th>
                  <th className="border-b-2 border-gray-300 p-2 text-left bg-blue-100">Private Seats</th>
                  <th className="border-b-2 border-gray-300 p-2 text-left bg-blue-100">Total Colleges</th>
                  <th className="border-b-2 border-gray-300 p-2 text-left bg-blue-100">Total Number of Seats</th>
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
            <tr className="hover:bg-blue-50 transition-colors duration-200">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-blue-100 shadow-lg">
            <CardHeader
              title="Key Information"
              className="bg-blue-200"
            />
            <CardContent>
              <ul className="list-disc pl-5 text-lg text-gray-700">
                <li><strong>Intake:</strong> September</li>
                <li><strong>Minimum Percentage:</strong> 60% in PCB for General, 40% for SC/ST and Reserve Categories</li>
                <li><strong>NEET:</strong> Yes With Qualifying Marks</li>
                <li><strong>IELTS / TOEFL:</strong> Not Required</li>
                <li><strong>Processing Time:</strong> 45-60 Days</li>
                <li><strong>Lowest Fees:</strong> 4,00,000 INR Per Year (Pvt. Colleges)</li>
                <li><strong>Maximum Fees:</strong> 15,00,000 INR Per Year (Pvt. Colleges)</li>
                <li><strong>Living Cost:</strong> 7500 INR Per Month</li>
                <li><strong>Duration:</strong> 4.5 Years</li>
                <li><strong>Medium:</strong> English, Hindi and Regional</li>
                <li><strong>Top Universities:</strong> All Government University</li>
                <li><strong>Recognition:</strong> NMC and WHO approved</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-blue-100 shadow-lg">
            <CardHeader
              title="Eligibility Criteria"
              className="bg-blue-200"
            />
            <CardContent>
              <ul className="list-disc pl-5 text-lg text-gray-700">
                <li>The candidate must be of 17 years of age at the time of MBBS admission in India.</li>
                <li>The candidate must not exceed the age of 25 years.</li>
                <li>The medical candidate needs to score 50% marks in 12th grade for general category students. Reserved category candidates must achieve a minimum of 40%.</li>
                <li>A medical candidate must have the primary subjects in 12th grade should be Physics, Chemistry, and Biology.</li>
                <li>To get admission to India Medical College, students need to clear the NEET entrance test with a good score.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
        title: 'Recognition of Indian Medical Universities',
        content: (
          <ul className="list-disc pl-5">
            <li>National Medical Commission (NMC)</li>
            <li>World Health Organization (WHO)</li>
            <li>United Nations Educational, Scientific and Cultural Organization (UNESCO)</li>
          </ul>
        ),
      },
      {
        title: 'Documents Required for MBBS in India',
        content: (
          <ul className="list-disc pl-5">
            <li>Valid mark sheets of class 10th and 12th</li>
            <li>NEET scorecard</li>
            <li>School transfer certificate, code of conduct certificate, medical certificate, health check-up certificate, and no criminal record certificate</li>
            <li>Passport and passport-size photocopies</li>
            <li>Caste certificate (if applicable)</li>
            <li>Parents’ bank statement showing ability to pay fees</li>
          </ul>
        ),
      },
      {
        title: 'Process of Admission for MBBS in India',
        content: (
          <ul className="list-disc pl-5">
            <li>Complete Class XII with Physics, Chemistry, and Biology</li>
            <li>Qualify NEET for MBBS admission</li>
            <li>Appear for counseling</li>
            <li>Other exams like AIIMS and JIPMER may also be required</li>
            <li>Entrance exams for AIIMS</li>
          </ul>
        ),
      },
      {
        title: 'Imperative Dates for MBBS in India',
        content: (
          <ul className="list-disc pl-5">
            <li>NEET Entrance Test: National Eligibility cum Entrance Test</li>
            <li>AIIMS Entrance Test: Entrance exam for All India Institute of Medical Sciences</li>
            <li>JIPMER Entrance Test: Jawaharlal Institute of PG Medical Education and Research</li>
            <li>Application period: June and July</li>
            <li>Academic year starts in September or October</li>
          </ul>
        ),
      },
      {
        title: 'Advantages of MBBS in India',
        content: (
          <ul className="list-disc pl-5">
            <li>India ranks among top medical education facilities worldwide</li>
            <li>Exposure to tropical and rare diseases</li>
            <li>Real-life experience during internships</li>
            <li>State-funded medical universities in every state</li>
            <li>Indian MBBS degree accepted globally</li>
            <li>No requirement for IELTS or TOEFL</li>
            <li>Increasing demand for doctors in India</li>
            <li>Access to modern medical technologies</li>
            <li>Excellent postgraduate and specialization opportunities</li>
          </ul>
        ),
      },
      {
        title: 'Teaching Methodology Adopted for MBBS in India',
        content: (
          <ul className="list-disc pl-5">
            <li>Academic year begins in September</li>
            <li>English is the medium of instruction</li>
            <li>Local languages are also used; Hindi is commonly known</li>
            <li>NMC lists medical colleges offering English-medium education</li>
          </ul>
        ),
      },
      {
        title: 'Disadvantages of MBBS in India',
        content: (
          <ul className="list-disc pl-5">
            <li>Limited seats in government colleges; excellent NEET results required</li>
            <li>Limited global exposure</li>
            <li>Mandatory entrance exams; difficulty if not cleared</li>
            <li>High fees in private medical colleges</li>
            <li>Additional donations or capitation fees in private colleges</li>
            <li>Limited opportunity to explore new cultures or languages</li>
            <li>Infrastructure in Indian universities may be less compared to abroad</li>
            <li>High demand and limited seats in government medical colleges</li>
          </ul>
        ),
      },
      {
        title: 'Economical MBBS in India',
        content: (
          <ul className="list-disc pl-5">
            <li>Economical if NEET is cleared; private college fees range from 50 to 60 lakhs</li>
            <li>Abroad universities may offer more economical options</li>
            <li>Fees structure may vary for NRI students</li>
            <li>Contact Indian Embassy for detailed information</li>
            <li>Insurance costs: 5,000 to 15,000 INR/year</li>
            <li>Medical check-up: 20,000 to 30,000 INR/year</li>
            <li>Food expenses: 10,000 to 20,000 INR/year</li>
            <li>Hostel fees: 70,000 to 1,00,000 INR/year</li>
          </ul>
        ),
      },
      {
        title: 'Syllabus for MBBS in India',
        content: (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="border px-4 py-2">Year</th>
                <th className="border px-4 py-2">Semesters</th>
                <th className="border px-4 py-2">Subjects Covered</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Phase I</td>
                <td className="border px-4 py-2">1ST – 2ND Semester</td>
                <td className="border px-4 py-2">
                  Pre-Clinical Subjects – Human Anatomy, Biochemistry, Physiology, Bio-Physics, Biochemistry, Introduction to Community Medicine Humanities
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Phase II</td>
                <td className="border px-4 py-2">3rd, 4th & 5th Semester</td>
                <td className="border px-4 py-2">
                  Para-clinical and Clinical subjects – Community Medicine, Forensic Medicine, Clinical postings in wards, OPDs, Pathology, Pharmacology, Microbiology
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Phase III</td>
                <td className="border px-4 py-2">6th – 9th Semester</td>
                <td className="border px-4 py-2">
                  Continuation of clinical subjects – Community Medicine, Obstetrics and Gynaecology, Medicine and Allied subjects (Psychiatry, Dermatology), Surgery and Allied subjects (Anesthesiology, ENT, Ophthalmology, Orthopedics), Paediatrics, Clinical Postings
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Internship</td>
                <td className="border px-4 py-2"></td>
                <td className="border px-4 py-2">
                  Community Medicine, Surgery including Orthopaedics, Medicine, Welfare Planning, Paediatric, Obstetrics/Gynaecology including Family, Ophthalmology, Otorhinolaryngology, Casualty
                </td>
              </tr>
            </tbody>
          </table>
        ),
      },
  ];

  return (
    <div className="container mx-auto px-4">
    {/* Hero Section */}
    <section className="relative flex flex-col md:flex-row items-center bg-blue-200 py-8 md:py-16 lg:py-24">
      {/* Left Side: Text Content */}
      <motion.div
        className="flex-1 text-center md:text-left mb-8 md:mb-0"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          MBBS in India
        </motion.h1>
        <motion.h2
          className="mt-4 text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          A Pathway to Success in Medical Education
        </motion.h2>
      </motion.div>
      {/* Right Side: Image */}
      <motion.div
        className="flex-1 w-full md:w-1/2 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
      >
        <img src={AboutImage} alt="MBBS in India" className="w-full h-auto" />
      </motion.div>
    </section>
  
    {/* Expandable Sections */}
    <div className="flex flex-col md:flex-row mx-auto space-y-6 md:space-x-6 md:space-y-0">
      <section className="mt-12 w-full md:w-2/3">
        <div className="mb-10 flex items-center justify-center">
          <Card>
            <CardHeader
              title="MBBS in India Overview"
              subheader="Why MBBS in India is a great choice"
              className="text-blue-main text-center"
            />
            <CardContent>
              <p className="text-lg text-gray-700">
                MBBS in India is one of the highly preferred courses by medical aspirants worldwide. The strong education structure, sincere professors, and top-hole medical universities in India are paving the way for success.
              </p>
              <p className="mt-4 text-lg text-gray-700">
                A healthy and peaceful environment in India helps the students to acquire knowledge more quickly. MBBS in India demands a student to get at least 50% in the 10+2 examinations. The duration of MBBS courses in India is 5.5 years.
              </p>
            </CardContent>
          </Card>
        </div>
  
        {/* Toggleable Sections */}
        {sections.map((section, index) => (
          <div key={index} className="mb-6">
            <motion.div
              className="flex justify-between items-center cursor-pointer p-4 bg-blue-50 rounded-lg shadow-md hover:bg-blue-100 transition-colors duration-200"
              onClick={() => toggleExpansion(index)}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              <Typography variant="h6" className="text-gray-800 font-semibold">
                {section.title}
              </Typography>
              <IconButton onClick={() => handleBookmark(index)}>
                {bookmarks[index] ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              </IconButton>
            </motion.div>
            {expanded === index && (
              <motion.div
                className="p-4 bg-blue-50 rounded-lg shadow-md"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
              >
                {section.content}
              </motion.div>
            )}
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
            {blogs.map((blog, index) => (
              <li key={index} className="border-b pb-4">
                <a href={blog.link} className="text-lg font-semibold text-blue-600 hover:underline">
                  {blog.title}
                </a>
                <p className="text-gray-600 mt-2">{blog.description}</p>
              </li>
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
