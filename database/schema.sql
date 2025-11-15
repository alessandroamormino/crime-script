-- TABELLA: Cases (casi true crime)
CREATE TABLE cases (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  wiki_url TEXT,
  total_episodes INTEGER NOT NULL DEFAULT 3,
  description TEXT,
  cover_image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- TABELLA: Episodes (episodi singoli)
CREATE TABLE episodes (
  id SERIAL PRIMARY KEY,
  case_id INTEGER REFERENCES cases(id) ON DELETE CASCADE,
  episode_number INTEGER NOT NULL,
  episode_title VARCHAR(255) NOT NULL,
  outline JSONB NOT NULL,
  full_script TEXT NOT NULL,
  word_count INTEGER,
  estimated_duration_minutes INTEGER,
  filename VARCHAR(255),
  is_final_episode BOOLEAN DEFAULT FALSE,
  price_cents INTEGER DEFAULT 499,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(case_id, episode_number)
);

-- TABELLA: Users (utenti registrati)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  stripe_customer_id VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- TABELLA: Purchases (acquisti singoli episodi)
CREATE TABLE purchases (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  episode_id INTEGER REFERENCES episodes(id) ON DELETE CASCADE,
  price_paid_cents INTEGER NOT NULL,
  stripe_payment_intent_id VARCHAR(255) UNIQUE,
  purchased_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, episode_id)
);

-- TABELLA: Case_Bundles (pacchetti caso completo)
CREATE TABLE case_bundles (
  id SERIAL PRIMARY KEY,
  case_id INTEGER REFERENCES cases(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  price_paid_cents INTEGER NOT NULL,
  stripe_payment_intent_id VARCHAR(255) UNIQUE,
  purchased_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, case_id)
);

-- TABELLA: Subscriptions (abbonamenti mensili)
CREATE TABLE subscriptions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  stripe_subscription_id VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(50) NOT NULL,
  current_period_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- INDICI per performance
CREATE INDEX idx_episodes_case_id ON episodes(case_id);
CREATE INDEX idx_purchases_user_id ON purchases(user_id);
CREATE INDEX idx_purchases_episode_id ON purchases(episode_id);
CREATE INDEX idx_case_bundles_user_id ON case_bundles(user_id);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_episodes_outline ON episodes USING GIN(outline);
