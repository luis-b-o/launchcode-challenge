import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
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
  } else if (req.method === "GET") {
    const { limit } = req.query;
    const response = await prisma.quote.findMany({
      select: {
        id: true,
        name: true,
        destination: true,
        amount: true,
      },
      take: Number(limit),
      orderBy: {
        amount: "desc",
      },
    });

    return res.status(200).json({ quotes: response });
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
