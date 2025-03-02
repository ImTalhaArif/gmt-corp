FROM php:8.1-apache

# Copy your app files into the container
COPY . /var/www/html/

# Expose port 80 for the webserver
EXPOSE 80

# Start Apache server
CMD ["apache2-foreground"]
