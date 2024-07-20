FROM mysql:8.0.36
COPY ./sqlmaterial/ ./home
# RUN ls -la && sleep 5

# FROM mysql:8.0.36
# COPY ./sqlmaterial/ ./home
# CMD mysqld --default-authentication-plugin=mysql_native_password --sql_mode="STRICT_TRANS_TABLES"
# CMD mysql -u root -p < /home/dbcreator.sql
# CMD mysql -u root -p webappdb < /home/all-database-2024-03-22_10-53-33.sql