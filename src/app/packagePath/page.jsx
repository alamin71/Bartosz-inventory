// "use client";
// import {
//   Button,
//   Checkbox,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
// } from "@mui/material";
// import { useTranslations } from "next-intl";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import bgImage from "../../../public/images/bgImage.png";
// import packageData from "../../utils/packages";
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// import DownloadIcon from "@mui/icons-material/Download";

// export default function PackagePath() {
//   const t = useTranslations("Packages");
//   const [selectedPackages, setSelectedPackages] = useState([]);
//   const [isPrimaryPackageSelected, setIsPrimaryPackageSelected] =
//     useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalDescription, setModalDescription] = useState("");
//   const [modalWhatGet, setModalWhatGet] = useState([]);
//   const [modalPackageName, setModalPackageName] = useState("");

//   const handleInfoClick = (packageName, content, whatGet) => {
//     const whatGetItems = whatGet.split(".");
//     setModalDescription(content);
//     setModalWhatGet(whatGetItems);
//     setModalPackageName(packageName);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalDescription("");
//     setIsModalOpen(false);
//   };

//   const router = useRouter();

//   const handlePackageSelect = (event) => {
//     const value = event.target.value;
//     const packageObject = packageData.find((item) => item.package === value);

//     if (event.target.checked) {
//       setSelectedPackages((prev) => [...prev, packageObject]);
//     } else {
//       setSelectedPackages((prev) =>
//         prev.filter((item) => item.package !== value)
//       );
//     }

//     const primaryPackages = ["1-package", "2-package"];
//     const isPrimarySelected = primaryPackages.some(
//       (pkg) => pkg === value && event.target.checked
//     );

//     if (!event.target.checked && primaryPackages.includes(value)) {
//       setIsPrimaryPackageSelected(
//         selectedPackages.some(
//           (pkg) =>
//             primaryPackages.includes(pkg.package) && pkg.package !== value
//         )
//       );
//     } else if (isPrimarySelected) {
//       setIsPrimaryPackageSelected(true);
//     }
//   };

//   const handleCheckOut = () => {
//     const selectedPackagesString = JSON.stringify(selectedPackages);
//     localStorage.setItem("selectedPackages", selectedPackagesString);
//     router.push("/priceList");
//   };

//   return (
//     <div className="relative w-full min-h-screen flex flex-col items-center bg-black/90">
//       <div className="w-full">
//         <Image
//           src={bgImage}
//           alt="bg-image"
//           fill
//           className="object-cover absolute mix-blend-overlay w-full h-full"
//         />
//         <div className="relative z-10 text-white flex flex-col items-center py-6">
//           <p className="text-3xl sm:text-5xl font-medium mb-2 text-center">
//             {t("starting-title-front")} <br /> {t("starting-title-end")}
//           </p>
//           <hr
//             className="w-3/5 sm:w-[540px] mr-6"
//             style={{ borderTop: "2px solid #FF0060" }}
//           />
//           <hr className="w-3/5 sm:w-[540px] mt-2 ml-10 border-t-2" />
//         </div>
//       </div>

//       <div className="w-full max-w-screen-xl px-4 sm:px-8 py-6 z-10">
//         <div className="flex flex-wrap w-full -mx-2">
//           {packageData.map((item) => {
//             const isDependentPackage =
//               ["5-package", "6-package"].includes(item.package) &&
//               !isPrimaryPackageSelected;
//             const isSelected = selectedPackages.some(
//               (pkg) => pkg.package === item.package
//             );
//             const isDisabled = isDependentPackage && !isPrimaryPackageSelected;

//             return (
//               <div key={item.id} className="w-full sm:w-1/2 p-2">
//                 <div
//                   className={`flex gap-4 items-start p-4 rounded-lg mb-6 transition-all duration-300 ${
//                     isSelected ? "bg-[#FFB3D1]" : "bg-white"
//                   } ${isDisabled ? "opacity-50" : ""}`}
//                 >
//                   {/* Image left side */}
//                   <div className="border rounded-lg border-black px-2">
//                     <Image
//                       src={item.image}
//                       alt="package-image"
//                       width={100}
//                       height={120}
//                       className="object-contain w-56 h-60"
//                     />
//                   </div>

