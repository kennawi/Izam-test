import fs from "fs";
import { NextResponse } from "next/server";

const filePath = "nav.json";

export async function GET() {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf8");
      return NextResponse.json(JSON.parse(data));
    }

    return NextResponse.json([
      { id: 1, title: "Dashboard", target: "/" },
      {
        id: 2,
        title: "Job Applications",
        target: "/applications",
        children: [
          { id: 7, title: "John Doe", target: "/applications/john-doe" },
          { id: 10, title: "James Bond", target: "/applications/james-bond" },
          {
            id: 20,
            title: "Scarlett Johansson",
            target: "/applications/scarlett-johansson",
            visible: false,
          },
        ],
      },
      {
        id: 3,
        title: "Companies",
        target: "/companies",
        visible: false,
        children: [
          { id: 8, title: "Tanqeeb", target: "/companies/1" },
          { id: 9, title: "Daftra", target: "/companies/2" },
          { id: 11, title: "TBD", target: "/companies/14" },
        ],
      },
      {
        id: 4,
        title: "Qualifications",
        children: [
          { id: 14, title: "Q1", target: "/q1" },
          { id: 15, title: "Q2", target: "/q2" },
        ],
      },
      { id: 5, title: "About", target: "/about" },
      { id: 6, title: "Contact", target: "/contact" },
    ]);
  } catch {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const items = await req.json();

    if (!Array.isArray(items)) {
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    fs.writeFileSync(filePath, JSON.stringify(items));
    return new Response(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
