// Editor panel setup: live preview template and the "Embed video / podcast" button.
// Kept in its own file (not inline in index.html) so the panel's Content-Security-Policy can
// refuse every inline script.

// Live preview: shows the post with the site's own fonts and styles while editing.
CMS.registerPreviewStyle('/admin/preview.css');

const PostPreview = ({ entry, widgetFor }) => {
  const d = (k) => entry.getIn(['data', k]);
  const tags = (entry.getIn(['data', 'tags']) || []).toJS ? entry.getIn(['data', 'tags']).toJS() : [];
  return h('article', { className: 'wrap post-page' },
    h('header', { className: 'post-head' },
      h('h1', { className: 'page' }, d('title') || 'Untitled post'),
      h('p', { className: 'by' }, 'By ', h('strong', {}, d('author') || '[Author]'), d('date') ? ' · ' + d('date') : ''),
      h('div', { className: 'tags' }, tags.map((t) => h('span', { className: 'tag', key: t }, t)))
    ),
    h('div', { className: 'prose narrow' }, widgetFor('body'))
  );
};
CMS.registerPreviewTemplate('posts', PostPreview);

// "+ > Embed": paste a YouTube or Spotify link and it becomes a responsive player.
// Only those two services are turned into players, and only the video/episode ID is kept, so a
// pasted link can never inject its own HTML or script into a post. Any other https:// link is
// inserted as an ordinary link instead.
const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

function embedHtml(url) {
  url = String(url || '').trim();
  let m;
  if ((m = url.match(/^https?:\/\/(?:www\.|m\.)?(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:[^#]*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})(?![\w-])/))) {
    return '<div class="embed"><iframe src="https://www.youtube-nocookie.com/embed/' + m[1] + '" title="Video" allowfullscreen loading="lazy"></iframe></div>';
  }
  if ((m = url.match(/^https?:\/\/open\.spotify\.com\/(?:intl-[a-z-]+\/)?(?:embed\/)?(episode|show|track)\/([A-Za-z0-9]+)/))) {
    return '<div class="embed audio"><iframe src="https://open.spotify.com/embed/' + m[1] + '/' + m[2] + '" title="Podcast" loading="lazy"></iframe></div>';
  }
  if (/^https:\/\/[^\s"'<>]+$/i.test(url)) {
    const safe = escapeHtml(url);
    return '<p><a href="' + safe + '">' + safe + '</a></p>';
  }
  return '';
}

CMS.registerEditorComponent({
  id: 'embed',
  label: 'Embed video / podcast',
  fields: [{ name: 'url', label: 'Paste a YouTube or Spotify link', widget: 'string' }],
  pattern: /^<div class="embed(?: audio)?"><iframe src="([^"]+)"[^>]*><\/iframe><\/div>$/,
  fromBlock: (match) => ({ url: match[1] }),
  toBlock: (obj) => embedHtml(obj.url),
  toPreview: (obj) =>
    embedHtml(obj.url) || '<p><em>Only YouTube and Spotify links can be embedded.</em></p>',
});
