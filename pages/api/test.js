import { connectMongodb } from "../../helper/Mongodb";
export default async function handler(req, res) {
  const client = await connectMongodb();
  const homeworks = await client
    .db("storeBaiTap")
    .collection("homeworks")
    .find()
    .toArray();

  res.status(200).json({
    message: "Test kết nối đến db bằng user students thành công",
    data: homeworks,
  });
}
