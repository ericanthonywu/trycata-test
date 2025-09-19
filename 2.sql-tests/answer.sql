CREATE TABLE orders (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  customer_id VARCHAR(36) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status ENUM('PENDING', 'PAID', 'CANCELLED') NOT NULL,
  created_at DATETIME NOT NULL
);

# 1.
SELECT 
    status,
    COUNT(orders.id) as order_count,
    SUM(amount) as total_amount
FROM orders 
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY status
ORDER BY status;


# 2.
SELECT 
    customer_id,
    COUNT(orders.id) as order_count,
    SUM(amount) as total_spend
FROM orders 
GROUP BY customer_id 
ORDER BY total_spend DESC 
LIMIT 5;
