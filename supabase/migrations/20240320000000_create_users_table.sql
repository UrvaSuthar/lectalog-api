-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create RLS policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access"
    ON users FOR SELECT
    USING (true);

-- Allow authenticated users to insert their own records
CREATE POLICY "Allow authenticated users to insert"
    ON users FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Allow users to update their own records
CREATE POLICY "Allow users to update own records"
    ON users FOR UPDATE
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Allow users to delete their own records
CREATE POLICY "Allow users to delete own records"
    ON users FOR DELETE
    TO authenticated
    USING (auth.uid() = id); 