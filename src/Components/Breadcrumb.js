import React from 'react';
import { Typography } from '@material-ui/core';

const Breadcrumb = ({ selectionHistory, navigateTo }) => {
  return (
    <Typography variant="h6" component="div">
      {selectionHistory.map((item, index) => {
        const isLastItem = index === selectionHistory.length - 1;
        return (
          <React.Fragment key={item}>
            {isLastItem ? (
              <span className="breadcrumb-item active">{item}</span>
            ) : (
              <React.Fragment>
                <a
                  className="breadcrumb-item"
                  href="#"
                  onClick={() => navigateTo(index)}
                >
                  {item}
                </a>
                <span className="breadcrumb-separator"></span>
              </React.Fragment>
            )}
          </React.Fragment>
        );
      })}
    </Typography>
  );
};

export default Breadcrumb;
