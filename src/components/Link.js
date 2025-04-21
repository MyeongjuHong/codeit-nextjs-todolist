"use client";

import Link from "next/link";
import React from "react";

function NextLink({ children, href = "/", ...rest }) {
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}

export default NextLink;
