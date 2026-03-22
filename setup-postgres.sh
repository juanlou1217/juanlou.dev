#!/bin/bash
# PostgreSQL 安装和配置脚本 - CentOS/RHEL

set -e

echo "=== PostgreSQL 安装脚本 ==="
echo ""

# 设置变量
DB_NAME="juanlou_blog"
DB_USER="zhaokang"
DB_PASSWORD="juanlou"

echo "1. 安装 PostgreSQL..."
sudo yum install -y postgresql-server postgresql-contrib

echo "2. 初始化数据库..."
sudo postgresql-setup --initdb

echo "3. 启动 PostgreSQL 服务..."
sudo systemctl start postgresql
sudo systemctl enable postgresql

echo "4. 创建数据库和用户..."
sudo -u postgres psql <<EOF
CREATE DATABASE ${DB_NAME};
CREATE USER ${DB_USER} WITH PASSWORD '${DB_PASSWORD}';
GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME} TO ${DB_USER};
ALTER DATABASE ${DB_NAME} OWNER TO ${DB_USER};
\q
EOF

echo "5. 配置远程访问..."
# 备份原配置
sudo cp /var/lib/pgsql/data/postgresql.conf /var/lib/pgsql/data/postgresql.conf.bak
sudo cp /var/lib/pgsql/data/pg_hba.conf /var/lib/pgsql/data/pg_hba.conf.bak

# 修改 postgresql.conf
sudo sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/" /var/lib/pgsql/data/postgresql.conf

# 添加远程访问规则到 pg_hba.conf
echo "host    all             all             0.0.0.0/0               md5" | sudo tee -a /var/lib/pgsql/data/pg_hba.conf

echo "6. 配置防火墙..."
sudo firewall-cmd --permanent --add-port=5432/tcp
sudo firewall-cmd --reload

echo "7. 重启 PostgreSQL..."
sudo systemctl restart postgresql

echo ""
echo "=== 安装完成！==="
echo ""
echo "数据库信息："
echo "  主机: $(hostname -I | awk '{print $1}')"
echo "  端口: 5432"
echo "  数据库: ${DB_NAME}"
echo "  用户: ${DB_USER}"
echo "  密码: ${DB_PASSWORD}"
echo ""
echo "连接字符串："
echo "  postgresql://${DB_USER}:${DB_PASSWORD}@$(hostname -I | awk '{print $1}'):5432/${DB_NAME}"
echo ""
echo "⚠️  重要提醒："
echo "  1. 请在阿里云控制台配置安全组，开放 5432 端口"
echo "  2. 建议修改脚本中的默认密码"
echo "  3. 生产环境建议限制具体 IP 访问，而不是 0.0.0.0/0"
