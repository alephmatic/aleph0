// import { ErrorMessage, captureException, isErrorMessage } from "@/utils/error";

// TODO imported from another project. can be cleaned up later

// import * as Sentry from '@sentry/nextjs';

export type ErrorMessage = { error: string; data?: any };
export type ZodError = {
  error: { issues: { code: string; message: string }[] };
};

export function isError(value: any): value is ErrorMessage | ZodError {
  return value?.error;
}

export function isErrorMessage(value: any): value is ErrorMessage {
  return typeof value?.error === "string";
}

export function captureException(error: unknown) {
  console.error(error)
  // Sentry.captureException(error);
}

export async function postRequest<Response, Body = any>(
  url: string,
  body: Body,
  method?: "POST" | "DELETE"
): Promise<Response | ErrorMessage> {
  try {
    const res = await fetch(url, {
      method: method || "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return await res.json();
  } catch (error) {
    captureException(error);
    throw error
    // if (isErrorMessage(error)) {
    //   if (error.error === "Failed to fetch" || !navigator.onLine)
    //     return {
    //       error: "Please check that you are connected to the Internet.",
    //     };
    //   return error;
    // }
    // return { error: "An error occurred" };
  }
}

export async function getRequest<T>(url: string): Promise<T | ErrorMessage> {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (error) {
    captureException(error);
    if (isErrorMessage(error)) return error;
    return { error: "An error occurred" };
  }
}
