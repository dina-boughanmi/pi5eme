import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// OPTIONS (pré-vol CORS)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// GET all jobs
export async function GET() {
  try {
    const jobs = await prisma.job.findMany();
    return NextResponse.json(jobs, { headers: corsHeaders });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// POST: add a job
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const job = await prisma.job.create({ data });
    return NextResponse.json(job, { headers: corsHeaders });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500, headers: corsHeaders }
    );
  }
}
