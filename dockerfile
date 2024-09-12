# Use a imagem oficial do Node.js como base
FROM node:18

# Criar diretório de trabalho e copiar arquivos necessários
WORKDIR /app
COPY . .

# Instalar dependências
RUN npm install


# Limpe os módulos, se existirem
RUN rm -rf node_modules


# Instale as dependências novamente
RUN npm install

# Rebuild do módulo bcrypt
RUN npm rebuild bcrypt --build-from-source


# Comando para iniciar a aplicação
ENTRYPOINT npm start
