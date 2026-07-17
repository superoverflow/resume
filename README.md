# Cyrus Tang CV

Personal CV site built with Next.js and deployed at <https://resume.superoverflow.com>.

## Features

- Responsive desktop and mobile CV layouts
- Light and dark mode
- Compact mobile action menu
- Native browser print / Save as PDF flow
- Selectable, machine-readable PDF text for ATS and HR systems
- Clickable contact links and a source-code link
- Markdown-managed CV content
- Unit tests for Markdown parsing

## Update CV content

Edit files in `content/`; normal CV updates require no React or CSS changes.

| File | Update |
| --- | --- |
| `content/profile.md` | Name, role, contacts, and profile summary |
| `content/experience.md` | Companies, roles, dates, and achievements |
| `content/skills.md` | Skills |
| `content/education.md` | University, degrees, dates, and awards |

Changes appear on the next deployment.

## Local development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Tests

```bash
npm test
```

## PDF export

Select **Download PDF**, then choose **Save as PDF** in your browser's native print dialog. This preserves selectable text for ATS and HR systems rather than creating an image-only PDF.
