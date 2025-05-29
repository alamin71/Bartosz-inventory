// "use client";
// import { useTranslations } from "next-intl";
// import { useEffect, useState } from "react";

// // Define the combined packages and their prices
// const combinedPackages = {
//   "1+2": 799.0,
//   "1+2+3": 949.0,
//   "1+3": 449.0,
//   "2+3": 749.0,
//   "1+4": 399.0,
//   "2+4": 699.0,
//   "1+2+3+4": 999.0,
//   "1+3+4": 499.0,
//   "2+3+4": 799.0,
//   "1+5": 899.0,
//   "2+5": 1099.0,
// };

// const TableComponent = ({ packages }) => {
//   const t = useTranslations("Packages");
//   const [inputValues, setInputValues] = useState(() => packages.map(() => "0"));
//   const [numOfPremises, setNumOfPremises] = useState(0);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [combinedPrice, setCombinedPrice] = useState(0);
//   const [finalPrice, setFinalPrice] = useState(0);
//   const [savings, setSavings] = useState(0);
//   const [totalMonthlySavings, setTotalMonthlySavings] = useState(0);
//   const [monthlySalesSavings, setMonthlySalesSavings] = useState([]);
//   const [annualSavings, setAnnualSavings] = useState(0);

//   useEffect(() => {
//     // Check if we're running on the client (browser)
//     if (typeof window !== "undefined") {
//       // Load saved data from localStorage when the component mounts
//       const savedData = localStorage.getItem("calculatedInfo");
//       if (savedData) {
//         const { inputValues, numOfPremises } = JSON.parse(savedData);
//         setInputValues(inputValues || packages.map(() => "0"));
//         setNumOfPremises(numOfPremises);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     // Calculate total price, combined price, final price, and savings
//     const totalPackagePrice = packages.reduce(
//       (acc, packageItem) => acc + packageItem.price,
//       0
//     );
//     setTotalPrice(totalPackagePrice * numOfPremises);

//     const ids = packages
//       .map((pkg) => pkg.id)
//       .sort()
//       .join("+");
//     const combinedPackagePrice = combinedPackages[ids] || null;
//     setCombinedPrice(combinedPackagePrice);

//     const finalPackagePrice = combinedPackagePrice
//       ? combinedPackagePrice * numOfPremises
//       : totalPackagePrice * numOfPremises;
//     setFinalPrice(finalPackagePrice);

//     const totalSavings = combinedPackagePrice
//       ? totalPackagePrice * numOfPremises - finalPackagePrice
//       : 0;
//     setSavings(totalSavings);
//   }, [packages, numOfPremises]);

//   useEffect(() => {
//     // Calculate monthly sales savings
//     const monthlySavings = packages
//       .filter((item) => ["1", "2", "3"].includes(item.id))
//       .map((item, index) => ({
//         ...item,
//         savings: calculateSalesSavings(
//           item,
//           parseFloat(inputValues[index]) || 0
//         ),
//       }));
//     setMonthlySalesSavings(monthlySavings);

//     const totalMonthlySalesSavings = monthlySavings.reduce(
//       (acc, item) => acc + item.savings,
//       0
//     );
//     setTotalMonthlySavings(totalMonthlySalesSavings);
//     setAnnualSavings(totalMonthlySalesSavings * 12);
//   }, [inputValues, numOfPremises]);

//   useEffect(() => {
//     // Save data to localStorage whenever relevant data changes
//     if (typeof window !== "undefined") {
//       saveToLocalStorage();
//     }
//   }, [
//     inputValues,
//     numOfPremises,
//     totalPrice,
//     combinedPrice,
//     finalPrice,
//     savings,
//     totalMonthlySavings,
//     monthlySalesSavings,
//     annualSavings,
//   ]);

//   function formatMoney(amount) {
//     return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   }

//   const handleInputChange = (index, value) => {
//     const newInputValues = [...inputValues];
//     newInputValues[index] = value === "" ? "0" : value; // Ensure 0 is set for empty input
//     setInputValues(newInputValues);
//   };

