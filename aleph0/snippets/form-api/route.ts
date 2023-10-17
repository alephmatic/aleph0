import { NextResponse } from "next/server";
import { userProfileBody } from "@/app/api/user/settings/validation";

// update user profile API route
export const POST = async (request: Request) => {
  const json = await request.json();
  const body = userProfileBody.parse(json);

  // TODO
  // process data

  const result = body;

  return NextResponse.json(result);
};
