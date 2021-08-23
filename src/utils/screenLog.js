/* eslint-disable */
export const printANSI = () => {
  // ASCII - ANSI Shadow
  let text = `
________  .___   _____    ___ ___   _____________ ___ .___    ___ ______________
\\_____  \\ |   | /  _  \\  /   |   \\  \\____    /   |   \\|   |  /   |   \\_   _____/
 /  / \\  \\|   |/  /_\\  \\/    ~    \\   /     /    ~    \\   | /    ~    \\    __)_
/   \\_/.  \\   /    |    \\    Y    /  /     /\\    Y    /   | \\    Y    /        \\
\\_____\\ \\_/___\\____|__  /\\___|_  /  /_______ \\___|_  /|___|  \\___|_  /_______  /
       \\__>           \\/       \\/           \\/     \\/              \\/        \\/
`
  console.log(`%c${text}`, 'color: #fc4d50')
  console.log('%c感谢使用 千职鹤!', 'color: #000; font-size: 14px;    font-family: Hiragino Sans GB,Microsoft YaHei,\\\\5FAE\\8F6F\\96C5\\9ED1,Droid Sans Fallback,Source Sans,Wenquanyi Micro Hei,WenQuanYi Micro Hei Mono,WenQuanYi Zen Hei,Apple LiGothic Medium,SimHei,ST Heiti,WenQuanYi Zen Hei Sharp,sans-serif;')
  console.log('%cThanks for using qian zhi he!', 'color: #fff; font-size: 14px; font-weight: 300; text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;')
  console.log('%c既然您打开了控制台，就证明你也是有基础的人啦，大家一起努力', 'color: #fff; font-size: 14px; font-weight: 300; text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;')
}
