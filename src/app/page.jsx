"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import homeImage from "../../public/images/homeImage.png";
import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");
  const initialValues = {
    total: 0,
    revenue: 0,
    losses: 0,
    workHours: 0,
  };
  // Record the start time
  const [startTime] = useState(Date.now());
  console.log(startTime);
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    // Update values based on elapsed time
    const updateValues = () => {
      const elapsedSeconds = Math.floor(Date.now() / 1000);
      setValues({
        total: initialValues.total + elapsedSeconds * 0.4,
        revenue: initialValues.revenue + elapsedSeconds * (2 / 5) * 0.5,
        losses: initialValues.losses + elapsedSeconds * (3 / 5) * 0.5,
        workHours: initialValues.workHours + Math.floor(elapsedSeconds / 60),
      });
    };

    // Use requestAnimationFrame for smoother updates
    const updateLoop = () => {
      updateValues();
      requestAnimationFrame(updateLoop);
    };

    // Start the loop
    updateLoop();

    return () => cancelAnimationFrame(updateLoop); // Cleanup on unmount
  }, [startTime]);

  const total = values.revenue + values.losses;

  return (
    <div className="flex flex-col xl:justify-center lg:flex-row gap-4 md:gap-64 xl:gap-28 lg:gap-12 lg:h-[calc(100vh-80px)] bg-black/95 sm:px-8 md:px-16 lg:px-10 sm:py-20">
      <div className="bg-white/10 flex-grow lg:flex-grow-0 rounded-lg mt-5 lg:mt-16 lg:h-[56%] md:h-[480px] ">
        <div className="relative h-64 sm:h-[400px] md:h-[480px] lg:h-full rounded-lg overflow-hidden ">
          <Image
            src={homeImage}
            alt="bg-image"
            layout="fill"
            objectFit="cover"
            className="absolute mix-blend-overlay"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Link href="/salesTool">
              <Button className="text-white text-xs sm:text-xs md:text-base lg:text-2xl rounded-3xl px-4 sm:px-8 md:px-12 lg:px-14 py-2 sm:py-3 md:py-5 lg:py-8 bg-[#CC006E] hover:bg-[#f51a88] normal-case">
                <div className="flex gap-1 md:gap-2 items-center">
                  <p>{t("check-your-benefits")}</p>
                  <ArrowForwardIcon />
                </div>
              </Button>
            </Link>
          </div>
        </div>
        <div className="text-white py-4 sm:py-8 md:py-10 lg:py-10 px-3 md:px-12 lg:px-8">
          <p className="text-xl lg:text-3xl">{t("horecaAI-menu")}:</p>
          <div className="mt-2 flex flex-col gap-2">
            <p className="text-lg lg:text-xl">
              {t("point-1")}{" "}
              <span className="text-2xl lg:text-3xl font-bold">20%</span>
            </p>
            <p className="text-lg lg:text-xl">{t("point-2")}</p>
            <p className="text-lg lg:text-xl">
              {t("point-3")}{" "}
              <span className="text-2xl lg:text-3xl font-bold">50%</span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col text-white lg:mt-16 px-1 md:px-12 lg:px-4">
        <div className="w-full sm:w-80 flex flex-col gap-1 px-4 sm:px-0">
          <p className="text-xl lg:text-2xl font-semibold mb-2">
            {t("until-now")} <br />
            {t("our-clients-increased")}
          </p>
          <div className="overflow-hidden">
            <p className="text-3xl lg:text-5xl font-semibold">29.58%</p>
          </div>
          <p className="text-lg lg:text-xl my-2">{t("which-is")}</p>
          <div className="overflow-hidden">
            <p className="text-3xl lg:text-4xl font-bold">
              {Math.floor(total)} USD
            </p>
          </div>
          <p className="text-lg lg:text-2xl mt-6 mb-4">
            {t("that-comes-from")}
          </p>
        </div>

        <div className="flex flex-col gap-5 px-4 sm:px-0">
          <div className="flex flex-col gap-1 overflow-hidden">
            <p className="text-3xl lg:text-5xl font-bold">
              ${Math.floor(values.revenue)}
            </p>
            <p className="text-lg lg:text-xl">{t("improved-revenue")}</p>
          </div>
          <div className="flex flex-col gap-1 overflow-hidden">
            <p className="text-3xl lg:text-5xl font-bold">
              ${Math.floor(values.losses)}
            </p>
            <p className="text-lg lg:text-xl">{t("prevented-losses")}</p>
          </div>
          <div className="flex flex-col gap-1 overflow-hidden">
            <p className="text-3xl lg:text-5xl font-bold">
              {Math.floor(values.workHours)}
            </p>
            <p className="text-lg lg:text-xl">{t("reduced-hours")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
