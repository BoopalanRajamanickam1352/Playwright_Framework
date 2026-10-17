
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    workers: 3,
    fullyParallel: true,
    reporter: 'html',

    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                headless: true,
            }
        }
    ]
});

