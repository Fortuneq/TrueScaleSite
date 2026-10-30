# TrueScale — AI automation studio website

The website of TrueScale, a studio that builds AI automation and digital solutions for business. A landing page with a 3D background, a services and pricing section, a six-step process, video case studies and a contact form that sends requests to Telegram.

## Structure

```
src/index.html           — main landing page (modular version)
src/case-studies/        — case-study pages (desktop and mobile)
src/ARCHITECTURE.md      — page architecture
src/COMPONENTS.md        — component reference
backend.py               — Flask endpoint that forwards contact-form submissions to Telegram
nginx.conf, Dockerfile   — static site container
backend.Dockerfile       — backend container
docker-compose.yml       — site + backend + Certbot
setup-ssl.sh             — Let's Encrypt certificate setup
```

## Tech stack

HTML/CSS/JavaScript (exported from Webflow), Three.js background animation, custom cursor, Flask + flask-cors backend, nginx, Docker, Certbot.

## Run locally

```bash
python3 -m http.server 8000 --directory src     # static site
pip install -r requirements.txt && python backend.py   # contact-form backend
```

Set the Telegram bot token and chat ID in `backend.py` (preferably through environment variables) before running the backend.

## Deploy

```bash
docker compose up -d --build
./setup-ssl.sh
```
