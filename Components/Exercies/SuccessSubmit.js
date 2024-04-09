import Card from "../UI/Card";
import Link from "next/link";

export default function SuccessSubmit() {
  return (
    <Card className="content-wrapper">
      <h1 className="text-coRed uppercase font-bold text-center mb-4">
        Nộp bài thành công 🎉🎉🎉
      </h1>
      <Link href="/exercises">
        <p className="text-center">Xem lại bài đã làm.</p>
      </Link>
    </Card>
  );
}
