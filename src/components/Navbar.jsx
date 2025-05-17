"use client";

import LanguageIcon from "@mui/icons-material/Language";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import logo from "../../public/images/logo.png";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [language, setLanguage] = useState("en");
  const cookies = new Cookies();
  const router = useRouter();
  const open = Boolean(anchorEl);

  useEffect(() => {
    const savedLang = cookies.get("NEXT_LOCALE") || "en";
    setLanguage(savedLang);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (lang) => {
    setAnchorEl(null);
    if (lang && lang !== language) {
      setLanguage(lang);
      cookies.set("NEXT_LOCALE", lang, { path: "/" });
      router.refresh(); // Refresh the data and re-render the page content
    }
  };

  return (
    <div className="bg-black h-28 w-full text-white px-3 sm:px-10 lg:pl-3 xl:px-32 md:pl-4 flex gap-10 justify-between items-center">
      <Link href="/">
        <div className="py-2">
          <Image
            src={logo}
            alt="logo"
            width={250}
            // height={60}
            className="hover:opacity-80 transition-opacity duration-300"
            priority
          />
        </div>
      </Link>
      {/* Menu */}
      {/* <div className="hidden sm:flex items-center space-x-4 sm:space-x-6 md:space-x-4 lg:space-x-10 lg:text-base sm:text-xs ">
        <Link href="/users" passHref>
          <div className="hover:text-gray-300 transition-colors duration-300">
            Users
          </div>
        </Link>
        <Link href="/solution" passHref>
          <div className="hover:text-gray-300 transition-colors duration-300">
            Solution
          </div>
        </Link>
        <Link href="/company" passHref>
          <div className="hover:text-gray-300 transition-colors duration-300">
            Company
          </div>
        </Link>
        <Link href="/login" passHref>
          <div className="hover:text-gray-300 transition-colors duration-300">
            Log In
          </div>
        </Link>
      </div> */}
      <div>
        <Button
          aria-controls="language-menu"
          aria-haspopup="true"
          onClick={handleClick}
          endIcon={<LanguageIcon />} // Moved the icon to the end for dropdown look
          style={{
            color: "white",
            backgroundColor: "#333",
            borderRadius: "8px",
            padding: "8px 12px",
          }} // Adjusted styles for a better look
          className="text-white hover:bg-gray-600 transition-colors duration-300 text-sm"
        >
          {language === "en" ? "English" : "Polish"}
        </Button>
        <Menu
          id="language-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={() => setAnchorEl(null)}
          PaperProps={{
            style: {
              borderRadius: "8px",
              backgroundColor: "#333",
              color: "white",
              marginTop: "5px",
            },
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <MenuItem
            onClick={() => handleClose("en")}
            style={{ color: "white" }}
          >
            {/* <GTranslateIcon style={{ marginRight: 8 }} /> */}
            <Image
              src="/images/uk.png"
              height={30}
              width={30}
              alt="uk-flag"
              className="mr-2"
            />
            English
          </MenuItem>
          <MenuItem
            onClick={() => handleClose("pl")}
            style={{ color: "white" }}
          >
            {/* <TranslateIcon style={{ marginRight: 8 }} /> */}
            <Image
              src="/images/poland.png"
              height={30}
              width={30}
              alt="uk-flag"
              className="mr-2"
            />
            Polish
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
