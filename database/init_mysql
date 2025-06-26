#!/bin/bash
apt update
apt install -y mysql-server

# Importeer alle SQL bestanden
for f in /var/lib/scripts/*.sql; do
  mysql -u root -e "SOURCE $f;"
done

# Bind MySQL op alle interfaces
sed -i 's/^bind-address.*/bind-address = 0.0.0.0/' /etc/mysql/mysql.conf.d/mysqld.cnf
systemctl restart mysql
