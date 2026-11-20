import { NextRequest, NextResponse } from "next/server";
import { serverEnv } from "@/lib/server-env";

type Ctx = { params: Promise<{ path: string[] }> };

async function proxy(request: NextRequest, { params }: Ctx) {
  const segments = (await params).path;
  const path = segments.join("/");
  const url = `${serverEnv.backendUrl}${serverEnv.apiPrefix}/${path}${request.nextUrl.search}`;

  const headers = new Headers();
  const contentType = request.headers.get("content-type");
  const authorization = request.headers.get("authorization");
  if (contentType) headers.set("content-type", contentType);
  if (authorization) headers.set("authorization", authorization);
  headers.set("accept", "application/json");

  const method = request.method;
  const body =
    method === "GET" || method === "HEAD" ? undefined : await request.arrayBuffer();

  let upstream: Response;
  try {
    upstream = await fetch(url, {
      method,
      headers,
      body,
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "The service is not reachable right now.",
        error: { code: "UNAVAILABLE" },
      },
      { status: 503 }
    );
  }

  const text = await upstream.text();
  return new NextResponse(text, {
    status: upstream.status,
    headers: {
      "content-type": upstream.headers.get("content-type") ?? "application/json",
    },
  });
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;