-- Migration number: 0001 	 2025-11-06T05:34:12.330Z

-- Add password column to guestbook table
ALTER TABLE guestbook ADD COLUMN password TEXT NOT NULL DEFAULT '';
