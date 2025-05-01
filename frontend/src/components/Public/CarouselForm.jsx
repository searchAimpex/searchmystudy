// CarouselForm.jsx
import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { Paper, Typography } from "@mui/material";
import { motion } from 'framer-motion';
import { Try } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useCreateLeadMutation } from '../../slices/adminApiSlice';
import { AddHomeLead } from "../../slices/leadSlice";
import { toast } from "react-toastify";
const carouselItems = [
  {
    img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAKgAtAMBIgACEQEDEQH/xAAaAAACAwEBAAAAAAAAAAAAAAADBAACBQEG/8QANxAAAgICAAUCBAQEBQUBAAAAAQIAAwQRBRIhMUEiURNhcYEGMkJSFCORwaGx0eHwJDM0Q2IV/8QAGgEAAgMBAQAAAAAAAAAAAAAAAgMBBAUGAP/EACwRAAICAQQABQMDBQAAAAAAAAABAgMRBBIhMQUTIjJBUYHBYZGxFBUjM6H/2gAMAwEAAhEDEQA/ABIOsbqHSATvGqx0mRM3plwJcTqid8QYiijSoWQ95dPMsINIqw0IrYNxt+0WI6x0RkELGvZk+HqNooPeWdQF6R8Ru4TVdGM60sAejQo6iPgE1kHrbRhFGusCO8szcqw0zzQtmKOuopWOsZuPOdRffKdT24fBcYGRb6YOyzpAWPoQIbmJh7jyrK5Nh10gqHPMNwzrzDtuHw8E3WDQ1ID3KMeR7EbY7bmvj0s2uYa9p3A4etdYmotaoohoyr7k3wDTH9IkhfiKJJJUyzytY6xtO0WqjKnQnNzfJfmFHad7wRaQNJggNpZxOL3nSekqD1liIyKLntAPC83SUINhCr3PYe8cg0sAQ3LIz7EP/wDm5jWfD/h3U+SRoCP1cCoVf+qvZ29q/wAv9ZZhXJ9ITfrNNRzOX5MPYLdRubHD+H/ExmyrR016F9zCZWFw/FxntFZLKOnr/tMm3irXU4eCEZKix53J6k+PpLdVDXZlavxqEq8UZz9RxlrsHNWuotbVqbVFeIlfMqrzqvqHNuUvowrital1awbUjr/hBlVLLwRo/Ga4xUbX9zzzJowLLuaGZh34rMGKso7lTvp9IizDWwNRR0NdkZrdB5Qs6QfLqHdoBmkjk2WVeZgPeej4XQAo3MDCXnu+k9Vgpy1rDiVNTJpYHhpR0lCdmRjowbWcvWGZ2C8kXNvMdzknJ7ZIxa4cdoBIUdpzL7NBrkhlllZ0HUZFk4LmUY6luacbrroT9I5MJI5Ullz8lKFnPaMFcbGr5bS73vsAsCmj/wDPv/eUqqYr8OlkLOvPYC5B5fY/KUzcNUww75aX0P0Nlb86j5Df/OkbNurG75KE9ZXOx1xfTwwnCeL2X4tuNc+3pbSg/qHsfnJmF7Nri3ivZ1apHpc+2p57FzBTxgNXsow5Sx7E+5P+ntN4VAfD0VToSwPn6Ga+ms3Ryc34pTGEnJLgzM85V1W1b8vVdH8kQqxbDfzK7gNr065T9de09E6qACWBoY7DWDl23t84eukUtzcvKnfRXufqZYc44yYULLIpxf7iuNhZJ5P4rIRKx6gtS+sfLZ6QnFM9cJRRw9FGXd0LkdVX32Yzei1Um8j0KOZEI36vPWeSFyZea9lxPrfqev5R2A+8r32qKyb3hmkUnvmjZ4fjcPJXIvsyHs2d2izlBPyEBn4jY27KrBdj+LNaI+REc4fw7IyW56LAdL6rAB6D7LvsJaw5uPY1GbTXYhH8xLGG2B/aR5mTC2bnxydLDUQplhPgwmO+vT7QRPeFuT4V1lejpW0N9yIE+oge8vZNhcrKNTg9eyrT01B0kx+F1ctazV5tCHEzdQ90grN0ixf4ja9pS5iSNQZsVAfnJyK24WStl/IxWSLteu5J4IEvaEEEstuc2WsBZRjOc0haNiTFFlM7YwC9fMoDKWE66RqDS5EeL12cRpysesOtvwgVdToWAfoOpg/hh87BGchrf+E+H61P5ebwB8+/9J6scHzs+kPiOEZNmsHsT0nnOK5mexGPm3OrVMQyOvLyn3Pz8TQc1bDHyc7fpnTdJRfpbb/c7iX2XZlYZOikkIO7Ceww9vgsUx+ZSdPZXbsIfmD+b5meM4NU4tDEbCHqB4npsED4rKLKgyelfiOV6eOTUvVV7IoztRtnmC+PyaXKz+mpecnogdtqffXgCWBarRWsGxTrlUkrr5+T9oF1vCrVlYwBQaJJOteNy5tyKa/jrj18uilb/F6a+nf3lhvCyzFqpcrduBPi19TqtdfOxYH0Ecmz7qB/zpPJi1ce0u6lm0Ne3nf3m3Za1rG1nJIJCA9Ne/WYmdW6WMFPpYEjY7HyJSshvi2dRTiDVWeeyfijimbTjYNGEzVYroWbTEc7bHQ68AajPCsrKPC6bOIu9tHPvFJ2WGu5+m4LDzGSo0tVVbWT6a7V7N/vNbheLfxDLGU96rRXoBQNcuv0ge0r0rDxFcjLqkoydj9IPigf+IFj70ygjp26doPAq+LeD7Tf4jg15SEfEAf5eIDh+F8Egc3MR5jrF6ma2j1tNlEYxfKXQ9jJyVyW3cokvs5TqKWWKwIb7QHLASjnlnXy+Y/SLX5GxE8lTU3OspSr22hnOh4g+YHsXY4rbEkq5qRuUtJI3gbUFXtITKiHxcW3MtFVPQ+T7TEXY5tLlgQZbc3L/wAOGrHNqXczqNkTAG+u/eOR6u2FntYRZWzXc+J1e0Fae0NMalyep4JmKuKPTvUzfxHwGvi2aMwZaJcQOath4HaG4apXHB9xF+LcTyKbUop2qlB1C94rw6yUtbKCl8fkw9dFLMl9RKrgN+Mu1CMpP6P7zMyMbIpvILnnB2vN3U/aOWcSzgQTYe+uoHYQVmc9qlSobr+31TqHKTWJGJChqe6D7+4bCGY9IL8QrBCkKzDr9DvzEstsoWL8W6u9NHTp02Pn8/8ASANLF+blJJ8L4/52jWOTUdLWnTr0XY7xLfwXa6Nsty/BbE4dkPzEOWr7hQO0Lk8IstOiFKjY0TOJl3KAKyR9RDU5ub+6vXtyw02o4ie8hue6T5FqPwlm2lXW6uusnrzuCQJr5WAeFclKW/FpYc1T9O3mCXjdlJCtXS3vtYHjPEjmrh4+EoXu9rDsvaV6VdG3L6GavbKr1PolljEaUEt7iDpubEt9ZJJ94Sh1oAB9RHmCzr0ZNkajLo45Rn6Wxu6Kivk7l5XXfvEBlfzIvfkE9AdRnh3Bc7iC8+OgVP32HQ+0z8tvCOxnKNccyeEcycgMADGMWq7MZacVSz+R8pq8M/Cqqxs4oyt7VoTr67m1h4uJgcxxECFujaPeOjVJ9mddr64pxr5f/DFH4WtYbty60b9qjepI1fms1rcp0AdCSWP6aBW8/VfUxFmz+H25WsPzmKp6zd4ZVy4Jb905S2WIM1rvZg2FzvVyn8uusxeOYNFK/wAVS/5zo1yfFIYgTP4jYWtG/aV9HZY54b4F01bZpx4FzsbBlCNuv1nQZ2j1XoJqZL3R6HGGqAflL5WFVxPhfwRYarVO0sA3r/aVHpo18ofGGsYmYkL513uyD5Mq5KSZ4XOx8/CdhfUxVR1dOqkRZcojauP6H5dZ67NsJ2oIA87nluI4ic7nF2PQ3T3JE7Dw3VX6qpzsjj9fqUbPKrko55CYTm7IWqsEuw2FHka7/wCM78blbR2AN7+YHf8Ap0i3Ashsb8QYjkHYsRSB52uiP8pfirrjcZz66wWWrINlYI/Mp6NLWXvwWI4xgZbI6nmPnl2T0B/3lRkFNj2OiPIP94nvQKL6tLpT5avwftOX5KVj1adlHY9DqNj+oMmlyNnOSpglyjbdkI7x/CydtoKgX6TyQey3KN9hPb0je9Tbw7OUpv8ANyncOEjO1EfM5NbNVf4c5NZ5Sh6oB3gaeFcR4jUDRVyIezP0AjvB7k+MDYAVA7GbdvEEA0GHbxAsipcHtNGdclOK5EuHfhvCwwtmXYcm5fB6KPtNVsutQAoUAeF7CY12c7nQbpA8xOyDvfiLjGMVhFyVdlr3Wyya2Tm+kBfMBZknk5SdbEQGywJ8eJZSrMS32hZRKqjFEWnmG+bvJDgdOkkneyd7Mmis22Ki+TPSPqrHWlfAmJwZd5QPtNi073OC1Vj3KKNO15lgSfpFeIr/ADEPuI235onxE+pPpHaZ4aDh7kJw+AvNePlARzhi7tPy1L0pYix83iLNmxuWuEssXHwuZvboYrl2ipOYkAD3nn87ij5b8qkFR4ET4VoP6ie+ft/kxNZf5ccLstl5jXE83Tr0iDv1ZpyyzmB/ygGPpnZzshVFRXCM2iiUnvl2Da5KbUss/wDW4cfaaP4m/hmzlyEYhshRavL2UeN/aYeV1WADs352ZiOg2d6HtEyj60yzG1xi8IbW1S3Kvp6+n5Re2tzcUVSWMa4fw+7KYWAMlX7jNOxa6BpB1Hc+89J4ChGdvZjWYzVVcz63+2N0P+b3UBQJ2xi4YEb32g8Gmyvn+KNb7RXmNMfLS9I1KrSi8oOiT1jgsPYncRpAB6xyrXL0k72PworCD09DzS4YmzlErWZFUi3p5ntwPyGDMH1CBCU6zo12HmXB0CJG4W2dRtrJAFus7B3ojYU4N/5B+k07ZlcH/wC401bO04a//YaNnuFW7xDiXcR9u5ifEhvl+0tV8NBwfqQgp7TU4Uut/MTMA1se5m3w1NIDLN0v8bDtliILitRtCr+nXWZd3Da1rZqzogdI7xLJd8o11gkiVqqc9LHAJ8TrPDaFTpoL9DjtXbKWpf0XB56mux3YuNAHrO3gL27TbfAt5/h0j4jt4TvCJ+H1T+ZxPIWpP2Kesy5x1Fuq5XCZtwnXGvh9nlPhWXv8OlHdz2VRvc2uHfh1ccDI4m3qHX4Xt9ZqjMwMAGrh9QB/cR1mdkZdl7nmckGa0ms5EVUTffRfMzBopUAEHbUyW2x2Ya3QOgdwMROWTRjFRWEcEIux1EGDqW3vpFZCGEYbBHmHr9C7iiNoERqk9BIyA0O1NtQYVjtfpEq20IQPsyHNAbRpLemoWscxi6rrTRlDrr7wd7fYuXHQRE9MksMjQnZGUK5FODdHb6zUsmZwf8xmk84673mnP3C7d4rnD+TG2+XeWHDMrLQBEIB/U3YS5VCc2lBZI3qPLZiVjbATfw1PIoHtC0cFxcLT514Y+AIa3imPjqUwqACP1Gan9rssWJvAuy/zOK1n+DzmfkJVlOqryt+oxRsg9w3ND8Y5sm1sggc/kDzMdbWJ0p6+NzparIqKivgwr9JOM25fJqtxTKx8cnGYKfJ14mfZl23NzW2Fz851bAw7d+jKYnZ6HIHbxK98mnlPg0NFtccY5Qz8WVNm4uHk55X3l/AVmlOaDDbnebUhyPF9a+87vUpzSd4DkewFD6hUcntF0WHpbrqA5EDNWiekaXpqIrtLNiMI45djzAyAxtXAI3CIWcD2idbDZ3Dq+ui+ZG4W0Mi5U6GdgNMZIO8XgNwf8+vfxNyvCZ+rNyr7QfD8NMOoOfuYrn8QusYqjFU9hKtXhUM77n9i03K2WIGmbcLDHT1v7RXI4tfYNVjkX/GY/wATQ67384NrZpqcK1tgsIbHSxTy+WN2XM5JY7PvF3si7W7g2eJlex/l4LXWdN63MrKqWz1L6THLHidjbgK2SeUwJ1xksSQm1tla8x6Edz7icNvxTza1LvAmPd0prDK8dPGuWUW3JuDM6DJTDZYd5cDcopllM82QW0ADuXUjl6Su9zqxbZ4uOphU0O8EBuGXpAciGwoJPeFSCBl1O4pzFtjCnUIpi6nUIrRbk2Aw4MkqGki9os9PxBuWr7TBubbySTTvbNDSL0ZAsYJ2kklOUmW0CLSjPJJEOTyeYB2gLDJJCgxbFnMEZJJcgJZXW50dJJIwAsO8JrepJIMmQXA1LCdkiWwSw6S4MkkFgsuDLqdySRYLCCFSSSA2LYQdp2SSQLP/2Q==",
    title: "Explore Global Courses",
  },
  {
    img: "data:image/jpeg;base64,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",
    title: "Get Expert Counselling",
  },
  {
    img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALgAwgMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAFAAIDBAYBBwj/xAA/EAACAQMCAwUGAwcCBQUAAAABAgMABBESIQUTMQYiQVFhFDJxgZGhQrHBFSMzUmLR8HLhByRTgvEWNJLC0v/EABoBAAIDAQEAAAAAAAAAAAAAAAIDAAEEBQb/xAAyEQACAQIEBAMHAwUAAAAAAAAAAQIDEQQSITEFE0FRFCLwMlJhcYGhsSOR0SQzQuHx/9oADAMBAAIRAxEAPwDxCr0R7lUatxkaKpi6mx2Q5lA8qe2yVDnM1TSbJUFtbFDxzT495AfKmU5Dg5FWPZpFVzaZH8tCbWLvjru1F7RtVn/21Ts1zKqkfiqIwxnZMMueVZ9cd2g/FX/5KMeeKKcUYLaEDqBQXixItYVI60TKorVPuCqcik00Cr9javcyrGnVs4qI2zkoq7Lltb8y3RdGGY9a0FnH7Dw24vJMFYxpQ+GaDWzzG7RIxmWRtCgdAaIdsb1IIoOD27bQL+9Pm1Pp2SbZy6uadSMF1/Blr26lunzI2RnOKrAGpI0Z25aKWJOAB1NFrLhAYE3shgxuExkmlZXJnTco00BlGT6Vfgs1kI5hKL47bn4UYeOw4U45EKzSYyeZ3sUNu7yWeYyEgE7d0YwPKmZFHcUqrn7K0JrZ4bVzoIXHjUkvaB0bVDgt4Fh0oQ67FnJJNRBS3Spna0ROTFu8tS9d3k98+q5fWfD0qsRTgK6RQ3YaVtiBhTamYVERiruEjlKlSqy7EdTIdsVDUsdZmXLYSk86p5T3Krj+JmrEnuVQEt0VKQpV0CiGh7hpb2XG3TFOs4z7YpUbDeoeFHXbkZ3FW+FzGRpWVRlRg1RzpJ3mc4u5Cqvgz71Q463fiRTsBmrnGQwlt49sthqH8bUrdImckKKtDKKV4v5g9RmjHCg8Qkusfu4xpyD0J6UKjUkEjoKMyxpa8NhGsAypzTj8W+AKJDK7ulHuGuzaRW5v+JynWtpBlQRsZDWYMc1/c7ZaRzqZj+dH7yb2XsrZWEZzNcvznA/I/Mj6VDwk2to4md2IjwQuN5H6kfDrvWhpWSMNGbjnqWu27L5LT8hHhnAY7OblzRM9w0ayAuMKoPiT4fDrQ3iL+xueY2tj0cnc+npWgS6nu5DcTTiIOxkQkEZJ21n9B5mqY4XFdzO0UMl3c6u87juLT8l15TPDENSzVPX1AKJecWKC1sWITwiQn6mrf/pnjATB4dPn/TWhi5HDImFzdRQ4GrkxvjP0pXPaGwKI1na3GvG/QK22N6nKj/k9RqxdST/SjoZOXgHEnX/2xUdMsQMfen/+nbiCPVLNb/BX1E/QUbur/jF9CrLZS8pep5Zwfnneglxe3ckemaZh5JpGPzpcowXc0Qq1pLWwk4NIWxzE+VRz8LlizlSMeZFQqZc5Eqj/AFAVJqOoiR7ds/00vy9h6c+5SeFh5H4Gq7jFEJIVb+Ey1RlBHlQPQbFkNKlSqhhHUiE0ypogDSWXLYZ+OpnbuVE+A+1SsO5UAfQrV2lSqxhdsJSpZSSBjwojwbUGuQDjbND+GcsSHnHClantZ0iluACTqU6cUJkrRbzJLsWeJzGWW2cYOwG3xqhxTJvpFYEEY3NWOIfuhaggr3QxqvxZy/EJQwI6bn4UUS6aV1bsxQRBbV3JxkhMEedEry21XcFiumTBwcdVQDvA/Deq1rJHi3hmbuK7TPnzA2FOtGxxJ2cs2o6NYTIJY97Pltq260S3FzzNt9r/AME3EXVL0Jkh4sDz65P2zj5VLHbLGNczd1UDSAHrq3Cj1PX7VWLLJO07GOSRn5hXO3eONP1NErS1lFmJyNYjkIhVRq5rHYt8jjHnnbrT4LNK4io8kEr+vX8l5mkjBWd29pGcRsNoh/fG1Pt7l1tzDFMsaMMkfiPqfKiadnrqOAtMOfNnLMWzl/5c+Q6k+lCLjgrMzNoZZvBs9TuSTW1qSVzlxq0ammYpm1gAeRo9b42Zt81xg6xA+1pBgY7oGalIliudN07Kh21IMkj41Jd2fDAqPZIZSd2M2+3wFKZtjUtZPqUolttGqS+ncg4KA7UxvYg2Vglf4v8A2rTWknCRb4ksEZguC2pVH0O9Xm4ZHcwJKrwpGN1jGBhfPpRKk5LQF4yMX5kzFx+y93MGNXTUuf1qxJaw3EQKWsGnxdSy/nRjj1igdeUEuFx7w/2oJbyW8UrJc2pUeaN0+VBKOV2Zpp1M6zRBVxHFbZCtqIobK2fGiPFUgWXXby60bp6UKfess9zfT1VxZpU2u0u405T4zimV1dqFkY5tzmp8gxZqDBK5pyhjF02qimiOlSpAZqwixaMizDmKWyMYqxYqHuJVCn3Cdt6qx5WZcVYglMd45BG4xnwoRc02nYff6vZLdmkV8r57rim8Qy99KzHcYBz8BUUmprKLudxcqGx1PlUk7iSdpDuCF+mBRRAta31JIA/MlaMfw4j4as5On9afZI/s8sikFVR3dc422X9WwKjtXMa3qo2O4APXvj+1EuH28RsozMx5T45gC9AitIfD+pd/I1cRdWWVMJcE7MTXpt45SEaVgWGCCildTZOPBSo+MgrdQWdnDxC35L9yyj5aJpwPLHxyTn/SKET8ZS3u75rdTzUWVFOCTnmOp+P8NPtU/Zy4cRhrkkPIObk9Bk58fU1rVWFHRas8ti5YiunOei7fPf7GvhZGXRDFqXrsevjVOWG2MZEqlDISSxG2PjRfhqObMu3ddzhQQOp8vvUvFrKKSFEKZLMEX9aasU3ucmGElujHcW4Pb3UUr26xtEndGNzn0+lY274C9krG+il0knGHwMfSvUZLZ7U6bYAKWGBp/wA8vvUF7CnELFraUKkmMAYz18aZaFXbc20MZWwukvZ7nmdrDAJ9NhGTApBOcDfyorxSWS1QW0bgNnVIwOFQDqPWpX4eOC3UiImofgJ/m8/886z/AB6cPMLaM9995COhFRy5cDr0l4iqnF+XuNivbhLsaCNGsY286uu6XlxLCwAlHkMZqKOLSLWLR+9dkOPLeuXI5faOcp3VGMk0F3a7Nl0pWXYzl/YTrdchUJYkjSKU3AruILzNAZhkKDvWh4skcFzFcxsSc5z8auR3NuirPKvfxjel8mOtzR4qSimjF/sy4/kpV6F+1rb/AKEf0pVPDw7g+Nn7p5dTlGWxTa6pwc1hOoWCuE2rqzLyNOKc5/dZFVQPKhQLV9zgpwrldFEETRFOehfOkHDYqxi3e8YDIRjhaqDAf55q7byhuKRmIKAWGkdV8qECatqRRqWsLgaBiKRWLZORnI29M0nIaOJuuUAPlttShID3MZPvKcepBB/SmRg+z6vI4/z6GiiDJFmAAwXuAPA5xuvX/PlRqBxHwclWVZOVPGMgb5t4cj6A0FiO/EAZdJaIEeveXb/PKjEDG6gS3ZQMxI6iMAsdUJjbGeh7i1cXZMyYiN3fp/pFiNHljnUM2ZpiRkZAUlm/+33rWcODiyCrIUCEIMHdd/8APtWZj5XtQjcoF5w2wAAPQ56bmjbswsrkK2+kaST7u+36V0uE4aFaTnPoc2vS5rSN5wniEcumMlS0LHUyjZiMgdKPw6ZrmJFOplj1H0LH/wA14dD2q4rZXHtFokZiYd8SKWEh8fHpmtz2T7d8PvLqRJn9ku59KhJPdGFx3W+OeuDV4qlTzvlMHwMqGr1j+PXc3UltmRtO4Dfn/tQLitnpkaSL3l2jwNy1Hra5VoSwPePgfM/7YqtxGOSQEwEalwB6E9fpWJNxYqrh1JGJ47A11wm5eVQ0qrrGPJQTXls88lp/zF0cXMozgj3fl8K9tvoVt5WSbJjmRUfA67D7dc/GvPL/ALPyca4hd8dCIlgjabeM/iUbasfHJ+da5xdWKa3E8OxEcPKUJ+z60XrZFDs9PEZbeWfd4MyMW/E5qK5kD3dzePuzyADHrVJ0f2sxr3ZSSXxRDg8a3nEI030W41yauhI/OonZZTpSSUnU+BPe2ZnMQZdS9SemBQTirMbgxpkRr0ya0vE51jI3eNm3ZfDFA/YfaGJfIBGd6TiKkYmjB0Z1LPoBfaW/mpVI1tGCRnxpVm5hu5KAtdpAZ6V0rjrSx5NG3d0npXbZFYElsAedQ9fOprTTqIcZBqtimQsMMR5UhTpANbfHFNFWWPwNY3G9XI8QcVhBGRqXPLbGc1TIGsaR086kmfMqsMA7bhqoqSuTtGy8TljAYnLZAG5qsuRrGevhU12nLuVLd4E5Of1pjKUmbIxn1q4g9CRSDeSasnWu+B02zRq1ihWThsmC0cloCfDDK3eOfqaD/vPbY5MhWIznPQY8auWcum2tnkYYSblqCPdBDE43/r/zxnQRWTdretGFbV/+YRgMkOcDO4JO+B4Gjr5e3uTpVMrhcnYEEedZhzqdzjLA5bHzNanglyJI5DMhMTpknTgg5JOPoTXa4TUtGUTK45ZqQAvCVVIU6aFGPp/vQyaEMCy5BOxozfw6DtqYqSvTy8aHOrMuMYOo/ahUPM4yN5quw/beTh8sdhxaZngJxDNIf4Z8AfT1r1a0uFmy6vkdCP8APM183XYbWfTbp19a9J/4cdpvaQtneOzXMKgLq31J0+2w+lZ5xUm11OZi6GWOeO3X4G74zaG9jaJjiEnLnoWXxA/1H7fGqccaKk1rHGqlgRoxsBRYSvPugJ8ifChl0VhlXSCQfek/zrUw8ssjy2OT6HmfFLBrC9dpQearEO2NqfwG3kWKMwaAhJLyeJFFe20I9ti5Mq8xiRIp6HbrUvBrS4gtkTILuQSuPsKdU8rudbD1XVox7sz/ABe0MWXfpqwCSScVJBHr4bPdzdxei+vwrR8e4cnICzZ52MiNBnag8lvLexW3DEARVfGnHWuVUan5uh6ChUdK0HuZU2pJJ0neu16ivYMlR+9PTyrtZ/FUzTyZHhUOzYp1yAMetK3AL1JdpjTTW9Qh8Soy5NR2zaJDgAgedch2GKZGcaqiKsNbck+ZzSQZYDzpV1diD5URZJKF5nczppkpOQfTI2p0smt8gAHy8K5L+DYjA8fGqRC3xFUCwsjEkj94S2xPp6Uy7j0SQnI78QwV6Hwrk51QDSwODsCMjHxqOVi8aZ8OgHhUQKuTztiS3dnBZVClceA6VesGULMkyJ+6l5uSPgfphfud6GzAqIS24GT06jNPjJleZQx0uud87Hpnb41aFVYZohVo2glkh1EMrYDnYNjr9x96J9mbxQWhnZ1OolRnGdun60PvCwcTLGumdeaS2+dfe+oyfpVS1mNvKJU2ZTuM528f7Vpw1Xk1lLoZ3Hm0vibCez9sCG3YLMAQyMdiMkjJ89/tXLzs+YolLTapz3iiDbGM/Hw8vGo7SXmSvKrYRvdPpt+g/OidvmUq3MPKAGgBhso2Hjn7V6hUoN8ywujXb8rMPewlWbpn1/KqnD72fhPEYby23aNs+hXxBrS8esDnmLpVT19KzE6Jg6plB3BGa4eJWWd0brKSs9j3HhvHIrmwSd515bqGOPEEZpt5JNexusalIgMqo94+vpWO7IXkcPDrRYLSeWUR4kaRCqA52w3j08K2MsjxwNPM4BU6tKnA+FLqwy1bdHqeH4jF0arggL2iWGF4RFAQRgmVup+FEOEKsKLPLjQi90Nt3jQ7tFfJey20KjkRB9Tyud1Hw/Kp3mjdli1mOKPfpk/P19KKteo3HoacE+TRhUlvr/0ucSPtUhltlV5dIGRnJ+FXuC8Ahj4mlzoJeNO9k+NAbG7H7RHLYMNPdH8uK3PBS8MBef33OTXC4jXjSjl6Hp+G0pVP1HqwoCQMYFKovaUpVxubT7nZyS7Hyhb+/Ul1ksozUUBw+9T3C5KkV6F7mM5ChZSR4Vy3bGru5+NSDughT1qKDVqKjxqIjIjT0VmkVFGSTgDzp8kTK2MVyElJFbJBzkEdRVshy4UrJnTj0pTK2mIsc6lyvw/wV24PfyWLetNckhQaiIWeYptGXv6s6gwPdPy8PjUOxtwv4wcZrgzo67Abimj3PnmoirEkqsIIi2cHODnrUlpKIZFY5GV3wxH4s+HwqFwORF1Oeo8K6h6AAMArf+atASV1Y0PDFF1axwSFCxTYkkEYBXr4e796pM5Y4ZVZsYOep+NOsLiSDUUbuczQozudz/8ApfpUTMJJj3SNI7wUDY9Kvcy001OS6BK1vlt4OXIxBYgHHl6Ud4TLbFS10tmUQAaZ2XO2/jWQkGpSSRljjGDkdKtcN4ibQmKWESRDo3LBK/WuzguIWjyqmwNWhrnjuaG7i4SymJ1sASoJZJUbB+Of89KCyJZQB1We0jBAXIwdidz3d9q1/D7/AIdfQ85LNZcDSSsKtpB65zV6zeOMHk2EcemTYMET7fHyFaJYdTd1axI4qNtQdJxt3C+wQ3F0wCxxSyRGGFFA2xndj18KLR2d7cyW0t7cspZx+6QbAZx0I8/Gob6+iS5t1blcx2zpXJ1bdMt+hHWuwcSje6t4rgCSbUSFh75ZQPE9MjyrJjZxeIim9jz3EHKpNyprpv1G9rJo4DAluyhl2LsT3D558T+WKFpNJdGCzh7ruRpLDvMf5j5VB2w4zPJfRq0BjnUdyPIyuehI8/X8qj4KZI5FuJVPPkOkNkZBPQfWs06mZuw2hR5WGg5q77X39ermxseHw2dyipiQxnMjitVHewyoFU4xQqwtTZ2hkZQ0sgy5qGKJ3lxGcV5DH1oYqrlT0joj3vCcCqeHzVNJS1f8fQNah50qp6G/mpVg8G+5uyLufNibnNPZm236U63jLtiuTLok0+FevODYt2kPNjLahkVzh6ar0AkBc4JNS2uRA2ld6XDAvPbWM5Ow9aHuQmvYGB1bVT0NHKG0gkeHhWp9gleAl4tvCh/ErHcOjBD0PoaG5djP3bapmbQF1fhHQU19tNPnB5unJ64rlwoExRdgpwNVGgTq4KyL4nofCmKp5JbwBxXVA0lc7eFJFPJJ3xqGfnn+1WQUoxFEf5t/vSUApuc91j0ro2MeSDpGQPnT4hlPghzsNsnH6irBbsiSMhQuCe8W1b+IAxRLhNot4W3wpwo3++fT+1CSuCACN84ycZrRcOlW3iUrrj5eCCQN/wD5YHUnoasyYmTjDy7lC8hks7gw3JIB7wdWDZHyPx/tUQiQnJlB8ia0pFnfRPlVlyx/hvp38DiMuD08qzv7+0be2fSTtqjOcfHSM+FRrsLoV3VWVrzIkjVoypiuNLDqY2wfEdauDiV0UEa390B45lXTn4Y9M1SjvmEiq1mxAODpk3+607298/8Asrlc5OOZj6dzzptLE1aWkWMlBveP4CVgurLTu7ZBBHtG5HqDgVsezUIDTPaRwwmKP+KhDkk+BdsHHpjw2Plg142I9jbPjHuyzKQdvRB+edqOcK4rxOOxnmt7aEsScZVjy/iz5C+m/wAqClNutzJnJx+Gq1INbX77DeMyWdtc6s82W4B1ylTrcnpgk7j1+5o12W4RNe30DzFXhiALMBtn+UevrQ7sr2dveN3q8SvBOUB1NdSZy5/p8sedep2cFpboIYUWJU6AbVxOK8SUb0qb16npOFcOUIKpVV2trnWTC6R0xihF+eSGlRioXrRmeaCJOZLIFX41luLcRivG5NvnB8q4/D8NUqyzvSKOji8bGjHLvJ7IGft2fyb60ql/Zv8ASK5XczYXucv+v7HkFh/FAGd6mv4isw1DGaXC9ImXarHGnUyKcV0uoaGWsxQEDx86scDRZeMxKejPuKrwbqWAG1T8AOeMQlDhtYxVdyM9Bure5jjdI0LR598+VAb6wXkM7yDfrmvQ4bCa6hAnkCqy+8KznGeDGGyuOUBPHFku4PhSi0zy6QBr7bpqpl4Bz2PrmpIl1Xukg414qK570xzt55pwJGARk+BOPhT1bFu67bup+mf710KTbE+TVGdoh5M1WSw+VCJArAYCjp6jNLORjp3QDjxp028reYjUb/ACmxpqO7AAnOfKrQN9LstwDkkTscCTKodWDg+g3qykgRkeYKr7qWd1jO3Q9C35VWOo7Re5nYqugfNuv1NOt5uS5MUzKSd/Z48sfTJ/3qjNKLlqGba5lwxS+kfrq0WrzL165kJH2FdKxzkiae6XWu2EhQY28O7jY/byoQ07OAEt5nYd7M07NgeelcY+PSpRDdRli0NlFuTmQRasnoe/viiUu4jwz32fxsWf2c8RYNd3kapvnTGQDnHhIfI09bKIsivxbRtnVLZ4UY3+Z+FREcTYBVu7Ll9MrNAuTg+R6+vnU0fDO0cqAwaZFAxqhaMnHqVOfEUM45tjRTqZP7ji/rYNcM4PaX1wkS9qLZmZtoljCFm67Dat3bdl7OKdZ+M3kt6g9z2p8ID4HHQ/PNef8Mu+K8GhkHFeDC4hbCsZFbYAY6YIx60rvtWggEkXCktyf61XH0UUipQzwtzGgXiqsav6eGi7bO/47Hqtz2n4Bw8GI3cJAwAsI1afLpWd4120suU5t4H0g7t44+FeTzcZnunIECFjjJALdKkt4+KcTkESZJOxKjAx8qxR4bhqTzy1+Zs5+NqtKOgduO0V5xa55NoGYevhWt4a8FhYhpxquD4HrQ/gHCLXg1sGnIMxG/qatNZzyXPtjr+6HRax4nExq+SOkV9zqUMEqXmlrN/Yd7TdeRrlS/tFP+n9qVZLv3TXyl3PIuHHEy1d40iEKyHfyNULDAmX44orxYR8lTjvYzXqXucJFK3m0xFAOvnXbBuVxCNwSO8DtTLNOY49afDIIr7YAlW2B6VZR7RDdO9gOWGdQBv02qnx0CDs3dPCTG82Oh94+VXuBOt9wyOKXGpkGcbVS/4hxGy4AhhOnQQR6igRS3PJuHIbjiYQE5LE+XSqkoBnlzuN6J9n9D300k7e7DI2R54NBydXMY+PSmFl0xBeE8wZOWIbboaryREQQgfjJIonPFy+y1o3QzXDHPniobiJk/ZsbAbxh9vAE9TUKKE7l5JHOAWPhT4e6y4VWlPQNk/amxR815AUkZRk939T0A9alEkePf3H4Ic/dj0qASfRFgJDGSL2Ull6Re8R02wNga4wfQMW6W8ZbKvLqJH2x9BXbaG4lj028UUSN1IcD13ZunyxTTFaxtm7l5kinGmHvAjzLdPpmhuiRi27PQjnmjchZLiabT7qr3APkenh4V3XbiROXajOdo3lJHX5etXLeeHSyWvC1mYndp8ylTvvhcfkelWSOL55NvYrAXOpcQJE23TfA/wVWYYqcVpf16+AOlOHGrg8eemAsg8OuA1WrV/3gU9m43ZhsBzlz96ebPjJwDdPltgpvVDA9ce9Vm34d2jd/wB1c3bRLkFo5s48wRmo6kVuyeHlUeVL7jnktQhZ+E8XjB95RMdK+m69KY8UEiqycDvXPlJKSKLRcI7SsVQ310VYb6myCPnUydnu0MrEPxKQaBjfbass8dRW8kMXCayfsv8AcG8K4RPPJquFjsYf5fGtLb3nDuDRmDh450pOSV3oM/ZqXlObm/ldk8NdF+zcVnbq0TIurzPjXOxdWFSLldyt06HTw2FqUtGkvjuyezsru6lF3P7oOQlFry5KwhTtjyp0/EYIIcqRispe8Vku5dEIOPOuZGFSvK7VkjZmhDRasucxfSlQnkXP8xpVs5cPeKvU90wNoSJl0+eaJ8TSTlKzg9MbV2lXpJbnnUULSQq4welOTvXYx+JhvSpVCdD2Ps5KqQxBckhQKof8Rr2aXhBiKYUMME12lQIiMj2Ljs/Zb2W5GWERUZ8M5rJqjchj4KQD86VKmFG37U2KW/YLs7oGZZHzgDrlSf1FBu2CC04ytqjYNvaRxHHXOnp96VKrYuLuUraBFjYXchS2XpryAT8B1pslzbK6rbRczHR3GkfSlSpS1V2MW7RybnOcXd0FXfESDr/2jAHzp6PFtHZWfNZttUg1s3lhemfqaVKqm7RzDMOs0oruXo7Hjd0DAYblf6dJCrnpsNqtW3Y3jBieURyRPqwVYjvA+Oc0qVc2pjakXZI9CuF0YpXbYybsZxSJub3CunqJN1Pl0qrBwXilmzNE0sLL4o3X6VylVQxtSW4U+F0F3LQ4x2ms5URryVv5Q+9Gpu0fHLdla8tA4cAjTSpVdapFuN4rUw+EjByUW1YYvHJpi5msHTbO4quvFWkkfkQEEddqVKopRytqImWGzSSc3+5Ra7uZLgJNIVUnFaO2EccPdA+ddpUnFaqJrwcVDMkP5q0qVKlcmIXiJn//2Q==",
    title: "Study Abroad with Confidence",
  },
];

function CarouselForm() {
  const [Formvalues, setFormvalues] = useState({
    name: "",
    phoneNo: "",
    countryCode:"",
    email: "",
    country: "",
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
        <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-main">Get</span>
        <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gold-main">One to one </span>
        <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-main">free Counselling</span>
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
              className="w-full p-3 rounded-md border border-gold-main text-sm sm:text-base"
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
                <option value="+91">India (+91)</option>
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
                className="w-2/3 p-3 rounded-md border border-gold-main text-sm sm:text-base"
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
              className="w-full p-3 rounded-md border border-gold-main text-sm sm:text-base"
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
            className="w-full p-3 text-white bg-gold-main font-bold rounded-md shadow-md text-sm sm:text-base"
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
