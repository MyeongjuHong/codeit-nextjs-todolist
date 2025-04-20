"use client";

import React from "react";
import NextLink from "next/link";

function Link({ children, href, ...rest }) {
  return (
    <NextLink href={href} {...rest}>
      {children}
    </NextLink>
  );
}

export default Link;
