import React from 'react';

const customizeIcon = (props) => {
  // console.log('props customizeIcon', props);
  const { className, source } = props;

  const resolvePath = () => `url(${source})`;

  return (
    <div
      className={className}
      style={{
        backgroundImage: resolvePath(),
        ...props,
      }}
    >
      {props.children}
    </div>
  );
};

export default customizeIcon;
