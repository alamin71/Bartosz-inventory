"use client";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import homeImage from "../../public/images/home1.jpeg";

export default function Home() {
  const t = useTranslations("HomePage");

  const [excelData, setExcelData] = useState(null);
  const [error, setError] = useState("");
  const images = [
    "/images/home2.jpeg",
    "/images/home1.jpeg",
    "/images/home3.jpeg",
  ];
  const [randomImage, setRandomImage] = useState(images[0]);

  // useEffect(() => {
  //   const index = Math.floor(Math.random() * images.length);
  //   setRandomImage(images[index]);
  // }, []);
  useEffect(() => {
    const changeImage = () => {
      const index = Math.floor(Math.random() * images.length);
      setRandomImage(images[index]);
    };

    changeImage(); // initial
    const interval = setInterval(changeImage, 5000); // every 05 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const sheetId = "1pa0Gzbo6mW_IAuuWgfWpfBsG76ESrJX0OkItWiXltpE";
    const sheetRange = "Values";
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_SHEET_API_KEY;

    if (!apiKey) {
      setError("Google Sheets API key missing");
      return;
    }

    const sheetURL = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetRange}?key=${apiKey}`;

    const fetchData = async () => {
      try {
        const response = await fetch(sheetURL);
        if (!response.ok) throw new Error("Failed to fetch sheet data");
        const result = await response.json();

        const rows = result.values;
        if (!rows || rows.length === 0) {
          setError("Sheet is empty");
          return;
        }

        const dataRows = rows.slice(1);

        const targetRows = {
          improvedRevenue: dataRows.find((row) =>
            row[0].includes("Revenue increase")
          ),
          preventedLosses: dataRows.find((row) =>
            row[0].includes("Cost reduction")
          ),
          reducedHours: dataRows.find((row) =>
            row[0].includes("Manhour reduction")
          ),
        };
        // Simulate delay
        // setTimeout(() => {
        //   setExcelData(targetRows);
        // }, 1000); // 1 second delay
        setExcelData(targetRows);
      } catch (error) {
        setError("Failed to load data");
        console.error(error);
      }
    };

    fetchData();
  }, []);

  function formatMoney(amount) {
    if (!amount) return "0";
    const num = parseFloat(amount.toString().replace(/[^0-9.-]+/g, ""));
    if (isNaN(num)) return amount;
    return num.toLocaleString("en-US", { maximumFractionDigits: 2 });
  }

  function getNumericValue(value) {
    return parseFloat(value?.toString().replace(/[^0-9.-]+/g, "")) || 0;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  if (!excelData?.improvedRevenue) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black">
        <div className="w-16 h-16 border-4 border-pink-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  const improved = getNumericValue(excelData.improvedRevenue?.[2]);
  const prevented = getNumericValue(excelData.preventedLosses?.[2]);
  const reduced = getNumericValue(excelData.reducedHours?.[2]);

  const totalValue = improved + prevented;

  return (
    <div className="flex flex-col xl:justify-center lg:flex-row gap-4 md:gap-64 xl:gap-28 lg:gap-12 lg:h-[calc(100vh-80px)] bg-black/95 sm:px-8 md:px-16 lg:px-10 sm:py-20 text-white">
      {/* left side */}
      <div className="bg-white/10 flex-grow lg:flex-grow-0 rounded-lg mt-5 lg:mt-16 lg:h-[58%] md:h-[480px] ">
        <div className="relative h-64 sm:h-[400px] md:h-[480px] lg:h-full rounded-lg overflow-hidden">
          <div className="absolute inset-0 transition-opacity duration-1000 opacity-100">
            <Image
              key={randomImage} // key triggers re-render with animation
              src={randomImage}
              alt="bg-image"
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              style={{ objectPosition: "center" }}
              className="rounded-lg"
            />
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <Link href="/salesTool">
              <button className="text-white text-xs sm:text-xs md:text-base lg:text-2xl rounded-3xl px-4 sm:px-8 md:px-12 lg:px-14 py-2 sm:py-3 md:py-5 lg:py-8 bg-[#CC006E] hover:bg-[#f51a88] normal-case">
                <div className="flex gap-1 md:gap-2 items-center">
                  <p>{t("check-your-benefits")}</p>
                  <ArrowForwardIcon />
                </div>
              </button>
            </Link>
          </div>
        </div>
        <div className="text-white py-4 sm:py-8 md:py-10 lg:py-10 px-3 md:px-12 lg:px-8">
          <p className="text-xl lg:text-2xl md:-ml-7">{t("horecaAI-menu")}:</p>
          <div className="mt-2 flex flex-col">
            <p className="sm:text-lg lg:text-xl">
              {t("point-1")}{" "}
              <span className="text-xl lg:text-2xl font-bold">20%</span>
            </p>
            <p className="sm:text-lg lg:text-xl">
              {t("point-2")}{" "}
              <span className="text-xl lg:text-2xl font-bold">50%</span>
            </p>
            <p className="sm:text-lg lg:text-xl">{t("point-3")}</p>
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="flex flex-col text-white text-end gap-5 lg:mt-16 px-1 md:px-12 lg:px-4">
        <div className="w-full lg:w-80 flex flex-col px-4 sm:px-0 text-[#FF0079]">
          <p className="text-2xl font-extrabold leading-snug">
            {t("Our clients have increased")}
          </p>
          <p className="text-2xl font-extrabold leading-snug mb-4">
            {t("their profits by")}
          </p>

          {/* Hardcoded Percentage */}
          <p className="text-3xl lg:text-4xl font-extrabold">29.58%</p>

          {/* Dynamic Sum */}
          <p className="text-3xl lg:text-4xl font-bold mb-10">
            = ${formatMoney(totalValue)}
          </p>
        </div>

        <div className="flex flex-col gap-5 px-4 sm:px-0">
          <p className="text-2xl font-extrabold mb-4 text-white">
            {t("That comes from")}
          </p>

          <div className="flex flex-col gap-1 overflow-hidden">
            <p className="text-2xl lg:text-3xl font-bold">
              $ {formatMoney(improved)}
            </p>
            <p className="text-lg lg:text-xl">{t("improved-revenue")}</p>
          </div>

          <div className="flex flex-col overflow-hidden">
            <p className="text-2xl lg:text-3xl font-bold">
              $ {formatMoney(prevented)}
            </p>
            <p className="text-lg lg:text-xl">{t("prevented-losses")}</p>
          </div>

          <div className="flex flex-col overflow-hidden">
            <p className="text-2xl lg:text-3xl font-bold">
              {formatMoney(reduced)}
            </p>
            <p className="text-lg lg:text-xl">{t("reduced-hours")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