//   // const handleInputChange = (index, value) => {
//   //   // Remove commas before parsing and applying the formatMoney function
//   //   const numericValue = value.replace(/,/g, "");
//   //   const newInputValues = [...inputValues];
//   //   newInputValues[index] = formatMoney(numericValue);
//   //   setInputValues(newInputValues);
//   // };

//   const handleNumOfPremisesChange = (value) => {
//     setNumOfPremises(parseInt(value, 10) || 0);
//   };

//   const calculateSalesSavings = (packageItem, input) => {
//     let savings = 0;
//     if (input && input > 0) {
//       switch (packageItem.id) {
//         case "1":
//           savings = (input * 0.125 - packageItem.price + 300) * numOfPremises;
//           break;
//         case "2":
//           savings = (input * 0.15 - packageItem.price + 750) * numOfPremises;
//           break;
//         case "3":
//           savings = (input * 0.05 - packageItem.price + 150) * numOfPremises;
//           break;
//         default:
//           savings = 0;
//       }
//     }
//     return savings;
//   };

//   const saveToLocalStorage = () => {
//     const calculatedInfo = {
//       inputValues,
//       numOfPremises,
//     };
//     localStorage.setItem("calculatedInfo", JSON.stringify(calculatedInfo));
//   };

//   const emailValues = {
//     inputValues,
//     numOfPremises,
//     packages,
//     totalPrice,
//     combinedPrice,
//     finalPrice,
//     savings,
//     monthlySalesSavings,
//     totalMonthlySavings,
//     annualSavings: totalMonthlySavings * 12,
//   };

//   if (typeof window !== "undefined") {
//     localStorage.setItem("emailValues", JSON.stringify(emailValues));
//   }

//   return (
//     <div className="mx-auto text-black text-base sm:text-lg space-y-5">
//       <div className="bg-white rounded-lg p-4">
//         <p className="my-3 text-xl sm:text-2xl font-semibold text-center mb-5">
//           {t("calculated-monthly-revenue")}:
//         </p>
//         {packages.map((item, index) => (
//           <div className="flex justify-between gap-2 items-center " key={index}>
//             <p className="mb-1 text-xs sm:text-base">{t(`${item.problem}`)}</p>
//             <hr className="border-x border-dashed w-1/4 sm:w-1/3 ml-5 border-gray-400" />
//             {item.id === "1" || item.id === "2" || item.id === "3" ? (
//               <input
//                 type="text"
//                 value={inputValues[index]}
//                 onChange={(e) => handleInputChange(index, e.target.value)}
//                 className="w-16 sm:w-40 h-5 border rounded border-black font-semibold py-3 mb-1 text-center"
//               />
//             ) : (
//               <p className="mb-1 items-center">--</p>
//             )}
//           </div>
//         ))}
//         <div className="flex justify-between gap-2 items-center">
//           <p className="text-xs sm:text-base">{t("premises")}</p>
//           <hr className="border-x border-dashed w-1/4 sm:w-1/3 ml-5 border-gray-400" />
//           <input
//             type="number"
//             placeholder="Type your premises number"
//             min={1}
//             value={numOfPremises || ""}
//             onChange={(e) => handleNumOfPremisesChange(e.target.value)}
//             className="w-16 sm:w-40 h-5 border rounded border-black font-light py-3 text-center placeholder:text-sm"
//           />
//         </div>
//       </div>

