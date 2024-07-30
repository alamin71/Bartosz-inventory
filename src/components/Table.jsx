"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

// Define the combined packages and their prices
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
  const [inputValues, setInputValues] = useState(packages.map(() => ""));
  const [numOfPremises, setNumOfPremises] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [combinedPrice, setCombinedPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [savings, setSavings] = useState(0);
  const [totalMonthlySavings, setTotalMonthlySavings] = useState(0);
  const [monthlySalesSavings, setMonthlySalesSavings] = useState([]);
  const [annualSavings, setAnnualSavings] = useState(0);

  useEffect(() => {
    // Check if we're running on the client (browser)
    if (typeof window !== "undefined") {
      // Load saved data from localStorage when the component mounts
      const savedData = localStorage.getItem("calculatedInfo");
      if (savedData) {
        const { inputValues, numOfPremises } = JSON.parse(savedData);
        setInputValues(inputValues);
        setNumOfPremises(numOfPremises);
      }
    }
  }, []);

  useEffect(() => {
    // Calculate total price, combined price, final price, and savings
    const totalPackagePrice = packages.reduce(
      (acc, packageItem) => acc + packageItem.price,
      0
    );
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
    // Calculate monthly sales savings
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
    // Save data to localStorage whenever relevant data changes
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
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  const handleNumOfPremisesChange = (value) => {
    setNumOfPremises(parseInt(value, 10) || 0);
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
    <div className="mx-auto text-black text-base sm:text-lg">
      <div>
        {packages.map((item, index) => (
          <div className="flex justify-between gap-2 items-center" key={index}>
            <p className="mb-1 text-xs sm:text-base">{t(`${item.problem}`)}</p>
            <hr className="border-x border-dashed w-1/4 sm:w-1/3 ml-5 border-gray-400" />
            {item.id === "1" || item.id === "2" || item.id === "3" ? (
              <input
                type="text"
                value={inputValues[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="w-16 sm:w-32 h-5 border rounded border-black font-semibold py-3 mb-1 text-center"
              />
            ) : (
              <p className="mb-1 items-center">--</p>
            )}
          </div>
        ))}
        <div className="flex justify-between gap-2 items-center">
          <p className="text-xs sm:text-base">{t("premises")}</p>
          <hr className="border-x border-dashed w-1/4 sm:w-1/3 ml-5 border-gray-400" />
          <input
            type="number"
            min={1}
            value={numOfPremises}
            onChange={(e) => handleNumOfPremisesChange(e.target.value)}
            className="w-16 sm:w-32 h-5 border rounded border-black font-semibold py-3 text-center"
          />
        </div>
      </div>
      <div>
        <p className="my-3 text-xl sm:text-2xl font-semibold">
          {t("selected-packages")}:
        </p>
        {packages.map((item, index) => (
          <div className="flex justify-between gap-4 items-center" key={index}>
            <div className="mb-1 text-xs sm:text-base">
              {t(`${item.package}`)}
            </div>
            <hr className="border-x border-dashed w-1/4 sm:w-1/3 border-gray-400" />
            <div className="mb-1 font-semibold">
              ${(item.price * numOfPremises).toFixed(2)}
            </div>
          </div>
        ))}
        <div className="mt-3">
          <div className="flex justify-between items-center mb-1">
            <p className=" text-xs sm:text-base">{t("total")}</p>
            <hr className="border-x border-dashed w-1/4 sm:w-1/3 pl-20 border-gray-400" />
            <p className="font-bold">${totalPrice.toFixed(2)}</p>
          </div>
          {combinedPrice && (
            <div className="flex justify-between items-center mb-1">
              <p className="text-xs sm:text-base">{t("package-price")}</p>
              <hr className="border-x border-dashed w-1/4 sm:w-1/3 pl-10 border-gray-400" />
              <p className="font-bold">${finalPrice.toFixed(2)}</p>
            </div>
          )}
          {combinedPrice && (
            <div className="flex justify-between items-center mb-1">
              <p className=" text-xs sm:text-base">{t("save")}</p>
              <hr className="border-x border-dashed w-1/4 sm:w-1/3 mx-10 border-gray-400" />
              <p className="font-bold">${savings.toFixed(2)}</p>
            </div>
          )}
        </div>
      </div>
      {monthlySalesSavings && monthlySalesSavings.length > 0 && (
        <div>
          <p className="my-3 text-xl sm:text-2xl font-semibold">
            {t("expected-savings")}:
          </p>
          {monthlySalesSavings
            .filter((item) => ["1", "2", "3"].includes(item.id))
            .map((item, index) => (
              <div
                className="flex justify-between gap-4 items-center"
                key={index}
              >
                <p className="mb-1 text-xs sm:text-base">
                  {t(`${item.package}`)}
                </p>
                <hr className="border-x border-dashed w-1/4 sm:w-1/2 border-gray-400" />
                <div className="mb-1 font-semibold">
                  ${item.savings.toFixed(2)}
                </div>
              </div>
            ))}
          <div className="mt-3">
            <div className="flex justify-between items-center mb-1">
              <p className=" text-xs sm:text-base">{t("monthly-savings")}</p>
              <hr className="border-x border-dashed w-1/4 sm:w-1/3 pl-20 border-gray-400" />
              <p className="font-bold">${totalMonthlySavings.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center mb-1">
              <p className=" text-xs sm:text-base">{t("annual-savings")}</p>
              <hr className="border-x border-dashed w-1/4 sm:w-1/3 pl-10 border-gray-400" />
              <p className="font-bold">
                ${(totalMonthlySavings * 12).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableComponent;
