import { $, $$ } from './env';
import { track } from './analytics';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function initContact() {
  const form = $<HTMLFormElement>('[data-contact-form]');
  if (form) wireForm(form);

  for (const btn of $$<HTMLButtonElement>('[data-copy]')) {
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copy!;
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = 'Copied';
      } catch {
        btn.textContent = 'Press Ctrl/⌘ + C';
        const range = document.createRange();
        range.selectNodeContents(btn.previousElementSibling!);
        getSelection()?.removeAllRanges();
        getSelection()?.addRange(range);
      }
      setTimeout(() => (btn.textContent = 'Copy'), 1800);
    });
  }
}

function wireForm(form: HTMLFormElement) {
  const status = $('[data-status]', form)!;
  const submitLabel = $('[data-submit-label]', form)!;
  const endpoint = form.dataset.endpoint;
  const mode = form.dataset.mode as 'post' | 'gmail';
  const to = form.dataset.email!;

  const field = (name: string) => form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
  const setError = (name: string, msg: string) => {
    const f = field(name);
    const err = $(`#${f.id}-err`, form);
    f.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (err) err.textContent = msg;
  };
  const say = (msg: string, tone: 'ok' | 'error' = 'ok') => {
    status.dataset.tone = tone;
    status.textContent = msg;
  };

  const validate = () => {
    const checks: [string, string][] = [
      ['name', field('name').value.trim() ? '' : 'Please add your name.'],
      ['email', EMAIL_RE.test(field('email').value.trim()) ? '' : 'Please enter a valid email so I can reply.'],
      ['message', field('message').value.trim().length >= 10 ? '' : 'A line or two about the project, please.'],
    ];
    checks.forEach(([n, m]) => setError(n, m));
    const bad = checks.find(([, m]) => m);
    if (bad) field(bad[0]).focus();
    return !bad;
  };

  ['name', 'email', 'message'].forEach((n) =>
    field(n).addEventListener('input', () => field(n).getAttribute('aria-invalid') === 'true' && setError(n, '')),
  );

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    say('');
    if (!validate()) return;

    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (data.website) {
      // Honeypot filled: quietly pretend it worked.
      form.reset();
      say('Thanks — your brief is in.');
      return;
    }
    delete data.website;
    track('form_submit', { where: data.type || 'unspecified' });

    const subject = `Project brief — ${data.type || 'New project'} (${data.name})`;
    const details = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.company && `Company / channel: ${data.company}`,
      data.type && `Project type: ${data.type}`,
      data.budget && `Budget: ${data.budget}`,
      data.deadline && `Deadline: ${data.deadline}`,
    ].filter(Boolean);
    const body = `${details.join('\n')}\n\n${data.message}`;

    if (mode === 'gmail') {
      // Gmail's compose screen, with To, Subject and Body already filled in.
      const url =
        'https://mail.google.com/mail/?view=cm&fs=1' +
        `&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener';
      link.className = 'link volt';
      link.textContent = 'Open Gmail ↗';
      link.click();
      status.dataset.tone = 'ok';
      status.replaceChildren('Gmail opens in a new tab with your brief filled in, ready to send. Not open? ', link);
      return;
    }

    form.classList.add('is-sending');
    submitLabel.textContent = 'Sending…';
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 15000);
    try {
      const res = await fetch(endpoint!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
        signal: ctrl.signal,
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      say(`Thanks, ${data.name.split(' ')[0]} — your brief is in. I’ll reply to ${data.email}.`);
    } catch {
      say(`That didn’t send — nothing was lost. Try again, or email ${to} directly.`, 'error');
    } finally {
      clearTimeout(timer);
      form.classList.remove('is-sending');
      submitLabel.textContent = 'Send brief';
    }
  });
}
