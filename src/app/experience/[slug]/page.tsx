import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Section } from '@/components/sections';
import { Button, Badge } from '@/components/ui';
import { contentService } from '@/lib/services';
import { ROUTES } from '@/lib/constants';
import type { Metadata } from 'next';
import { mdxComponents } from '../../../../mdx-components';
import { generateProjectMetadata } from '@/lib/utils';
import type { ExperiencePageProps } from './page.types';

/**
 * Dynamic metadata generation for individual project pages
 * Uses async function because metadata depends on the dynamic [slug] parameter
 * For static pages, use `export const metadata` instead
 */
export async function generateMetadata({ params }: ExperiencePageProps): Promise<Metadata> {
  const { slug } = await params;
  const projectResult = await contentService.getProjectBySlug(slug);

  if (!projectResult.success || !projectResult.data) {
    return {
      title: 'Experience Not Found',
    };
  }

  const project = projectResult.data;

  return generateProjectMetadata({
    title: project.title,
    description: project.description,
    slug: project.slug,
    thumbnail: project.thumbnail,
    technologies: project.technologies,
  });
}

export async function generateStaticParams() {
  const projectsResult = await contentService.getAllProjects();
  const projects = projectsResult.success ? projectsResult.data : [];

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ExperienceDetailPage({ params }: ExperiencePageProps) {
  const { slug } = await params;
  const projectResult = await contentService.getProjectBySlug(slug);

  if (!projectResult.success || !projectResult.data) {
    notFound();
  }

  const project = projectResult.data;

  return (
    <main>
      <Section>
        <div className="mx-auto max-w-3xl">
          {/* Back Link */}
          <Button
            as="a"
            href={ROUTES.experience.index}
            variant="ghost"
            size="sm"
            leftIcon={<ArrowLeft className="h-3 w-3" />}
            className="mb-8"
          >
            Back to Experience
          </Button>

          {/* Project Header */}
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <header className="not-prose mb-8">
              {/* Featured Badge */}
              {project.featured && (
                <div className="mb-4">
                  <Badge variant="primary">Featured</Badge>
                </div>
              )}

              {/* Title */}
              <h1 className="mb-4 font-mono text-4xl font-bold uppercase leading-tight tracking-wider text-foreground md:text-5xl">
                {project.title}
              </h1>

              {/* Company & Role */}
              <div className="mb-4 space-y-1">
                <p className="text-xl font-semibold text-primary">
                  {project.company}
                </p>
                <p className="text-base text-foreground/70">
                  {project.role} · {project.year}
                </p>
              </div>

              {/* Description */}
              <p className="mb-6 text-lg text-foreground/80">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="mb-6">
                <h3 className="mb-3 text-sm font-bold uppercase text-foreground/60">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="primary" pill>
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Links */}
              {(project.githubUrl || project.liveUrl) && (
                <div className="flex flex-wrap gap-3">
                  {project.isPublic && project.githubUrl && (
                    <Button
                      as="a"
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                      size="md"
                      leftIcon={<Github className="h-4 w-4" />}
                    >
                      View Code
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button
                      as="a"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                      size="md"
                      leftIcon={<ExternalLink className="h-4 w-4" />}
                    >
                      View Live
                    </Button>
                  )}
                </div>
              )}
            </header>

            {/* Project Content */}
            <div className="mt-8">
              <MDXRemote source={project.content} components={mdxComponents} />
            </div>
          </article>
        </div>
      </Section>
    </main>
  );
}
