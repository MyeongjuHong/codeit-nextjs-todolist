"use client";

import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useState } from "react";

const Providers = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient()); // 구조분해로 안쓰는 setter 날리기
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false}>{children}</ReactQueryDevtools>
    </QueryClientProvider>
  );
};

export default Providers;
