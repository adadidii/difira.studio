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

// With a mouse, hovering a card plays a muted preview on top of the poster. The file only
// starts loading on the first hover. Clicking still opens the full player with sound.
const HOVER_PREVIEW =
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function addHoverPreview(media, src) {
  let video = null;
  let active = true;
  media.addEventListener('pointerenter', event => {
    if (!active || event.pointerType !== 'mouse') return;
    if (!video) {
      video = document.createElement('video');
      video.className = 'work-preview';
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = 'auto';
      video.setAttribute('aria-hidden', 'true');
      video.src = src;
      video.addEventListener('playing', () => media.classList.add('is-previewing'));
      media.insertBefore(video, media.querySelector('.work-play'));
    }
    video.play().catch(() => {});
  });
  media.addEventListener('pointerleave', () => {
    if (!video) return;
    video.pause();
    media.classList.remove('is-previewing');
  });
  return {
    stop() {
      active = false;
      video?.pause();
    },
  };
}

function createCard(item, resolve) {
  const card = document.createElement('article');
  card.className = 'work-card reveal in';

  const media = document.createElement('div');
  media.className = item.vertical ? 'work-media is-vertical' : 'work-media';
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
  const preview = HOVER_PREVIEW ? addHoverPreview(media, resolve(item.src)) : null;
  play.addEventListener('click', () => {
    preview?.stop();
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
