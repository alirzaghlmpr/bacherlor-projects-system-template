export const baseurl = () => "http://localhost:8000/api";

export const getProjects = () => `${baseurl()}/project-search/`;
export const login = () => `${baseurl()}/login/`;
export const claimProject = (id) => `${baseurl()}/claim-project/${id}/`;
export const getStudentRequests = () => `${baseurl()}/student-dashboard/`;
export const getProfessorRequests = () => `${baseurl()}/professor-dashboard/`;
export const changeClaimStatus = () => `${baseurl()}/approve-claim/`;
