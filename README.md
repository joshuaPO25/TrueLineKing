# TrueLineKing - Professional Basketball Prediction Platform

**Professional Analytics | Basketball Over/Under Intelligence**

A sophisticated betting prediction platform that analyzes basketball games using true line strategy, identifying odd lines with the smallest gaps for maximum accuracy.

## Features

✅ **Basketball Animation Landing Page** - Professional intro with bouncing basketball animation  
✅ **True Line Analysis** - Identifies odds gaps (e.g., 1.85 vs 1.90)  
✅ **League & Team Selection** - Choose leagues and teams dynamically  
✅ **Halftime Scores** - Input and track quarter-by-quarter scores  
✅ **Shooting Statistics** - 3PT%, 2PT%, FT% analysis  
✅ **Full Game & 2nd Half Odds** - Multiple betting lines with gap detection  
✅ **Advanced Analytics** - Professional-grade signal analysis  
✅ **Analyze & Calculate** - One-click prediction generation  

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Python, Flask
- **Database**: SQLite (with PostgreSQL guide)
- **Version**: V2.0 Premium Edition

## Project Structure

```
TrueLineKing/
├── frontend/
│   ├── index.html          # Landing page
│   ├── dashboard.html      # Main analysis dashboard
│   ├── css/
│   │   ├── style.css       # Landing page styles
│   │   └── dashboard.css   # Dashboard styles
│   └── js/
│       ├── animation.js    # Basketball bounce animation
│       └── dashboard.js    # Dashboard logic
├── backend/
│   ├── app.py              # Flask application
│   ├── models.py           # Database models
│   ├── routes.py           # API endpoints
│   └── requirements.txt    # Python dependencies
├── database/
│   ├── init_db.py          # Database initialization
│   └── schema.sql          # Database schema
└── README.md
```

## Quick Start

### Backend Setup

```bash
# Install dependencies
pip install -r backend/requirements.txt

# Initialize database
python database/init_db.py

# Run Flask server
python backend/app.py
```

Server runs on `http://localhost:5000`

### Frontend

Open `frontend/index.html` in your browser or serve via Flask.

## Database Schema

See `database/schema.sql` for complete schema including:
- Games
- Predictions
- Odds Lines
- User Analysis History

## API Endpoints

- `POST /api/analyze` - Analyze game odds
- `POST /api/predict` - Generate prediction
- `GET /api/games` - Fetch available games
- `GET /api/odds/<game_id>` - Get odds for game

## Version

**V2.0 Premium Edition**  
*For professional betting analysis purposes*

## Notes

- All odds calculations use professional-grade algorithms
- Gap detection: Identifies smallest spreads between over/under lines
- Accuracy optimized through statistical analysis
