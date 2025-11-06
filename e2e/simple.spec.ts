import { test, expect } from '@playwright/test';

test('simple page load test', async ({ page }) => {
  // Navigate to the page
  await page.goto('/');

  // Wait for network to be idle
  await page.waitForLoadState('networkidle');

  // Take a screenshot for debugging
  await page.screenshot({ path: 'test-results/debug-screenshot.png', fullPage: true });

  // Get the actual title
  const title = await page.title();
  console.log('Page title:', title);

  // Get the HTML content
  const html = await page.content();
  console.log('HTML length:', html.length);
  console.log('HTML preview:', html.substring(0, 500));

  // Check for errors in console
  page.on('console', msg => console.log('Browser console:', msg.text()));
  page.on('pageerror', error => console.log('Page error:', error));

  // Simple assertion
  expect(title).toContain('Hanzo');
});
