// g;obal variables
const path = window.location.href;
const alert = document.querySelector(".alert");
const signUpForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const createProjectForm = document.getElementById("createProjectForm");
// handle registration
if (path.includes("register.html")) {
  window.onload = function () {
    getPrograms();
    getGraduationYears();
    register();
  };
  // get list of programs
  let getPrograms = async function () {
    const programsList = signUpForm.querySelector("[name=program]");
    const url = "/api/programs";
    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error("HTTP Error Status: " + resp.status);
    } else {
      const programs = await resp.json();
      programs.forEach((prog) => {
        const optElement = document.createElement("option");
        optElement.value = prog.split(" ").join("_");
        optElement.innerHTML = prog;
        programsList.append(optElement);
      });
    }
  };

  // getting graduation years
  let getGraduationYears = async () => {
    const graduationYear = signUpForm.querySelector("[name=graduationYear]");

    const url = "/api/graduationYears";
    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error("HTTP Error Status: " + resp.status);
    } else {
      const years = await resp.json();
      for (let i = 0; i < years.length; i++) {
        const optElement = document.createElement("option");
        optElement.value = years[i];
        optElement.innerHTML = years[i];
        graduationYear.append(optElement);
      }
    }
  };

  // register new user
  const register = async () => {
    const url = "/api/register";
    signUpForm.addEventListener("submit", async (e) => {
      e.preventDefault(e);
      const firstName = signUpForm.querySelector("[name=firstName]").value;
      const lastName = signUpForm.querySelector("[name=lastName]").value;
      const email = signUpForm.querySelector("[name=email]").value;
      const password = signUpForm.querySelector("[name=password]").value;
      const matricNumber = signUpForm.querySelector("[name=matricNumber]")
        .value;
      const program = signUpForm.querySelector("[name=program]").value;
      const graduationYear = signUpForm.querySelector("[name=graduationYear]")
        .value;
      const userData = {
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
        matricNumber: matricNumber,
        program: program,
        graduationYear: graduationYear,
      };

      const resp = await fetch(url, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const user = await resp.json();
      if (resp.status === 200) {
        setCookie("uid", user.data.id);
        window.location.href = "index.html";
      } else {
        alert.style.display = "block";
        user.errors.forEach((err) => {
          alert.innerHTML += `<p>${err}</p>`;
        });
      }
    });
  };
}

// handling user log in via uid cookie after  registeration

if (path.includes("index.html")) {
  window.onload = () => {
    setLogin();
    getProjects();
  };
}

// setting log in status of user
const setLogin = async () => {
  const signupLink = document.getElementById("signup");
  const loginLink = document.getElementById("login");
  const logout = document.getElementById("logout");
  const userName = document.getElementById("username");
  const cvalue = getCookie("uid");
  if (cvalue) {
    const resp = await fetch(`/api/users/${cvalue}`);
    if (resp.ok) {
      const userInfo = await resp.json();
      userName.textContent = `Hi, ${userInfo.firstname} `;
      logout.textContent = "Logout";
      signupLink.style.display = "none";
      loginLink.style.display = "none";
    }

    logout.addEventListener("click", () => {
      deleteCookie("uid");
      window.location.href =
        "http://localhost:4000/project-explorer/index.html";
    });
  }
};
// handling log in by existing user
if (path.includes("login.html")) {
  window.onload = () => {
    postLogin();
  };

  const postLogin = async () => {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = loginForm.querySelector("[name=email]").value;
      const password = loginForm.querySelector("[name=password]").value;
      const resp = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (resp.status === 200) {
        const user = await resp.json();
        setCookie("uid", user.data.id);
        window.location.href = "index.html";
      } else {
        alert.style.display = "block";
        alert.textContent = "Invalid email/password";
      }
    });
  };
}