//       {monthlySalesSavings && monthlySalesSavings.length > 0 && (
//         <div className="bg-white rounded-lg p-4">
//           <p className="my-3 text-xl sm:text-2xl font-semibold text-center mb-5">
//             {t("expected-savings")}:
//           </p>
//           {monthlySalesSavings
//             .filter((item) => ["1", "2", "3"].includes(item.id))
//             .map((item, index) => (
//               <div
//                 className="flex justify-between gap-4 items-center"
//                 key={index}
//               >
//                 <p className="mb-1 text-xs sm:text-base">
//                   {t(`${item.package}`)}
//                 </p>
//                 <hr className="border-x border-dashed w-1/4 sm:w-1/2 border-gray-400" />
//                 <div className="mb-1 font-semibold">
//                   ${formatMoney(item.savings)}
//                 </div>
//               </div>
//             ))}
//           <div className="mt-3">
//             <div className="flex justify-between items-center mb-1">
//               <p className=" text-xs sm:text-base">{t("monthly-savings")}</p>
//               <hr className="border-x border-dashed w-1/4 sm:w-1/3 pl-20 border-gray-400" />
//               <p className="font-bold">${formatMoney(totalMonthlySavings)}</p>
//             </div>
//             <div className="flex justify-between items-center mb-1">
//               <p className=" text-xs sm:text-base">{t("annual-savings")}</p>
//               <hr className="border-x border-dashed w-1/4 sm:w-1/3 pl-10 border-gray-400" />
//               <p className="font-bold">
//                 ${formatMoney(totalMonthlySavings * 12)}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="bg-white rounded-lg p-4">
//         <p className="my-3 text-xl sm:text-2xl font-semibold text-center mb-5">
//           {t("selected-packages")}:
//         </p>
//         {packages.map((item, index) => (
//           <div className="flex justify-between gap-4 items-center" key={index}>
//             <div className="mb-1 text-xs sm:text-base">
//               {t(`${item.package}`)}
//             </div>
//             <hr className="border-x border-dashed w-1/4 sm:w-1/3 border-gray-400" />
//             <div className="mb-1 font-semibold">
//               ${formatMoney(item.price * numOfPremises)}
//             </div>
//           </div>
//         ))}
//         <div className="mt-3">
//           <div className="flex justify-between items-center mb-1">
//             <p className=" text-xs sm:text-base">{t("total")}</p>
//             <hr className="border-x border-dashed w-1/4 sm:w-1/3 pl-20 border-gray-400" />
//             <p className="font-bold">${formatMoney(totalPrice)}</p>
//           </div>
//           {combinedPrice && (
//             <div className="flex justify-between items-center mb-1">
//               <p className="text-xs sm:text-base">{t("package-price")}</p>
//               <hr className="border-x border-dashed w-1/4 sm:w-1/3 pl-10 border-gray-400" />
//               <p className="font-bold">${formatMoney(finalPrice)}</p>
//             </div>
//           )}
//           {combinedPrice && (
//             <div className="flex justify-between items-center mb-1">
//               <p className=" text-xs sm:text-base">{t("save")}</p>
//               <hr className="border-x border-dashed w-1/4 sm:w-1/3 mx-10 border-gray-400" />
//               <p className="font-bold">${formatMoney(savings)}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TableComponent;

"use client";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const combinedPackages = {
  "1+2": 799.0,
  "1+2+3": 949.0,
  "1+3": 449.0,
  "2+3": 749.0,
  "1+4": 399.0,
  "2+4": 699.0,
  "1+2+3+4": 999.0,
  "1+3+4": 499.0,
  "2+3+4": 799.0,
  "1+5": 899.0,
  "2+5": 1099.0,
};

