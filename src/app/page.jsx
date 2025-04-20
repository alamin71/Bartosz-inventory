"use client";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import homeImage from "../../public/images/homeImage.png";

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

  function formatMoney(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const [excelData, setExcelData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const sheetId = "1pa0Gzbo6mW_IAuuWgfWpfBsG76ESrJX0OkItWiXltpE";
    const sheetRange = "Values"; // Change this to your sheet's name
    const sheetURL = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetRange}?key=${process.env.NEXT_PUBLIC_GOOGLE_SHEET_API_KEY}`;

    const fetchData = async () => {
      try {
        const response = await fetch(sheetURL);
        const result = await response.json();
        const rows = result.values;

        // Get the header (first row) and the rest of the data
        const header = rows[0];
        const dataRows = rows.slice(1); // Data rows after the header

        // Filter data for specific rows based on the first column (description)
        const filteredData = dataRows.filter((row) =>
          [
            "[In prevented losses] Cost reduction (starting value)",
            "[In improved revenue] Revenue increase (starting value)",
            "[Reduced hours of work] Manhour reduction (starting value)",
          ].includes(row[0])
        );

        // Set filtered data in state
        setExcelData({ header, filteredData });
      } catch (error) {
        setError("Failed to load data");
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!excelData) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <p>Loading data...</p>{" "}
      </div>
    ); // Show loading text while data is fetched
  }

  return (
    <div className="flex flex-col xl:justify-center lg:flex-row gap-4 md:gap-64 xl:gap-28 lg:gap-12 lg:h-[calc(100vh-80px)] bg-black/95 sm:px-8 md:px-16 lg:px-10 sm:py-20">
      {/* Left side */}
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
              <button className="text-white text-xs sm:text-xs md:text-base lg:text-2xl rounded-3xl px-4 sm:px-8 md:px-12 lg:px-14 py-2 sm:py-3 md:py-5 lg:py-8 bg-[#CC006E] hover:bg-[#f51a88] normal-case">
                <div className="flex gap-1 md:gap-2 items-center">
                  <p>{t("check-your-benefits")}</p>
                  <ArrowForwardIcon />
                </div>
              </button>
              {/* <Button className="text-white text-xs sm:text-xs md:text-base lg:text-2xl rounded-3xl px-4 sm:px-8 md:px-12 lg:px-14 py-2 sm:py-3 md:py-5 lg:py-8 bg-[#CC006E] hover:bg-[#f51a88] normal-case">
                <div className="flex gap-1 md:gap-2 items-center">
                  <p>{t("check-your-benefits")}</p>
                  <ArrowForwardIcon />
                </div>
              </Button> */}
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

      {/* Right side */}
      <div className="flex flex-col text-white text-end gap-5 lg:mt-16 px-1 md:px-12 lg:px-4">
        <div className="w-full lg:w-80 flex flex-col px-4 sm:px-0 text-[#FF0079]">
          <div className="overflow-hidden">
            <p className="text-3xl lg:text-4xl font-bold">29.58%</p>
          </div>
          {/* <p className="text-lg lg:text-xl my-2">{t("which-is")}</p> */}
          <div className="overflow-hidden">
            <p className="text-3xl lg:text-4xl font-bold">
              = $ {formatMoney(Math.floor(total))}
            </p>
          </div>
          <p className="text-xl font-semibold mb-2">
            {/* {t("until-now")} <br /> */}
            {t("our-clients-increased")}
          </p>
          {/* <p className="text-lg lg:text-2xl mt-6 mb-4">
            {t("that-comes-from")}
          </p> */}
        </div>

        <div className="flex flex-col gap-5 px-4 sm:px-0">
          <p className="text-lg"> {t("details")} :</p>
          <div className="flex flex-col gap-1 overflow-hidden">
            <p className="text-2xl lg:text-3xl font-bold">
              {/* $ {formatMoney(Math.floor(values.revenue))} */}
              {excelData?.filteredData[0][2]}
            </p>
            <p className="text-lg lg:text-xl">{t("improved-revenue")}</p>
          </div>
          <div className="flex flex-col overflow-hidden">
            <p className="text-2xl lg:text-3xl font-bold">
              {/* $ {formatMoney(Math.floor(values.losses))} */}
              {excelData?.filteredData[1][2]}
            </p>
            <p className="text-lg lg:text-xl">{t("prevented-losses")}</p>
          </div>
          <div className="flex flex-col overflow-hidden">
            <p className="text-2xl lg:text-3xl font-bold">
              {/* h {formatMoney(Math.floor(values.workHours))} */}h{" "}
              {excelData?.filteredData[2][2]}
            </p>
            <p className="text-lg lg:text-xl">{t("reduced-hours")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
