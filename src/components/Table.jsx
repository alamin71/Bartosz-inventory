"use client";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const combinedPackages = {
  "1+2": 799,
  "1+2+3": 949,
  "1+3": 449,
  "2+3": 749,
  "1+4": 399,
  "2+4": 699,
  "1+2+3+4": 999,
  "1+3+4": 499,
  "2+3+4": 799,
  "1+5": 899,
  "2+5": 1099,
};

const TableComponent = ({ packages }) => {
  const t = useTranslations("Packages");
  const [inputValues, setInputValues] = useState(() => packages.map(() => "0"));
  const [numOfPremises, setNumOfPremises] = useState(1);
  const [monthlySalesTotal, setMonthlySalesTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [combinedPrice, setCombinedPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [savings, setSavings] = useState(0);
  const [monthlySalesSavings, setMonthlySalesSavings] = useState([]);
  const [totalMonthlySavings, setTotalMonthlySavings] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("calculatedInfo");
      if (savedData) {
        const { inputValues, numOfPremises } = JSON.parse(savedData);
        setInputValues(inputValues || packages.map(() => "0"));
        setNumOfPremises(numOfPremises || 1);
      }
    }
  }, [packages]);

  // Calculate total monthly sales = (beverages + food) * premises
  useEffect(() => {
    const beverage = parseFloat(inputValues[0]) || 0;
    const food = parseFloat(inputValues[1]) || 0;
    const totalSales = (beverage + food) * numOfPremises;
    setMonthlySalesTotal(totalSales);
  }, [inputValues, numOfPremises]);

  // Calculate prices & savings based on selected packages
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
    setSavings(Math.round(totalSavings));
  }, [packages, numOfPremises]);

  // Calculate expected savings for packages 1, 2, 3 only (based on input values)
  useEffect(() => {
    const monthlySavings = packages
      .filter((item) => ["1", "2", "3"].includes(item.id))
      .map((item, index) => ({
        ...item,
        savings: Math.round(
          calculateSalesSavings(item, parseFloat(inputValues[index]) || 0)
        ),
      }));
    setMonthlySalesSavings(monthlySavings);

    const totalMonthly = monthlySavings.reduce(
      (acc, item) => acc + item.savings,
      0
    );
    setTotalMonthlySavings(totalMonthly);
  }, [inputValues, numOfPremises, packages]);

  // Save data locally
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "calculatedInfo",
        JSON.stringify({ inputValues, numOfPremises })
      );
    }
  }, [inputValues, numOfPremises]);

  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value === "" ? "0" : value;
    setInputValues(newInputValues);
  };

  const handleNumOfPremisesChange = (value) => {
    setNumOfPremises(parseInt(value, 10) || 1);
  };

  const formatMoney = (amount) => {
    return Math.round(amount)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

  return (
    <div className="mx-auto text-black text-base sm:text-lg space-y-5">
      {/* Monthly revenue inputs */}
      <div className="bg-white rounded-lg p-4">
        <p className="my-3 text-xl sm:text-2xl font-semibold text-center mb-5">
          {t("To calculate the results enter your monthly revenue")}:
        </p>

        {/* Beverages sales input */}
        <div className="flex justify-between gap-2 items-center">
          <p className="mb-1 text-right text-xs sm:text-base w-1/2">
            {t("My monthly beverages sales revenue is")}
          </p>
          <input
            type="text"
            placeholder="Type beverages sales revenue"
            value={inputValues[0] || ""}
            onChange={(e) => handleInputChange(0, e.target.value)}
            className="w-16 sm:w-40 h-5 border rounded border-black font-semibold py-3 px-1 mb-1 text-center placeholder:text-sm placeholder:font-normal"
          />
        </div>

        {/* Food sales input */}
        <div className="flex justify-between gap-2 items-center">
          <p className="mb-1 text-right text-xs sm:text-base w-1/2">
            {t("My monthly food sales revenue is")}
          </p>
          <input
            type="text"
            placeholder="Type food sales revenue"
            value={inputValues[1] || ""}
            onChange={(e) => handleInputChange(1, e.target.value)}
            className="w-16 sm:w-40 h-5 border rounded border-black font-semibold py-3 px-1 mb-1 text-center placeholder:text-sm placeholder:font-normal"
          />
        </div>

        {/* Number of premises */}
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

        {/* Monthly sales total (calculated automatically) */}
        <div className="flex justify-between gap-2 items-center">
          <p className="text-right text-xs sm:text-base w-1/2">
            {t("My monthly sales in total is")}{" "}
          </p>
          <p className="font-semibold text-left w-1/4">
            ${formatMoney(monthlySalesTotal)}
          </p>
        </div>
      </div>

      {/* Price of selected packages */}
      <div className="bg-white rounded-lg p-4">
        <p className="my-3 text-xl sm:text-2xl font-semibold text-center mb-5">
          {t("selected-packages")}:
        </p>
        {packages.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center"
            style={{ borderBottom: "none" }} // no dotted lines
          >
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

      {/* Expected results based on selected packages */}
      <div className="bg-white rounded-lg p-4">
        <p className="my-3 text-xl sm:text-2xl font-semibold text-center mb-5">
          {t("expected-savings")}:
        </p>
        {packages
          .filter((item) => ["1", "2", "3"].includes(item.id)) // Show expected savings only for relevant packages
          .map((item, index) => {
            const savingsItem = monthlySalesSavings.find(
              (s) => s.id === item.id
            );
            return (
              <div
                key={index}
                className="flex justify-between items-center"
                style={{ borderBottom: "none" }} // no dotted lines
              >
                <p className="text-right text-xs sm:text-base w-1/2">
                  {t(`${item.package}`)}
                </p>
                <p className="font-semibold text-left w-1/4">
                  ${formatMoney(savingsItem ? savingsItem.savings : 0)}
                </p>
              </div>
            );
          })}
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
    </div>
  );
};

export default TableComponent;
