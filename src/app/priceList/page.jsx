"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import bgImage from "../../../public/images/bgImage.png";
import TableComponent from "../../components/Table";
import EmailModal from "../../components/emailInputModal";

export default function PriceList() {
  const t = useTranslations("PriceList");
  const router = useRouter();
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  // useEffect(() => {
  //   const selectedPackagesString = localStorage.getItem("selectedPackages");
  //   if (selectedPackagesString) {
  //     const packagesArray = JSON.parse(selectedPackagesString);
  //     setSelectedPackages(packagesArray);
  //   } else {
  //     router.push("/");
  //   }
  // }, []);

  useEffect(() => {
    const selectedPackagesString = localStorage.getItem("selectedPackages");
    if (selectedPackagesString) {
      const packagesArray = JSON.parse(selectedPackagesString);
      setSelectedPackages(packagesArray);

      // Calculate the total price and store emailValues in localStorage
      const emailValues = {
        packages: packagesArray,
        totalPrice: packagesArray.reduce((acc, pkg) => acc + pkg.price, 0),
      };

      localStorage.setItem("emailValues", JSON.stringify(emailValues)); // Store emailValues
    } else {
      router.push("/"); // Redirect if no packages are selected
    }
  }, []);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false);
    localStorage.clear();
    setSelectedPackages([]);
    router.push("/");
  };

  const handleSave = async (email) => {
    try {
      // Retrieve the value from localStorage, which should be the email data
      const value = localStorage.getItem("emailValues");
      console.log("Email Values:", value);

      if (!value) {
        alert("Email values are missing!");
        return;
      }

      // Convert 'value' to a valid JSON object if needed (in case it's a string)
      const parsedValue = JSON.parse(value);

      // Send the email request to the backend
      const response = await axios.post("/api/email-jobs", {
        email,
        value: JSON.stringify(parsedValue), // Ensure 'value' is passed as a stringified JSON
      });

      if (response.status === 200) {
        setSuccessModalOpen(true);
        setIsModalOpen(false);
        setTimeout(handleSuccessModalClose, 3000);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing the order.");
    }
  };

  return (
    <div>
      <div className="relative min-h-screen bg-black/70 px-4 py-10 sm:px-10 lg:px-24 xl:px-48 rounded-lg">
        <Image
          src={bgImage}
          alt="bg-image"
          fill
          className="object-cover absolute mix-blend-overlay"
        />
        <div className="relative z-10 text-white bg-black/80 rounded-lg flex flex-col p-4 sm:p-8 items-center">
          <div className="my-2 sm:my-6 text-center">
            <p className="text-2xl sm:text-5xl font-bold">{t("title")}</p>
            <hr className="w-3/4 sm:w-[540px] border-t-2 border-[#FF0060] mt-2 mx-auto" />
            <hr className="w-3/4 sm:w-[540px] mt-2 mx-auto border-t-2" />
          </div>
          <div className=" rounded-lg mb-6 w-full sm:w-3/4">
            <TableComponent packages={selectedPackages} />
            <p className="text-sm sm:text-2xl font-semibold text-black text-end mt-4">
              {t("conclusion")}
            </p>
          </div>

          <Button
            className="bg-[#E60056] rounded-lg py-2 sm:py-3 px-6 sm:px-8 text-white text-base sm:text-xl normal-case hover:bg-[#ad0b44]"
            onClick={handleModalOpen}
          >
            {t("button-1")}
          </Button>
        </div>
      </div>
      <EmailModal
        open={isModalOpen}
        handleClose={handleModalClose}
        handleSave={handleSave}
      />
      <Dialog open={successModalOpen} onClose={handleSuccessModalClose}>
        <DialogTitle>
          <Typography variant="h4" style={{ color: "#852d85" }}>
            Success!
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ color: "#1976D2" }}>
            Your order has been placed successfully! You will be sent an email
            regarding the next procedure. You will be redirected shortly.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSuccessModalClose}
            style={{ backgroundColor: "#4CAF50", color: "white" }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
