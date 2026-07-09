
-- ============ ENUM & ROLES ============
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============ BLOG POSTS ============
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  cover_image text,
  excerpt text,
  content text,
  author text NOT NULL DEFAULT 'Admin Pantai Jolosutro',
  is_published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  published_at timestamptz
);

GRANT SELECT ON public.blog_posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.blog_posts TO authenticated;
GRANT ALL ON public.blog_posts TO service_role;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published posts"
  ON public.blog_posts FOR SELECT
  TO anon, authenticated
  USING (is_published = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert posts"
  ON public.blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update posts"
  ON public.blog_posts FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete posts"
  ON public.blog_posts FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_blog_posts_published ON public.blog_posts (is_published, published_at DESC);
CREATE INDEX idx_blog_posts_slug ON public.blog_posts (slug);

-- ============ FEEDBACK ============
CREATE TABLE public.feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  message text NOT NULL,
  rating int CHECK (rating BETWEEN 1 AND 5),
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.feedback TO anon, authenticated;
GRANT SELECT, DELETE ON public.feedback TO authenticated;
GRANT ALL ON public.feedback TO service_role;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit feedback"
  ON public.feedback FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view feedback"
  ON public.feedback FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete feedback"
  ON public.feedback FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- ============ SEED BLOG POSTS ============
INSERT INTO public.blog_posts (title, slug, cover_image, excerpt, content, author, is_published, published_at) VALUES
(
  'Menjelajah Pesona Pantai Jolosutro di Selatan Blitar',
  'menjelajah-pesona-pantai-jolosutro',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
  'Pantai Jolosutro di Desa Ringinrejo, Wates, Blitar menawarkan hamparan pasir bersih, ombak selatan yang khas, dan suasana asri yang cocok untuk liburan keluarga.',
  E'# Menjelajah Pesona Pantai Jolosutro\n\nTerletak di Desa Ringinrejo, Kecamatan Wates, Kabupaten Blitar, **Pantai Jolosutro** adalah salah satu permata tersembunyi pesisir selatan Jawa Timur. Dengan pasir yang bersih, ombak khas Samudra Hindia, dan panorama tebing hijau di kedua sisinya, pantai ini menjadi destinasi favorit warga lokal maupun wisatawan luar kota.\n\n## Akses dan Lokasi\n\nDari pusat Kota Blitar, perjalanan menuju Pantai Jolosutro hanya membutuhkan waktu sekitar 1,5 jam berkendara ke arah selatan. Jalannya sudah beraspal mulus hingga area parkir pantai.\n\n## Yang Bisa Dinikmati\n\n- Bersantai di gazebo pinggir pantai\n- Berfoto di spot-spot instagramable\n- Menikmati kuliner khas warung UMKM lokal\n- Melihat aktivitas konservasi penyu\n\nTiket masuk **GRATIS** dan area parkir luas menjadi nilai tambah untuk kunjungan keluarga.',
  'Admin Pantai Jolosutro',
  true,
  now() - interval '2 days'
),
(
  'Program Konservasi Penyu: Warga Ringinrejo Menjaga Habitat Alami',
  'program-konservasi-penyu-ringinrejo',
  'https://images.unsplash.com/photo-1591025207163-942350e47db2?w=1200&q=80',
  'Kelompok pengelola bersama warga Desa Ringinrejo aktif menjalankan program konservasi penyu untuk menjaga kelestarian habitat di pesisir Jolosutro.',
  E'# Program Konservasi Penyu Pantai Jolosutro\n\nPantai Jolosutro dikenal sebagai salah satu lokasi pendaratan penyu di pesisir selatan Blitar. Untuk menjaga kelestariannya, warga Desa Ringinrejo bersama pengelola wisata rutin menjalankan program konservasi.\n\n## Kegiatan Konservasi\n\n1. **Patroli pantai** setiap musim bertelur\n2. **Relokasi telur** ke lokasi penetasan yang aman\n3. **Pelepasan tukik** bersama wisatawan dan pelajar\n4. **Edukasi lingkungan** kepada pengunjung\n\n## Bagaimana Wisatawan Bisa Ikut Menjaga\n\n- Buang sampah pada tempatnya\n- Tidak menyalakan lampu terang di malam hari saat musim bertelur\n- Ikuti briefing petugas saat pelepasan tukik\n\nDengan menjaga bersama, generasi mendatang tetap bisa menyaksikan penyu-penyu ini kembali ke Jolosutro.',
  'Admin Pantai Jolosutro',
  true,
  now() - interval '5 days'
),
(
  'Kuliner UMKM di Sekitar Pantai Jolosutro yang Wajib Dicoba',
  'kuliner-umkm-pantai-jolosutro',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80',
  'Dari nasi tiwul, ikan bakar segar, hingga es kelapa muda — kuliner UMKM di area Pantai Jolosutro menawarkan cita rasa khas Blitar dengan harga ramah kantong.',
  E'# Kuliner UMKM Pantai Jolosutro\n\nBerkunjung ke Pantai Jolosutro belum lengkap tanpa mencicipi sajian dari warung UMKM warga sekitar. Selain enak, membeli di sini juga mendukung ekonomi lokal.\n\n## Rekomendasi Menu\n\n- **Ikan bakar segar** hasil tangkapan nelayan setempat\n- **Nasi tiwul** khas Blitar dengan sambal terasi\n- **Pecel sayur** dengan bumbu kacang harum\n- **Es kelapa muda** langsung dari pohon\n- **Gorengan hangat**: pisang goreng, tahu isi, mendoan\n- **Kopi tubruk** untuk teman bersantai di gazebo\n\n## Dukungan untuk UMKM\n\nPengelola pantai bekerja sama dengan warga untuk menata warung agar rapi, higienis, dan ramah wisatawan. Setiap kunjungan Anda berarti dukungan langsung pada perekonomian Desa Ringinrejo.',
  'Admin Pantai Jolosutro',
  true,
  now() - interval '10 days'
);
