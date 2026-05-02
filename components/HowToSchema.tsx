interface HowToStep {
  name: string;
  text: string;
}

interface Props {
  name: string;
  description: string;
  steps: HowToStep[];
}

export default function HowToSchema({ name, description, steps }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
