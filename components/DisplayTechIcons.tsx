import { getTechLogos } from "@/lib/utils";

const DisplayTechIcons = async ({
  techStack,
}: {
  techStack: string[];
}) => {
  const techLogos = await getTechLogos(techStack);

  return (
    <div className="tech-icons">
      {techLogos.slice(0, 3).map(({ tech, url }, index) => (
        <div
          key={index}
          className="tech-chip group relative"
          title={tech}
        >
          <img
            src={url}
            alt={tech}
            className="w-4 h-4 object-contain"
          />
          <span className="text-xs font-medium">{tech}</span>
        </div>
      ))}
      {techStack.length > 3 && (
        <div className="tech-chip">
          <span className="text-xs font-medium">+{techStack.length - 3}</span>
        </div>
      )}
    </div>
  );
};

export default DisplayTechIcons;
