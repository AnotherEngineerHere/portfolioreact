// Función para manejar el clic en cualquier parte de la página
document.addEventListener("click", handlePageClick);

function handlePageClick(event) {
    // Prevenir que el clic dentro de ciertos elementos específicos dispare el evento
    if (!event.target.closest("#command-input, #modal, #skills-chart")) {
        console.log("Clic detectado en la página.");
        focusInput();
    }
}

const outputElement = document.getElementById("output");
const inputElement = document.getElementById("command-input");
const graphicOverlayElement = document.getElementById("graphic-overlay");
const modalElement = document.getElementById("modal");
const modalTitleElement = document.getElementById("modal-title");
const modalBodyElement = document.getElementById("modal-body");
const closeButtonElement = document.getElementsByClassName("close")[0];
const skillsChartElement = document.getElementById("skills-chart");

let currentLanguage = "en";
let commandHistory = [];
let historyIndex = -1;

function focusInput() {
    inputElement.focus();
}




const translations = {
  es: {
    help: "Comandos disponibles: about, experience, projects, contact, clear, translate, download-cv",
    sudo: "root is not in the sudoers file.  This incident will be reported.",
    about: {
      title: "Sobre Mí",
      content:
        "Soy un desarrollador de software especializado en backend, con amplia experiencia en diseño y desarrollo de microservicios usando Java, Spring Boot y tecnologías de la nube como AWS. Con más de tres años de experiencia, he trabajado en sectores como e-commerce, aplicaciones móviles y componentes IoT. Mi enfoque está en optimizar el rendimiento de aplicaciones y aplicar arquitecturas escalables que mejoren la seguridad y eficiencia. Actualmente, estudio Ingeniería de Software en la UNAD y tengo certificación en AWS Academy Cloud Foundations.",
    },
    skills: {
      title: "Mis Habilidades",
      content: `
        <ul>
          <li>Java (versiones 8, 11, 17)</li>
          <li>.NET</li>
          <li>Spring Boot, WebFlux</li>
          <li>Linux, Docker</li>
          <li>MySQL, Oracle SQL</li>
          <li>Git, GitHub, CI/CD</li>
          <li>Python</li>
          <li>Servicios en la nube: AWS, Azure, GCP</li>
        </ul>
      `,
    },
    projects: {
      title: "Mis Proyectos",
      content: `
        <ul>
          <li>Generación y Validación de OTP: Sistema para enviar y validar códigos OTP usando Spring Boot y WebFlux.</li>
          <li>Portafolio Interactivo: Este mismo portafolio minimalista.</li>
        </ul>
      `,
    },
    experience: {
      title: "Experiencia",
      content: `
        <ul>
          <li><strong>Backend Developer</strong> en Codesa (Julio 2023 - Presente): Optimización y refactorización de microservicios, implementación de pruebas automatizadas y buenas prácticas de seguridad.</li>
          <li><strong>Software Developer</strong> en EyS Ingeniería de Colombia (Noviembre 2021 - Julio 2023): Desarrollo de dashboards, arquitectura de microservicios en aplicaciones móviles y aplicación de estándares de código.</li>
        </ul>
      `,
    },
    contact: {
      title: "Contacto",
      content: `
          <p>Email: <a href="mailto:juanxxi2015@gmail.com">juanxxi2015@gmail.com</a></p>
          <p>LinkedIn: <a href="https://linkedin.com/in/andres-orozco-nunez" target="_blank">linkedin.com/in/juan-andres-orozco-nunez</a></p>
          <p>GitHub: <a href="https://github.com/AnotherEngineerHere" target="_blank">github.com/AnotherEngineerHere</a></p>
      `,
  },  
    themeChanged: "Tema cambiado a",
    languageChanged: "Idioma cambiado a Español",
    cvGenerated: "CV generado y descargado como PDF",
    commandNotRecognized:
      'Comando no reconocido. Escribe "help" para ver los comandos disponibles.',
    selectTheme: "Selecciona un tema:",
    themeOptionsShown:
      "Opciones de tema mostradas. Haz clic en un tema para cambiarlo.",
  },
  en: {
    help: "Available commands: about, experience, projects, contact, clear, translate, download-cv",
    sudo: "root is not in the sudoers file.  This incident will be reported.",
    about: {
      title: "About Me",
      content:
        "I'm a backend software developer with extensive experience in designing and developing microservices using Java and Spring Boot. With over three years in the field, I've worked across various domains, including e-commerce, mobile applications, and IoT components. My focus is on optimizing application performance and implementing scalable and secure architectural practices. I'm currently pursuing a degree in Software Engineering at UNAD and hold AWS Academy Cloud Foundations certification.",
    },
    skills: {
      title: "My Skills",
      content: `
        <ul>
          <li>Java (versions 8, 11, 17)</li>
          <li>.NET</li>
          <li>Spring Boot, WebFlux</li>
          <li>Linux, Docker</li>
          <li>MySQL, Oracle SQL</li>
          <li>Git, GitHub, CI/CD</li>
          <li>Python</li>
          <li>Cloud Services: AWS, Azure, GCP</li>
        </ul>
      `,
    },
    projects: {
      title: "My Projects",
      content: `
        <ul>
          <li>OTP Generation & Validation: System for sending and validating OTP codes using Spring Boot and WebFlux.</li>
          <li>Interactive Portfolio: This minimalist portfolio.</li>
        </ul>
      `,
    },
    
    contact: {
      title: "Contact",
      content: `
          <p>Email: <a href="mailto:juanxxi2015@gmail.com">juanxxi2015@gmail.com</a></p>
          <p>LinkedIn: <a href="https://linkedin.com/in/andres-orozco-nunez" target="_blank">linkedin.com/in/juan-andres-orozco-nunez</a></p>
          <p>GitHub: <a href="https://github.com/AnotherEngineerHere" target="_blank">github.com/AnotherEngineerHere</a></p>
      `,
  },
  
    experience: {
      title: "Experience",
      content: `
        <ul>
          <li><strong>Backend Developer</strong> at Codesa (July 2023 - Present): Optimizing and refactoring microservices, implementing automated testing and security best practices.</li>
          <li><strong>Software Developer</strong> at EyS Ingeniería de Colombia (November 2021 - July 2023): Developing dashboards, microservices architecture for mobile applications, and applying code standards.</li>
        </ul>
      `,
    },
    languageChanged: "Language changed to English",
    cvGenerated: "CV generated and downloaded as PDF",
    commandNotRecognized:
      'Command not recognized. Type "help" to see available commands.',
    selectTheme: "Select a theme:",
    themeOptionsShown: "Theme options shown. Click on a theme to change it.",
  },
};

