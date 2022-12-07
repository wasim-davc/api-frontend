import { useEffect, useRef } from 'react'
export default function BannerAds (props) {

  const banner = useRef(null);
  const atOptions = {
    'key' : props.adskey,
    'format' : 'iframe',
    'height' : props.height,
    'width' : props.width,
    'params' : {}
  };
  useEffect(() => {
    if (!banner.current.firstChild) {
      const conf = document.createElement('script');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://forcefulpacehauled.com/${atOptions.key}/invoke.js`;
      conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;

      if (banner.current) {
        banner.current.append(conf);
        banner.current.append(script);
      }
    }
  }, []);

  return <div ref={banner}></div>
}