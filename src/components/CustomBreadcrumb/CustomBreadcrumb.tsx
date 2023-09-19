"use client";

import {
  Breadcrumb as ChakraBreadCrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export interface Crumb {
  isLast: boolean;
  path: string;
  label: string;
}
interface BreadcrumbProps {
  crumbList: Array<Crumb>;
}

export default function CustomBreadcrumb({ crumbList }: BreadcrumbProps) {
  return (
    <ChakraBreadCrumb className="text-xs text-white" separator=">">
      <BreadcrumbItem>
        <BreadcrumbLink className="no-underline" as={Link} href="/">
          <span>Home</span>
        </BreadcrumbLink>
      </BreadcrumbItem>
      {crumbList?.map((crumb) => (
        <BreadcrumbItem key={crumb.label}>
          {crumb.isLast ? (
            <span>{crumb.label}</span>
          ) : (
            <BreadcrumbLink
              className="no-underline"
              as={Link}
              href={crumb.path}
            >
              <span>{crumb.label}</span>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      ))}
    </ChakraBreadCrumb>
  );
}
