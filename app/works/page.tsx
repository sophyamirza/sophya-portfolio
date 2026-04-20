import { PROJECTS, type Project, type ProjectPreview } from "./projects";
import WorksGalleryClient from "./WorksGalleryClient";

export type ProjectListItem = {
  slug: string;
  title: string;
  subtitle: string;
  projectType: Project["projectType"];
  tags: string[];
  cover?: string;
  preview?: ProjectPreview;
  subprojects?: ProjectListItem[];
};

function toProjectListItem(project: Project): ProjectListItem {
  return {
    slug: project.slug,
    title: project.title,
    subtitle: project.subtitle,
    projectType: project.projectType,
    tags: project.tags,
    cover: project.cover,
    preview: project.preview,
    subprojects: project.subprojects?.map(toProjectListItem),
  };
}

export default function WorksPage() {
  const projects = PROJECTS.map(toProjectListItem);

  return <WorksGalleryClient projects={projects} />;
}
