import Container from "@/components/Container";
import HeroSphereLayer from "@/components/HeroSphereLayer";
import ProgressiveSections from "@/components/ProgressiveSections";
import ContactContent from "@/components/sections/ContactContent";
import HomeContent from "@/components/sections/HomeContent";
import ProjectsContent from "@/components/sections/ProjectsContent";
import WorkContent from "@/components/sections/WorkContent";

export default function Home() {
  return (
    <Container>
      <ProgressiveSections sectionIds={["home", "work", "projects", "contact"]}>
        <div className="relative">
          <HeroSphereLayer />
          <HomeContent id="home" />
        </div>
        <div className="border-t border-white/6 pt-24 sm:pt-28">
          <WorkContent id="work" />
        </div>
        <div className="border-t border-white/6 pt-24 sm:pt-28">
          <ProjectsContent id="projects" />
        </div>
        <div className="border-t border-white/6 pt-24 sm:pt-28">
          <ContactContent id="contact" />
        </div>
      </ProgressiveSections>
    </Container>
  );
}
