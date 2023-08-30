const { styled } = require('@mui/material/styles');
const { Grid } = require('@mui/material');

const CardContentNormal = styled(Grid)({
  padding: '10px',
  boxShadow: '8px 8px 8px rgba(0, 0, 0, 0.2)',
  borderRadius: '5px',
  border: '1px solid #e0e0e0',
  '&:hover': {
    boxShadow: '8px 8px 8px rgba(0, 0, 0, 0.4)',
  },
});

const GridCard = styled(Grid)({
  // padding: '10px',
  // boxShadow: '8px 8px 8px rgba(0, 0, 0, 0.2)',
  // borderRadius: '5px',
  // border: '1px solid #e0e0e0',
  // '&:hover': {
  //     boxShadow: '8px 8px 8px rgba(0, 0, 0, 0.4)',
  // },
});

const ImportantText = styled('p')({
  border: '1px solid #e0e0e0',
  boxShadow: '8px 8px 8px rgba(0, 0, 0, 0.2)',
  padding: '10px',
  fontWeight: 'bold',
  display: 'inline-block',
  borderRadius: '5px',
});

const GridTransfer = styled(Grid)({
  padding: '10px',
  height: '100px',
  border: '1px solid #e0e0e0',
  boxShadow: '8px 8px 8px rgba(0, 0, 0, 0.2)',
  fontWeight: 'bold',
  borderRadius: '5px',
  // align content vertival
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Wrapper = styled('div')({
  textAlign: 'center',
});

export { GridCard, ImportantText, Wrapper, CardContentNormal, GridTransfer };
