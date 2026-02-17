import { notFound } from "next/navigation";
import { RoleCatalog } from "../../../components/catalog/RoleCatalog";
import { domainInfo, roleDomains, roles, slugToDomain } from "../../../lib/roles";

export function generateStaticParams() {
  return roleDomains.map((slug) => ({ slug }));
}

export default function DomainPage({ params }: { params: { slug: string } }) {
  const domain = slugToDomain[params.slug];
  const info = domainInfo[params.slug];

  if (!domain || !info) {
    notFound();
  }

  return (
    <RoleCatalog
      roles={roles}
      presetDomain={domain}
      title={info.title}
      subtitle={info.description}
    />
  );
}
