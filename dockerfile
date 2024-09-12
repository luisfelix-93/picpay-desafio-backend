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

# Copiar todos os arquivos para o diretório de trabalho
# ENV MONGO_URI=mongodb+srv://luisfelixfilho:lfcf%401310@cluster0.hjmased.mongodb.net/dev-pay-db
# ENV EMAIL_LOCAL=devpay.service@gmail.com
# ENV PASSWORD='fpsx mzry otla bpgt'


# Comando para iniciar a aplicação
ENTRYPOINT npm start
