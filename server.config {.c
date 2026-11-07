server {
    listen 80;
    listen [::]:80;

    server_name lesnationaux.com www.lesnationaux.com;

    location / {
        proxy_pass http://127.0.0.1:3001;

        proxy_http_version 1.1;

        # WebSocket support
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # Forward client information
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}

server {
    server_name perfect tv.org www.perfect tv.org;

    location / {
        proxy_pass http://127.0.0.1:3000;

        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    listen 443 ssl;
    listen [::]:443 ssl;

    # Certbot manages these:
    ssl_certificate /etc/letsencrypt/live/perfect tv.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/perfect tv.org/privkey.pem;
}

server {
    listen 80;
    listen [::]:80;

    server_name perfect tv.org www.perfect tv.org;

    return 301 https://$host$request_uri;
}



pm2 start npm --name perfect tv -- start

sudo certbot --nginx -d perfect tv.org -d www.perfect tv.org