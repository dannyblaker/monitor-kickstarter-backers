import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

test('extract backer count and append to CSV', async ({ page }) => {
  await page.goto(process.env.KICKSTARTER_URL, {
    waitUntil: 'domcontentloaded',
  });

  const backersSpan = page
    .locator('.block.type-16.type-28-md.bold.dark-grey-500')
    .first()
    .locator('span')
    .first();

  await expect(backersSpan).toBeVisible();

  const rawText = await backersSpan.innerText();
  const backerCount = Number(rawText.replace(/[^\d]/g, ''));

  console.log('Backers:', backerCount);
  expect(Number.isFinite(backerCount)).toBeTruthy();

  const timestamp = new Date().toISOString();
  const csvPath = path.resolve(__dirname, 'backers.csv');
  const line = `${timestamp},${backerCount}\n`;

  // Ensure file exists with header
  if (!fs.existsSync(csvPath)) {
    fs.writeFileSync(csvPath, 'timestamp,backers\n', 'utf8');
  }

  // Read the file to check last character
  const content = fs.readFileSync(csvPath, 'utf8');
  const endsWithNewline = content.endsWith('\n');

  // Append with newline if needed
  fs.appendFileSync(csvPath, (endsWithNewline ? '' : '\n') + line, 'utf8');

  console.log(`Appended to CSV: ${line.trim()}`);
});
