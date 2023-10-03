import { NextResponse } from "next/server";

// export const POST = withError(async (request: Request) => {
export const POST = async (request: Request) => {
  // const session = await getAuthSession();
  // if (!session)
  //   return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const json = await request.json();
  // TODO use zod to validate
  // const body = userSettingsBody.parse(json);

  // TODO
  const result = json;

  return NextResponse.json(result);
};
