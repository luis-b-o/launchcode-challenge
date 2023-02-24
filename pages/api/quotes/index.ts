import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  id: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const {
      name,
      email,
      adults,
      departDate,
      returnDate,
      destination,
      origin,
      transportation,
    } = req.body;

    const quote = await prisma.quote.create({
      data: {
        name,
        email,
        adults: Number(adults),
        departDate: new Date(departDate),
        returnDate: new Date(returnDate),
        destination,
        origin,
        transportation,
      },
    });

    return res.status(200).json({ id: quote.id });
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
