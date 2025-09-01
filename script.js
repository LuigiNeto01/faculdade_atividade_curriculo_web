// ---- Preferência de tema
const root = document.documentElement;
const saved = localStorage.getItem('cv-theme');
if (saved === 'light') root.classList.add('light');

document.getElementById('themeBtn').addEventListener('click', () => {
    root.classList.toggle('light');
    localStorage.setItem('cv-theme', root.classList.contains('light') ? 'light' : 'dark');
});

// ---- Imprimir / PDF
document.getElementById('printBtn').addEventListener('click', () => window.print());

// ---- Util: gerar iniciais no avatar a partir do nome
function setAvatarFromName(name) {
    const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(p => p[0].toUpperCase())
    .join('');
    document.getElementById('avatarBox').textContent = initials || '??';
}

const profile = {
    name: 'Luigi Neto Figueiredo',
    headline: 'Desenvolvedor(a) Full Stack • Python • JavaScript • RPA • SQL',
    about: 'Profissional com foco em desenvolvimento web e automação (RPA), experiência em criação de APIs, bots com Selenium, integrações com bancos de dados e boas práticas de versionamento, testes e observabilidade. Apaixonado(a) por entregar valor rápido e com qualidade.',
    city: 'Ribeirão Preto, São Paulo',
    email: 'luigi4274@gmail.com',
    linkedin: 'https://www.linkedin.com/in/luiginetoo/',
    github: 'https://github.com/LuigiNeto01/',
    skills: ['Python','JavaScript','React','SQL','FastAPI','Selenium','Docker','Git']
};

function applyProfile(p) {
    document.getElementById('name').textContent = p.name;
    document.title = `Currículo – ${p.name}`;
    document.getElementById('headline').textContent = p.headline;
    document.getElementById('about').textContent = p.about;

    const links = document.querySelectorAll('.links .link');
    links[0].href = `mailto:${p.email}`;
    links[0].textContent = '✉️ ' + p.email;
    links[1].href = p.linkedin;
    links[2].href = p.github;
    links[3].textContent = '📍 ' + p.city;

    const chips = document.getElementById('skillsChips');
    chips.innerHTML = '';
    p.skills.forEach(s => {
    const span = document.createElement('span');
    span.className = 'chip';
    span.textContent = s;
    chips.appendChild(span);
    });

    // JSON-LD
    try {
    const schema = JSON.parse(document.getElementById('schemaPerson').textContent);
    schema.name = p.name;
    schema.jobTitle = p.headline;
    schema.email = `mailto:${p.email}`;
    schema.url = p.github || p.linkedin;
    schema.sameAs = [p.linkedin, p.github].filter(Boolean);
    schema.address.addressLocality = p.city;
    document.getElementById('schemaPerson').textContent = JSON.stringify(schema, null, 2);
    } catch (e) {}

    setAvatarFromName(p.name);
}

applyProfile(profile);