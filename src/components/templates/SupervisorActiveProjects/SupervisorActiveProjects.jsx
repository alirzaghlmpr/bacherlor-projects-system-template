const SupervisorActiveProjects = ({ projects }) => {
  return (
    <div className="flex p-3 flex-col my-5 text-sm">
      <p>پروژه های فعال شما</p>
      <div>
        <ol>
          {projects ? (
            projects.map((project, index) => {
              return (
                <li className="my-3" key={`activeProject${index}`}>
                  {index + 1} . {project.title} , اعضا :{" "}
                  {project.participants.map(({ name, suid }) => (
                    <span
                      className="pe-3"
                      key={`${name}${suid}`}>{`${name} (${suid})`}</span>
                  ))}
                </li>
              );
            })
          ) : (
            <p>شما پروژه فعالی ندارید</p>
          )}
        </ol>
      </div>
    </div>
  );
};

export default SupervisorActiveProjects;
