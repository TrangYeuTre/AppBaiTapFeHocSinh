import Card from "./Card";
import SignOutAction from "./SignOutAction";

export default function NoHomeworkMessage() {
  return (
    <Card>
      <div className="flex flex-col gap-6 justify-center items-center">
        <h1 className="font-bold text-2xl text-coRed uppercase">
          Chưa có bài tập được giao. 👀
        </h1>
        <p>Bé hãy trở lại sau để làm bài tập nhé.</p>
        <SignOutAction />
      </div>
    </Card>
  );
}
