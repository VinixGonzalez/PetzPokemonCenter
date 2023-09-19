import { NextRequest, NextResponse } from "next/server";

type DateResponse = Array<string>;

function getDates(d1: number, d2: number): Array<Date> {
  var oneDay = 24 * 3600 * 1000;
  for (var d = [], ms = d1 * 1, last = d2 * 1; ms < last; ms += oneDay) {
    d.push(new Date(ms));
  }
  return d;
}

export async function GET() {
  const today = new Date();
  const nextWeek = today.getTime() * 1 + 7 * 24 * 3600 * 1000;
  let dates = getDates(today.getTime(), nextWeek);

  let dateStringArray: Array<string> = [];
  dates.forEach((date) => {
    dateStringArray.push(date.toLocaleDateString());
  });

  return NextResponse.json({ dateStringArray }, { status: 200 });
}
