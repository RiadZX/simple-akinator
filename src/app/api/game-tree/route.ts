import { NextResponse } from 'next/server';
import { getCharacters } from './algorithm';

export async function GET() {
  const characters = getCharacters();
  return NextResponse.json(characters);
}
