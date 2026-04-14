import Container from "@/components/Container";
import ProjectsContent from "@/components/sections/ProjectsContent";

export { projectsMetadata as metadata } from "@/components/sections/ProjectsContent";

export default function ProjectsPage() {
  return (
    <Container>
      <ProjectsContent />
    </Container>
  );
}
