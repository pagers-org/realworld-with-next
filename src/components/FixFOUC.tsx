import { memo, useEffect, useState } from 'react';

const FixFOUC = memo(() => {
  const [allowTransitions, setAllowTransitions] = useState(false);

  useEffect(() => setAllowTransitions(true), []);

  if (allowTransitions) return null;

  return (
    <style
      dangerouslySetInnerHTML={{ __html: '*, *::before, *::after { transition: none!important; }' }}
    />
  );
});

FixFOUC.displayName = 'ChromeFixUnStyledTransitions';

export default FixFOUC;
