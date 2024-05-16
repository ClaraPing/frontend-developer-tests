import React, { useEffect, useState } from 'react';
import { Shell, ConfigProvider, Message } from '@alifd/next';
import Footer from './components/Footer';

(function () {
  const throttle = function (type, name, obj = window) {
    let running = false;

    const func = () => {
      if (running) {
        return;
      }

      running = true;

      requestAnimationFrame(() => {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };

    obj.addEventListener(type, func);
  };

  if (typeof window !== 'undefined') {
    throttle('resize', 'optimizedResize');
  }
})();

export default function BasicLayout({ children }) {
  const getDevice = (width) => {
    const isPhone = typeof navigator !== 'undefined' && navigator && navigator.userAgent.match(/phone/gi);

    if (width < 680 || isPhone) {
      return 'phone';
    } else if (width < 1280 && width > 680) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  };

  const [device, setDevice] = useState(getDevice(NaN));
  useEffect(()=>{
  },[])

  if (typeof window !== 'undefined') {
    window.addEventListener('optimizedResize', (e) => {
      const deviceWidth = (e && e.target && e.target.innerWidth) || NaN;
      setDevice(getDevice(deviceWidth));
    });
  }
  return (

    <>
      <style>
        {`
            .leftTitle{
              position: relative;
              color: #fff;
              font-size: 20px;
              font-weight: bolder;
              padding-left: 20px;
            }
            .leftTitle:after{
              content: '';
              position: absolute;
              left: 0;
              top: 50%;
              margin-top: -3px;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background-color: #009ee9;
            }
        `}
      </style>
      <ConfigProvider device={ device }>
        <Shell
          style={{ minHeight: '100vh' }}
          type="brand"
          fixedHeader={false}>
          <Shell.Branding>
            <div className='leftTitle'>Clara</div>
          </Shell.Branding>
          {/*<Shell.Navigation*/}
            {/*direction="hoz"*/}
            {/*fixed={true}*/}
            {/*style={{ marginRight: 10 }}>*/}
          {/*</Shell.Navigation>*/}

          <Shell.Content>{ children }</Shell.Content>
          <Shell.Footer>
            <Footer />
          </Shell.Footer>
        </Shell>
      </ConfigProvider>
    </>
  );
}
