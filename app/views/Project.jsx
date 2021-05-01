import React from "react";
import Layout from "./shared/Layout";

const Project = ({ singleProject, pCreator }) => {
  return (
    <Layout user={pCreator}>
      <main className="project_info">
        <div className="container mt-5 ">
          {/* <!-- single project details start --> */}

          <h1 id="project_name">{singleProject.name}</h1>
          <section>
            <div className="row bg-light p-2">
              <div className="col" id="project_author">
                {
                  <p>
                    {" "}
                    Created By <br /> {pCreator.firstname} {pCreator.lastname}{" "}
                  </p>
                }
              </div>
              <div className="col">
                Date Created <br /> 00/00/0000
              </div>
              <div className="col">
                Last Updated <br /> 01/00/0000
              </div>
              <div className="col d-flex justify-content-end">
                <a
                  href="editproject.html"
                  className="btn btn-primary "
                  role="button"
                >
                  Edit Project
                </a>
              </div>
            </div>
          </section>
        </div>
        {/* <!-- single project details end --> */}

        <div className="container mb-5">
          <div className="row">
            <div className="col">
              {/* <!--project abstract begins  --> */}
              <section>
                <h5 className="pt-5 pb-2 border-bottom">Project Abstract</h5>
                <div id="project_abstract">{singleProject.abstract}</div>
              </section>
              <form action="" className="mt-5 border-bottom">
                <h5>Comments</h5>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    name="comments"
                    placeholder="leave a comment"
                    cols="10"
                    rows="3"
                  ></textarea>
                </div>
                <input type="submit" className="btn btn-primary mb-2" />
              </form>
              <p className="card-text text-center">no comments added yet</p>
              {/* <!--project abstract end  --> */}
            </div>
            <div className="col">
              {/* <!-- Project Details starts  --> */}
              <section>
                <h5 className="pt-5 pb-2 border-bottom">Project Details</h5>
                <h5 className="card-header">Author(s)</h5>
                <div className="card">
                  <div className="card-body" id="project_authors">
                    {singleProject.authors.join(", ")}
                  </div>
                  {singleProject.length > 1 ? (
                    <div className="card-footer" id="project_tags">
                      {singleProject.tags.join(", ")}
                    </div>
                  ) : (
                    <div className="card-footer" id="project_tags">
                      {singleProject.tags.join(", ")}
                    </div>
                  )}
                </div>

                <div className="card mt-3">
                  <h5 className="card-header">Project Files</h5>
                  <div className="card-body">
                    <p className="card-text text-center">no files selected</p>
                  </div>
                </div>
              </section>
              {/* <!-- Project Details ends  -->    */}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Project;
