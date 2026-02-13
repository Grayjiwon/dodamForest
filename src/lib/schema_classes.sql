-- Create the classes table
create table public.classes (
  id uuid not null default gen_random_uuid (),
  location text not null, -- 'Anyang' or 'Gwacheon'
  class_type text not null, -- 'Kindergarten' or 'Elementary'
  time timestamp with time zone not null,
  instructor text not null,
  max_participants integer not null default 6,
  constraint classes_pkey primary key (id)
);

-- Enable RLS
alter table public.classes enable row level security;

-- Policy: Allow public to read
create policy "Enable read access for all users" on "public"."classes"
as permissive for select
to public
using (true);

-- Insert sample data (Mock Data moved to DB)
insert into public.classes (location, class_type, time, instructor)
values
('Anyang', 'Kindergarten', '2026-02-21 10:00:00+09', '김선생님'),
('Anyang', 'Kindergarten', '2026-02-21 14:00:00+09', '이선생님'),
('Anyang', 'Elementary', '2026-02-22 10:00:00+09', '박선생님'),
('Gwacheon', 'Kindergarten', '2026-02-21 11:00:00+09', '최선생님'),
('Gwacheon', 'Elementary', '2026-02-22 11:00:00+09', '정선생님');
