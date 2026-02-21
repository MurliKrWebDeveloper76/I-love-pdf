FROM node:20-slim

# Install system dependencies for PDF tools
# ghostscript: for compression, repair, pdf/a
# poppler-utils: for pdf to image (pdftoppm)
# libreoffice: for pdf to word/excel/powerpoint
# graphicsmagick: for image processing
RUN apt-get update && apt-get install -y \
    ghostscript \
    poppler-utils \
    libreoffice \
    graphicsmagick \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
