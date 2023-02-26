FROM node:18.12.1 AS builder

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM node:18.12.1 AS runner

# We don't need the standalone Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Install Google Chrome Stable and fonts
# Note: this installs the necessary libs to make the browser work with Puppeteer.
RUN apt-get update && apt-get install curl gnupg -y \
  && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install google-chrome-stable -y --no-install-recommends \
  && apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 \
                 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 \
                 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 \
                 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
                 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 \
                 libxss1 libxtst6 ca-certificates fonts-liberation libnss3 lsb-release \
                 xdg-utils wget -y \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=builder /app ./
RUN tar -x --file=libs/fonts.tar && cp -r fonts /etc/ && rm -r fonts
ENTRYPOINT ["sh", "-c"]
ENV PORT 3000
EXPOSE 3000
CMD ["make migrate-latest && yarn start:prod"]