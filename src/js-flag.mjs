// The one-line inline script that marks the page as JavaScript-capable (turns on animations and the
// phone menu). It lives here so Base.astro and astro.config.mjs use the exact same text: the config
// hashes it into the Content-Security-Policy, so editing it can never leave it blocked by the browser.
export const JS_FLAG = "document.documentElement.classList.add('js')";
