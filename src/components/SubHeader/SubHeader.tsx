import React from "react";
import { Crumb, CustomBreadcrumb } from "../CustomBreadcrumb/CustomBreadcrumb";

type CrumbList = Array<Crumb>;

type SubHeaderBaseProps =
  | {
      text: string | React.ReactNode;
      subText?: string | React.ReactNode;
      showBreadcrumb?: false;
      crumbList?: never;
    }
  | {
      text: string | React.ReactNode;
      subText?: string | React.ReactNode;
      showBreadcrumb: true;
      crumbList: CrumbList;
    };

export default function SubHeader({
  text,
  subText,
  crumbList,
  showBreadcrumb,
}: SubHeaderBaseProps) {
  return (
    <section
      id="quem-somos-header"
      className="px-12 py-5 bg-customRed flex flex-col gap-2 text-white"
    >
      {showBreadcrumb && (
        <CustomBreadcrumb crumbList={crumbList as CrumbList} />
      )}

      <h1 className="text-2xl sm:text-2xbase font-bold ">{text}</h1>
      {subText && <p className="text-xs sm:text-sm">{subText}</p>}
    </section>
  );
}
