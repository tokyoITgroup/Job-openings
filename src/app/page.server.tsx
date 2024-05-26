import fs from "fs";
import path from "path";

export const getJobPosts = () => {
  const filePath = path.join(process.cwd(), "./src/data/dummyData.json");
  console.log("filePath", filePath);
  const jsonData = fs.readFileSync(filePath, "utf8");
  return JSON.parse(jsonData);
};
