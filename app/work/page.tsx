import Container from "@/components/Container";
import WorkContent from "@/components/sections/WorkContent";

export { workMetadata as metadata } from "@/components/sections/WorkContent";

export default function WorkPage() {
  return (
    <Container>
      <WorkContent />
    </Container>
  );
}
