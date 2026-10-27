// Loads the showreel and portfolio cards on /studio from portfolio/portfolio.json.
// Paths inside the JSON are relative to the portfolio/ folder.
const PLAY_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#0B1220" d="M6 3.5v17l14-8.5z"/></svg>';

function createVideo(src, poster, label) {
  const video = document.createElement('video');
  video.controls = true;
  video.playsInline = true;
  video.preload = 'metadata';
  if (poster) video.poster = poster;
  video.setAttribute('aria-label', label);
  const source = document.createElement('source');
  source.src = src;
  source.type = 'video/mp4';
  video.append(source);
  return video;
}

function createCard(item, resolve) {
  const card = document.createElement('article');
  card.className = 'work-card reveal in';

  const media = document.createElement('div');
  media.className = 'work-media';
  const poster = item.poster ? resolve(item.poster) : '';
  if (poster) {
    const img = document.createElement('img');
    img.src = poster;
    img.alt = `Still from ${item.title}`;
    img.loading = 'lazy';
    img.width = 1600;
    img.height = 900;
    media.append(img);
  }

  const play = document.createElement('button');
  play.type = 'button';
  play.className = 'work-play';
  play.setAttribute('aria-label', `Play ${item.title}`);
  play.innerHTML = `<span>${PLAY_ICON}</span>`;
  play.addEventListener('click', () => {
    const video = createVideo(resolve(item.src), poster, item.title);
    media.replaceChildren(video);
    video.play().catch(() => {});
    video.focus();
  });
  media.append(play);

  if (item.duration) {
    const duration = document.createElement('span');
    duration.className = 'work-duration';
    duration.textContent = item.duration;
    media.append(duration);
  }

  const body = document.createElement('div');
  body.className = 'work-body';
  const title = document.createElement('h3');
  title.textContent = item.title;
  body.append(title);
  if (item.description) {
    const description = document.createElement('p');
    description.textContent = item.description;
    body.append(description);
  }

  card.append(media, body);
  return card;
}

async function loadPortfolio() {
  const jsonUrl = new URL('../portfolio/portfolio.json', window.location.href);
  let data;
  try {
    const response = await fetch(jsonUrl, { cache: 'no-cache' });
    if (!response.ok) return;
    data = await response.json();
  } catch {
    return;
  }
  const resolve = path => new URL(path, jsonUrl).href;

  const reel = document.querySelector('[data-reel]');
  if (reel && data.showreel?.src) {
    const poster = data.showreel.poster ? resolve(data.showreel.poster) : '';
    reel.replaceChildren(createVideo(resolve(data.showreel.src), poster, 'Difira Studio showreel'));
  }

  const items = (data.items || []).filter(item => item && item.src && item.title);
  const section = document.querySelector('#work');
  const grid = document.querySelector('[data-work-grid]');
  if (!items.length || !section || !grid) return;
  grid.replaceChildren(...items.map(item => createCard(item, resolve)));
  section.hidden = false;
}

loadPortfolio();
