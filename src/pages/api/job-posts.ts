import type { NextApiRequest, NextApiResponse } from "next";
import { getJobPosts } from "../../app/page.server";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const jobPosts = getJobPosts();
  res.status(200).json(jobPosts);
};
