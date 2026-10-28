# PACKET//ZERO

**A local-first cybersecurity learning game for GitHub Pages.**

Follow the packet. Understand the failure. Defend the system.

PACKET//ZERO teaches technical security concepts through focused field notes, interactive diagrams, a perspective-projected 3D network you can rotate and explore, browser-only training simulations, recall cards and a progression system. It is deliberately static: no backend, login, analytics, API keys or installation step.

## Start playing

Open `index.html` in a browser, or serve the folder locally:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish on GitHub Pages

This repository includes [a GitHub Actions deployment workflow](.github/workflows/pages.yml) that publishes the game automatically from `main` with no build tools.

1. Open [Settings → Pages](https://github.com/aounali720/packet-zero/settings/pages).
2. Under **Build and deployment → Source**, choose **GitHub Actions** (not `Deploy from a branch`).
3. Open the [Actions tab](https://github.com/aounali720/packet-zero/actions/workflows/pages.yml). The workflow runs on pushes to `main` and can also be launched using **Run workflow**.
4. After a successful deployment, visit **https://aounali720.github.io/packet-zero/**.

If the website returns 404, check the workflow run and confirm that the repository's Pages source is set to **GitHub Actions**. GitHub Pages site settings must be enabled by an authorized repository administrator; committing a workflow alone may not activate the site.

The workflow publishes only the site's HTML, CSS, JavaScript and favicon, with a `.nojekyll` marker. All simulations run in the browser; there is no backend or API token.

## Learning design

| World | Focus |
| --- | --- |
| Ground Zero | CIA, risk, access control, threat modeling and testing ethics |
| Wire & Protocol | TCP/IP, OSI, DNS, TLS, HTTP, routing and segmentation |
| Host & Identity | Linux permissions, Windows logs, AD, Kerberos, MFA and recovery |
| The Web Faultline | All ten categories in **OWASP Top 10:2025** |
| Attack & Validate | Authorized assessment, recon, XSS, SSRF, traversal and reporting |
| Blue Team Operations | SIEM, SOC triage, threat hunting, ATT&CK and response |
| Keys & Proofs | Encryption, hashing, TLS trust, password KDFs and signatures |
| Cloud & Containers | Shared responsibility, IAM, networks, Docker, Kubernetes and CI/CD |
| Adversaries & Strategy | ATT&CK, detection-as-code, malware analysis, NIST CSF 2.0 and risk |

**74 authored lessons** include: a compact first-principles explanation, an analogy, a four-stage interactive schematic, a realistic example, a common misconception, defensive controls and a graded knowledge check with reasoning. Each lesson earns 60 XP once.

**Eight local simulations:**

- Handshake Operator — complete TCP SYN / SYN-ACK / ACK.
- Rule Engine — implement specific allow/deny decisions.
- Injection Clinic — compare concatenated SQL with parameter binding (toy simulation, **no SQL interpreter**).
- SOC Night Shift — assess alerts and investigate sessions.
- IAM Policy Forge — build scoped cloud permissions.
- Inbox Forensics — reason about mail and URLs.
- Subnet Workshop — calculate IPv4 network bounds and size.
- Containment Protocol — make safe incident response decisions.

Each cleared lab earns 150 XP once.

## Visual and technical details

- **3D network:** lightweight JavaScript canvas renderer with 3D coordinates, perspective projection, depth ordering, orbit dragging, scroll zoom, animated packet flow and inspectable nodes. No third-party 3D library or WebGL requirement.
- **Diagrams:** animated inline SVG flow diagrams with a step-by-step explainer on all 74 lessons, including bespoke illustrations for TCP, DNS, CIA, injection, containers and NIST CSF.
- **Persistence:** completion and review scheduling in your browser's `localStorage`. Export and import JSON in the Source Library. No syncing across devices unless you export/import yourself.
- **Practice reminders:** recall cards schedule hard responses for the next day, easy responses after three days. This is a lightweight review heuristic, not a validated adaptive learning algorithm.
- **Accessibility:** semantic buttons, keyboard-accessible lesson search (press `/` or Ctrl/Cmd+K), visible focus outlines, reduced-motion preference support and a mobile layout.
- **Privacy:** no trackers or authentication. Google Fonts may load over the network when online; system-font fallbacks work offline.

## Editing content

Open `content.js`. Each world uses `W()` and each lesson uses `L()` with title, thesis, analogy, four flow steps, example, misconception, defense, question, choices and explanation. The list is extensible without touching the layout. For additional simulations, use the structured rounds in `lab-data.js` and add another safe scenario.

Run the data checks:

```bash
node test.js
node test-ui.js
```

## Safety

This project contains *simulated* data and *simulated* vulnerable queries. It does not attack networks, execute injected SQL, scan IP addresses or run commands. Use hands-on material only in systems you own or are expressly authorized to test. The project's purpose is to explain security concepts and decision-making, not to provide a general-purpose offensive framework.

## Authoritative references

- [OWASP Top 10:2025](https://top10.owasp.org/2025/)
- [OWASP WSTG](https://owasp.org/projects/web-security-testing-guide)
- [MITRE ATT&CK Enterprise](https://attack.mitre.org/tactics/enterprise/)
- [NIST CSF 2.0](https://www.nist.gov/cyberframework)
- [NIST SP 800-61 Rev. 3](https://csrc.nist.gov/pubs/sp/800/61/r3/final)
- [GitHub Pages publication instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## License

MIT. See `LICENSE`.
