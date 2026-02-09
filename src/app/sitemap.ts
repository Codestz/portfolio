import { MetadataRoute } from 'next';
import { contentService } from '@/lib/services';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://estebanestrada.dev'; // Update with your actual domain

  // Static routes
  const routes = [
    '',
    '/about',
    '/experiments',
    '/experience',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Blog posts
  const postsResult = await contentService.getAllPosts();
  const posts = postsResult.success ? Array.from(postsResult.data) : [];
  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/experiments/${post.slug}`,
    lastModified: post.publishedAt,
    changeFrequency: 'monthly' as const,
    priority: post.featured ? 0.9 : 0.7,
  }));

  // Experience/Projects
  const projectsResult = await contentService.getAllProjects();
  const projects = projectsResult.success ? Array.from(projectsResult.data) : [];
  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/experience/${project.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...postRoutes, ...projectRoutes];
}
