export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)',
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, val: string, days: number) {
  const date = new Date();
  const value = val;

  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

  document.cookie =
    name + '=' + value + '; expires=' + date.toUTCString() + '; path=/';
}
