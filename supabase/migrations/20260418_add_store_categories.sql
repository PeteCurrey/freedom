-- Migration to add new Store Categories for Expansion
INSERT INTO product_categories (name, slug, description, sort_order)
VALUES 
('Chassis & Exterior', 'chassis-exterior', 'Heavy-duty racks, ladders, wheels, and expedition hardware for your base vehicle.', 70),
('Security & Monitoring', 'security-monitoring', 'Professional-grade locks, alarm systems, and off-grid tracking technology.', 80)
ON CONFLICT (slug) DO NOTHING;