//                   {/* Right side text + checkbox */}
//                   <div className="flex flex-col justify-between w-full">
//                     <div>
//                       <p className="text-black font-semibold text-base mb-1">
//                         Package: {t(item.package)}
//                       </p>
//                       <p className="text-sm text-black mt-16">
//                         {t(item.oneLiner)}
//                       </p>

//                       <p className="text-sm text-black mt-8 select-none">
//                         <span
//                           onClick={() =>
//                             handleInfoClick(
//                               t(item.package),
//                               t(item.description),
//                               t(item.whatGet)
//                             )
//                           }
//                           className="inline-flex items-center cursor-pointer"
//                           style={{ padding: 0, margin: 0, lineHeight: 1 }}
//                         >
//                           <InfoOutlinedIcon
//                             sx={{
//                               fontSize: 18,
//                               color: "#FF0060",
//                               mr: "2px",
//                               flexShrink: 0,
//                             }}
//                           />
//                           More package information
//                         </span>
//                       </p>
//                     </div>

//                     <div className="flex justify-end mt-4">
//                       <Checkbox
//                         sx={{
//                           color: "#FF0060",
//                           "&.Mui-checked": {
//                             color: "#FF0060",
//                           },
//                         }}
//                         checked={isSelected}
//                         onChange={handlePackageSelect}
//                         value={item.package}
//                         disabled={isDisabled}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       <Button
//         className="bg-[#E60056] rounded-lg py-4 px-8 sm:py-6 sm:px-20 text-white text-base sm:text-xl normal-case hover:bg-[#ad0b44] mb-6"
//         onClick={handleCheckOut}
//         disabled={selectedPackages.length === 0}
//       >
//         {t("button-1")}
//       </Button>

//       <Dialog
//         open={isModalOpen}
//         onClose={handleCloseModal}
//         maxWidth="sm"
//         fullWidth
//       >
//         <div className="p-6">
//           {/* Package Title */}
//           <p className="text-black text-base font-medium mb-1">
//             Package: <span className="font-semibold">{modalPackageName}</span>
//           </p>
//           <div className="w-[150px] h-[2px] bg-[#ff008a] mb-4" />

//           {/* Description */}
//           <p className="text-black text-sm mb-4">{modalDescription}</p>

//           {/* What you get */}
//           <h4 className="text-black font-semibold text-base mb-2">
//             {t("what-you-get-title")}
//           </h4>
//           <ul className="list-disc pl-5 text-sm text-black space-y-1">
//             {modalWhatGet
//               ?.slice(0, modalWhatGet.length - 1)
//               .map((item, index) => (
//                 <li key={index}>{item.trim()}</li>
//               ))}
//           </ul>

//           {/* Why Clients Love This Package - Toggle */}
//           <div className="mt-6">
//             <button
//               onClick={() =>
//                 document
//                   .getElementById("testimonialSection")
//                   ?.classList.toggle("hidden")
//               }
//               className="text-[#ff008a] text-md font-medium underline underline-offset-2 hover:text-[#d40070]"
//             >
//               Why Clients Love This Package
//             </button>

//             {/* Testimonial Scroll Section */}
//             <div
//               id="testimonialSection"
//               className="hidden mt-4 max-h-[350px] overflow-y-auto space-y-4"
//             >
//               {[1, 2, 3, 4, 5].map((n) => (
//                 <div
//                   key={n}
//                   className="flex gap-4 p-4 border border-pink-600 rounded-xl bg-white shadow-sm"
//                 >
//                   {/* Left Side: Image + Name/Title */}
//                   <div className="w-24 flex flex-col items-center text-center">
//                     <div className="w-24 h-24 border border-gray-400 rounded-full flex items-center justify-center text-xs text-gray-600">
//                       Profile <br /> Picture
//                     </div>
//                     <div className="mt-2">
//                       <p className="font-bold text-sm text-black">
//                         Bartosz Kowalski
//                       </p>
//                       <p className="text-sm text-black leading-tight">
//                         Bar Manager <br />
//                         Klar Cocktails & Pizza
//                       </p>
//                     </div>
//                   </div>

