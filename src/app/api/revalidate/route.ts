import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ revalidated: false, message: 'Phase 2' })
}
