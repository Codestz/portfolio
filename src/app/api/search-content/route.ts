import { NextResponse } from 'next/server';
import { contentService } from '@/lib/services';

export async function GET() {
  try {
    const [postsResult, projectsResult] = await Promise.all([
      contentService.getAllPosts(),
      contentService.getAllProjects(),
    ]);

    const posts = postsResult.success ? Array.from(postsResult.data) : [];
    const projects = projectsResult.success ? Array.from(projectsResult.data) : [];

    const searchContent = [
      ...posts.map((post) => ({
        type: 'post' as const,
        slug: post.slug,
        title: post.title,
        description: post.description,
        category: post.category,
        tags: post.tags,
        url: `/experiments/${post.slug}`,
      })),
      ...projects.map((project) => ({
        type: 'project' as const,
        slug: project.slug,
        title: project.title,
        description: project.description,
        category: 'category' in project ? project.category : 'project',
        tags: 'tags' in project ? project.tags : [],
        url: `/experience/${project.slug}`,
      })),
    ];

    return NextResponse.json(searchContent);
  } catch (error) {
    console.error('Search content API error:', error);
    return NextResponse.json({ error: 'Failed to fetch search content' }, { status: 500 });
  }
}
