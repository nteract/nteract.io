import { useEffect } from "react";
import { useRouter } from "next/router";

const KernelsIndex = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/kernels/python");
  }, [router]);

  return null;
};

export default KernelsIndex;