const commandActions = {
    help: () => translations[currentLanguage].help,
    sudo: () => translations[currentLanguage].sudo,
    about: () => showModal("about"),
    projects: () => showModal("projects"),
    contact: () => showModal("contact"),
    clear: () => (outputElement.innerHTML = ""),
    translate: (args) => changeLanguage(args[0]),
    experience: () => showModal("experience"),
    "download-cv": () => generateCV(),
    exit: () => window.close(),
};

inputElement.addEventListener("keydown", handleCommandInput);

function handleCommandInput(event) {
    const { key } = event;
    if (key === "Enter") executeCommand();
    else if (key === "ArrowUp") navigateCommandHistory(-1);
    else if (key === "ArrowDown") navigateCommandHistory(1);
}



function changeLanguage(lang) {
  if (lang === "es" || lang === "en") {
    currentLanguage = lang;
    return translations[currentLanguage].languageChanged;
  }
  return "Supported languages: es (Spanish), en (English)";
}

function executeCommand() {
    const [command, ...args] = inputElement.value.trim().split(" ");
    inputElement.value = "";
    appendCommandOutput(command);

    if (commandActions[command]) {
        const result = commandActions[command](args);
        if (result) outputElement.innerHTML += `<div>${result}</div>`;
        createFloatingIcon(command);
    } else {
        outputElement.innerHTML += `<div>${translations[currentLanguage].commandNotRecognized}</div>`;
    }
    outputElement.scrollTop = outputElement.scrollHeight;
    commandHistory.push(command);
    historyIndex = commandHistory.length;
    focusInput(); 
}

function navigateCommandHistory(direction) {
    if ((direction < 0 && historyIndex > 0) || (direction > 0 && historyIndex < commandHistory.length - 1)) {
        historyIndex += direction;
        inputElement.value = commandHistory[historyIndex] || "";
    }
}

function appendCommandOutput(command) {
    outputElement.innerHTML += `
        <div>
            <span class="prompt">
                <span class="prompt-symbol" style="color: #00e1ff;">┌──(</span>
                <span class="username" style="color: #00ff00;">root💀folio</span>
                <span class="prompt-symbol" style="color: #00e1ff;">)-[~]</span>
            </span> ${command}
        </div>`;
}

function createFloatingIcon(command) {
    const icon = document.createElement("div");
    icon.className = "floating-icon";
    icon.style.left = `${Math.random() * 100}%`;
    icon.style.top = `${Math.random() * 100}%`;
    graphicOverlayElement.appendChild(icon);
    setTimeout(() => icon.remove(), 3000);
}

function showModal(section) {
    modalTitleElement.textContent = translations[currentLanguage][section]?.title || section;
    modalBodyElement.innerHTML = translations[currentLanguage][section]?.content || `Contenido de ${section}`;
    modalElement.style.display = "block";
    document.addEventListener("keydown", closeModalOnEsc);
}

function closeModal() {
    modalElement.style.display = "none";
    skillsChartElement.style.display = "none";
    document.removeEventListener("keydown", closeModalOnEsc);
    focusInput();
}

function closeModalOnEsc(event) {
    if (event.key === "Escape") closeModal();
}

function generateCV() {
  const cvFileName = currentLanguage === "es" ? "CV_es.pdf" : "CV_en.pdf";
  const cvUrl = `./${cvFileName}`;
  const link = document.createElement("a");
  link.href = cvUrl;
  link.download = cvFileName;
  link.click();

  outputElement.innerHTML += `<div>${translations[currentLanguage].cvGenerated}</div>`;
}


closeButtonElement.onclick = closeModal;
window.onclick = (event) => {
    if (event.target === modalElement || event.target === skillsChartElement) closeModal();
};

focusInput();
