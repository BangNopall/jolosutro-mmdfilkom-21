-- Fix: policy "Anyone can read published posts" calls has_role() for anon users,
-- but anon role doesn't have EXECUTE permission on has_role(). Split into two
-- separate policies so anon only sees published posts without calling has_role.

DROP POLICY IF EXISTS "Anyone can read published posts" ON public.blog_posts;

CREATE POLICY "Anon can read published posts"
  ON public.blog_posts FOR SELECT
  TO anon
  USING (is_published = true);

CREATE POLICY "Authenticated can read published or all if admin"
  ON public.blog_posts FOR SELECT
  TO authenticated
  USING (is_published = true OR public.has_role(auth.uid(), 'admin'));
