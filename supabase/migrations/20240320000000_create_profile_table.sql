-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create organizations table first (no dependencies)
CREATE TABLE organizations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create segments table (depends on organizations)
CREATE TABLE segments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    organization_id UUID REFERENCES organizations(id) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create programs table (depends on segments)
CREATE TABLE programs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    segment_id UUID REFERENCES segments(id) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create profile table (depends on all other tables)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    role TEXT NOT NULL CHECK (role IN ('creator', 'admin', 'reviewer', 'super-admin')),
    is_independent_mode BOOLEAN DEFAULT false,
    organization_id UUID REFERENCES organizations(id),
    segment_id UUID REFERENCES segments(id),
    program_id UUID REFERENCES programs(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Insert dummy data for organizations
INSERT INTO organizations (id, name) VALUES
    ('11111111-1111-1111-1111-111111111111', 'Tech Corp'),
    ('22222222-2222-2222-2222-222222222222', 'Health Solutions'),
    ('33333333-3333-3333-3333-333333333333', 'Education First');

-- Insert dummy data for segments
INSERT INTO segments (id, name, organization_id) VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Software Development', '11111111-1111-1111-1111-111111111111'),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Cloud Services', '11111111-1111-1111-1111-111111111111'),
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Research', '22222222-2222-2222-2222-222222222222'),
    ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Clinical Trials', '22222222-2222-2222-2222-222222222222'),
    ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'K-12 Education', '33333333-3333-3333-3333-333333333333'),
    ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Higher Education', '33333333-3333-3333-3333-333333333333');

-- Insert dummy data for programs
INSERT INTO programs (id, name, segment_id) VALUES
    ('11111111-aaaa-1111-aaaa-111111111111', 'Web Development', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
    ('22222222-aaaa-2222-aaaa-222222222222', 'Mobile Apps', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
    ('33333333-bbbb-3333-bbbb-333333333333', 'AWS Services', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'),
    ('44444444-bbbb-4444-bbbb-444444444444', 'Azure Services', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'),
    ('55555555-cccc-5555-cccc-555555555555', 'Drug Discovery', 'cccccccc-cccc-cccc-cccc-cccccccccccc'),
    ('66666666-cccc-6666-cccc-666666666666', 'Clinical Studies', 'cccccccc-cccc-cccc-cccc-cccccccccccc'),
    ('77777777-dddd-7777-dddd-777777777777', 'Patient Care', 'dddddddd-dddd-dddd-dddd-dddddddddddd'),
    ('88888888-dddd-8888-dddd-888888888888', 'Medical Trials', 'dddddddd-dddd-dddd-dddd-dddddddddddd'),
    ('99999999-eeee-9999-eeee-999999999999', 'Elementary Education', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee'),
    ('aaaaaaaa-eeee-aaaa-eeee-aaaaaaaaaaaa', 'High School Program', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee'),
    ('bbbbbbbb-ffff-bbbb-ffff-bbbbbbbbbbbb', 'Undergraduate Studies', 'ffffffff-ffff-ffff-ffff-ffffffffffff'),
    ('cccccccc-ffff-cccc-ffff-cccccccccccc', 'Graduate Programs', 'ffffffff-ffff-ffff-ffff-ffffffffffff');

-- Create RLS policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE segments ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

-- Organizations policies
CREATE POLICY "Users can view organizations they belong to"
    ON organizations FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.organization_id = organizations.id
            AND profiles.id = auth.uid()
        )
    );

-- Segments policies
CREATE POLICY "Users can view segments in their organization"
    ON segments FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.organization_id = segments.organization_id
            AND profiles.id = auth.uid()
        )
    );

-- Programs policies
CREATE POLICY "Users can view programs in their segment"
    ON programs FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            JOIN segments ON profiles.segment_id = segments.id
            WHERE segments.id = programs.segment_id
            AND profiles.id = auth.uid()
        )
    );

-- Create function to handle updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER handle_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER handle_organizations_updated_at
    BEFORE UPDATE ON organizations
    FOR EACH ROW
    EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER handle_segments_updated_at
    BEFORE UPDATE ON segments
    FOR EACH ROW
    EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER handle_programs_updated_at
    BEFORE UPDATE ON programs
    FOR EACH ROW
    EXECUTE PROCEDURE handle_updated_at(); 