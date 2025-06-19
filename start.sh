#!/bin/sh
uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 &
python backend/app/worker.py
