FROM python:3.11-slim
WORKDIR /app
COPY backend ./backend
COPY frontend ./frontend
COPY start.sh .
COPY .env.example .
RUN pip install fastapi uvicorn[standard] sqlalchemy asyncpg python-dotenv
CMD ["./start.sh"]
