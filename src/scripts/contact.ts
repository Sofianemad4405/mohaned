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

    const gmailUrl =
      'https://mail.google.com/mail/?view=cm&fs=1' +
      `&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const mailtoUrl = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const linkTo = (href: string, text: string, blank = true) => {
      const a = document.createElement('a');
      a.href = href;
      if (blank) {
        a.target = '_blank';
        a.rel = 'noopener';
      }
      a.className = 'link volt';
      a.textContent = text;
      return a;
    };
    // Hand the brief to the visitor's own mail: Gmail on desktop, the mail app on phones.
    const handOff = (lead: string, tone: 'ok' | 'error') => {
      status.dataset.tone = tone;
      status.replaceChildren(lead, linkTo(gmailUrl, 'Send with Gmail ↗'), ' · ', linkTo(mailtoUrl, 'Use your mail app', false));
    };

    if (mode === 'gmail') {
      const phone = matchMedia('(pointer: coarse)').matches;
      linkTo(phone ? mailtoUrl : gmailUrl, '', !phone).click();
      handOff('Your brief is filled in, ready to send. Didn’t open? ', 'ok');
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
        body: JSON.stringify({
          // Skip blank optional fields so the email only lists what was filled in.
          ...Object.fromEntries(Object.entries(data).filter(([, v]) => v.trim())),
          // FormSubmit options; other services ignore them.
          _subject: subject,
          _replyto: data.email,
          _template: 'table',
          _captcha: 'false',
        }),
        signal: ctrl.signal,
      });
      const json = await res.json().catch(() => ({}));
      // FormSubmit answers 200 with success "false" when something is off (e.g. not activated yet).
      if (!res.ok || String(json.success ?? 'true') === 'false') throw new Error(json.message || String(res.status));
      form.reset();
      track('form_sent', { where: data.type || 'unspecified' });
      say(`Thanks, ${data.name.split(' ')[0]} — your brief is in. I’ll reply to ${data.email}.`);
    } catch {
      track('form_failed');
      handOff('That didn’t go through, but nothing was lost. Send the same brief yourself: ', 'error');
    } finally {
      clearTimeout(timer);
      form.classList.remove('is-sending');
      submitLabel.textContent = 'Send brief';
    }
  });
}
