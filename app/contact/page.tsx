import Container from "@/components/Container";
import ContactContent from "@/components/sections/ContactContent";

export { contactMetadata as metadata } from "@/components/sections/ContactContent";

export default function ContactPage() {
  return (
    <Container>
      <ContactContent />
    </Container>
  );
}
