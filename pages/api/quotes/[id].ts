import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    if (req.query.id) {
      const { id } = req.query;
      const response = await prisma.quote.findUnique({
        where: {
          id: id as string,
        },
        select: {
          id: true,
          name: true,
          email: true,
          adults: true,
          departDate: true,
          returnDate: true,
          destination: true,
          origin: true,
          transportation: true,
        },
      });

      return res.status(200).json({ quote: response });
    }
  }
  if (req.method === "PUT") {
    if (req.query.id) {
      const { id } = req.query;
      const { amount } = req.body;
      const response = await prisma.quote.update({
        where: {
          id: id as string,
        },
        data: {
          amount,
        },
      });

      return res.status(200).json({ quote: response });
    }
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
