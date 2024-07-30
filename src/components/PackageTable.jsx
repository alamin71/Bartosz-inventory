import { useTranslations } from "next-intl";
export default function PackageTable({ packages }) {
  const t = useTranslations("Packages");
  return (
    <div className="text-white">
      {packages.map((pkg, index) => (
        <div key={index}>
          <p className="text-3xl my-2">{t(`${pkg.package}`)}</p>
        </div>
      ))}
    </div>
  );
}
