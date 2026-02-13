-- Create the bookings table
create table public.bookings (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  guardian_name text not null,
  guardian_phone text not null,
  guardian_email text not null,
  child_name text not null,
  child_age integer not null,
  class_location text not null, -- 'Anyang' or 'Gwacheon'
  class_type text not null, -- 'Kindergarten' (5-7) or 'Elementary' (8-10)
  class_time timestamp with time zone not null,
  instructor_name text,
  constraint bookings_pkey primary key (id)
);

-- Enable RLS
alter table public.bookings enable row level security;

-- Policy: Allow public to insert (for now, or restrict to auth users if applicable)
create policy "Enable insert for all users" on "public"."bookings"
as permissive for insert
to public
with check (true);

-- Policy: Allow public to read count (or use a secure function)
create policy "Enable read for all users" on "public"."bookings"
as permissive for select
to public
using (true);
