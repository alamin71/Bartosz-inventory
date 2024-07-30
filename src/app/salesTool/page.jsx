import React from "react";
import bgImage from "../../../public/images/bgImage.png";
import Image from "next/image";
import Link from "next/link";
import { LuPackageOpen } from "react-icons/lu";
import { FaQuestionCircle } from "react-icons/fa";
import {useTranslations} from 'next-intl';
import { Button } from "@mui/material";

export default function SalesTool() {
  const t = useTranslations('SalesTool');
  return (
    <div>
      <div className="relative w-full h-[calc(100vh-80px)] bg-black/90">
        <Image
          src={bgImage}
          alt="bg-image"
          fill
          className="object-cover absolute mix-blend-overlay"
        />
        <div className="text-white flex flex-col items-center pt-48">
          <p className="text-7xl font-bold">{t('title')}</p>
          <hr className="w-[540px] mr-20 border-t-2 border-[#FF0060]" />
          <hr className="w-[540px] mt-2 ml-20 border-t-2" />
          <div className="flex mt-20 gap-6 mx-64">
            <Button className="h-36 w-full normal-case	">
              <Link href="/packagePath">
                <div className="flex gap-2 text-2xl items-center pl-12 pr-8 py-12 rounded-lg bg-white hover:bg-white">
                  <p className="text-4xl text-black font-semibold">
                  {t('choose-results')}
                  </p>
                  <LuPackageOpen size={100} style={{ color: "black" }} />
                </div>
              </Link>
            </Button>
            <Button className="h-36 w-full bg-transparent text-white normal-case">
              <Link href="/questions">
                <div className="flex gap-2 text-2xl items-center pl-12 pr-8 py-10 rounded-lg border-4 border-[#FF0060] ">
                  <p className="text-4xl">
                  {t('answer-questions')}
                  </p>
                  <FaQuestionCircle size={100} style={{ color: "white" }} />
                </div>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

