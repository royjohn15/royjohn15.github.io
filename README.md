# royjohn15.github.io

My portfolio: a cartoon desk in a white 3D void, built with plain HTML, CSS and JavaScript. No build step.

## Preview on your computer

    python3 -m http.server 8000

Then open http://localhost:8000. Opening index.html directly will not work, because browsers block its JavaScript modules.

## Add the resume

1. Put the PDF in `assets/`, for example `assets/Roy_John_Resume.pdf`.
2. In `assets/js/main.js`, set `const RESUME_PDF='assets/Roy_John_Resume.pdf';`
3. Commit and push.

Everything in this repository is public, including old versions in its history.

## Edit the words

All the text is in the `APPS` section near the top of `assets/js/main.js`.
