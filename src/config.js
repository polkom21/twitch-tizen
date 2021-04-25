// const dev = () => {
//     return process.env.NODE_ENV === 'development';
// }

export const config = {
    API_URL: 'https://api.twitch.tv/helix',
    CLIENT_ID: 'cbumtvy1yu4h1qpfx28m7ieolv42xm',
    LANG: localStorage.getItem('lang') || 'pl',
}