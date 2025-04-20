"use client";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiInfo } from "react-icons/fi";
import bgImage from "../../../public/images/bgImage.png";
import packageData from "../../utils/packages";

export default function PackagePath() {
  const t = useTranslations("Packages");
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [isPrimaryPackageSelected, setIsPrimaryPackageSelected] =
    useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDescription, setModalDescription] = useState("");
  const [modalWhatGet, setModalWhatGet] = useState([]);

  const handleInfoClick = (content, whatGet) => {
    console.log("🚀 ~ handleInfoClick ~ whatGet:", whatGet);
    const whatGetItems = whatGet.split(".");
    setModalDescription(content);
    setModalWhatGet(whatGetItems);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalDescription("");
    setIsModalOpen(false);
  };
  const router = useRouter();

  const handlePackageSelect = (event) => {
    const value = event.target.value;
    const packageObject = packageData.find((item) => item.package === value);

    if (event.target.checked) {
      setSelectedPackages((prevSelected) => [...prevSelected, packageObject]);
    } else {
      setSelectedPackages((prevSelected) =>
        prevSelected.filter((item) => item.package !== value)
      );
    }

    const primaryPackages = ["1-package", "2-package"];
    const isPrimarySelected = primaryPackages.some(
      (pkg) => pkg === value && event.target.checked
    );

    if (!event.target.checked && primaryPackages.includes(value)) {
      console.log(value);
      setIsPrimaryPackageSelected(
        selectedPackages.some(
          (pkg) =>
            primaryPackages.includes(pkg.package) && pkg.package !== value
        )
      );
    } else if (isPrimarySelected) {
      setIsPrimaryPackageSelected(true);
    }
  };

  const handleCheckOut = () => {
    const selectedPackagesString = JSON.stringify(selectedPackages);
    localStorage.setItem("selectedPackages", selectedPackagesString);
    router.push("/priceList");
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center bg-black/90">
      <div className="w-full">
        <Image
          src={bgImage}
          alt="bg-image"
          fill
          className="object-cover absolute mix-blend-overlay w-full h-full"
        />
        <div className="relative z-10 text-white flex flex-col items-center py-6">
          <p className="text-3xl sm:text-5xl font-medium mb-2 text-center">
            {t("starting-title-front")} <br /> {t("starting-title-end")}
          </p>
          <hr
            className="w-3/5 sm:w-[540px] mr-6"
            style={{ borderTop: "2px solid #FF0060" }}
          />
          <hr className="w-3/5 sm:w-[540px] mt-2 ml-10 border-t-2" />
        </div>
      </div>
      <div className="w-full max-w-screen-xl px-4 sm:px-8 py-6 z-10">
        <div className="flex flex-wrap w-full -mx-2">
          {packageData.map((item) => {
            const isDependentPackage = [
              // "4-package",
              "5-package",
              "6-package",
            ].includes(item.package);
            const isDisabled = isDependentPackage && !isPrimaryPackageSelected;

            return (
              <div
                key={item.id}
                className="w-full sm:w-1/2 p-2 min-w-[50%] max-w-[50%]"
              >
                <FormControl
                  className={`flex flex-col justify-between bg-white h-40 sm:h-48 lg:h-40 p-4 rounded-lg mb-8 ${
                    isDisabled ? "opacity-50" : ""
                  }`}
                >
                  <div className="flex justify-between">
                    <FormLabel className={`text-lg text-black w-11/12`}>
                      {t(`${item.oneLiner}`)}
                    </FormLabel>
                    <FiInfo
                      size={24}
                      className="cursor-pointer"
                      onClick={() =>
                        handleInfoClick(
                          t(`${item.description}`),
                          t(`${item.whatGet}`)
                        )
                      }
                    />
                  </div>
                  <FormControlLabel
                    className={`text-lg`}
                    control={
                      <Checkbox
                        checked={selectedPackages.some(
                          (pkg) => pkg.package === item.package
                        )}
                        onChange={handlePackageSelect}
                        value={item.package}
                        disabled={isDisabled}
                      />
                    }
                    label={"* " + t(`${item.package}`)}
                    labelPlacement="start"
                    classes={{ root: "flex-row-reverse justify-between" }}
                  />
                </FormControl>
              </div>
            );
          })}
        </div>
      </div>

      <Button
        className="bg-[#E60056] rounded-lg py-4 px-8 sm:py-6 sm:px-20 text-white text-base sm:text-xl normal-case hover:bg-[#ad0b44] mb-6"
        onClick={handleCheckOut}
        disabled={selectedPackages.length === 0}
      >
        {t("button-1")}
      </Button>

      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>{t("info")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {modalDescription}
            <h4 className="font-semibold mt-2 text-black">
              {t("what-you-get-title")}
            </h4>
            {modalWhatGet
              ?.slice(0, modalWhatGet.length - 1)
              .map((item, index) => (
                <li key={index}>{item.trim()}</li> // trim to remove any leading or trailing spaces
              ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            {t("button-2")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
