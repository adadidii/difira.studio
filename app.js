const star=document.querySelector('#star'),score=document.querySelector('#score');let points=0;function moveStar(){star.style.left=`${12+Math.random()*72}%`;star.style.top=`${18+Math.random()*58}%`}star.addEventListener('click',()=>{points++;score.textContent=points;star.classList.remove('pop');void star.offsetWidth;star.classList.add('pop');moveStar()});moveStar();
const quotes=['Kami percaya software terbaik bukan yang paling rumit. Tapi yang paling mengerti cara orang bekerja.','Teknologi harus terasa dekat, hangat, dan membantu—bukan membuat kita merasa tertinggal.','Kami menyelesaikan masalah yang nyata, lalu mencari ide yang belum terpikirkan siapa pun.','AI kami gunakan untuk memperbesar kemampuan manusia, bukan menggantikan sisi manusianya.','Di tengah dunia digital yang bergerak semakin gila, keluarga kecil Indonesia tetap layak punya tools yang sederhana.','Dari satu ide kecil, kami ingin membuat hidup banyak orang terasa sedikit lebih ringan.'];let quoteIndex=0;const quoteText=document.querySelector('#quoteText'),quoteCount=document.querySelector('#quoteCount');function renderQuote(){quoteText.classList.remove('quote-in');void quoteText.offsetWidth;quoteText.textContent=quotes[quoteIndex];quoteCount.textContent=`${String(quoteIndex+1).padStart(2,'0')} / 06`;quoteText.classList.add('quote-in')}document.querySelector('#nextQuote').onclick=()=>{quoteIndex=(quoteIndex+1)%quotes.length;renderQuote()};document.querySelector('#prevQuote').onclick=()=>{quoteIndex=(quoteIndex-1+quotes.length)%quotes.length;renderQuote()};
document.querySelectorAll('.float-art,.hero-illustration,.sticker').forEach(el=>{el.addEventListener('mouseenter',()=>{const isPerson=el.classList.contains('hero-illustration');const range=isPerson?90:28;const x=(Math.random()-.5)*range,y=(Math.random()-.5)*range*.7;el.style.setProperty('--flee-x',`${x}px`);el.style.setProperty('--flee-y',`${y}px`);el.classList.add('flee');if(!isPerson)el.style.animationPlayState='paused'});el.addEventListener('mouseleave',()=>{el.classList.remove('flee');el.style.animationPlayState=''})});

const replies = [
  [/stok|persediaan|barang/i, 'Coba mulai dari catatan stok masuk-keluar dan pengingat restock. Untuk bisnis F&B, ide ini bisa dikaitkan dengan TehPOS.'],
  [/jadwal|booking|waktu/i, 'Coba kalender bersama, pengingat, dan booking sederhana. Aktivitas apa yang paling sering terlewat?'],
  [/ibu|anak|keluarga|bayi/i, 'Kita bisa mulai dari pengingat kebutuhan harian keluarga atau kalkulator tumbuh kembang seperti Buah Hatiku. Bagian mana yang paling ingin kamu permudah?'],
  [/.*/, 'Coba kita pecah: siapa yang merasakan masalah ini, kapan masalahnya muncul, dan solusi kecil apa yang paling membantu?']
];
const chatForm = document.querySelector('#chatForm');
const chatInput = document.querySelector('#chatInput');
const chatMessages = document.querySelector('#chatMessages');
const launcher = document.querySelector('#botLauncher');
const windowChat = document.querySelector('#chatWindow');
const closeChat = document.querySelector('#chatClose');
function addMessage(text, role) {
  const bubble = document.createElement('div');
  bubble.className = 'bubble ' + role;
  bubble.textContent = text;
  chatMessages.append(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
function sendChat(text) {
  const message = text.trim();
  if (!message) return;
  addMessage(message, 'user');
  chatInput.value = '';
  const reply = replies.find(([pattern]) => pattern.test(message))[1];
  setTimeout(() => addMessage(reply, 'bot'), 350);
}
function setChatOpen(open) {
  windowChat.hidden = !open;
  windowChat.classList.toggle('open', open);
  launcher.hidden = open;
  launcher.setAttribute('aria-expanded', String(open));
  if (open) chatInput.focus();
  else launcher.focus();
}
chatForm.addEventListener('submit', event => {
  event.preventDefault();
  sendChat(chatInput.value);
});
document.querySelectorAll('.suggestions button').forEach(button => {
  button.addEventListener('click', () => sendChat(button.dataset.msg));
});
launcher.addEventListener('click', () => setChatOpen(true));
closeChat.addEventListener('click', () => setChatOpen(false));
windowChat.addEventListener('keydown', event => {
  if (event.key === 'Escape') setChatOpen(false);
});
