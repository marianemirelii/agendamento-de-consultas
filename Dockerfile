# Usar uma imagem base do Nginx
FROM nginx:alpine

# Copiar os arquivos do site para o diretório padrão do Nginx
COPY . /usr/share/nginx/html

# Expor a porta 80
EXPOSE 80