// creating a project by a user
if (path.includes("createproject.html")) {
  window.onload = () => {
    const checkCookieVal = getCookie("uid");

    if (checkCookieVal === "") {
      window.location.href = "login.html";
    } else {
      setLogin();
      createProject();
    }
  };

  const createProject = async () => {
    createProjectForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = createProjectForm.querySelector("[name=name]").value;
      const abstract = createProjectForm.querySelector("[name=abstract]").value;
      let authors = createProjectForm
        .querySelector("[name=authors]")
        .value.split(",");
      let tags = createProjectForm
        .querySelector("[name=tags]")
        .value.split(",");
      let customAuthors = authors.map((author) => author.trim());
      let customTags = tags.map((tag) => "#" + tag.trim());
      const data = {
        name: name,
        abstract: abstract,
        authors: customAuthors,
        tags: customTags,
      };
      const url = "/api/projects";
      const resp = await fetch(url, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const reply = await resp.json();
      if (resp.status === 200) {
        window.location.href = "index.html";
      } else {
        alert.style.display = "block";
        reply.errors.forEach((err) => {
          alert.innerHTML += `<p>${err}</p>`;
        });
      }
    });
  };
}

// populating index.html page with list of projects
const getProjects = async () => {
  let projectList = document.querySelector(".showcase");
  const resp = await fetch("/api/projects");
  if (resp.ok) {
    projects = await resp.json();
    projects.length = 4;
    projects.reverse();
    projects.forEach((project) => {
      const authors = project.authors.map((tag) => tag.trim()).join(", ");
      const tag = project.tags.map((tag) => tag.trim()).join(" ");
      projectList.innerHTML += `<div class="col">
          <div class="card">
          <div class="card-body">
          <h5 class="card-title">
            <a href="viewproject.html?id=${project.id}" class="card-link">
             ${project.name}
            </a>
          </h5>
          <h6 class="card-subtitle mb-2 text-muted">${authors}</h6>
          <p class="card-text">${project.abstract}</p>
          <a href="#" class="card-link">${tag}</a>
       
       </div>`;
    });
  }
};

// updating the single project info on viewproject.html
if (path.includes("viewproject.html")) {
  let projectId = location.search;
  projectId = projectId.substring(4);
  const id = getCookie("uid");

  window.onload = () => {
    getProject();
    setLogin();
  };

  const getProject = async () => {
    const projectInfo = document.querySelector(".project_info");
    const projectName = projectInfo.querySelector("#project_name");
    const projectAuthor = projectInfo.querySelector("#project_author");
    const projectAbstract = projectInfo.querySelector("#project_abstract");
    const projectAuthors = projectInfo.querySelector("#project_authors");
    const projectTags = projectInfo.querySelector("#project_tags");
    const resp = await fetch(`/api/projects/${projectId}`);
    if (resp.ok) {
      const project = await resp.json();
      projectName.textContent = `${project.name}`;
      projectAbstract.textContent = `${project.abstract}`;
      project.authors.forEach((author, i) => {
        projectAuthors.innerHTML += `<p class="card-text text-left">${author}</p>`;
        if (project.tags.length > 1) {
          projectTags.innerHTML += ` <a href="#">${project.tags[i]}</a>`;
        } else {
          projectTags.innerHTML = ` <a href="#">${project.tags}</a>`;
        }
      });
    }
    const getUser = await fetch("/api/users/" + id);
    if (getUser.ok) {
      const user = await getUser.json();
      projectAuthor.innerHTML = `
       <p>
          Created By <br> ${user.firstname} ${user.lastname}
      </p>`;
    } else {
      console.log(getUser);
    }
  };
}

// cookie management functions
function setCookie(cname, cvalue) {
  document.cookie = cname + "=" + cvalue + ";" + "path=/";
}

// get cookie
function getCookie(cname) {
  let cvalue;
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let cArr = decodedCookie.split(";");
  for (let i = 0; i < cArr.length; i++) {
    let c = cArr[i];
    if (c.indexOf(name) == 0) {
      cvalue = c.substring(name.length);
      return cvalue;
    }
    return "";
  }
}

// delete cookie
function deleteCookie(cname) {
  document.cookie =
    cname + "=" + "; expires=Thu, 01 Jan 1970 00:00:00 UTC;" + "path=/";
}
