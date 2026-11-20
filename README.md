# Portfolio-Website

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
![HTML5](https://img.shields.io/badge/HTML5-static_site-E34F26?logo=html5&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap&logoColor=white)

Personal portfolio website of Umesh Khatiwada (DevOps, platform and AI-automation engineer): a dependency-free static site built with plain HTML, CSS and JavaScript, deployed to AWS S3 by GitHub Actions.

Live site: <https://umeshkhatiwada.com.np>

## Overview

The site has no build step and no package manager. Pages are hand-written HTML files that load Bootstrap, AOS, Swiper, GLightbox, Isotope, Typed.js and other libraries from the bundled `assets/vendor/` directory, plus a few custom scripts for interactive effects.

## Features

- Six pages: Home, About, Services, Portfolio (profile), Resume and Contact
- Animated hero terminal that types a looping sequence of commands (`assets/js/terminal.js`)
- Animated "AI on-call agent" workflow demo on the home page (`assets/js/agent-flow.js`)
- Interactive CLI panel with maximize/Escape-to-exit behaviour (`assets/js/cli.js`)
- SEO metadata: Open Graph / Twitter tags, `robots.txt` and `sitemap.xml`
- Responsive layout based on Bootstrap and Bootstrap Icons
- Automated deployment to S3 on every push to `main`

## Prerequisites

- Any static file server (Python, Node, nginx, ...) for local preview. No build tools required.
- For deployment: an AWS account, an S3 bucket configured for static hosting, and the GitHub secrets listed below.

## Quick start

```bash
git clone https://github.com/umesh-khatiwada/Portfolio-Website.git
cd Portfolio-Website
python3 -m http.server 8000
# open http://localhost:8000
```

## Configuration

Deployment is defined in `.github/workflows/deploy.yml` and reads these GitHub Actions repository secrets (set them under Settings > Secrets and variables > Actions):

| Secret | Purpose |
| --- | --- |
| `AWS_ACCESS_KEY_ID` | AWS credentials used by the workflow |
| `AWS_SECRET_ACCESS_KEY` | AWS credentials used by the workflow |
| `AWS_REGION` | AWS region of the bucket |
| `S3_BUCKET_NAME` | Target S3 bucket |

## Deployment

On every push to `main`, the workflow configures AWS credentials and runs:

```bash
aws s3 sync ./ s3://$S3_BUCKET_NAME --acl public-read --delete --exact-timestamps
```

Note that this syncs the entire repository root, and `--delete` removes remote objects that no longer exist locally.

## Project structure

```
.
├── index.html, about.html, services.html,
│   portfolio.html, resume.html, contact.html   # pages
├── css/style.css                               # site styles
├── js/cli.js                                   # maximize toggle for the CLI panel
├── assets/
│   ├── js/                                     # main, terminal, agent-flow, metrics, matrix, network, glitch, tech-icons, cli
│   ├── css/, scss/, img/, file/                # styles, images, downloadable files
│   └── vendor/                                 # bundled third-party libraries
├── forms/contact.php                           # template contact handler (see notes)
├── robots.txt, sitemap.xml, favicon.ico
└── .github/workflows/deploy.yml                # S3 deployment
```

## Notes

- The contact page form is submitted with `action="javascript:void(0);"`, and `forms/contact.php` is the unmodified template stub that requires the paid "PHP Email Form" library (not included), so it is not a working mail backend. S3 static hosting cannot run PHP anyway.
- `s3-policy.json` is currently an empty file.

## Roadmap

- [ ] Wire the contact form to a real backend or form service
- [ ] Add a bucket policy to `s3-policy.json` or remove the file

## License

Released under the [MIT License](LICENSE).

## Author

Umesh Khatiwada - [@umesh-khatiwada](https://github.com/umesh-khatiwada)
