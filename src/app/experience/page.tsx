import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { Section } from '@/components/sections';
import { Card, Button, Badge } from '@/components/ui';
import { contentService } from '@/lib/services';
import { ROUTES } from '@/lib/constants';
import { generatePageMetadata } from '@/lib/utils';
import { Metadata } from 'next';

/**
 * Static metadata for the Experience listing page
 * For dynamic pages (with [slug]), use generateMetadata() instead
 */
export const metadata: Metadata = generatePageMetadata({
  title: 'Experience',
  description: 'Professional experience and impactful projects across AI integration, microservices, and full-stack development',
  path: '/experience',
});

export default async function ExperiencePage() {
  const allProjectsResult = await contentService.getAllProjects();
  const projects = allProjectsResult.success ? allProjectsResult.data : [];

  return (
    <main>
      <Section
        title="Experience"
        description="Professional experience and impactful projects across AI integration, microservices, and full-stack development"
      >
        {projects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card
                key={project.slug}
                variant="elevated"
                hoverable
                as="article"
              >
                <Card.Header>
                  <div className="mb-2 flex flex-wrap gap-2">
                    {project.current && (
                      <Badge variant="success">
                        Current
                      </Badge>
                    )}
                    {project.featured && (
                      <Badge variant="primary">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <h2 className="mb-2 font-mono text-xl font-bold text-foreground">
                    {project.title}
                  </h2>
                  <p className="mb-1 text-sm font-semibold text-primary">
                    {project.company}
                  </p>
                  <p className="text-xs text-foreground/60">
                    {project.role} · {project.year}
                  </p>
                </Card.Header>
                <Card.Body>
                  <p className="mb-4 text-foreground/70">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="primary" pill>
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </Card.Body>
                <Card.Footer>
                  <div className="flex w-full flex-wrap gap-2">
                    {project.isPublic && project.githubUrl && (
                      <Button
                        as="a"
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outline"
                        size="sm"
                        leftIcon={<Github className="h-3 w-3" />}
                      >
                        Code
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button
                        as="a"
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outline"
                        size="sm"
                        leftIcon={<ExternalLink className="h-3 w-3" />}
                      >
                        Live
                      </Button>
                    )}
                    <Button
                      as="a"
                      href={ROUTES.experience.detail(project.slug)}
                      variant="primary"
                      size="sm"
                      className="ml-auto"
                      rightIcon={<ArrowRight className="h-3 w-3" />}
                    >
                      Details
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="mb-4 text-lg text-foreground/60">
              No experience entries yet. Check back soon!
            </p>
          </div>
        )}
      </Section>
    </main>
  );
}
