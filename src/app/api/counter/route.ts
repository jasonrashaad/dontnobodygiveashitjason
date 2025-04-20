// /src/app/api/counter/route.ts
import { NextResponse } from 'next/server';

let hitCount = 0;

export async function GET() {
  hitCount++;
  return NextResponse.json({ count: hitCount });
}