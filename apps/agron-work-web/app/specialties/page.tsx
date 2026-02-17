import { RoleCatalog } from "../../components/catalog/RoleCatalog";
import { roles } from "../../lib/roles";
import { WorkTypeMenus } from "../../components/worktypes/WorkTypeMenus";

export default function SpecialtiesPage() {
  return (
    <>
      <section>
        <h1 className="page-title">All Specialties and Professionals</h1>
        <p className="page-subtitle">
          Expand domain sections to browse roles, then use advanced filters below.
        </p>
        <WorkTypeMenus />
      </section>
      <RoleCatalog
        roles={roles}
        subtitle="Drone pilots, remote operators, monitoring analysts, AI/ML engineers, data/IT experts, automation engineers, project managers, and enterprise leaders."
      />
    </>
  );
}
