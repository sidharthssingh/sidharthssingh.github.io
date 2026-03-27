(function () {
  const output = document.getElementById('output');
  const input = document.getElementById('command-input');
  const terminalBody = document.getElementById('terminal-body');
  const tabHint = document.getElementById('tab-hint');

  // ── Command registry ──────────────────────────────────────────────
  const COMMANDS = {
    help: cmdHelp,
    whoami: cmdWhoami,
    experience: cmdExperience,
    education: cmdEducation,
    skills: cmdSkills,
    projects: cmdProjects,
    contact: cmdContact,
    resume: cmdResume,
    clear: cmdClear,
    // easter eggs
    sudo: cmdSudo,
    arsenal: cmdArsenal,
    hack: cmdHack,
    hello: cmdHello,
    hi: cmdHello,
    ls: cmdLs,
    cat: cmdCat,
    pwd: cmdPwd,
    date: cmdDate,
    neofetch: cmdNeofetch,
    game: cmdGame,
  };

  const COMMAND_NAMES = Object.keys(COMMANDS);

  // ── Helpers ────────────────────────────────────────────────────────
  function print(html) {
    const div = document.createElement('div');
    div.classList.add('line');
    div.innerHTML = html;
    output.appendChild(div);
    scrollToBottom();
  }

  function printCommand(cmd) {
    const div = document.createElement('div');
    div.classList.add('line', 'command-line');
    div.textContent = cmd;
    output.appendChild(div);
  }

  function scrollToBottom() {
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function nl() { print(''); }

  // ── Commands ───────────────────────────────────────────────────────
  function cmdHelp() {
    print('<span class="section-header">Available Commands</span>');
    nl();
    const cmds = [
      ['whoami', 'who is this guy anyway?'],
      ['experience', 'the professional journey'],
      ['education', 'where the learning happened'],
      ['skills', 'the toolkit'],
      ['projects', 'things I\'ve built'],
      ['contact', 'let\'s connect'],
      ['resume', 'download the PDF'],
      ['clear', 'clean slate'],
      ['help', 'you\'re looking at it'],
    ];
    cmds.forEach(([cmd, desc]) => {
      print(`  <span class="green">${cmd.padEnd(14)}</span> <span class="dim">${desc}</span>`);
    });
    nl();
    nl();
    print('<span class="dim">Pro tip: Tab to autocomplete. And if you\'re curious...</span>');
    print('<span class="dim">  Try some Linux classics, ask about my football club,</span>');
    print('<span class="dim">  or see if you have root access. There\'s also a neofetch.</span>');
  }

  function cmdWhoami() {
    print('<span class="bold cyan">SIDHARTH SHANKER SINGH</span>');
    nl();
    print('Senior Product Manager who speaks fluent code.');
    print('Engineer turned PM. Michigan MBA. Builder of things.');
    nl();
    print('I build products at the intersection of <span class="accent">AI</span>,');
    print('<span class="accent-2">data</span>, and <span class="green">consumer experience</span>.');
    nl();
    print('Currently making geolocation smarter at <span class="bold">XPoint</span>,');
    print('previously making games more addictive at <span class="bold">Light & Wonder</span>,');
    print('and before that scaling a <span class="bold">unicorn gaming startup</span> in India.');
    nl();
    print('<span class="dim">When I\'m not shipping products, I\'m probably watching Arsenal');
    print('lose in increasingly creative ways. COYG.</span>');
  }

  function cmdExperience() {
    print('<span class="section-header">Experience</span>');
    nl();

    // XPoint
    print('<span class="bold accent">XPOINT</span> <span class="dim">| B2B geolocation & fraud detection</span>');
    print('<span class="yellow">Senior Product Manager</span> <span class="dim">Apr 2025 - Present | Austin, TX</span>');
    print('  Defined vision & roadmap for geolocation SDK across 20+ jurisdictions');
    print('  Launched 0\u21921 location intelligence surfaces serving <span class="green">100M+ monthly checks</span>');
    print('  Secured <span class="green">$5M+ ACV</span> by converting competitive threat into retention win');
    print('  Built fraud detection products improving visibility <span class="green">3x</span>, reducing false positives <span class="green">40%</span>');
    print('  Architected <span class="accent">LLM-powered competitive intelligence agent</span>');
    print('  Compressed client onboarding from 6 weeks to <span class="green">1 day</span>');
    nl();

    // Light & Wonder
    print('<span class="bold accent">LIGHT & WONDER</span> <span class="dim">| Jackpot Party - 7th largest US mobile game</span>');
    print('<span class="yellow">Technical Product Manager</span> <span class="dim">Aug 2024 - Apr 2025 | Austin, TX</span>');
    print('  Prioritized 12 features across 3 teams driving <span class="green">20% retention improvement</span>');
    print('  Launched features delivering <span class="green">15% engagement lift</span> and <span class="green">10% MAU growth</span>');
    print('  Designed <span class="accent">AI-driven player segmentation</span> increasing conversion <span class="green">18%</span>');
    print('  Shipped agentic AI workflows reducing PM cycle time by <span class="green">40%</span>');
    nl();

    // Games24x7
    print('<span class="bold accent">GAMES24X7</span> <span class="dim">| Unicorn startup, 100M+ users, real money gaming</span>');
    print('<span class="yellow">Technical Product Manager</span> <span class="dim">Mar 2020 - Jul 2022 | Mumbai, India</span>');
    print('  Boosted new customer ARR by <span class="green">33% YoY</span>, gross profit by <span class="green">25%</span>');
    print('  Launched AI/ML matchmaking \u2192 <span class="green">70% increase</span> in new user signups');
    print('  Built cross-platform fraud detection saving <span class="green">$600K+ annually</span>');
    nl();
    print('<span class="yellow">Senior Software Engineer</span> <span class="dim">Mar 2019 - Mar 2020</span>');
    print('  Delivered 6 consumer features serving <span class="green">7M+ users</span>, raising revenue by <span class="green">$15M</span>');
    print('  Built A/B testing platform improving marketing efficiency by <span class="green">72%</span>');
    nl();

    // Guru
    print('<span class="bold accent">GURU.COM</span> <span class="dim">| Freelancing marketplace, 4M+ users</span>');
    print('<span class="yellow">Software Engineer</span> <span class="dim">Jan 2018 - Mar 2019 | Noida, India</span>');
    print('  Redesigned job posting UX \u2192 <span class="green">5x increase</span> in jobs posted');
    print('  Architected payment safeguard reducing complaints by <span class="green">80%</span>');
  }

  function cmdEducation() {
    print('<span class="section-header">Education</span>');
    nl();
    print('<span class="bold accent">UNIVERSITY OF MICHIGAN</span>');
    print('<span class="yellow">MBA</span> <span class="dim">(STEM designated) | Stephen M. Ross School of Business</span>');
    print('<span class="dim">Aug 2022 - May 2024 | Ann Arbor, MI</span>');
    print('  Concentrations: Technology, Strategy, Design Thinking & Gen AI');
    print('  GMAT: <span class="green">760</span> <span class="dim">(99th percentile)</span>');
    nl();
    print('<span class="bold accent">SHIV NADAR UNIVERSITY</span>');
    print('<span class="yellow">B.Tech, Computer Science & Engineering</span>');
    print('<span class="dim">Aug 2014 - May 2018 | Noida, India</span>');
    print('  Merit full-tuition scholarship <span class="dim">(top 1%-ile)</span>');
  }

  function cmdSkills() {
    print('<span class="section-header">Skills & Tools</span>');
    nl();
    print('<span class="cyan">Product</span>');
    print('  <span class="skill-tag highlight">Product Strategy</span><span class="skill-tag highlight">Roadmapping</span><span class="skill-tag">A/B Testing</span><span class="skill-tag">Agile</span><span class="skill-tag">Jira</span>');
    nl();
    print('<span class="cyan">Technical</span>');
    print('  <span class="skill-tag highlight">Python</span><span class="skill-tag highlight">SQL</span><span class="skill-tag">REST APIs</span><span class="skill-tag">GCP</span><span class="skill-tag">AWS</span>');
    nl();
    print('<span class="cyan">AI / ML</span>');
    print('  <span class="skill-tag highlight">LLM Development</span><span class="skill-tag highlight">Prompt Engineering</span><span class="skill-tag highlight">Agentic Workflows</span><span class="skill-tag">Claude</span><span class="skill-tag">v0</span>');
    nl();
    print('<span class="cyan">Design & Data</span>');
    print('  <span class="skill-tag">Figma</span><span class="skill-tag">Tableau</span><span class="skill-tag">PowerBI</span><span class="skill-tag">UI/UX</span>');
  }

  function cmdProjects() {
    print('<span class="section-header">Projects</span>');
    nl();
    print('<span class="yellow">$ ls projects/</span>');
    print('<span class="dim">  coming_soon.md</span>');
    nl();
    print('This section is under active development.');
    print('Check back soon for cool things I\'m building.');
    nl();
    print('<span class="dim">Hint: It\'ll involve AI, probably some questionable CSS,');
    print('and definitely too many API calls.</span>');
  }

  function cmdContact() {
    print('<span class="section-header">Contact</span>');
    nl();
    print('  <span class="cyan">email</span>     <a href="mailto:singhss@umich.edu" style="color:var(--accent);text-decoration:none;">singhss@umich.edu</a>');
    print('  <span class="cyan">phone</span>     (734) 596-3721');
    print('  <span class="cyan">linkedin</span>  <a href="https://www.linkedin.com/in/sidharth-singh-206264125/" target="_blank" style="color:var(--accent);text-decoration:none;">linkedin.com/in/sidharth-singh</a>');
    print('  <span class="cyan">github</span>    <a href="https://github.com/sidharthssingh" target="_blank" style="color:var(--accent);text-decoration:none;">github.com/sidharthssingh</a>');
    nl();
    print('<span class="dim">I don\'t bite. Usually.</span>');
  }

  function cmdResume() {
    print('Opening resume...');
    print('<span class="dim">If download doesn\'t start, click: <a href="resume.pdf" style="color:var(--accent);">resume.pdf</a></span>');
    // Trigger download
    const a = document.createElement('a');
    a.href = 'resume.pdf';
    a.download = 'Sidharth_Singh_Resume.pdf';
    a.click();
  }

  function cmdClear() {
    output.innerHTML = '';
  }

  // ── Easter Eggs ────────────────────────────────────────────────────
  function cmdSudo() {
    print('<span class="red">Nice try.</span> You don\'t have root access to my career.');
    print('<span class="dim">But I appreciate the ambition.</span>');
  }

  function cmdArsenal() {
    print('<span class="red">COYG! Come On You Gunners!</span>');
    nl();
    print('Fun facts:');
    print('  \u26BD Attended FIFA 2018 World Cup in Russia');
    print('  \u2764\uFE0F Arsenal supporter through thick and thin');
    print('  \uD83C\uDFC6 Still waiting for that Champions League trophy...');
    print('  \uD83D\uDE44 Yes, I\'ve heard every "Arsenal always almost win" joke');
    nl();
    print('<span class="dim">The thing about Arsenal is, they always try to walk it in.</span>');
  }

  function cmdHack() {
    print('<span class="green">Initiating hack sequence...</span>');
    print('<span class="dim">Accessing mainframe...</span>');
    print('<span class="dim">Bypassing firewall...</span>');
    print('<span class="dim">Downloading internet...</span>');
    nl();
    print('<span class="red">ERROR:</span> Just kidding. This is a portfolio site.');
    print('<span class="dim">But hey, you found an easter egg! Type "help" for real commands.</span>');
  }

  function cmdHello() {
    const greetings = [
      'Hey there! Type <span class="green">help</span> to see what I can do.',
      'Hello, world! (Every developer\'s first line of code.)',
      'Hi! Welcome to my corner of the internet. Try <span class="green">whoami</span>.',
      'Greetings, human. I assume you\'re a recruiter? Try <span class="green">experience</span>.',
    ];
    print(greetings[Math.floor(Math.random() * greetings.length)]);
  }

  function cmdLs() {
    print('<span class="dim">drwxr-xr-x  sidharth  </span>experience/');
    print('<span class="dim">drwxr-xr-x  sidharth  </span>education/');
    print('<span class="dim">drwxr-xr-x  sidharth  </span>skills/');
    print('<span class="dim">drwxr-xr-x  sidharth  </span>projects/');
    print('<span class="dim">-rw-r--r--  sidharth  </span>resume.pdf');
    print('<span class="dim">-rw-r--r--  sidharth  </span>README.md');
  }

  function cmdCat() {
    print('<span class="dim">cat: this is a terminal portfolio, not actual bash</span>');
    print('<span class="dim">but I respect the instinct. try "help" instead.</span>');
  }

  function cmdPwd() {
    print('/home/sidharth/portfolio');
  }

  function cmdDate() {
    print(new Date().toString());
  }

  function cmdGame() {
    print('<span class="bold yellow">JOB QUEST</span> - A 2D RPG resume adventure!');
    print('Opening game in a new tab...');
    print('<span class="dim">Upload your resume, create a character, and apply to jobs in style.</span>');
    window.open('game/', '_blank');
  }

  function cmdNeofetch() {
    print('<span class="cyan">       _,met$$$$$gg.</span>          <span class="bold">sidharth</span>@<span class="bold">portfolio</span>');
    print('<span class="cyan">    ,g$$$$$$$$$$$$$$$P.</span>       ─────────────────');
    print('<span class="cyan">  ,g$$P"        """Y$$.".</span>     <span class="cyan">OS:</span> Engineer turned PM');
    print('<span class="cyan"> ,$$P\'              `$$$.</span>     <span class="cyan">Host:</span> Austin, TX');
    print('<span class="cyan">\',$$P       ,ggs.    `$$b:</span>    <span class="cyan">Kernel:</span> Michigan MBA');
    print('<span class="cyan"> d$$\'     ,$P"\'   .   $$$</span>     <span class="cyan">Uptime:</span> 8+ years in tech');
    print('<span class="cyan"> $$P      d$\'     ,   $$P</span>     <span class="cyan">Packages:</span> Python, SQL, AI/ML');
    print('<span class="cyan"> $$:      $$.   -    ,d$$\'</span>    <span class="cyan">Shell:</span> product-thinking 5.0');
    print('<span class="cyan"> $$;      Y$b._   _,d$P\'</span>     <span class="cyan">Terminal:</span> this website');
    print('<span class="cyan"> Y$$.    `.`"Y$$$$P"\'</span>        <span class="cyan">CPU:</span> GMAT 760 (99th %ile)');
    print('<span class="cyan"> `$$b      "-.__</span>              <span class="cyan">Memory:</span> 100M+ users served');
    print('<span class="cyan">  `Y$$</span>                        <span class="cyan">Disk:</span> $5M+ ACV secured');
    print('<span class="cyan">   `Y$$.</span>');
    print('<span class="cyan">     `$$b.</span>');
    print('<span class="cyan">       `Y$$b.</span>');
    print('<span class="cyan">          `"Y$b._</span>');
    print('<span class="cyan">              `"""</span>');
  }

  // ── Input handling ─────────────────────────────────────────────────
  const history = [];
  let historyIndex = -1;

  function processCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    history.unshift(cmd);
    historyIndex = -1;
    printCommand(cmd);

    if (COMMANDS[cmd]) {
      COMMANDS[cmd]();
    } else {
      print(`<span class="red">command not found:</span> ${escapeHtml(cmd)}`);
      print('<span class="dim">Type "help" to see available commands.</span>');
    }
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Tab completion
  function getCompletion(partial) {
    if (!partial) return null;
    const matches = COMMAND_NAMES.filter(c => c.startsWith(partial.toLowerCase()));
    return matches.length === 1 ? matches[0] : null;
  }

  input.addEventListener('input', () => {
    const val = input.value;
    const match = getCompletion(val);
    if (match && val.length > 0 && match !== val.toLowerCase()) {
      tabHint.textContent = match;
      tabHint.style.paddingLeft = `${val.length}ch`;
      tabHint.style.display = 'inline';
    } else {
      tabHint.style.display = 'none';
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const match = getCompletion(input.value);
      if (match) {
        input.value = match;
        tabHint.style.display = 'none';
      }
    } else if (e.key === 'Enter') {
      processCommand(input.value);
      input.value = '';
      tabHint.style.display = 'none';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        historyIndex++;
        input.value = history[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        input.value = history[historyIndex];
      } else {
        historyIndex = -1;
        input.value = '';
      }
    }
  });

  // Focus input on click anywhere
  terminalBody.addEventListener('click', () => input.focus());
  document.body.addEventListener('click', () => input.focus());

  // ── Boot sequence ──────────────────────────────────────────────────
  function typeWriter(text, callback, speed) {
    speed = speed || 30;
    let i = 0;
    const cursor = document.createElement('span');
    cursor.classList.add('typing-cursor');

    const line = document.createElement('div');
    line.classList.add('line');
    output.appendChild(line);
    line.appendChild(cursor);

    function type() {
      if (i < text.length) {
        line.insertBefore(document.createTextNode(text[i]), cursor);
        i++;
        scrollToBottom();
        setTimeout(type, speed);
      } else {
        line.removeChild(cursor);
        if (callback) callback();
      }
    }
    type();
  }

  function bootSequence() {
    const lines = [
      { text: 'Booting sidharth.dev...', delay: 600 },
      { text: 'Loading experience [=========>] 8+ years', delay: 500 },
      { text: 'Mounting skills... OK', delay: 300 },
      { text: 'Initializing personality... sarcasm loaded.', delay: 400 },
      { text: '', delay: 200 },
    ];

    let idx = 0;

    function nextLine() {
      if (idx < lines.length) {
        const { text, delay } = lines[idx];
        if (text === '') {
          print('');
          idx++;
          setTimeout(nextLine, delay);
        } else {
          typeWriter(text, () => {
            idx++;
            setTimeout(nextLine, delay);
          }, 25);
        }
      } else {
        // Boot done - show welcome
        print('<span class="bold cyan">Welcome to Sidharth\'s terminal portfolio.</span>');
        print('Type <span class="green">help</span> to see available commands.');
        print('<span class="dim">Or just start exploring. There are a few secrets hidden in here.</span>');
        nl();
        input.disabled = false;
        input.focus();
      }
    }

    input.disabled = true;
    nextLine();
  }

  bootSequence();
})();
