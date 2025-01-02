DROP TABLE IF EXISTS tasks;

-- Create ENUM type for task status
CREATE TYPE task_status AS ENUM ('in-progress', 'completed');

CREATE TABLE tasks (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    name TEXT NOT NULL,
    status task_status DEFAULT 'in-progress' NOT NULL,
    description TEXT NOT NULL,
    due_date DATE DEFAULT NULL,
    profile_id uuid REFERENCES profiles (id) ON DELETE CASCADE NOT NULL,
    project_id BIGINT REFERENCES projects (id) DEFAULT NULL,
    collaborators TEXT[] DEFAULT ARRAY[]::TEXT[] NOT NULL
);