const TableComponent = ({ packages }) => {
  const t = useTranslations("Packages");
  const [inputValues, setInputValues] = useState(() => packages.map(() => "0"));
  const [numOfPremises, setNumOfPremises] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [combinedPrice, setCombinedPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [savings, setSavings] = useState(0);
  const [totalMonthlySavings, setTotalMonthlySavings] = useState(0);
  const [monthlySalesSavings, setMonthlySalesSavings] = useState([]);
  const [annualSavings, setAnnualSavings] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("calculatedInfo");
      if (savedData) {
        const { inputValues, numOfPremises } = JSON.parse(savedData);
        setInputValues(inputValues || packages.map(() => "0"));
        setNumOfPremises(numOfPremises);
      }
    }
  }, []);

  useEffect(() => {
    const totalPackagePrice = packages.reduce((acc, pkg) => acc + pkg.price, 0);
    setTotalPrice(totalPackagePrice * numOfPremises);

    const ids = packages
      .map((pkg) => pkg.id)
      .sort()
      .join("+");
    const combinedPackagePrice = combinedPackages[ids] || null;
    setCombinedPrice(combinedPackagePrice);

    const finalPackagePrice = combinedPackagePrice
      ? combinedPackagePrice * numOfPremises
      : totalPackagePrice * numOfPremises;
    setFinalPrice(finalPackagePrice);

    const totalSavings = combinedPackagePrice
      ? totalPackagePrice * numOfPremises - finalPackagePrice
      : 0;
    setSavings(totalSavings);
  }, [packages, numOfPremises]);

  useEffect(() => {
    const monthlySavings = packages
      .filter((item) => ["1", "2", "3"].includes(item.id))
      .map((item, index) => ({
        ...item,
        savings: calculateSalesSavings(
          item,
          parseFloat(inputValues[index]) || 0
        ),
      }));
    setMonthlySalesSavings(monthlySavings);

    const totalMonthlySalesSavings = monthlySavings.reduce(
      (acc, item) => acc + item.savings,
      0
    );
    setTotalMonthlySavings(totalMonthlySalesSavings);
    setAnnualSavings(totalMonthlySalesSavings * 12);
  }, [inputValues, numOfPremises]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      saveToLocalStorage();
    }
  }, [
    inputValues,
    numOfPremises,
    totalPrice,
    combinedPrice,
    finalPrice,
    savings,
    totalMonthlySavings,
    monthlySalesSavings,
    annualSavings,
  ]);

  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value === "" ? "0" : value;
    setInputValues(newInputValues);
  };

  const handleNumOfPremisesChange = (value) => {
    setNumOfPremises(parseInt(value, 10) || 0);
  };

  const formatMoney = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const calculateSalesSavings = (packageItem, input) => {
    let savings = 0;
    if (input && input > 0) {
      switch (packageItem.id) {
        case "1":
          savings = (input * 0.125 - packageItem.price + 300) * numOfPremises;
          break;
        case "2":
          savings = (input * 0.15 - packageItem.price + 750) * numOfPremises;
          break;
        case "3":
          savings = (input * 0.05 - packageItem.price + 150) * numOfPremises;
          break;
        default:
          savings = 0;
      }
    }
    return savings;
  };

  const saveToLocalStorage = () => {
    const calculatedInfo = {
      inputValues,
      numOfPremises,
    };
    localStorage.setItem("calculatedInfo", JSON.stringify(calculatedInfo));
  };

  const emailValues = {
    inputValues,
    numOfPremises,
    packages,
    totalPrice,
    combinedPrice,
    finalPrice,
    savings,
    monthlySalesSavings,
    totalMonthlySavings,
    annualSavings: totalMonthlySavings * 12,
  };

  if (typeof window !== "undefined") {
    localStorage.setItem("emailValues", JSON.stringify(emailValues));
  }

  return (
    <div className="mx-auto text-black text-base sm:text-lg space-y-5">
      <div className="bg-white rounded-lg p-4">
        <p className="my-3 text-xl sm:text-2xl font-semibold text-center mb-5">
          {t("calculated-monthly-revenue")}:
        </p>
        {packages.map((item, index) => (
          <div className="flex justify-between gap-2 items-center" key={index}>
            <p className="mb-1 text-right text-xs sm:text-base w-1/2">
              {t(`${item.problem}`)}
            </p>
            {["1", "2", "3"].includes(item.id) ? (
              <input
                type="text"
                value={inputValues[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="w-16 sm:w-40 h-5 border rounded border-black font-semibold py-3 mb-1 text-center"
              />
            ) : (
              <p className="mb-1 text-center w-16 sm:w-40">--</p>
            )}
          </div>
        ))}
        <div className="flex justify-between gap-2 items-center">
          <p className="text-right text-xs sm:text-base w-1/2">
            {t("premises")}
          </p>
          <input
            type="number"
            placeholder="Type your premises number"
            min={1}
            value={numOfPremises || ""}
            onChange={(e) => handleNumOfPremisesChange(e.target.value)}
            className="w-16 sm:w-40 h-5 border rounded border-black font-light py-3 text-center placeholder:text-sm"
          />
        </div>
      </div>

      {monthlySalesSavings && monthlySalesSavings.length > 0 && (
        <div className="bg-white rounded-lg p-4">
          <p className="my-3 text-xl sm:text-2xl font-semibold text-center mb-5">
            {t("expected-savings")}:
          </p>
          {monthlySalesSavings
            .filter((item) => ["1", "2", "3"].includes(item.id))
            .map((item, index) => (
              <div
                className="flex justify-between gap-4 items-center"
                key={index}
              >
                <p className="mb-1 text-right text-xs sm:text-base w-1/2">
                  {t(`${item.package}`)}
                </p>
                <div className="mb-1 font-semibold text-left w-1/4">
                  ${formatMoney(item.savings)}
                </div>
              </div>
            ))}
          <div className="mt-3">
            <div className="flex justify-between items-center mb-1">
              <p className="text-right text-xs sm:text-base w-1/2">
                {t("monthly-savings")}
              </p>
              <p className="font-bold text-left w-1/4">
                ${formatMoney(totalMonthlySavings)}
              </p>
            </div>
            <div className="flex justify-between items-center mb-1">
              <p className="text-right text-xs sm:text-base w-1/2">
                {t("annual-savings")}
              </p>
              <p className="font-bold text-left w-1/4">
                ${formatMoney(totalMonthlySavings * 12)}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg p-4">
        <p className="my-3 text-xl sm:text-2xl font-semibold text-center mb-5">
          {t("selected-packages")}:
        </p>
        {packages.map((item, index) => (
          <div className="flex justify-between gap-4 items-center" key={index}>
            <p className="text-right text-xs sm:text-base w-1/2">
              {t(`${item.package}`)}
            </p>
            <p className="font-semibold text-left w-1/4">
              ${formatMoney(item.price * numOfPremises)}
            </p>
          </div>
        ))}
        <div className="mt-3">
          <div className="flex justify-between items-center mb-1">
            <p className="text-right text-xs sm:text-base w-1/2">
              {t("total")}
            </p>
            <p className="font-bold text-left w-1/4">
              ${formatMoney(totalPrice)}
            </p>
          </div>
          {combinedPrice && (
            <div className="flex justify-between items-center mb-1">
              <p className="text-right text-xs sm:text-base w-1/2">
                {t("package-price")}
              </p>
              <p className="font-bold text-left w-1/4">
                ${formatMoney(finalPrice)}
              </p>
            </div>
          )}
          {combinedPrice && (
            <div className="flex justify-between items-center mb-1">
              <p className="text-right text-xs sm:text-base w-1/2">
                {t("save")}
              </p>
              <p className="font-bold text-left w-1/4">
                ${formatMoney(savings)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableComponent;

// "use client";
// import { useTranslations } from "next-intl";
// import { useEffect, useState } from "react";

// const combinedPackages = {
//   "1+2": 799.0,
//   "1+2+3": 949.0,
//   "1+3": 449.0,
//   "2+3": 749.0,
//   "1+4": 399.0,
//   "2+4": 699.0,
//   "1+2+3+4": 999.0,
//   "1+3+4": 499.0,
//   "2+3+4": 799.0,
//   "1+5": 899.0,
//   "2+5": 1099.0,
// };

// const TableComponent = ({ packages }) => {
//   const t = useTranslations("Packages");
//   const [inputValues, setInputValues] = useState(() => packages.map(() => "0"));
//   const [numOfPremises, setNumOfPremises] = useState(0);
//   const [monthlySalesTotal, setMonthlySalesTotal] = useState(0);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [combinedPrice, setCombinedPrice] = useState(0);
//   const [finalPrice, setFinalPrice] = useState(0);
//   const [savings, setSavings] = useState(0);
//   const [totalMonthlySavings, setTotalMonthlySavings] = useState(0);
//   const [monthlySalesSavings, setMonthlySalesSavings] = useState([]);
//   const [annualSavings, setAnnualSavings] = useState(0);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const savedData = localStorage.getItem("calculatedInfo");
//       if (savedData) {
//         const { inputValues, numOfPremises } = JSON.parse(savedData);
//         setInputValues(inputValues || packages.map(() => "0"));
//         setNumOfPremises(numOfPremises);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     const beverage = parseFloat(inputValues[0]) || 0;
//     const food = parseFloat(inputValues[1]) || 0;
//     setMonthlySalesTotal((beverage + food) * numOfPremises);
//   }, [inputValues, numOfPremises]);

//   useEffect(() => {
//     const totalPackagePrice = packages.reduce((acc, pkg) => acc + pkg.price, 0);
//     setTotalPrice(totalPackagePrice * numOfPremises);

//     const ids = packages
//       .map((pkg) => pkg.id)
//       .sort()
//       .join("+");
//     const combinedPackagePrice = combinedPackages[ids] || null;
//     setCombinedPrice(combinedPackagePrice);

//     const finalPackagePrice = combinedPackagePrice
//       ? combinedPackagePrice * numOfPremises
//       : totalPackagePrice * numOfPremises;
//     setFinalPrice(finalPackagePrice);

//     const totalSavings = combinedPackagePrice
//       ? totalPackagePrice * numOfPremises - finalPackagePrice
//       : 0;
//     setSavings(Math.floor(totalSavings));
//   }, [packages, numOfPremises]);

//   useEffect(() => {
//     const monthlySavings = packages
//       .filter((item) => ["1", "2", "3"].includes(item.id))
//       .map((item, index) => ({
//         ...item,
//         savings: Math.floor(
//           calculateSalesSavings(item, parseFloat(inputValues[index]) || 0)
//         ),
//       }));
//     setMonthlySalesSavings(monthlySavings);

//     const totalMonthlySalesSavings = Math.floor(
//       monthlySavings.reduce((acc, item) => acc + item.savings, 0)
//     );
//     setTotalMonthlySavings(totalMonthlySalesSavings);
//     setAnnualSavings(totalMonthlySalesSavings * 12);
//   }, [inputValues, numOfPremises]);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       saveToLocalStorage();
//     }
//   }, [
//     inputValues,
//     numOfPremises,
//     totalPrice,
//     combinedPrice,
//     finalPrice,
//     savings,
//     totalMonthlySavings,
//     monthlySalesSavings,
//     annualSavings,
//   ]);

//   const handleInputChange = (index, value) => {
//     const newInputValues = [...inputValues];
//     newInputValues[index] = value === "" ? "0" : value;
//     setInputValues(newInputValues);
//   };

//   const handleNumOfPremisesChange = (value) => {
//     setNumOfPremises(parseInt(value, 10) || 0);
//   };

//   const formatMoney = (amount) => {
//     return Math.floor(amount)
//       .toString()
//       .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   };

//   const calculateSalesSavings = (packageItem, input) => {
//     let savings = 0;
//     if (input && input > 0) {
//       switch (packageItem.id) {
//         case "1":
//           savings = (input * 0.125 - packageItem.price + 300) * numOfPremises;
//           break;
//         case "2":
//           savings = (input * 0.15 - packageItem.price + 750) * numOfPremises;
//           break;
//         case "3":
//           savings = (input * 0.05 - packageItem.price + 150) * numOfPremises;
//           break;
//         default:
//           savings = 0;
//       }
//     }
//     return savings;
//   };

//   const saveToLocalStorage = () => {
//     const calculatedInfo = {
//       inputValues,
//       numOfPremises,
//     };
//     localStorage.setItem("calculatedInfo", JSON.stringify(calculatedInfo));
//   };

//   const emailValues = {
//     inputValues,
//     numOfPremises,
//     packages,
//     totalPrice,
//     combinedPrice,
//     finalPrice,
//     savings,
//     monthlySalesSavings,
//     totalMonthlySavings,
//     annualSavings: totalMonthlySavings * 12,
//   };

//   if (typeof window !== "undefined") {
//     localStorage.setItem("emailValues", JSON.stringify(emailValues));
//   }

//   return (
//     <div className="mx-auto text-black text-base sm:text-lg space-y-5">
//       <div className="bg-white rounded-lg p-4">
//         <p className="my-3 text-xl sm:text-2xl font-semibold text-center mb-5">
//           {t("calculated-monthly-revenue")}:
//         </p>
//         {packages.map((item, index) => (
//           <div className="flex justify-between gap-2 items-center" key={index}>
//             <p className="mb-1 text-right text-xs sm:text-base w-1/2">
//               {t(`${item.problem}`)}
//             </p>
//             {["1", "2", "3"].includes(item.id) ? (
//               <input
//                 type="text"
//                 value={inputValues[index]}
//                 onChange={(e) => handleInputChange(index, e.target.value)}
//                 className="w-16 sm:w-40 h-5 border rounded border-black font-semibold py-3 mb-1 text-center"
//               />
//             ) : (
//               <p className="mb-1 text-center w-16 sm:w-40">--</p>
//             )}
//           </div>
//         ))}
//         <div className="flex justify-between gap-2 items-center">
//           <p className="text-right text-xs sm:text-base w-1/2">
//             {t("premises")}
//           </p>
//           <input
//             type="number"
//             placeholder="Type your premises number"
//             min={1}
//             value={numOfPremises || ""}
//             onChange={(e) => handleNumOfPremisesChange(e.target.value)}
//             className="w-16 sm:w-40 h-5 border rounded border-black font-light py-3 text-center placeholder:text-sm"
//           />
//         </div>
//         <div className="flex justify-between gap-2 items-center">
//           <p className="text-right text-xs sm:text-base w-1/2">
//             My monthly sales in total is
//           </p>
//           <p className="font-semibold text-left w-1/4">
//             ${formatMoney(monthlySalesTotal)}
//           </p>
//         </div>
//       </div>

//       {monthlySalesSavings.length > 0 && (
//         <div className="bg-white rounded-lg p-4">
//           <p className="my-3 text-xl sm:text-2xl font-semibold text-center mb-5">
//             {t("expected-savings")}:
//           </p>
//           {monthlySalesSavings.map((item, index) => (
//             <div
//               className="flex justify-between gap-4 items-center"
//               key={index}
//             >
//               <p className="mb-1 text-right text-xs sm:text-base w-1/2">
//                 {t(`${item.package}`)}
//               </p>
//               <div className="mb-1 font-semibold text-left w-1/4">
//                 ${formatMoney(item.savings)}
//               </div>
//             </div>
//           ))}
//           <div className="mt-3">
//             <div className="flex justify-between items-center mb-1">
//               <p className="text-right text-xs sm:text-base w-1/2">
//                 {t("monthly-savings")}
//               </p>
//               <p className="font-bold text-left w-1/4">
//                 ${formatMoney(totalMonthlySavings)}
//               </p>
//             </div>
//             <div className="flex justify-between items-center mb-1">
//               <p className="text-right text-xs sm:text-base w-1/2">
//                 {t("annual-savings")}
//               </p>
//               <p className="font-bold text-left w-1/4">
//                 ${formatMoney(totalMonthlySavings * 12)}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="bg-white rounded-lg p-4">
//         <p className="my-3 text-xl sm:text-2xl font-semibold text-center mb-5">
//           {t("selected-packages")}:
//         </p>
//         {packages.map((item, index) => (
//           <div className="flex justify-between gap-4 items-center" key={index}>
//             <p className="text-right text-xs sm:text-base w-1/2">
//               {t(`${item.package}`)}
//             </p>
//             <p className="font-semibold text-left w-1/4">
//               ${formatMoney(item.price * numOfPremises)}
//             </p>
//           </div>
//         ))}
//         <div className="mt-3">
//           <div className="flex justify-between items-center mb-1">
//             <p className="text-right text-xs sm:text-base w-1/2">
//               {t("total")}
//             </p>
//             <p className="font-bold text-left w-1/4">
//               ${formatMoney(totalPrice)}
//             </p>
//           </div>
//           {combinedPrice && (
//             <div className="flex justify-between items-center mb-1">
//               <p className="text-right text-xs sm:text-base w-1/2">
//                 {t("package-price")}
//               </p>
//               <p className="font-bold text-left w-1/4">
//                 ${formatMoney(finalPrice)}
//               </p>
//             </div>
//           )}
//           {combinedPrice && (
//             <div className="flex justify-between items-center mb-1">
//               <p className="text-right text-xs sm:text-base w-1/2">
//                 {t("save")}
//               </p>
//               <p className="font-bold text-left w-1/4">
//                 ${formatMoney(savings)}
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TableComponent;
