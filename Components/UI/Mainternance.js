import { useMainternance } from "../../hooks/useHooks";
import { useRouter } from "next/router";
import Card from "../../Components/UI/Card";
import Image from "next/image";
import { useEffect } from "react";

export default function Mainternance() {
  const router = useRouter();
  const mainternance = useMainternance();

  useEffect(() => {
    if (!mainternance) router.replace("/auth");
  }, [mainternance]);

  return (
    <Card>
      <div className="flex flex-col gap-6 justify-center items-center">
        <h1 className="font-bold text-2xl text-coRed uppercase">
          App đang bảo trì.
        </h1>
        <p>Bé hãy trở lại sau để làm bài tập nhé.</p>
        <Image
          alt="minh-hoa-bao-tri"
          src="/assets/under-construction.gif"
          width={200}
          height={200}
        />
      </div>
    </Card>
  );
}
