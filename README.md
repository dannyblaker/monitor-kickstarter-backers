# Monitor Increase in number of Kickstarter Backers

A monitoring tool for tracking backer counts on Kickstarter projects. This application periodically fetches your Kickstarter project page to monitor backer growth and provides audio notifications when new backers are detected.

It uses a combination of Microsoft Playwright, Python and Bash scripts.

## Features

- **Automated Monitoring**: Continuously tracks backer count changes on your Kickstarter project
- **Audio Notifications**: Uses text-to-speech to announce new backers (Linux/Ubuntu compatible)
- **Data Logging**: Maintains a CSV log of backer counts with timestamps for analysis
- **Configurable Intervals**: Customizable monitoring frequency via environment variables

## Prerequisites

- **Python**: 3.12 or higher
- **Node.js**: v22 or higher
- **Operating System**: Linux (Ubuntu recommended)
- **Optional**: nvm for Node.js version management

## Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd kickstarter_tracker
   ```

2. **Install system dependencies**:
   ```bash
   sudo apt update
   sudo apt install espeak -y
   ```

3. **Install Node.js dependencies**:
   ```bash
   npm install dotenv
   npm init playwright@latest
   ```

4. **Set up configuration files**:
   ```bash
   # Copy example files to working versions
   cp tests/backers_example.csv tests/backers.csv
   cp .env-sample .env
   ```

5. **Configure environment variables**:
   Edit the `.env` file and update the following variables:
   - `KICKSTARTER_URL`: Your Kickstarter project URL
   - `SLEEP_SECONDS`: Monitoring interval in seconds (default: 600)

## Usage

Start the monitoring service:

```bash
./run.sh
```

The application will:
1. Fetch your Kickstarter project page for the current backer count
2. Compare with the previous count stored in the CSV file
3. Announce new backers via audio notification (if any)
4. Wait for the specified interval before repeating

## Configuration

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
KICKSTARTER_URL=https://www.kickstarter.com/projects/your-project-url
SLEEP_SECONDS=1800
```

### Data Storage

Backer data is stored in `tests/backers.csv` with the following format:
```csv
timestamp,backers
2025-01-01T12:00:00.000Z,150
2025-01-01T12:10:00.000Z,152
```

## Project Structure

```
kickstarter_tracker/
├── check_backers.py          # Python script for comparing backer counts
├── run.sh                    # Main execution script
├── tests/
│   ├── get_backers.spec.ts   # Playwright test for scraping backer data
│   ├── backers.csv           # Data storage file
│   └── backers_example.csv   # Example data format
├── package.json              # Node.js dependencies
├── playwright.config.ts      # Playwright configuration
└── README.md                 # This file
```

## Troubleshooting

- **Audio not working**: Ensure `espeak` is installed: `sudo apt install espeak -y`
- **Fetching failures**: Verify your Kickstarter URL is correct and accessible. Make sure the sleep intervals are very generous and respectful of Kickstarter's servers, such as 30 minute or 1 hour intervals.
- **Permission errors**: Make sure `run.sh` is executable: `chmod +x run.sh`