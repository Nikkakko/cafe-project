"use client";

import FormAction from "@/app/admin/dashboard/_components/_form-action-dialog";
import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <FormAction />
    </>
  );
};

export default ModalProvider;
