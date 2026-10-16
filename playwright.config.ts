
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    workers: 3,
    fullyParallel: true,
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

