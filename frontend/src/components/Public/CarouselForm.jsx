// CarouselForm.jsx
import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { Paper, Typography } from "@mui/material";
import { motion } from 'framer-motion';
import { Try } from "@mui/icons-material";
import carousel1 from '../../assets/carousel1.jpeg'
import carousel2 from '../../assets/carousel2.jpeg'
import carousel3 from '../../assets/carousel3.jpeg'
import { useDispatch } from "react-redux";
import { useCreateLeadMutation } from '../../slices/adminApiSlice';
import { AddHomeLead } from "../../slices/leadSlice";
import { toast } from "react-toastify";
const carouselItems = [
  {
   img:carousel1,
    title: "Explore Global Courses",
  },
  {
    img:carousel2,
    title: "Get Expert Counselling",
  },
  {
    img: carousel3,
    title: "Study Abroad with Confidence",
  },
];

function CarouselForm() {
  
  const [Formvalues, setFormvalues] = useState({
    name: "",
    phoneNo: "",
    countryCode:"+91",
    email: "",
    country: "India",
    message: ""
  })
  const dispatch = useDispatch();
  const [CreateLead, { isLoading }] = useCreateLeadMutation();


  async function handleSubmit(e) {
    e.preventDefault();

    console.log(Formvalues);
    const { name, phoneNo, email, country, message,countryCode } = Formvalues;

    if (name !== "" && phoneNo !== "" && email && countryCode !== "" &&  country !== "" && message !== "") {
      const res = await CreateLead(Formvalues).unwrap();
      dispatch(AddHomeLead(res))
      setFormvalues({
        name: "",
        phoneNo: "",
        countryCode:"",
        email: "",
        country: "",
        message: ""
      });
      console.log(res);
      
      toast.success("We will contact you soon!");
    } else {
      toast.error("Please fill in all required fields");
    }
    // Proceed with submission
  }




  return (
    <div className=" px-4  ">
      {/* Animated Heading */}
      <motion.div
        className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1 px-3 mb-6 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-main">Get</span>
        <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gold-main">One to one </span>
        <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-main">free Counselling</span>
      </motion.div>
      {/* <p className="text-center text-gray-600 text-sm sm:text-base mt-2">

      </p> */}

      <p className="text-sm sm:text-base text-center md:text-lg font-medium  text-gray-500">
        Get expert guidance from our counsellors to make the right academic choice.
      </p>

      <motion.div
        className="flex flex-wrap justify-center my-12 gap-10 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} // only animate the first time it comes into view
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Carousel */}
        <div className="w-[400px] ">
          <Carousel interval={3000} indicators animation="fade">
            {carouselItems.map((item, i) => (
              <Paper key={i} elevation={3} className="overflow-hidden rounded-lg">
                <img src={item.img} alt={item.title} className="w-[100%] h-auto object-cover" />
              </Paper>
            ))}
          </Carousel>
        </div>

        {/* Contact Form */}
        <form className=" flex flex-col space-y-3 w-[400px]
        ">
          <div className="flex gap-x-2">
            <input
              className="w-full p-3 py-4 rounded-md border border-gold-main text-sm sm:text-base"
              type="text"
              placeholder="Name..."
              value={Formvalues.name}
              onChange={(e) => setFormvalues((prev) => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div className="flex gap-2">
              <select
                className="w-1/3 p-3 rounded-md border border-gold-main text-sm sm:text-base"
                value={Formvalues.countryCode}
                onChange={(e) =>
                  setFormvalues((prev) => ({ ...prev, countryCode: e.target.value }))
                }
              >
                <option value="" disabled >Select Country</option>
                <option value="+93">Afghanistan (+93)</option>
                <option value="+355">Albania (+355)</option>
                <option value="+213">Algeria (+213)</option>
                <option value="+376">Andorra (+376)</option>
                <option value="+244">Angola (+244)</option>
                <option value="+54">Argentina (+54)</option>
                <option value="+374">Armenia (+374)</option>
                <option value="+61">Australia (+61)</option>
                <option value="+43">Austria (+43)</option>
                <option value="+994">Azerbaijan (+994)</option>
                <option value="+1-242">Bahamas (+1-242)</option>
                <option value="+973">Bahrain (+973)</option>
                <option value="+880">Bangladesh (+880)</option>
                <option value="+375">Belarus (+375)</option>
                <option value="+32">Belgium (+32)</option>
                <option value="+975">Bhutan (+975)</option>
                <option value="+55">Brazil (+55)</option>
                <option value="+1">Canada (+1)</option>
                <option value="+86">China (+86)</option>
                <option value="+57">Colombia (+57)</option>
                <option value="+45">Denmark (+45)</option>
                <option value="+20">Egypt (+20)</option>
                <option value="+358">Finland (+358)</option>
                <option value="+33">France (+33)</option>
                <option value="+49">Germany (+49)</option>
                <option value="+30">Greece (+30)</option>
                <option value="+91" selected>India (+91)</option>
                <option value="+62">Indonesia (+62)</option>
                <option value="+98">Iran (+98)</option>
                <option value="+964">Iraq (+964)</option>
                <option value="+353">Ireland (+353)</option>
                <option value="+972">Israel (+972)</option>
                <option value="+39">Italy (+39)</option>
                <option value="+81">Japan (+81)</option>
                <option value="+962">Jordan (+962)</option>
                <option value="+254">Kenya (+254)</option>
                <option value="+60">Malaysia (+60)</option>
                <option value="+52">Mexico (+52)</option>
                <option value="+977">Nepal (+977)</option>
                <option value="+31">Netherlands (+31)</option>
                <option value="+64">New Zealand (+64)</option>
                <option value="+234">Nigeria (+234)</option>
                <option value="+47">Norway (+47)</option>
                <option value="+92">Pakistan (+92)</option>
                <option value="+63">Philippines (+63)</option>
                <option value="+974">Qatar (+974)</option>
                <option value="+7">Russia (+7)</option>
                <option value="+966">Saudi Arabia (+966)</option>
                <option value="+65">Singapore (+65)</option>
                <option value="+27">South Africa (+27)</option>
                <option value="+82">South Korea (+82)</option>
                <option value="+34">Spain (+34)</option>
                <option value="+94">Sri Lanka (+94)</option>
                <option value="+46">Sweden (+46)</option>
                <option value="+41">Switzerland (+41)</option>
                <option value="+66">Thailand (+66)</option>
                <option value="+90">Turkey (+90)</option>
                <option value="+971">UAE (+971)</option>
                <option value="+44">United Kingdom (+44)</option>
                <option value="+1">United States (+1)</option>
                <option value="+84">Vietnam (+84)</option>
                <option value="+263">Zimbabwe (+263)</option>


                {/* Add more as needed */}
              </select>

              <input
                className="py-4 w-2/3 p-3 rounded-md border border-gold-main text-sm sm:text-base"
                type="tel"
                placeholder="Phone number..."
                value={Formvalues.phoneNo}
                onChange={(e) =>
                  setFormvalues((prev) => ({ ...prev, phoneNo: e.target.value }))
                }
              />
            </div>
          <div className="flex gap-x-2">
            <input
              className="w-full p-3 py-4 rounded-md border border-gold-main text-sm sm:text-base"
              type="email"
              placeholder="Email..."
              value={Formvalues.email}
              onChange={(e) => setFormvalues((prev) => ({ ...prev, email: e.target.value }))}
            />
            <select
              className="w-full p-3 rounded-md border border-gold-main text-sm sm:text-base"
              value={Formvalues.country}
              onChange={(e) =>
                setFormvalues((prev) => ({ ...prev, country: e.target.value }))
              }
            >
              <option value="">Select a country...</option>
              {[
                "India",
                "United States",
                "United Kingdom",
                "Canada",
                "Australia",
                "Germany",
                "France",
                "Russia",
                "China",
                "Japan",
                "South Korea",
                "Brazil",
                "South Africa",
                "New Zealand",
                "Nepal",
                "Bangladesh",
                "Sri Lanka",
                "Pakistan",
                "UAE",
                "Saudi Arabia",
                "Qatar",
                "Singapore",
                "Malaysia",
              ].map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

          </div>

          <textarea
            className="w-full p-3 rounded-md border border-gold-main text-sm sm:text-base"
            placeholder="Write your message here..."
            value={Formvalues.message}
            onChange={(e) => setFormvalues((prev) => ({ ...prev, message: e.target.value }))}
            rows={4}
          />

          <button
            className="w-full p-3 py-4 text-white bg-gold-main font-bold rounded-md shadow-md text-sm sm:text-base"
            onClick={(e) => handleSubmit(e)}

          >
            SEND
          </button>
        </form>
      </motion.div>
    </div>

  );
}

export default CarouselForm;