//                   {/* Right Side: Description */}
//                   <div className="flex-1 flex items-center">
//                     <p className="italic text-gray-700 text-sm leading-relaxed">
//                       "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
//                       sed do eiusmod tempor incididunt ut labore et dolore magna
//                       aliqua. Ut enim ad minim veniam, quis nostrud exercitation
//                       ullamco laboris nisi ut aliquip ex ea commodo consequat.
//                       Duis aute irure dolor in reprehenderit (...)”
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* case study link */}
//           <div className="flex flex-col  gap-4 mt-6">
//             {/* Button 1 */}
//             <a
//               href="/downloads/case-study-restaurant.pdf" // change this path as needed
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center px-4 py-2 bg-[#ff008a] text-white rounded-lg text-sm hover:bg-[#d40070] transition-all"
//             >
//               <DownloadIcon sx={{ fontSize: 18, marginRight: "6px" }} />
//               $288 000 saved at Cocktail & Grill Restaurant – case study
//             </a>

//             {/* Button 2 */}
//             <a
//               href="/downloads/case-study-hotel.pdf" // change this path as needed
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center px-4 py-2 bg-[#ff008a] text-white rounded-lg text-sm hover:bg-[#d40070] transition-all"
//             >
//               <DownloadIcon sx={{ fontSize: 18, marginRight: "6px" }} />
//               $122 000 saved at a 5-star hotel – case study
//             </a>
//           </div>
//           {/* Close Button */}

//           <div className="flex justify-end mt-8">
//             <button
//               onClick={handleCloseModal}
//               className="text-[#ff008a] border border-[#ff008a] text-sm font-medium px-5 py-2 rounded-full hover:text-white hover:bg-[#ff008a] transition-all duration-300"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </Dialog>
//     </div>
//   );
// }
"use client";
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import bgImage from "../../../public/images/bgImage.png";
import packageData from "../../utils/packages";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function PackagePath() {
  const t = useTranslations("Packages");
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [isPrimaryPackageSelected, setIsPrimaryPackageSelected] =
    useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDescription, setModalDescription] = useState("");
  const [modalWhatGet, setModalWhatGet] = useState([]);
  const [modalPackageName, setModalPackageName] = useState("");

  const handleInfoClick = (packageName, content, whatGet) => {
    const whatGetItems = whatGet.split(".");
    setModalDescription(content);
    setModalWhatGet(whatGetItems);
    setModalPackageName(packageName);
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
      setSelectedPackages((prev) => [...prev, packageObject]);
    } else {
      setSelectedPackages((prev) =>
        prev.filter((item) => item.package !== value)
      );
    }

    const primaryPackages = ["1-package", "2-package"];
    const isPrimarySelected = primaryPackages.some(
      (pkg) => pkg === value && event.target.checked
    );

    if (!event.target.checked && primaryPackages.includes(value)) {
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
            const isDependentPackage =
              ["5-package", "6-package"].includes(item.package) &&
              !isPrimaryPackageSelected;
            const isSelected = selectedPackages.some(
              (pkg) => pkg.package === item.package
            );
            const isDisabled = isDependentPackage && !isPrimaryPackageSelected;

            return (
              <div key={item.id} className="w-full sm:w-1/2 p-2">
                <div
                  className={`flex gap-4 items-start p-4 rounded-lg mb-6 transition-all duration-300 ${
                    isSelected ? "bg-[#FFB3D1]" : "bg-white"
                  } ${isDisabled ? "opacity-50" : ""}`}
                >
                  <div className="border rounded-lg border-black px-2">
                    <Image
                      src={item.image}
                      alt="package-image"
                      width={100}
                      height={120}
                      className="object-contain w-56 h-60"
                    />
                  </div>

                  <div className="flex flex-col justify-between w-full">
                    <div>
                      <p className="text-black font-semibold text-base mb-1">
                        {t("package-label")} {t(item.package)}
                      </p>
                      <p className="text-sm text-black mt-16">
                        {t(item.oneLiner)}
                      </p>

                      <p className="text-sm text-black mt-8 select-none">
                        <span
                          onClick={() =>
                            handleInfoClick(
                              t(item.package),
                              t(item.description),
                              t(item.whatGet)
                            )
                          }
                          className="inline-flex items-center cursor-pointer"
                          style={{ padding: 0, margin: 0, lineHeight: 1 }}
                        >
                          <InfoOutlinedIcon
                            sx={{
                              fontSize: 18,
                              color: "#FF0060",
                              mr: "2px",
                              flexShrink: 0,
                            }}
                          />
                          {t("more-package-info")}
                        </span>
                      </p>
                    </div>

                    <div className="flex justify-end mt-4">
                      <Checkbox
                        sx={{
                          color: "#FF0060",
                          "&.Mui-checked": {
                            color: "#FF0060",
                          },
                        }}
                        checked={isSelected}
                        onChange={handlePackageSelect}
                        value={item.package}
                        disabled={isDisabled}
                      />
                    </div>
                  </div>
                </div>
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

      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <div className="p-6">
          <p className="text-black text-base font-medium mb-1">
            {t("package-label")}{" "}
            <span className="font-semibold">{modalPackageName}</span>
          </p>
          <div className="w-[150px] h-[2px] bg-[#ff008a] mb-4" />

          <p className="text-black text-sm mb-4">{modalDescription}</p>

          <h4 className="text-black font-semibold text-base mb-2">
            {t("what-you-get-title")}
          </h4>
          <ul className="list-disc pl-5 text-sm text-black space-y-1">
            {modalWhatGet
              ?.slice(0, modalWhatGet.length - 1)
              .map((item, index) => (
                <li key={index}>{item.trim()}</li>
              ))}
          </ul>

          <div className="mt-6">
            <button
              onClick={() =>
                document
                  .getElementById("testimonialSection")
                  ?.classList.toggle("hidden")
              }
              className="text-[#ff008a] text-md font-medium underline underline-offset-2 hover:text-[#d40070]"
            >
              {t("Why Clients Love This Package")}
            </button>

            <div
              id="testimonialSection"
              className="hidden mt-4 max-h-[350px] overflow-y-auto space-y-4"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <div
                  key={n}
                  className="flex gap-4 p-4 border border-pink-600 rounded-xl bg-white shadow-sm"
                >
                  <div className="w-24 flex flex-col items-center text-center">
                    <div className="w-24 h-24 border border-gray-400 rounded-full flex items-center justify-center text-xs text-gray-600">
                      Profile <br /> Picture
                    </div>
                    <div className="mt-2">
                      <p className="font-bold text-sm text-black">
                        Bartosz Kowalski
                      </p>
                      <p className="text-sm text-black leading-tight">
                        Bar Manager <br />
                        Klar Cocktails & Pizza
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 flex items-center">
                    <p className="italic text-gray-700 text-sm leading-relaxed">
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit (...)”"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col  gap-4 mt-6">
            <a
              href="/downloads/case-study-restaurant.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-[#ff008a] text-white rounded-lg text-sm hover:bg-[#d40070] transition-all"
            >
              Download Case Study - Restaurant
            </a>

            <a
              href="/downloads/case-study-hotel.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-[#ff008a] text-white rounded-lg text-sm hover:bg-[#d40070] transition-all"
            >
              Download Case Study - Hotel
            </a>
          </div>

          <div className="flex justify-end mt-8">
            <button
              onClick={handleCloseModal}
              className="text-[#ff008a] border border-[#ff008a] text-sm font-medium px-5 py-2 rounded-full hover:text-white hover:bg-[#ff008a] transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
