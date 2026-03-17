-- D1 Database Schema for Authieticket

-- Tickets table
CREATE TABLE IF NOT EXISTS tickets (
    id TEXT PRIMARY KEY,
    event_id TEXT NOT NULL,
    event_name TEXT NOT NULL,
    ticket_type TEXT NOT NULL, -- 'NFT' or 'Traditional'
    wallet_address TEXT NOT NULL,
    price REAL NOT NULL,
    original_price REAL,
    purchase_date TEXT NOT NULL,
    event_date TEXT NOT NULL,
    venue TEXT,
    seat_info TEXT,
    token_id TEXT, -- For NFT tickets
    transaction_hash TEXT, -- Blockchain tx hash
    status TEXT DEFAULT 'active', -- active, redeemed, cancelled
    metadata TEXT, -- JSON string for additional data
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Validation logs
CREATE TABLE IF NOT EXISTS validation_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticket_id TEXT NOT NULL,
    wallet_address TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    result TEXT NOT NULL, -- valid, invalid, pending
    ai_analysis TEXT, -- JSON string
    blockchain_verified INTEGER DEFAULT 0,
    risk_score REAL,
    FOREIGN KEY (ticket_id) REFERENCES tickets(id)
);

-- User preferences and history
CREATE TABLE IF NOT EXISTS user_preferences (
    user_id TEXT PRIMARY KEY,
    wallet_address TEXT UNIQUE,
    preferred_categories TEXT, -- JSON array
    notification_settings TEXT, -- JSON object
    language TEXT DEFAULT 'en',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    last_active TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Chat sessions
CREATE TABLE IF NOT EXISTS chat_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    session_id TEXT NOT NULL,
    message_count INTEGER DEFAULT 0,
    started_at TEXT DEFAULT CURRENT_TIMESTAMP,
    last_message_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_preferences(user_id)
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    venue TEXT NOT NULL,
    event_date TEXT NOT NULL,
    event_time TEXT,
    image_url TEXT,
    organizer TEXT,
    total_tickets INTEGER,
    available_tickets INTEGER,
    min_price REAL,
    max_price REAL,
    royalty_percentage REAL DEFAULT 2.0,
    status TEXT DEFAULT 'upcoming', -- upcoming, ongoing, completed, cancelled
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Transactions table (for analytics)
CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticket_id TEXT NOT NULL,
    from_wallet TEXT,
    to_wallet TEXT NOT NULL,
    price REAL NOT NULL,
    transaction_hash TEXT,
    transaction_type TEXT NOT NULL, -- purchase, resale, transfer
    royalty_paid REAL,
    timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ticket_id) REFERENCES tickets(id)
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_tickets_wallet ON tickets(wallet_address);
CREATE INDEX IF NOT EXISTS idx_tickets_event ON tickets(event_id);
CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);
CREATE INDEX IF NOT EXISTS idx_validation_logs_ticket ON validation_logs(ticket_id);
CREATE INDEX IF NOT EXISTS idx_transactions_ticket ON transactions(ticket_id);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category);

-- Insert sample data for testing
INSERT INTO events (id, name, description, category, venue, event_date, event_time, image_url, total_tickets, available_tickets, min_price, max_price, royalty_percentage)
VALUES 
    ('evt_001', 'Taylor Swift | The Eras Tour', 'Experience the magic of Taylor Swift live in concert', 'Music', 'My Dinh National Stadium, Hanoi', '2025-07-15', '19:00', 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14', 50000, 12450, 89.99, 299.99, 2.5),
    ('evt_002', 'Web Summit Asia 2025', 'The largest tech conference in Asia', 'Conference', 'Marina Bay Sands Expo, Singapore', '2025-08-22', '09:00', 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678', 15000, 3200, 199.00, 499.00, 1.5),
    ('evt_003', 'NBA Asia Games 2025', 'Watch NBA stars compete in an exciting exhibition game', 'Sports', 'Impact Arena, Bangkok', '2025-06-10', '20:00', 'https://images.unsplash.com/photo-1546519638-68e109498ffc', 20000, 8900, 150.00, 600.00, 3.0);
