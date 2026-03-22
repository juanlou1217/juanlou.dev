#!/bin/bash
# PostgreSQL 远程连接修复脚本

echo "=== PostgreSQL 远程连接诊断和修复 ==="
echo ""

# 1. 检查 PostgreSQL 状态
echo "1. 检查 PostgreSQL 服务状态..."
sudo systemctl status postgresql --no-pager | head -10
echo ""

# 2. 检查监听端口
echo "2. 检查 PostgreSQL 监听端口..."
sudo netstat -tlnp | grep 5432 || sudo ss -tlnp | grep 5432
echo ""

# 3. 创建用户（如果不存在）
echo "3. 创建数据库用户..."
sudo -u postgres psql <<EOF
-- 删除用户如果存在（避免重复创建错误）
DROP USER IF EXISTS zhaokang;

-- 创建用户
CREATE USER zhaokang WITH PASSWORD 'juanlou';

-- 授予权限
GRANT ALL PRIVILEGES ON DATABASE juanlou_blog TO zhaokang;
ALTER DATABASE juanlou_blog OWNER TO zhaokang;

-- 显示所有用户
\du
EOF
echo ""

# 4. 修复 postgresql.conf
echo "4. 配置 postgresql.conf..."
sudo cp /var/lib/pgsql/data/postgresql.conf /var/lib/pgsql/data/postgresql.conf.backup
sudo sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/" /var/lib/pgsql/data/postgresql.conf
sudo sed -i "s/listen_addresses = 'localhost'/listen_addresses = '*'/" /var/lib/pgsql/data/postgresql.conf

# 验证配置
echo "listen_addresses 配置："
sudo grep "^listen_addresses" /var/lib/pgsql/data/postgresql.conf
echo ""

# 5. 修复 pg_hba.conf
echo "5. 配置 pg_hba.conf..."
sudo cp /var/lib/pgsql/data/pg_hba.conf /var/lib/pgsql/data/pg_hba.conf.backup

# 删除可能存在的旧规则
sudo sed -i '/host.*all.*all.*0.0.0.0\/0/d' /var/lib/pgsql/data/pg_hba.conf

# 添加新规则
echo "host    all             all             0.0.0.0/0               md5" | sudo tee -a /var/lib/pgsql/data/pg_hba.conf

echo "pg_hba.conf 最后几行："
sudo tail -5 /var/lib/pgsql/data/pg_hba.conf
echo ""

# 6. 配置防火墙
echo "6. 配置防火墙..."
sudo firewall-cmd --permanent --add-port=5432/tcp 2>/dev/null || echo "防火墙规则可能已存在"
sudo firewall-cmd --reload 2>/dev/null || echo "防火墙重载完成"
echo ""

# 7. 重启 PostgreSQL
echo "7. 重启 PostgreSQL..."
sudo systemctl restart postgresql
sleep 2

# 8. 验证
echo "8. 验证配置..."
echo "PostgreSQL 状态："
sudo systemctl is-active postgresql

echo ""
echo "监听端口："
sudo netstat -tlnp | grep 5432 || sudo ss -tlnp | grep 5432

echo ""
echo "=== 配置完成！==="
echo ""
echo "连接信息："
echo "  主机: $(hostname -I | awk '{print $1}')"
echo "  端口: 5432"
echo "  数据库: juanlou_blog"
echo "  用户: zhaokang"
echo "  密码: juanlou"
echo ""
echo "连接字符串："
echo "  postgresql://zhaokang:juanlou@$(hostname -I | awk '{print $1}'):5432/juanlou_blog"
echo ""
echo "本地测试命令："
echo "  psql -h $(hostname -I | awk '{print $1}') -U zhaokang -d juanlou_blog"
echo ""
echo "⚠️  请确保阿里云安全组已开放 5432 端口！"
