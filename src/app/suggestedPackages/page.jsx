"use client"
import React, { useEffect, useState } from "react";
import bgImage from "../../../public/images/bgImage.png";
import Image from "next/image";
import PackageTable from "../../components/PackageTable";
import Link from "next/link";
import { Button } from "@mui/material";
import packageData from "../../utils/packages";
import { useRouter } from "next/navigation";
import {useTranslations} from 'next-intl';

export default function SuggestedPackages() {
  const t = useTranslations('Packages');
  const [answers, setAnswers] = useState([]);
  const [suggestedPackages, setSuggestedPackages] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAnswers = localStorage.getItem("answers");
      if (storedAnswers) {
        const parsedAnswers = JSON.parse(storedAnswers);
        const trueAnswers = parsedAnswers.filter(answer => answer.answer === true);

        if (trueAnswers.length === 0) {
          router.push("/questions");
        }
        setAnswers(trueAnswers);
      }
    }
  }, []);

  useEffect(() => {
    const filteredPackages = packageData.filter((item) => {
      return answers.some((answer) => {
        return item.id === answer.id;
      });
    });

    setSuggestedPackages(filteredPackages);

    if (typeof window !== "undefined") {
      localStorage.setItem("selectedPackages", JSON.stringify(filteredPackages));
    }
  }, [answers]);

  return (
    <div>
      <div className="relative h-[calc(100vh-80px)] bg-black/70 px-96 py-8 rounded-lg">
        <Image
          src={bgImage}
          alt="bg-image"
          fill
          className="object-cover absolute mix-blend-overlay"
        />
        <div className="text-white bg-black/80 flex flex-col p-8 items-center">
          <div className="py-4">
            <p className="text-5xl font-bold text-center">{t('title')}</p>
            <hr className="w-[540px] border-t-2 border-[#FF0060] mt-2" />
            <hr className="w-[540px] mt-2 ml-12 border-t-2" />
          </div>
          <div className="rounded-lg mx-40 mb-4 p-4 w-3/4">
            <PackageTable packages={suggestedPackages} />
          </div>
          <Link href="/priceList">
            <Button className="bg-[#E60056] rounded-lg py-3 px-8 text-white text-xl normal-case hover:bg-[#ad0b44]">
              {t('button-1')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}